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

  const [progress, child] = await Promise.all([
    prisma.subjectProgress.findFirst({
      where: { childId: session.childId, subject: session.subject },
    }),
    prisma.child.findFirst({ where: { id: session.childId } }),
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Session Complete!</h1>
        <p className="mt-1 text-gray-500 capitalize">
          {child?.displayName} — {session.subject}
        </p>
      </div>

      {/* This session */}
      <section className="w-full max-w-sm rounded-2xl border border-gray-200 p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          This session
        </h2>
        <dl className="flex flex-col gap-3">
          <StatRow label="Correct" value={session.correctCount} color="text-green-600" />
          <StatRow label="Incorrect" value={session.incorrectCount} color="text-red-500" />
          <StatRow label="Unanswered" value={session.unansweredCount} color="text-gray-400" />
        </dl>
      </section>

      {/* Cumulative progress */}
      {progress && (
        <section className="w-full max-w-sm rounded-2xl border border-gray-200 p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">Overall</h2>
          <dl className="flex flex-col gap-3">
            <StatRow label="Sessions completed" value={progress.sessionsCompleted} />
            <StatRow label="Total questions" value={progress.totalQuestionsAnswered} />
            <StatRow label="Total correct" value={progress.totalCorrect} />
          </dl>
        </section>
      )}

      <Link
        href="/"
        className="rounded-2xl bg-blue-600 px-10 py-4 text-lg font-semibold text-white hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </main>
  );
}

function StatRow({
  label,
  value,
  color = "text-gray-800",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-gray-600">{label}</dt>
      <dd className={`text-xl font-bold ${color}`}>{value}</dd>
    </div>
  );
}
