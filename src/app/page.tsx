import Link from "next/link";
import { prisma } from "@/db";
import { startSession } from "./actions";

export default async function Home() {
  const child = await prisma.child.findFirst({ where: { id: "child-001" } });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="flex w-full max-w-lg flex-col items-center gap-10">

        {/* Header */}
        <div className="text-center">
          <div className="mb-3 text-7xl">⭐</div>
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-950">
            Dharma&apos;s Study Ladder
          </h1>
          {child && (
            <p className="mt-3 text-xl text-indigo-400">
              Hello, {child.displayName}!
            </p>
          )}
        </div>

        {/* Subject card */}
        <div className="w-full rounded-3xl bg-white p-6 shadow-sm ring-1 ring-indigo-100">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Today&apos;s Practice
          </p>
          <div className="mb-5 flex items-center gap-3">
            <span className="text-3xl">🔢</span>
            <h2 className="text-2xl font-bold text-indigo-900">Maths</h2>
          </div>
          <form action={startSession}>
            <button
              type="submit"
              className="w-full rounded-2xl bg-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-md transition-all duration-100 hover:bg-indigo-700 active:scale-[0.98]"
            >
              Start Practice →
            </button>
          </form>
        </div>

        {/* Settings */}
        <Link
          href="/settings"
          className="text-sm text-indigo-300 underline transition-colors hover:text-indigo-500"
        >
          Change name
        </Link>
      </div>
    </main>
  );
}
