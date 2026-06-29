import { prisma } from "@/db";

export type RewardType = "ribbon" | "medal" | "special";

export type RewardData = {
  rewardType: RewardType;
  rewardKey: string;
  subject: string;
  sessionId: string;
};

type ExistingReward = {
  rewardKey: string;
  subject: string;
  sessionId: string;
};

type ComputeInput = {
  sessionId: string;
  subject: string;
  sessionResults: {
    correctCount: number;
    unansweredCount: number;
    totalQuestions: number;
  };
  updatedProgress: {
    sessionsCompleted: number;
    totalCorrect: number;
  };
  recentSessions: Array<{
    correctCount: number;
    totalQuestions: number;
  }>;
  existingRewards: ExistingReward[];
};

export function computeNewRewards(input: ComputeInput): RewardData[] {
  const {
    sessionId,
    subject,
    sessionResults,
    updatedProgress,
    recentSessions,
    existingRewards,
  } = input;

  const hasMilestone = (key: string) =>
    existingRewards.some((r) => r.rewardKey === key && r.subject === subject);

  const hasForSession = (key: string) =>
    existingRewards.some(
      (r) => r.rewardKey === key && r.subject === subject && r.sessionId === sessionId
    );

  const results: RewardData[] = [];

  // Ribbons — cumulative milestones
  if (!hasMilestone("first_session") && updatedProgress.sessionsCompleted === 1) {
    results.push({ rewardType: "ribbon", rewardKey: "first_session", subject, sessionId });
  }
  if (!hasMilestone("three_sessions") && updatedProgress.sessionsCompleted === 3) {
    results.push({ rewardType: "ribbon", rewardKey: "three_sessions", subject, sessionId });
  }

  // Ribbons — per-session
  if (!hasForSession("no_skip") && sessionResults.unansweredCount === 0) {
    results.push({ rewardType: "ribbon", rewardKey: "no_skip", subject, sessionId });
  }
  if (
    !hasForSession("great_effort") &&
    sessionResults.totalQuestions > 0 &&
    sessionResults.correctCount / sessionResults.totalQuestions >= 0.5
  ) {
    results.push({ rewardType: "ribbon", rewardKey: "great_effort", subject, sessionId });
  }

  // Medals
  if (!hasMilestone("bronze") && updatedProgress.sessionsCompleted >= 5) {
    results.push({ rewardType: "medal", rewardKey: "bronze", subject, sessionId });
  }
  if (!hasMilestone("silver") && updatedProgress.sessionsCompleted >= 15) {
    results.push({ rewardType: "medal", rewardKey: "silver", subject, sessionId });
  }
  if (!hasMilestone("gold") && updatedProgress.totalCorrect >= 50) {
    results.push({ rewardType: "medal", rewardKey: "gold", subject, sessionId });
  }
  if (!hasMilestone("platinum") && updatedProgress.totalCorrect >= 150) {
    results.push({ rewardType: "medal", rewardKey: "platinum", subject, sessionId });
  }

  // Special — per-session
  if (
    !hasForSession("perfect_score") &&
    sessionResults.totalQuestions > 0 &&
    sessionResults.correctCount === sessionResults.totalQuestions
  ) {
    results.push({ rewardType: "special", rewardKey: "perfect_score", subject, sessionId });
  }

  // Special — cumulative: 90%+ accuracy across last 5 completed sessions
  if (!hasMilestone("accuracy_hero") && recentSessions.length >= 5) {
    const allHighAccuracy = recentSessions
      .slice(0, 5)
      .every((s) => s.totalQuestions > 0 && s.correctCount / s.totalQuestions >= 0.9);
    if (allHighAccuracy) {
      results.push({ rewardType: "special", rewardKey: "accuracy_hero", subject, sessionId });
    }
  }

  // Special — Maths Champion when gold is reached in maths
  if (subject === "maths" && !hasMilestone("maths_champion")) {
    const hasGold = hasMilestone("gold") || results.some((r) => r.rewardKey === "gold");
    if (hasGold) {
      results.push({ rewardType: "special", rewardKey: "maths_champion", subject, sessionId });
    }
  }

  return results;
}

export async function evaluateAndPersistRewards(
  childId: string,
  sessionId: string,
  subject: string
): Promise<RewardData[]> {
  const [session, progress, recentSessions, existingRewards] = await Promise.all([
    prisma.practiceSession.findUnique({ where: { id: sessionId } }),
    prisma.subjectProgress.findFirst({ where: { childId, subject } }),
    prisma.practiceSession.findMany({
      where: { childId, subject, status: "completed" },
      orderBy: { completedAt: "desc" },
      take: 5,
    }),
    prisma.earnedReward.findMany({ where: { childId } }),
  ]);

  if (!session || !progress) return [];

  const newRewards = computeNewRewards({
    sessionId,
    subject,
    sessionResults: {
      correctCount: session.correctCount,
      unansweredCount: session.unansweredCount,
      totalQuestions: session.totalQuestions,
    },
    updatedProgress: {
      sessionsCompleted: progress.sessionsCompleted,
      totalCorrect: progress.totalCorrect,
    },
    recentSessions: recentSessions.map((s) => ({
      correctCount: s.correctCount,
      totalQuestions: s.totalQuestions,
    })),
    existingRewards,
  });

  if (newRewards.length > 0) {
    await prisma.earnedReward.createMany({
      data: newRewards.map((r) => ({ ...r, childId })),
    });
  }

  return newRewards;
}
