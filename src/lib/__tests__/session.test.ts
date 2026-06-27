import { describe, it, expect } from "vitest";
import { buildSessionCompletion } from "@/lib/session";
import type { SessionQuestionOutcome } from "@/types";

function makeOutcomes(specs: Array<{ id: string; outcome: "correct" | "incorrect" | "unanswered"; selected?: string }>): SessionQuestionOutcome[] {
  return specs.map(({ id, outcome, selected = null }) => ({
    questionId: id,
    selectedOption: selected,
    outcome,
  }));
}

describe("buildSessionCompletion", () => {
  it("produces correct result counts for a mixed session", () => {
    const questions = makeOutcomes([
      { id: "q1", outcome: "correct", selected: "A" },
      { id: "q2", outcome: "incorrect", selected: "B" },
      { id: "q3", outcome: "unanswered" },
      { id: "q4", outcome: "correct", selected: "C" },
      { id: "q5", outcome: "unanswered" },
    ]);
    const data = buildSessionCompletion(questions);
    expect(data.results.correctCount).toBe(2);
    expect(data.results.incorrectCount).toBe(1);
    expect(data.results.unansweredCount).toBe(2);
    expect(data.results.totalQuestions).toBe(5);
  });

  it("includes all question IDs in shownQuestionIds", () => {
    const questions = makeOutcomes([
      { id: "q1", outcome: "correct" },
      { id: "q2", outcome: "unanswered" },
      { id: "q3", outcome: "incorrect" },
    ]);
    const data = buildSessionCompletion(questions);
    expect(data.shownQuestionIds).toEqual(["q1", "q2", "q3"]);
  });

  it("includes unanswered question IDs in shownQuestionIds", () => {
    const questions = makeOutcomes([
      { id: "q1", outcome: "unanswered" },
    ]);
    const data = buildSessionCompletion(questions);
    expect(data.shownQuestionIds).toContain("q1");
  });

  it("produces a completedAt Date", () => {
    const before = new Date();
    const data = buildSessionCompletion([{ questionId: "q1", selectedOption: "A", outcome: "correct" }]);
    const after = new Date();
    expect(data.completedAt).toBeInstanceOf(Date);
    expect(data.completedAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(data.completedAt.getTime()).toBeLessThanOrEqual(after.getTime());
  });

  it("progressDelta sessionsCompletedDelta is always 1", () => {
    const data = buildSessionCompletion([{ questionId: "q1", selectedOption: null, outcome: "unanswered" }]);
    expect(data.progressDelta.sessionsCompletedDelta).toBe(1);
  });

  it("progressDelta totalQuestionsAnsweredDelta equals totalQuestions", () => {
    const questions = makeOutcomes([
      { id: "q1", outcome: "correct" },
      { id: "q2", outcome: "incorrect" },
      { id: "q3", outcome: "unanswered" },
    ]);
    const data = buildSessionCompletion(questions);
    expect(data.progressDelta.totalQuestionsAnsweredDelta).toBe(3);
  });

  it("progressDelta totalCorrectDelta equals correctCount", () => {
    const questions = makeOutcomes([
      { id: "q1", outcome: "correct" },
      { id: "q2", outcome: "correct" },
      { id: "q3", outcome: "unanswered" },
    ]);
    const data = buildSessionCompletion(questions);
    expect(data.progressDelta.totalCorrectDelta).toBe(2);
  });

  it("progressDelta lastCompletedAt matches completedAt", () => {
    const questions = makeOutcomes([{ id: "q1", outcome: "correct" }]);
    const data = buildSessionCompletion(questions);
    expect(data.progressDelta.lastCompletedAt).toBe(data.completedAt);
  });

  it("handles a full 10-question session", () => {
    const questions = makeOutcomes(
      Array.from({ length: 10 }, (_, i) => ({
        id: `q${i}`,
        outcome: i < 7 ? "correct" : "incorrect" as "correct" | "incorrect",
      }))
    );
    const data = buildSessionCompletion(questions);
    expect(data.results.totalQuestions).toBe(10);
    expect(data.results.correctCount).toBe(7);
    expect(data.results.incorrectCount).toBe(3);
    expect(data.results.unansweredCount).toBe(0);
    expect(data.shownQuestionIds).toHaveLength(10);
  });
});
