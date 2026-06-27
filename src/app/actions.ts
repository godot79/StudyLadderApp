"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  startPracticeSession,
  completePracticeSession,
  saveSessionAnswer,
  getDefaultChild,
} from "@/lib/practice-session-service";
import type { AnswerInput } from "@/lib/practice-session-service";
import { prisma } from "@/db";
import { evaluateAndPersistRewards } from "@/lib/rewards";

export async function startSession() {
  const { session } = await startPracticeSession("maths");
  redirect(`/session/${session.id}`);
}

export async function completeSession(
  sessionId: string,
  answers: AnswerInput[]
) {
  const completion = await completePracticeSession(sessionId, answers);
  const child = await getDefaultChild();
  // Evaluate rewards after the session transaction completes.
  // Failure here does not roll back the session result.
  const session = await prisma.practiceSession.findUnique({ where: { id: sessionId } });
  if (session) {
    await evaluateAndPersistRewards(child.id, sessionId, session.subject);
  }
  void completion;
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
