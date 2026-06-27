import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/db";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  const session = await prisma.practiceSession.findUnique({
    where: { id: sessionId },
  });

  if (!session || session.status !== "completed") notFound();

  const [progress, child, sessionRewards] = await Promise.all([
    prisma.subjectProgress.findFirst({
      where: { childId: session.childId, subject: session.subject },
    }),
    prisma.child.findFirst({ where: { id: session.childId } }),
    prisma.earnedReward.findMany({
      where: { sessionId: sessionId },
      orderBy: { earnedAt: "asc" },
    }),
  ]);

  const subjectLabel =
    session.subject.charAt(0).toUpperCase() + session.subject.slice(1);

  const REWARD_TYPE_ORDER: Record<string, number> = { medal: 0, special: 1, ribbon: 2 };
  const sortedRewards = [...sessionRewards].sort(
    (a, b) =>
      (REWARD_TYPE_ORDER[a.rewardType] ?? 3) - (REWARD_TYPE_ORDER[b.rewardType] ?? 3)
  );

  const percentage = Math.round(
    (session.correctCount / session.totalQuestions) * 100
  );
  const trophy =
    percentage >= 90 ? "🏆" : percentage >= 70 ? "⭐" : percentage >= 50 ? "👍" : "💪";
  const headline =
    percentage >= 90
      ? "Outstanding!"
      : percentage >= 70
      ? "Great work!"
      : percentage >= 50
      ? "Good effort!"
      : "Keep practising!";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="flex w-full max-w-lg flex-col items-center gap-8">

        {/* Result header */}
        <div className="text-center">
          <div className="mb-2 text-6xl">{trophy}</div>
          <h1 className="text-3xl font-extrabold text-indigo-950">{headline}</h1>
          <p className="mt-1 capitalize text-indigo-400">
            {child?.displayName} — {session.subject}
          </p>
        </div>

        {/* Score circle */}
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-600 shadow-lg">
          <div className="text-center">
            <p className="text-3xl font-extrabold text-white">{percentage}%</p>
            <p className="text-xs text-indigo-200">score</p>
          </div>
        </div>

        {/* This session stats */}
        <div className="w-full rounded-3xl bg-white p-6 shadow-sm ring-1 ring-indigo-100">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            This session
          </h2>
          <dl className="flex flex-col gap-3">
            <StatRow
              label="Correct"
              value={session.correctCount}
              color="text-emerald-600"
              bg="bg-emerald-50"
            />
            <StatRow
              label="Incorrect"
              value={session.incorrectCount}
              color="text-rose-500"
              bg="bg-rose-50"
            />
            <StatRow
              label="Unanswered"
              value={session.unansweredCount}
              color="text-gray-400"
              bg="bg-gray-50"
            />
          </dl>
        </div>

        {/* Rewards earned this session */}
        {sessionRewards.length > 0 && (
          <div className="w-full rounded-3xl bg-white p-6 shadow-sm ring-1 ring-indigo-100">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Rewards earned
            </h2>
            <div className="flex flex-wrap gap-2">
              {sortedRewards.map((r) => {
                const emojis: Record<string, string> = {
                  first_session: "🎀", three_sessions: "🎀", no_skip: "🎀",
                  great_effort: "🎀", bronze: "🥉", silver: "🥈", gold: "🥇",
                  platinum: "🏆", perfect_score: "⭐", accuracy_hero: "🎯",
                  maths_champion: "👑",
                };
                const labels: Record<string, string> = {
                  first_session: "First Session", three_sessions: "Three Sessions",
                  no_skip: "No Skip", great_effort: "Great Effort", bronze: "Bronze Medal",
                  silver: "Silver Medal", gold: "Gold Medal", platinum: "Platinum Medal",
                  perfect_score: "Perfect Score", accuracy_hero: "Accuracy Hero",
                  maths_champion: "Maths Champion",
                };
                const variantStyle =
                  r.rewardType === "medal"
                    ? "bg-yellow-50 text-yellow-800 ring-yellow-200"
                    : r.rewardType === "special"
                    ? "bg-violet-50 text-violet-800 ring-violet-200"
                    : "bg-pink-50 text-pink-800 ring-pink-200";
                return (
                  <span
                    key={r.id}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ring-1 ${variantStyle}`}
                  >
                    {emojis[r.rewardKey] ?? "🏅"} {labels[r.rewardKey] ?? r.rewardKey}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Cumulative progress */}
        {progress && (
          <div className="w-full rounded-3xl bg-white p-6 shadow-sm ring-1 ring-indigo-100">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Overall {subjectLabel} progress
            </h2>
            <dl className="flex flex-col gap-3">
              <StatRow label="Sessions completed" value={progress.sessionsCompleted} />
              <StatRow label="Total questions" value={progress.totalQuestionsAnswered} />
              <StatRow label="Total correct" value={progress.totalCorrect} />
            </dl>
          </div>
        )}

        <Link
          href="/"
          className="w-full rounded-2xl bg-indigo-600 px-8 py-4 text-center text-lg font-bold text-white shadow-md transition-all duration-100 hover:bg-indigo-700 active:scale-[0.98]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

function StatRow({
  label,
  value,
  color = "text-indigo-900",
  bg = "bg-indigo-50",
}: {
  label: string;
  value: number;
  color?: string;
  bg?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-gray-600">{label}</dt>
      <dd
        className={`flex h-9 min-w-[2.5rem] items-center justify-center rounded-xl px-3 text-xl font-bold ${bg} ${color}`}
      >
        {value}
      </dd>
    </div>
  );
}
