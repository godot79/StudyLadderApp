"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  startPracticeSession,
  completePracticeSession,
  saveSessionAnswer,
} from "@/lib/practice-session-service";
import type { AnswerInput } from "@/lib/practice-session-service";
import { prisma } from "@/db";

export async function startSession() {
  const { session } = await startPracticeSession("maths");
  redirect(`/session/${session.id}`);
}

export async function completeSession(
  sessionId: string,
  answers: AnswerInput[]
) {
  await completePracticeSession(sessionId, answers);
  redirect(`/results/${sessionId}`);
}

export async function saveAnswer(
  sessionQuestionId: string,
  selectedOption: string | null
) {
  await saveSessionAnswer(sessionQuestionId, selectedOption);
}

export async function updateChildName(formData: FormData) {
  const name = (formData.get("displayName") as string | null)?.trim().slice(0, 50);
  if (!name) return;
  await prisma.child.update({
    where: { id: "child-001" },
    data: { displayName: name },
  });
  revalidatePath("/");
  redirect("/");
}
