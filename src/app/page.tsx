import Link from "next/link";
import { prisma } from "@/db";
import { startSession } from "./actions";

const SUBJECTS = [
  { key: "maths", label: "Maths", emoji: "🔢", playable: true },
  { key: "english", label: "English", emoji: "📚", playable: false },
  { key: "geography", label: "Geography", emoji: "🌍", playable: false },
  { key: "space", label: "Space", emoji: "🚀", playable: false },
] as const;

const MEDAL_TIERS = [
  { key: "platinum", emoji: "🏆", label: "Platinum", minCorrect: 150, minSessions: 0, color: "bg-slate-100 text-slate-600" },
  { key: "gold",     emoji: "🥇", label: "Gold",     minCorrect: 50,  minSessions: 0,  color: "bg-yellow-50 text-yellow-700" },
  { key: "silver",   emoji: "🥈", label: "Silver",   minCorrect: 0,   minSessions: 15, color: "bg-gray-100 text-gray-600" },
  { key: "bronze",   emoji: "🥉", label: "Bronze",   minCorrect: 0,   minSessions: 5,  color: "bg-amber-50 text-amber-700" },
] as const;

const REWARD_LABELS: Record<string, string> = {
  first_session: "First Session",
  three_sessions: "Three Sessions",
  no_skip: "No Skip",
  great_effort: "Great Effort",
  bronze: "Bronze Medal",
  silver: "Silver Medal",
  gold: "Gold Medal",
  platinum: "Platinum Medal",
  perfect_score: "Perfect Score",
  accuracy_hero: "Accuracy Hero",
  maths_champion: "Maths Champion",
};

const REWARD_EMOJIS: Record<string, string> = {
  first_session: "🎀",
  three_sessions: "🎀",
  no_skip: "🎀",
  great_effort: "🎀",
  bronze: "🥉",
  silver: "🥈",
  gold: "🥇",
  platinum: "🏆",
  perfect_score: "⭐",
  accuracy_hero: "🎯",
  maths_champion: "👑",
};

function getMedalTier(
  sessionsCompleted: number,
  totalCorrect: number
): (typeof MEDAL_TIERS)[number] | null {
  if (totalCorrect >= 150) return MEDAL_TIERS[0];
  if (totalCorrect >= 50) return MEDAL_TIERS[1];
  if (sessionsCompleted >= 15) return MEDAL_TIERS[2];
  if (sessionsCompleted >= 5) return MEDAL_TIERS[3];
  return null;
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(date);
}

export default async function Home() {
  const child = await prisma.child.findFirst({ where: { id: "child-001" } });
  if (!child) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <p className="text-gray-500">No child profile found. Check the database seed.</p>
      </main>
    );
  }

  const [progressList, allRewards, recentSessions] = await Promise.all([
    prisma.subjectProgress.findMany({ where: { childId: child.id } }),
    prisma.earnedReward.findMany({
      where: { childId: child.id },
      orderBy: { earnedAt: "asc" },
    }),
    prisma.practiceSession.findMany({
      where: { childId: child.id, status: "completed" },
      orderBy: { completedAt: "desc" },
      take: 5,
    }),
  ]);

  const progressBySubject = Object.fromEntries(progressList.map((p) => [p.subject, p]));

  // Deduplicate rewards by rewardKey+subject for milestone/special display.
  // Per-session ribbons (no_skip, great_effort) are counted separately.
  const perSessionKeys = new Set(["no_skip", "great_effort", "perfect_score"]);
  const earnedMilestones = new Set<string>();
  const ribbonCounts: Record<string, number> = {};
  const earnedSpecials = new Set<string>();
  const earnedMedals = new Set<string>();

  for (const r of allRewards) {
    if (r.rewardType === "medal") {
      earnedMedals.add(r.rewardKey);
    } else if (r.rewardType === "special") {
      earnedSpecials.add(r.rewardKey);
    } else if (r.rewardType === "ribbon") {
      if (perSessionKeys.has(r.rewardKey)) {
        ribbonCounts[r.rewardKey] = (ribbonCounts[r.rewardKey] ?? 0) + 1;
      } else {
        earnedMilestones.add(r.rewardKey);
      }
    }
  }

  const hasAnyRewards = allRewards.length > 0;

  return (
    <main className="min-h-screen bg-indigo-50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-indigo-950">
              {child.displayName}&apos;s Study Ladder
            </h1>
            <p className="mt-1 text-indigo-400">Great to see you! Keep it up 🌟</p>
          </div>
          <Link
            href="/settings"
            className="text-sm text-indigo-300 underline hover:text-indigo-500"
          >
            Change name
          </Link>
        </div>

        {/* Subject cards */}
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Subjects
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {SUBJECTS.map((subject) => {
              const progress = progressBySubject[subject.key];
              const medal = progress
                ? getMedalTier(progress.sessionsCompleted, progress.totalCorrect)
                : null;
              const accuracy =
                progress && progress.totalQuestionsAnswered > 0
                  ? Math.round((progress.totalCorrect / progress.totalQuestionsAnswered) * 100)
                  : null;

              return (
                <div
                  key={subject.key}
                  className={`rounded-2xl bg-white p-4 shadow-sm ring-1 ring-indigo-100 ${
                    !subject.playable ? "opacity-50" : ""
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-2xl">{subject.emoji}</span>
                    <span className="font-bold text-indigo-900">{subject.label}</span>
                  </div>

                  {progress ? (
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>{progress.sessionsCompleted} sessions</div>
                      {accuracy !== null && <div>{accuracy}% accuracy</div>}
                      {medal && (
                        <div className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${medal.color}`}>
                          {medal.emoji} {medal.label}
                        </div>
                      )}
                    </div>
                  ) : subject.playable ? (
                    <p className="text-xs text-indigo-400">Ready to begin?</p>
                  ) : (
                    <p className="text-xs text-gray-400">Coming soon</p>
                  )}

                  {subject.playable && (
                    <form action={startSession} className="mt-3">
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-indigo-600 py-2 text-sm font-bold text-white hover:bg-indigo-700 active:scale-[0.98]"
                      >
                        Start →
                      </button>
                    </form>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Rewards */}
        {hasAnyRewards && (
          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Your Rewards
            </h2>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-indigo-100">
              <div className="flex flex-wrap gap-2">
                {/* Medals */}
                {Array.from(earnedMedals).map((key) => (
                  <RewardBadge
                    key={`medal-${key}`}
                    emoji={REWARD_EMOJIS[key] ?? "🏅"}
                    label={REWARD_LABELS[key] ?? key}
                    variant="medal"
                  />
                ))}

                {/* Special */}
                {Array.from(earnedSpecials).map((key) => (
                  <RewardBadge
                    key={`special-${key}`}
                    emoji={REWARD_EMOJIS[key] ?? "⭐"}
                    label={REWARD_LABELS[key] ?? key}
                    variant="special"
                  />
                ))}

                {/* Milestone ribbons */}
                {Array.from(earnedMilestones).map((key) => (
                  <RewardBadge
                    key={`ribbon-${key}`}
                    emoji={REWARD_EMOJIS[key] ?? "🎀"}
                    label={REWARD_LABELS[key] ?? key}
                    variant="ribbon"
                  />
                ))}

                {/* Per-session ribbons with count */}
                {Object.entries(ribbonCounts).map(([key, count]) => (
                  <RewardBadge
                    key={`ribbon-count-${key}`}
                    emoji={REWARD_EMOJIS[key] ?? "🎀"}
                    label={`${REWARD_LABELS[key] ?? key}${count > 1 ? ` ×${count}` : ""}`}
                    variant="ribbon"
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent sessions */}
        {recentSessions.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Recent Sessions
            </h2>
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-indigo-100">
              <ul className="divide-y divide-indigo-50">
                {recentSessions.map((s) => {
                  const subjectMeta = SUBJECTS.find((sub) => sub.key === s.subject);
                  const pct = Math.round((s.correctCount / s.totalQuestions) * 100);
                  const icon = pct >= 90 ? "🏆" : pct >= 70 ? "⭐" : pct >= 50 ? "👍" : "💪";
                  return (
                    <li
                      key={s.id}
                      className="flex items-center justify-between px-5 py-3 text-sm"
                    >
                      <span className="flex items-center gap-2 text-indigo-900">
                        <span>{subjectMeta?.emoji ?? "📖"}</span>
                        <span className="capitalize">{s.subject}</span>
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="font-bold text-indigo-700">
                          {s.correctCount}/{s.totalQuestions}
                        </span>
                        <span>{icon}</span>
                        <span className="text-gray-400">
                          {formatDate(s.completedAt)}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}

function RewardBadge({
  emoji,
  label,
  variant,
}: {
  emoji: string;
  label: string;
  variant: "ribbon" | "medal" | "special";
}) {
  const styles = {
    medal: "bg-yellow-50 text-yellow-800 ring-yellow-200",
    special: "bg-violet-50 text-violet-800 ring-violet-200",
    ribbon: "bg-pink-50 text-pink-800 ring-pink-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ring-1 ${styles[variant]}`}
    >
      {emoji} {label}
    </span>
  );
}
