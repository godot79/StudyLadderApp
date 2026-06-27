"use client";

import { useState, useEffect, useRef } from "react";
import { completeSession } from "../../actions";

type QuestionData = {
  prompt: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
};

type SessionQuestion = {
  id: string;
  questionOrder: number;
  question: QuestionData;
};

type Props = {
  sessionId: string;
  sessionQuestions: SessionQuestion[];
};

const OPTIONS = ["A", "B", "C", "D"] as const;
type Option = (typeof OPTIONS)[number];

const OPTION_KEY: Record<Option, keyof QuestionData> = {
  A: "optionA",
  B: "optionB",
  C: "optionC",
  D: "optionD",
};

const TIMER_SECONDS = 30;

export default function SessionClient({ sessionId, sessionQuestions }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Permanently true once the last-question advance fires. Never reset to false.
  // Prevents the timer from re-entering advance() if completing throws and re-renders.
  const completionFiredRef = useRef(false);

  const currentSq = sessionQuestions[currentIndex];
  const isLast = currentIndex === sessionQuestions.length - 1;

  // Ref ensures the timer effect always calls the latest version of advance
  // without needing it as a dependency (which would restart the timer on every render).
  const advanceRef = useRef<(option: string | null) => void>(() => {});

  async function advance(selectedOption: string | null) {
    if (completionFiredRef.current) return;
    if (completing) return;

    const newAnswers = { ...answers, [currentSq.id]: selectedOption };
    setAnswers(newAnswers);

    if (isLast) {
      completionFiredRef.current = true;
      setCompleting(true);
      const answerList = sessionQuestions.map((sq) => ({
        sessionQuestionId: sq.id,
        selectedOption: newAnswers[sq.id] ?? null,
      }));
      try {
        await completeSession(sessionId, answerList);
      } catch {
        // Don't reset completing — answers are lost if the server failed.
        // completionFiredRef stays true so the timer cannot re-trigger.
        setError("Something went wrong saving your results.");
      }
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  // Update ref on every render so the timer always has the latest advance
  advanceRef.current = advance;

  // Reset timer when the question changes
  useEffect(() => {
    setTimeLeft(TIMER_SECONDS);
  }, [currentIndex]);

  // Countdown — when timeLeft hits 0, advance as unanswered
  useEffect(() => {
    if (completing) return;
    if (timeLeft <= 0) {
      void advanceRef.current(null);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, completing]);

  if (sessionQuestions.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
        <p className="text-red-600">No questions found for this session.</p>
        <a href="/" className="text-blue-600 underline">Go home</a>
      </main>
    );
  }

  if (completing && !error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
        <p className="text-xl text-gray-600">Saving your results…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
        <p className="text-red-600">{error}</p>
        <a href="/" className="text-blue-600 underline">Go home</a>
      </main>
    );
  }

  const { question } = currentSq;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      {/* Progress and timer */}
      <div className="flex w-full max-w-md justify-between text-sm">
        <span className="text-gray-500">
          Question {currentIndex + 1} of {sessionQuestions.length}
        </span>
        <span
          className={
            timeLeft <= 10
              ? "font-bold text-red-500"
              : "text-gray-500"
          }
        >
          {timeLeft}s
        </span>
      </div>

      {/* Question */}
      <p className="max-w-md text-center text-2xl font-semibold leading-snug">
        {question.prompt}
      </p>

      {/* Options */}
      <div className="flex w-full max-w-md flex-col gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => void advance(opt)}
            className="flex items-center gap-4 rounded-2xl border-2 border-gray-200 bg-white px-5 py-4 text-left text-lg hover:border-blue-500 hover:bg-blue-50 active:bg-blue-100"
          >
            <span className="w-7 shrink-0 text-center font-bold text-gray-400">
              {opt}
            </span>
            <span>{question[OPTION_KEY[opt]]}</span>
          </button>
        ))}
      </div>

      {/* Skip */}
      <button
        onClick={() => void advance(null)}
        className="mt-2 text-sm text-gray-400 underline"
      >
        Skip this question
      </button>
    </main>
  );
}
