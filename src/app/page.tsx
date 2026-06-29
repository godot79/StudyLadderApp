import Link from "next/link";
import { prisma } from "@/db";
import { startSession } from "./actions";

const SUBJECTS = [
  {
    key: "maths",
    label: "Maths",
    emoji: "🔢",
    playable: true,
    headerClass: "bg-gradient-to-br from-violet-500 to-indigo-600",
  },
  {
    key: "english",
    label: "English",
    emoji: "📚",
    playable: true,
    headerClass: "bg-gradient-to-br from-emerald-400 to-teal-500",
  },
  {
    key: "geography",
    label: "Geography",
    emoji: "🌍",
    playable: true,
    headerClass: "bg-gradient-to-br from-sky-400 to-blue-500",
  },
  {
    key: "space",
    label: "Space",
    emoji: "🚀",
    playable: true,
    headerClass: "bg-gradient-to-br from-slate-700 to-indigo-900",
  },
] as const;

const MEDAL_TIERS = [
  {
    key: "platinum",
    emoji: "🏆",
    label: "Platinum",
    minCorrect: 150,
    minSessions: 0,
    color: "bg-slate-100 text-slate-600",
    tileClass: "bg-gradient-to-b from-slate-200 to-slate-300",
    tileText: "text-slate-700",
  },
  {
    key: "gold",
    emoji: "🥇",
    label: "Gold",
    minCorrect: 50,
    minSessions: 0,
    color: "bg-yellow-50 text-yellow-700",
    tileClass: "bg-gradient-to-b from-yellow-200 to-amber-300",
    tileText: "text-amber-800",
  },
  {
    key: "silver",
    emoji: "🥈",
    label: "Silver",
    minCorrect: 0,
    minSessions: 15,
    color: "bg-gray-100 text-gray-600",
    tileClass: "bg-gradient-to-b from-gray-200 to-gray-300",
    tileText: "text-gray-700",
  },
  {
    key: "bronze",
    emoji: "🥉",
    label: "Bronze",
    minCorrect: 0,
    minSessions: 5,
    color: "bg-amber-50 text-amber-700",
    tileClass: "bg-gradient-to-b from-amber-200 to-orange-300",
    tileText: "text-amber-900",
  },
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

const SPECIAL_SUBTITLES: Record<string, string> = {
  perfect_score: "10 out of 10 — flawless!",
  accuracy_hero: "90%+ across 5 sessions",
  maths_champion: "Gold medal in Maths",
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
  const hasMedals = earnedMedals.size > 0;
  const hasSpecials = earnedSpecials.size > 0;
  const hasRibbons = earnedMilestones.size > 0 || Object.keys(ribbonCounts).length > 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-8">

        {/* Header */}
        <div className="flex items-start justify-between pt-2">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-indigo-950">
              {child.displayName}&apos;s Study Ladder
            </h1>
            <p className="mt-1 text-indigo-400">Great to see you! Keep it up 🌟</p>
            <span className="mt-2 inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
              {child.levelBand}
            </span>
          </div>
          <Link
            href="/settings"
            className="mt-1 shrink-0 text-sm text-indigo-300 underline hover:text-indigo-500"
          >
            Change name
          </Link>
        </div>

        {/* Subject cards */}
        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Subjects
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {SUBJECTS.map((subject) => {
              const progress = progressBySubject[subject.key];
              const medal = progress
                ? getMedalTier(progress.sessionsCompleted, progress.totalCorrect)
                : null;
              const accuracy =
                progress && progress.totalQuestionsAnswered > 0
                  ? Math.round(
                      (progress.totalCorrect / progress.totalQuestionsAnswered) * 100
                    )
                  : null;

              return (
                <div
                  key={subject.key}
                  className={`overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 ${
                    !subject.playable ? "opacity-60" : ""
                  }`}
                >
                  {/* Coloured header band */}
                  <div
                    className={`${subject.headerClass} flex flex-col items-center justify-center px-3 pb-4 pt-5`}
                  >
                    <span className="text-5xl leading-none">{subject.emoji}</span>
                    <span className="mt-2 text-sm font-bold text-white/90">
                      {subject.label}
                    </span>
                  </div>

                  {/* Content area */}
                  <div className="bg-white px-4 pb-4 pt-3">
                    {progress ? (
                      <div className="space-y-1 text-sm text-gray-500">
                        <div>
                          {progress.sessionsCompleted}{" "}
                          {progress.sessionsCompleted === 1 ? "session" : "sessions"}
                        </div>
                        {accuracy !== null && <div>{accuracy}% accuracy</div>}
                        <div className="text-xs text-indigo-400">
                          {progress.levelBand ?? child.levelBand}
                        </div>
                        {medal && (
                          <div
                            className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${medal.color}`}
                          >
                            {medal.emoji} {medal.label}
                          </div>
                        )}
                      </div>
                    ) : subject.playable ? (
                      <p className="text-xs font-medium text-violet-400">
                        Ready to begin?
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400">Coming soon</p>
                    )}

                    {subject.playable && (
                      <form action={startSession} className="mt-3">
                        <input type="hidden" name="subject" value={subject.key} />
                        <button
                          type="submit"
                          className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-100 hover:bg-indigo-700 active:scale-[0.98]"
                        >
                          Practice Now →
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Rewards */}
        {hasAnyRewards && (
          <section>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Your Rewards
            </h2>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-indigo-100">
              <div className="space-y-4">

                {/* Medals — gradient disc tiles */}
                {hasMedals && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Medals
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {Array.from(earnedMedals).map((key) => {
                        const tier = MEDAL_TIERS.find((t) => t.key === key);
                        if (!tier) return null;
                        return (
                          <div
                            key={key}
                            className={`flex flex-col items-center gap-1 rounded-xl px-5 py-3 ${tier.tileClass}`}
                          >
                            <span className="text-3xl leading-none">{tier.emoji}</span>
                            <span
                              className={`text-xs font-bold uppercase tracking-wide ${tier.tileText}`}
                            >
                              {tier.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Special awards — horizontal card with subtitle */}
                {hasSpecials && (
                  <div className={hasMedals ? "border-t border-indigo-50 pt-4" : ""}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Special Awards
                    </p>
                    <div className="flex flex-col gap-2">
                      {Array.from(earnedSpecials).map((key) => (
                        <div
                          key={key}
                          className="flex items-center gap-3 rounded-xl bg-violet-50 px-4 py-3 ring-1 ring-violet-100"
                        >
                          <span className="text-2xl leading-none">
                            {REWARD_EMOJIS[key] ?? "⭐"}
                          </span>
                          <div>
                            <div className="text-sm font-bold text-violet-900">
                              {REWARD_LABELS[key] ?? key}
                            </div>
                            <div className="text-xs text-violet-400">
                              {SPECIAL_SUBTITLES[key] ?? "Special award"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ribbons — small collectible pills */}
                {hasRibbons && (
                  <div
                    className={
                      hasMedals || hasSpecials ? "border-t border-indigo-50 pt-4" : ""
                    }
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Ribbons
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(earnedMilestones).map((key) => (
                        <RibbonPill
                          key={`ribbon-${key}`}
                          emoji={REWARD_EMOJIS[key] ?? "🎀"}
                          label={REWARD_LABELS[key] ?? key}
                        />
                      ))}
                      {Object.entries(ribbonCounts).map(([key, count]) => (
                        <RibbonPill
                          key={`ribbon-count-${key}`}
                          emoji={REWARD_EMOJIS[key] ?? "🎀"}
                          label={`${REWARD_LABELS[key] ?? key}${count > 1 ? ` ×${count}` : ""}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </section>
        )}

        {/* Recent sessions */}
        {recentSessions.length > 0 && (
          <section>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Recent Sessions
            </h2>
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-indigo-100">
              <ul className="divide-y divide-indigo-50">
                {recentSessions.map((s) => {
                  const subjectMeta = SUBJECTS.find((sub) => sub.key === s.subject);
                  const pct = Math.round((s.correctCount / s.totalQuestions) * 100);
                  const scoreColor =
                    pct >= 90
                      ? "bg-emerald-100 text-emerald-700"
                      : pct >= 70
                      ? "bg-indigo-100 text-indigo-700"
                      : pct >= 50
                      ? "bg-amber-100 text-amber-700"
                      : "bg-rose-100 text-rose-600";
                  return (
                    <li
                      key={s.id}
                      className="flex items-center justify-between px-5 py-3.5"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-xl">{subjectMeta?.emoji ?? "📖"}</span>
                        <span className="text-sm font-semibold capitalize text-indigo-900">
                          {s.subject}
                        </span>
                      </span>
                      <span className="flex items-center gap-2.5">
                        <span
                          className={`rounded-lg px-2.5 py-1 text-sm font-bold tabular-nums ${scoreColor}`}
                        >
                          {s.correctCount}/{s.totalQuestions}
                        </span>
                        <span className="w-12 text-right text-xs text-gray-400">
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

function RibbonPill({ emoji, label }: { emoji: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-3 py-1.5 text-sm font-semibold text-pink-800 ring-1 ring-pink-200">
      {emoji} {label}
    </span>
  );
}
