import { prisma } from "@/db";
import { selectQuestions } from "@/lib/questions";
import { evaluateAnswer } from "@/lib/scoring";
import { buildSessionCompletion } from "@/lib/session";
import { computeProgressedBand } from "@/lib/progression";
import type { SessionQuestionOutcome } from "@/types";

const DEFAULT_CHILD_ID = "child-001";
// Number of most-recent completed sessions whose questions are treated as
// "recently used" and deprioritised during recycling.
const RECENCY_WINDOW = 1;

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

  const [allQuestions, shownRecords, recentSessions, subjectProgress] = await Promise.all([
    prisma.question.findMany({ where: { subject, isActive: true } }),
    prisma.shownQuestion.findMany({ where: { childId: child.id } }),
    prisma.practiceSession.findMany({
      where: { childId: child.id, subject, status: "completed" },
      orderBy: { completedAt: "desc" },
      take: RECENCY_WINDOW,
      include: { questions: { select: { questionId: true } } },
    }),
    prisma.subjectProgress.findFirst({
      where: { childId: child.id, subject },
      select: { levelBand: true },
    }),
  ]);

  // Use per-subject band if set; otherwise fall back to the child's default band.
  const effectiveBand = subjectProgress?.levelBand ?? child.levelBand;

  const shownIds = shownRecords.map((r) => r.questionId);
  const recentlyUsedIds = recentSessions.flatMap((s) => s.questions.map((q) => q.questionId));
  const selected = selectQuestions(allQuestions, shownIds, 10, effectiveBand, recentlyUsedIds);

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
        levelBand: effectiveBand,
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

  // Progression check — runs after the main transaction so the just-completed session
  // is included in the recent-sessions query.
  const currentProgress = await prisma.subjectProgress.findFirst({
    where: { childId: session.childId, subject: session.subject },
    select: { levelBand: true },
  });

  // Use the band stored on the session at creation; fall back to "Age 9" for old sessions.
  const currentBand = currentProgress?.levelBand ?? session.levelBand ?? "Age 9";

  // Only sessions completed AT the current band count toward the next promotion —
  // otherwise sessions from before a promotion could carry over and trigger a
  // second promotion after just one session in the new band.
  const recentCompletedSessions = await prisma.practiceSession.findMany({
    where: {
      childId: session.childId,
      subject: session.subject,
      status: "completed",
      levelBand: currentBand,
    },
    orderBy: { completedAt: "desc" },
    take: 3,
    select: { correctCount: true, totalQuestions: true },
  });

  const { newBand, promoted } = computeProgressedBand(recentCompletedSessions, currentBand);

  if (promoted) {
    await prisma.subjectProgress.update({
      where: { childId_subject: { childId: session.childId, subject: session.subject } },
      data: { levelBand: newBand },
    });
  }

  return { ...completion, progression: { promoted, previousBand: currentBand, newBand } };
}
