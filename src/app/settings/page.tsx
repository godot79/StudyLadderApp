import Link from "next/link";
import { prisma } from "@/db";
import { updateChildName } from "../actions";

export default async function SettingsPage() {
  const child = await prisma.child.findFirst({ where: { id: "child-001" } });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">

        <div>
          <h1 className="text-2xl font-extrabold text-indigo-950">Settings</h1>
          <p className="mt-1 text-sm text-indigo-400">
            Change the name shown on the home page.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-indigo-100">
          <form action={updateChildName} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">
                Child name
              </span>
              <input
                name="displayName"
                defaultValue={child?.displayName ?? ""}
                required
                maxLength={50}
                className="rounded-xl border border-gray-200 px-4 py-3 text-lg text-gray-800 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </label>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 py-3 font-semibold text-white transition-all duration-100 hover:bg-indigo-700 active:scale-[0.98]"
            >
              Save
            </button>
          </form>
        </div>

        <Link
          href="/"
          className="text-center text-sm text-indigo-300 underline transition-colors hover:text-indigo-500"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
