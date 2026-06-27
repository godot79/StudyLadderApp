import Link from "next/link";
import { prisma } from "@/db";
import { updateChildName } from "../actions";

export default async function SettingsPage() {
  const child = await prisma.child.findFirst({ where: { id: "child-001" } });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">Settings</h1>

      <form action={updateChildName} className="flex w-full max-w-xs flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-600">Child name</span>
          <input
            name="displayName"
            defaultValue={child?.displayName ?? ""}
            required
            maxLength={50}
            className="rounded-lg border border-gray-300 px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Save
        </button>
      </form>

      <Link href="/" className="text-sm text-gray-400 underline">
        Back to home
      </Link>
    </main>
  );
}
