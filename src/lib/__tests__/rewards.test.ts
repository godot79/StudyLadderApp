import { describe, it, expect } from "vitest";
import { computeNewRewards } from "@/lib/rewards";
import type { RewardData } from "@/lib/rewards";

function makeInput(
  overrides: Partial<Parameters<typeof computeNewRewards>[0]> = {}
): Parameters<typeof computeNewRewards>[0] {
  return {
    sessionId: "session-1",
    subject: "maths",
    sessionResults: { correctCount: 5, unansweredCount: 0, totalQuestions: 10 },
    updatedProgress: { sessionsCompleted: 1, totalCorrect: 5 },
    recentSessions: [],
    existingRewards: [],
    ...overrides,
  };
}

function keys(rewards: RewardData[]): string[] {
  return rewards.map((r) => r.rewardKey).sort();
}

describe("computeNewRewards — ribbons", () => {
  it("awards first_session on session 1", () => {
    const r = computeNewRewards(makeInput({ updatedProgress: { sessionsCompleted: 1, totalCorrect: 5 } }));
    expect(keys(r)).toContain("first_session");
  });

  it("does not award first_session on session 2", () => {
    const r = computeNewRewards(makeInput({ updatedProgress: { sessionsCompleted: 2, totalCorrect: 10 } }));
    expect(keys(r)).not.toContain("first_session");
  });

  it("does not re-award first_session if already earned", () => {
    const r = computeNewRewards(
      makeInput({
        updatedProgress: { sessionsCompleted: 1, totalCorrect: 5 },
        existingRewards: [{ rewardKey: "first_session", subject: "maths", sessionId: "old" }],
      })
    );
    expect(keys(r)).not.toContain("first_session");
  });

  it("awards three_sessions exactly on session 3", () => {
    const r = computeNewRewards(makeInput({ updatedProgress: { sessionsCompleted: 3, totalCorrect: 15 } }));
    expect(keys(r)).toContain("three_sessions");
  });

  it("does not award three_sessions on session 4", () => {
    const r = computeNewRewards(makeInput({ updatedProgress: { sessionsCompleted: 4, totalCorrect: 20 } }));
    expect(keys(r)).not.toContain("three_sessions");
  });

  it("awards no_skip when unansweredCount is 0", () => {
    const r = computeNewRewards(makeInput({ sessionResults: { correctCount: 5, unansweredCount: 0, totalQuestions: 10 } }));
    expect(keys(r)).toContain("no_skip");
  });

  it("does not award no_skip when unansweredCount > 0", () => {
    const r = computeNewRewards(makeInput({ sessionResults: { correctCount: 5, unansweredCount: 2, totalQuestions: 10 } }));
    expect(keys(r)).not.toContain("no_skip");
  });

  it("awards great_effort when score is at least 50%", () => {
    const r = computeNewRewards(makeInput({ sessionResults: { correctCount: 5, unansweredCount: 0, totalQuestions: 10 } }));
    expect(keys(r)).toContain("great_effort");
  });

  it("awards great_effort at exactly 50% even with unanswered questions", () => {
    const r = computeNewRewards(makeInput({ sessionResults: { correctCount: 5, unansweredCount: 3, totalQuestions: 10 } }));
    expect(keys(r)).toContain("great_effort");
  });

  it("does not award great_effort when score is below 50%", () => {
    const r = computeNewRewards(makeInput({ sessionResults: { correctCount: 4, unansweredCount: 0, totalQuestions: 10 } }));
    expect(keys(r)).not.toContain("great_effort");
  });

  it("does not re-award no_skip for same session", () => {
    const r = computeNewRewards(
      makeInput({
        sessionResults: { correctCount: 5, unansweredCount: 0, totalQuestions: 10 },
        existingRewards: [{ rewardKey: "no_skip", subject: "maths", sessionId: "session-1" }],
      })
    );
    expect(keys(r)).not.toContain("no_skip");
  });

  it("awards no_skip again for a different session", () => {
    const r = computeNewRewards(
      makeInput({
        sessionId: "session-2",
        sessionResults: { correctCount: 10, unansweredCount: 0, totalQuestions: 10 },
        existingRewards: [{ rewardKey: "no_skip", subject: "maths", sessionId: "session-1" }],
      })
    );
    expect(keys(r)).toContain("no_skip");
  });
});

describe("computeNewRewards — medals", () => {
  it("awards bronze on session 5", () => {
    const r = computeNewRewards(makeInput({ updatedProgress: { sessionsCompleted: 5, totalCorrect: 20 } }));
    expect(keys(r)).toContain("bronze");
  });

  it("does not award bronze on session 4", () => {
    const r = computeNewRewards(makeInput({ updatedProgress: { sessionsCompleted: 4, totalCorrect: 16 } }));
    expect(keys(r)).not.toContain("bronze");
  });

  it("does not re-award bronze if already earned", () => {
    const r = computeNewRewards(
      makeInput({
        updatedProgress: { sessionsCompleted: 10, totalCorrect: 40 },
        existingRewards: [{ rewardKey: "bronze", subject: "maths", sessionId: "old" }],
      })
    );
    expect(keys(r)).not.toContain("bronze");
  });

  it("awards silver on session 15", () => {
    const r = computeNewRewards(makeInput({ updatedProgress: { sessionsCompleted: 15, totalCorrect: 60 } }));
    expect(keys(r)).toContain("silver");
  });

  it("awards gold at 50 correct answers", () => {
    const r = computeNewRewards(makeInput({ updatedProgress: { sessionsCompleted: 10, totalCorrect: 50 } }));
    expect(keys(r)).toContain("gold");
  });

  it("awards platinum at 150 correct answers", () => {
    const r = computeNewRewards(makeInput({ updatedProgress: { sessionsCompleted: 30, totalCorrect: 150 } }));
    expect(keys(r)).toContain("platinum");
  });
});

describe("computeNewRewards — special rewards", () => {
  it("awards perfect_score when correctCount equals totalQuestions", () => {
    const r = computeNewRewards(makeInput({ sessionResults: { correctCount: 10, unansweredCount: 0, totalQuestions: 10 } }));
    expect(keys(r)).toContain("perfect_score");
  });

  it("does not award perfect_score for 9/10", () => {
    const r = computeNewRewards(makeInput({ sessionResults: { correctCount: 9, unansweredCount: 1, totalQuestions: 10 } }));
    expect(keys(r)).not.toContain("perfect_score");
  });

  it("does not award perfect_score when totalQuestions is 0", () => {
    const r = computeNewRewards(makeInput({ sessionResults: { correctCount: 0, unansweredCount: 0, totalQuestions: 0 } }));
    expect(keys(r)).not.toContain("perfect_score");
  });

  it("awards accuracy_hero when last 5 sessions all have >= 90% accuracy", () => {
    const r = computeNewRewards(
      makeInput({
        recentSessions: [
          { correctCount: 9, totalQuestions: 10 },
          { correctCount: 10, totalQuestions: 10 },
          { correctCount: 9, totalQuestions: 10 },
          { correctCount: 10, totalQuestions: 10 },
          { correctCount: 9, totalQuestions: 10 },
        ],
      })
    );
    expect(keys(r)).toContain("accuracy_hero");
  });

  it("does not award accuracy_hero when fewer than 5 sessions", () => {
    const r = computeNewRewards(
      makeInput({
        recentSessions: [
          { correctCount: 10, totalQuestions: 10 },
          { correctCount: 10, totalQuestions: 10 },
        ],
      })
    );
    expect(keys(r)).not.toContain("accuracy_hero");
  });

  it("does not award accuracy_hero when one session is below 90%", () => {
    const r = computeNewRewards(
      makeInput({
        recentSessions: [
          { correctCount: 9, totalQuestions: 10 },
          { correctCount: 8, totalQuestions: 10 },
          { correctCount: 10, totalQuestions: 10 },
          { correctCount: 9, totalQuestions: 10 },
          { correctCount: 9, totalQuestions: 10 },
        ],
      })
    );
    expect(keys(r)).not.toContain("accuracy_hero");
  });

  it("awards maths_champion when gold is earned this session in maths", () => {
    const r = computeNewRewards(
      makeInput({ updatedProgress: { sessionsCompleted: 10, totalCorrect: 50 } })
    );
    expect(keys(r)).toContain("maths_champion");
    expect(keys(r)).toContain("gold");
  });

  it("awards maths_champion when gold already existed", () => {
    const r = computeNewRewards(
      makeInput({
        updatedProgress: { sessionsCompleted: 10, totalCorrect: 55 },
        existingRewards: [{ rewardKey: "gold", subject: "maths", sessionId: "old" }],
      })
    );
    expect(keys(r)).toContain("maths_champion");
    expect(keys(r)).not.toContain("gold");
  });

  it("does not award maths_champion for non-maths subject", () => {
    const r = computeNewRewards(
      makeInput({
        subject: "english",
        updatedProgress: { sessionsCompleted: 10, totalCorrect: 50 },
      })
    );
    expect(keys(r)).not.toContain("maths_champion");
  });

  it("does not re-award maths_champion if already earned", () => {
    const r = computeNewRewards(
      makeInput({
        updatedProgress: { sessionsCompleted: 10, totalCorrect: 55 },
        existingRewards: [
          { rewardKey: "gold", subject: "maths", sessionId: "old" },
          { rewardKey: "maths_champion", subject: "maths", sessionId: "old" },
        ],
      })
    );
    expect(keys(r)).not.toContain("maths_champion");
  });
});
