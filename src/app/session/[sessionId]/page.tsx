import { notFound, redirect } from "next/navigation";
import { prisma } from "@/db";
import SessionClient from "./SessionClient";

export default async function SessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  const session = await prisma.practiceSession.findUnique({
    where: { id: sessionId },
    include: {
      questions: {
        include: { question: true },
        orderBy: { questionOrder: "asc" },
      },
    },
  });

  if (!session) notFound();
  if (session.status === "completed") redirect(`/results/${sessionId}`);

  // Strip correctOption — answers are evaluated server-side only
  const sessionQuestions = session.questions.map((sq) => ({
    id: sq.id,
    questionOrder: sq.questionOrder,
    question: {
      prompt: sq.question.prompt,
      optionA: sq.question.optionA,
      optionB: sq.question.optionB,
      optionC: sq.question.optionC,
      optionD: sq.question.optionD,
    },
  }));

  return <SessionClient sessionId={sessionId} sessionQuestions={sessionQuestions} />;
}
