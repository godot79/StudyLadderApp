import { prisma } from "@/db";
import { selectQuestions } from "@/lib/questions";
import { evaluateAnswer } from "@/lib/scoring";
import { buildSessionCompletion } from "@/lib/session";
import type { SessionQuestionOutcome } from "@/types";

const DEFAULT_CHILD_ID = "child-001";

export async function getDefaultChild() {
  const child = await prisma.child.findFirst({
    where: { id: DEFAULT_CHILD_ID },
  });
  if (!child) throw new Error("Default child not found. Run the seed.");
  return child;
}

export async function startPracticeSession(subject: string) {
  const child = await getDefaultChild();

  // Return an existing in_progress session rather than creating a duplicate.
  // This handles browser back-button + re-start without orphaning sessions.
  const existingSession = await prisma.practiceSession.findFirst({
    where: { childId: child.id, subject, status: "in_progress" },
  });
  if (existingSession) {
    return { session: existingSession, sessionQuestions: [] };
  }

  const [allQuestions, shownRecords] = await Promise.all([
    prisma.question.findMany({ where: { subject, isActive: true } }),
    prisma.shownQuestion.findMany({ where: { childId: child.id } }),
  ]);

  const shownIds = shownRecords.map((r) => r.questionId);
  const selected = selectQuestions(allQuestions, shownIds);

  if (selected.length < 10) {
    throw new Error(
      `Not enough questions to start a session. Found ${selected.length}, need 10.`
    );
  }

  return prisma.$transaction(async (tx) => {
    const session = await tx.practiceSession.create({
      data: {
        childId: child.id,
        subject,
        status: "in_progress",
        totalQuestions: selected.length,
      },
    });

    const sessionQuestions = [];
    for (let i = 0; i < selected.length; i++) {
      const sq = await tx.sessionQuestion.create({
        data: {
          sessionId: session.id,
          questionId: selected[i].id,
          questionOrder: i + 1,
        },
      });
      sessionQuestions.push({ ...sq, question: selected[i] });
    }

    return { session, sessionQuestions };
  });
}

export async function saveSessionAnswer(
  sessionQuestionId: string,
  selectedOption: string | null
) {
  await prisma.sessionQuestion.update({
    where: { id: sessionQuestionId },
    data: { selectedOption, answeredAt: new Date() },
  });
}

export type AnswerInput = {
  sessionQuestionId: string;
  selectedOption: string | null;
};

export async function completePracticeSession(
  sessionId: string,
  answers: AnswerInput[]
) {
  const session = await prisma.practiceSession.findUnique({
    where: { id: sessionId },
    include: {
      questions: {
        include: { question: true },
        orderBy: { questionOrder: "asc" },
      },
    },
  });

  if (!session) throw new Error(`Session not found: ${sessionId}`);
  if (session.status === "completed")
    throw new Error("Session is already completed.");

  const answerMap = new Map(answers.map((a) => [a.sessionQuestionId, a.selectedOption]));

  const resolved = session.questions.map((sq) => {
    // Prefer client-sent answer; fall back to DB-persisted value from saveSessionAnswer.
    const selectedOption = answerMap.has(sq.id)
      ? (answerMap.get(sq.id) ?? null)
      : (sq.selectedOption ?? null);
    const outcome = evaluateAnswer(sq.question.correctOption, selectedOption);
    return { sq, selectedOption, outcome };
  });

  const domainOutcomes: SessionQuestionOutcome[] = resolved.map(
    ({ sq, selectedOption, outcome }) => ({
      questionId: sq.questionId,
      selectedOption,
      outcome,
    })
  );

  const completion = buildSessionCompletion(domainOutcomes);
  const { progressDelta } = completion;

  await prisma.$transaction(async (tx) => {
    await Promise.all(
      resolved.map(({ sq, selectedOption, outcome }) =>
        tx.sessionQuestion.update({
          where: { id: sq.id },
          data: {
            selectedOption,
            outcome,
            answeredAt: outcome !== "unanswered" ? new Date() : null,
          },
        })
      )
    );

    await tx.practiceSession.update({
      where: { id: sessionId },
      data: {
        status: "completed",
        correctCount: completion.results.correctCount,
        incorrectCount: completion.results.incorrectCount,
        unansweredCount: completion.results.unansweredCount,
        completedAt: completion.completedAt,
      },
    });

    await tx.subjectProgress.upsert({
      where: {
        childId_subject: { childId: session.childId, subject: session.subject },
      },
      update: {
        sessionsCompleted: { increment: progressDelta.sessionsCompletedDelta },
        totalQuestionsAnswered: {
          increment: progressDelta.totalQuestionsAnsweredDelta,
        },
        totalCorrect: { increment: progressDelta.totalCorrectDelta },
        lastCompletedAt: progressDelta.lastCompletedAt,
      },
      create: {
        childId: session.childId,
        subject: session.subject,
        sessionsCompleted: progressDelta.sessionsCompletedDelta,
        totalQuestionsAnswered: progressDelta.totalQuestionsAnsweredDelta,
        totalCorrect: progressDelta.totalCorrectDelta,
        lastCompletedAt: progressDelta.lastCompletedAt,
      },
    });

    // ShownQuestion uses @@unique([childId, questionId]) so we must filter
    // existing records before inserting — SQLite does not support skipDuplicates.
    const existingShown = await tx.shownQuestion.findMany({
      where: {
        childId: session.childId,
        questionId: { in: completion.shownQuestionIds },
      },
    });
    const alreadyShownSet = new Set(existingShown.map((s) => s.questionId));
    const newShownIds = completion.shownQuestionIds.filter(
      (id) => !alreadyShownSet.has(id)
    );

    if (newShownIds.length > 0) {
      await tx.shownQuestion.createMany({
        data: newShownIds.map((questionId) => ({
          childId: session.childId,
          questionId,
        })),
      });
    }
  });

  return completion;
}
