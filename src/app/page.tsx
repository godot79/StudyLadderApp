import Link from "next/link";
import { prisma } from "@/db";
import { startSession } from "./actions";

export default async function Home() {
  const child = await prisma.child.findFirst({ where: { id: "child-001" } });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl font-bold">Dharma's Study Ladder</h1>

      {child && (
        <p className="text-xl text-gray-600">Hello, {child.displayName}!</p>
      )}

      <form action={startSession}>
        <button
          type="submit"
          className="rounded-2xl bg-blue-600 px-10 py-5 text-xl font-semibold text-white hover:bg-blue-700 active:bg-blue-800"
        >
          Start Maths Practice
        </button>
      </form>

      <Link href="/settings" className="text-sm text-gray-400 underline">
        Change name
      </Link>
    </main>
  );
}
