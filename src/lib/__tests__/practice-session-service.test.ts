import { vi, describe, it, expect, beforeEach } from "vitest";
import type { Question } from "@/types";

// ── Mock @/db before importing service ────────────────────────────────────────

const mockPrisma = {
  child: { findFirst: vi.fn() },
  question: { findMany: vi.fn() },
  shownQuestion: { findMany: vi.fn(), createMany: vi.fn() },
  practiceSession: { create: vi.fn(), update: vi.fn(), findUnique: vi.fn(), findFirst: vi.fn(), findMany: vi.fn() },
  sessionQuestion: { create: vi.fn(), update: vi.fn() },
  subjectProgress: { upsert: vi.fn() },
  $transaction: vi.fn((cb: (tx: typeof mockPrisma) => Promise<unknown>) =>
    cb(mockPrisma)
  ),
};

vi.mock("@/db", () => ({ prisma: mockPrisma }));

// Import after mock is registered
const {
  getDefaultChild,
  startPracticeSession,
  completePracticeSession,
  saveSessionAnswer,
} = await import("@/lib/practice-session-service");

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeQuestion(id: string, overrides: Partial<Question> = {}): Question {
  return {
    id,
    subject: "maths",
    prompt: `Question ${id}`,
    optionA: "1",
    optionB: "2",
    optionC: "3",
    optionD: "4",
    correctOption: "A",
    isActive: true,
    ...overrides,
  };
}

const CHILD = { id: "child-001", displayName: "Dharma", levelBand: "Age 9", createdAt: new Date(), updatedAt: new Date() };
const QUESTIONS = Array.from({ length: 25 }, (_, i) => makeQuestion(`q${i}`));

function makeSession(overrides: Record<string, unknown> = {}) {
  return {
    id: "session-1",
    childId: "child-001",
    subject: "maths",
    status: "in_progress",
    totalQuestions: 10,
    correctCount: 0,
    incorrectCount: 0,
    unansweredCount: 0,
    startedAt: new Date(),
    completedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: Array.from({ length: 10 }, (_, i) => ({
      id: `sq-${i}`,
      sessionId: "session-1",
      questionId: `q${i}`,
      questionOrder: i + 1,
      selectedOption: null,
      outcome: null,
      shownAt: new Date(),
      answeredAt: null,
      question: makeQuestion(`q${i}`),
    })),
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  mockPrisma.sessionQuestion.create.mockResolvedValue({ id: "sq-mock" });
  mockPrisma.sessionQuestion.update.mockResolvedValue({});
  mockPrisma.practiceSession.create.mockResolvedValue({ id: "session-1", childId: "child-001", subject: "maths" });
  mockPrisma.practiceSession.update.mockResolvedValue({});
  mockPrisma.practiceSession.findFirst.mockResolvedValue(null); // no existing in_progress session by default
  mockPrisma.practiceSession.findMany.mockResolvedValue([]); // no recent sessions by default
  mockPrisma.subjectProgress.upsert.mockResolvedValue({});
  mockPrisma.shownQuestion.createMany.mockResolvedValue({ count: 10 });
  mockPrisma.shownQuestion.findMany.mockResolvedValue([]);
});

// ── getDefaultChild ───────────────────────────────────────────────────────────

describe("getDefaultChild", () => {
  it("returns the child when found", async () => {
    mockPrisma.child.findFirst.mockResolvedValue(CHILD);
    const result = await getDefaultChild();
    expect(result).toEqual(CHILD);
    expect(mockPrisma.child.findFirst).toHaveBeenCalledWith({
      where: { id: "child-001" },
    });
  });

  it("throws when child is not found", async () => {
    mockPrisma.child.findFirst.mockResolvedValue(null);
    await expect(getDefaultChild()).rejects.toThrow("Default child not found");
  });
});

// ── startPracticeSession ──────────────────────────────────────────────────────

describe("startPracticeSession", () => {
  it("throws when fewer than 10 active questions are available", async () => {
    mockPrisma.child.findFirst.mockResolvedValue(CHILD);
    mockPrisma.question.findMany.mockResolvedValue(
      Array.from({ length: 5 }, (_, i) => makeQuestion(`q${i}`))
    );
    mockPrisma.shownQuestion.findMany.mockResolvedValue([]);

    await expect(startPracticeSession("maths")).rejects.toThrow(
      "Not enough questions"
    );
  });

  it("creates a PracticeSession with correct subject and childId", async () => {
    mockPrisma.child.findFirst.mockResolvedValue(CHILD);
    mockPrisma.question.findMany.mockResolvedValue(QUESTIONS);
    mockPrisma.shownQuestion.findMany.mockResolvedValue([]);

    await startPracticeSession("maths");

    expect(mockPrisma.practiceSession.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        childId: "child-001",
        subject: "maths",
        status: "in_progress",
        totalQuestions: 10,
      }),
    });
  });

  it("creates exactly 10 SessionQuestion rows", async () => {
    mockPrisma.child.findFirst.mockResolvedValue(CHILD);
    mockPrisma.question.findMany.mockResolvedValue(QUESTIONS);
    mockPrisma.shownQuestion.findMany.mockResolvedValue([]);

    await startPracticeSession("maths");

    expect(mockPrisma.sessionQuestion.create).toHaveBeenCalledTimes(10);
  });

  it("creates SessionQuestion rows with ascending questionOrder", async () => {
    mockPrisma.child.findFirst.mockResolvedValue(CHILD);
    mockPrisma.question.findMany.mockResolvedValue(QUESTIONS);
    mockPrisma.shownQuestion.findMany.mockResolvedValue([]);

    await startPracticeSession("maths");

    const calls = mockPrisma.sessionQuestion.create.mock.calls;
    for (let i = 0; i < 10; i++) {
      expect(calls[i][0].data.questionOrder).toBe(i + 1);
    }
  });

  it("returns session and sessionQuestions", async () => {
    mockPrisma.child.findFirst.mockResolvedValue(CHILD);
    mockPrisma.question.findMany.mockResolvedValue(QUESTIONS);
    mockPrisma.shownQuestion.findMany.mockResolvedValue([]);

    const result = await startPracticeSession("maths");

    expect(result).toHaveProperty("session");
    expect(result).toHaveProperty("sessionQuestions");
    expect(result.sessionQuestions).toHaveLength(10);
  });

  it("returns existing in_progress session without creating a new one", async () => {
    const existing = { id: "existing-session", childId: "child-001", subject: "maths", status: "in_progress" };
    mockPrisma.child.findFirst.mockResolvedValue(CHILD);
    mockPrisma.practiceSession.findFirst.mockResolvedValue(existing);

    const result = await startPracticeSession("maths");

    expect(result.session.id).toBe("existing-session");
    expect(mockPrisma.practiceSession.create).not.toHaveBeenCalled();
    expect(mockPrisma.question.findMany).not.toHaveBeenCalled();
  });
});

// ── completePracticeSession ───────────────────────────────────────────────────

describe("completePracticeSession", () => {
  it("throws when session is not found", async () => {
    mockPrisma.practiceSession.findUnique.mockResolvedValue(null);
    await expect(completePracticeSession("missing-id", [])).rejects.toThrow(
      "Session not found"
    );
  });

  it("throws when session is already completed", async () => {
    mockPrisma.practiceSession.findUnique.mockResolvedValue(
      makeSession({ status: "completed" })
    );
    await expect(completePracticeSession("session-1", [])).rejects.toThrow(
      "already completed"
    );
  });

  it("updates PracticeSession to completed with correct counts", async () => {
    const session = makeSession();
    mockPrisma.practiceSession.findUnique.mockResolvedValue(session);

    // answers: first 7 correct (A), last 3 unanswered (null)
    const answers = session.questions.slice(0, 7).map((sq: { id: string }) => ({
      sessionQuestionId: sq.id,
      selectedOption: "A",
    }));

    await completePracticeSession("session-1", answers);

    expect(mockPrisma.practiceSession.update).toHaveBeenCalledWith({
      where: { id: "session-1" },
      data: expect.objectContaining({
        status: "completed",
        correctCount: 7,
        incorrectCount: 0,
        unansweredCount: 3,
      }),
    });
  });

  it("upserts SubjectProgress with correct deltas", async () => {
    const session = makeSession();
    mockPrisma.practiceSession.findUnique.mockResolvedValue(session);

    const answers = session.questions.map((sq: { id: string }) => ({
      sessionQuestionId: sq.id,
      selectedOption: "A",
    }));

    await completePracticeSession("session-1", answers);

    expect(mockPrisma.subjectProgress.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { childId_subject: { childId: "child-001", subject: "maths" } },
        update: expect.objectContaining({
          sessionsCompleted: { increment: 1 },
          totalQuestionsAnswered: { increment: 10 },
          totalCorrect: { increment: 10 },
        }),
        create: expect.objectContaining({
          childId: "child-001",
          subject: "maths",
          sessionsCompleted: 1,
          totalQuestionsAnswered: 10,
          totalCorrect: 10,
        }),
      })
    );
  });

  it("creates ShownQuestion rows for newly seen questions", async () => {
    const session = makeSession();
    mockPrisma.practiceSession.findUnique.mockResolvedValue(session);
    mockPrisma.shownQuestion.findMany.mockResolvedValue([]);

    await completePracticeSession("session-1", []);

    expect(mockPrisma.shownQuestion.createMany).toHaveBeenCalledWith({
      data: expect.arrayContaining([
        expect.objectContaining({ childId: "child-001" }),
      ]),
    });
    const callData = mockPrisma.shownQuestion.createMany.mock.calls[0][0].data;
    expect(callData).toHaveLength(10);
  });

  it("does not create ShownQuestion rows for already-shown questions", async () => {
    const session = makeSession();
    mockPrisma.practiceSession.findUnique.mockResolvedValue(session);

    // All 10 questions already marked as shown
    mockPrisma.shownQuestion.findMany.mockResolvedValue(
      session.questions.map((sq: { questionId: string }) => ({ questionId: sq.questionId }))
    );

    await completePracticeSession("session-1", []);

    expect(mockPrisma.shownQuestion.createMany).not.toHaveBeenCalled();
  });

  it("updates each SessionQuestion row with outcome and selectedOption", async () => {
    const session = makeSession();
    mockPrisma.practiceSession.findUnique.mockResolvedValue(session);

    await completePracticeSession("session-1", []);

    expect(mockPrisma.sessionQuestion.update).toHaveBeenCalledTimes(10);
    const firstCall = mockPrisma.sessionQuestion.update.mock.calls[0][0];
    expect(firstCall.data).toHaveProperty("outcome");
    expect(firstCall.data).toHaveProperty("selectedOption");
  });

  it("returns SessionCompletionData", async () => {
    const session = makeSession();
    mockPrisma.practiceSession.findUnique.mockResolvedValue(session);

    const result = await completePracticeSession("session-1", []);

    expect(result).toHaveProperty("results");
    expect(result).toHaveProperty("completedAt");
    expect(result).toHaveProperty("shownQuestionIds");
    expect(result).toHaveProperty("progressDelta");
  });

  it("uses DB selectedOption as fallback for questions not in client answer list", async () => {
    const session = makeSession();
    // Q0 has a DB-persisted answer of "B" (incorrect — correctOption is "A")
    session.questions[0].selectedOption = "B";
    mockPrisma.practiceSession.findUnique.mockResolvedValue(session);

    // Client sends answers for Q1–Q9 only (correct "A"), omitting Q0
    const answers = session.questions.slice(1).map((sq: { id: string }) => ({
      sessionQuestionId: sq.id,
      selectedOption: "A",
    }));

    await completePracticeSession("session-1", answers);

    // Q0 falls back to DB "B" → incorrect; Q1–Q9 use client "A" → correct
    expect(mockPrisma.practiceSession.update).toHaveBeenCalledWith({
      where: { id: "session-1" },
      data: expect.objectContaining({
        correctCount: 9,
        incorrectCount: 1,
        unansweredCount: 0,
      }),
    });
  });
});

// ── saveSessionAnswer ─────────────────────────────────────────────────────────

describe("saveSessionAnswer", () => {
  it("updates sessionQuestion with selectedOption and answeredAt", async () => {
    await saveSessionAnswer("sq-1", "A");
    expect(mockPrisma.sessionQuestion.update).toHaveBeenCalledWith({
      where: { id: "sq-1" },
      data: { selectedOption: "A", answeredAt: expect.any(Date) },
    });
  });

  it("persists null for skipped questions", async () => {
    await saveSessionAnswer("sq-1", null);
    expect(mockPrisma.sessionQuestion.update).toHaveBeenCalledWith({
      where: { id: "sq-1" },
      data: { selectedOption: null, answeredAt: expect.any(Date) },
    });
  });
});
