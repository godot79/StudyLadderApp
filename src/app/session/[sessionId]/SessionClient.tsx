"use client";

import { useState, useEffect, useRef } from "react";
import { completeSession, saveAnswer } from "../../actions";

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
  selectedOption: string | null;
  seen: boolean;
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
  // Restore answers and position from DB-persisted state (survives refresh).
  const initialAnswers = Object.fromEntries(
    sessionQuestions
      .filter((sq) => sq.seen)
      .map((sq) => [sq.id, sq.selectedOption])
  );
  const firstUnseen = sessionQuestions.findIndex((sq) => !sq.seen);
  const startIndex =
    firstUnseen === -1 ? sessionQuestions.length - 1 : firstUnseen;

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [answers, setAnswers] = useState<Record<string, string | null>>(initialAnswers);
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
      // Persist this answer immediately; don't await so the UI advances without delay.
      void saveAnswer(currentSq.id, selectedOption);
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
        <p className="text-rose-600">No questions found for this session.</p>
        <a href="/" className="text-indigo-600 underline">
          Go home
        </a>
      </main>
    );
  }

  if (completing && !error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
        <p className="text-xl text-indigo-400">Saving your results…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
        <p className="text-rose-600">{error}</p>
        <a href="/" className="text-indigo-600 underline">
          Go home
        </a>
      </main>
    );
  }

  const { question } = currentSq;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="flex w-full max-w-xl flex-col gap-6">

        {/* Progress dots + counter */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {sessionQuestions.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-6 rounded-full transition-colors duration-300 ${
                  i < currentIndex
                    ? "bg-indigo-300"
                    : i === currentIndex
                    ? "bg-indigo-600"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-400">
            {currentIndex + 1} / {sessionQuestions.length}
          </span>
        </div>

        {/* Timer bar */}
        <div className="flex flex-col gap-1">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ease-linear ${
                timeLeft <= 10 ? "bg-rose-500" : "bg-teal-400"
              }`}
              style={{ width: `${(timeLeft / TIMER_SECONDS) * 100}%` }}
            />
          </div>
          <p
            className={`text-right text-xs font-semibold tabular-nums ${
              timeLeft <= 10 ? "text-rose-500" : "text-gray-400"
            }`}
          >
            {timeLeft}s
          </p>
        </div>

        {/* Question card */}
        <div className="rounded-3xl bg-white px-8 py-10 text-center shadow-sm ring-1 ring-indigo-100">
          <p className="text-2xl font-bold leading-snug text-indigo-950">
            {question.prompt}
          </p>
        </div>

        {/* Answer buttons */}
        <div className="flex flex-col gap-3">
          {OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => void advance(opt)}
              className="group flex items-center gap-4 rounded-2xl border-2 border-transparent bg-white px-5 py-4 text-left shadow-sm ring-1 ring-gray-100 transition-all duration-100 hover:border-indigo-400 hover:shadow-md active:scale-[0.98]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-400 transition-colors duration-100 group-hover:bg-indigo-600 group-hover:text-white">
                {opt}
              </span>
              <span className="text-lg font-medium text-gray-800">
                {question[OPTION_KEY[opt]]}
              </span>
            </button>
          ))}
        </div>

        {/* Skip */}
        <div className="text-center">
          <button
            onClick={() => void advance(null)}
            className="text-sm text-gray-400 underline transition-colors hover:text-gray-600"
          >
            Skip this question
          </button>
        </div>
      </div>
    </main>
  );
}
