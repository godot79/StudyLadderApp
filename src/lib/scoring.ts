import type { AnswerOutcome, SessionResults } from "@/types";

/**
 * Evaluates a single submitted answer against the correct option.
 * Null or missing selectedOption means the question was unanswered (timer expired).
 */
export function evaluateAnswer(
  correctOption: string,
  selectedOption: string | null | undefined
): AnswerOutcome {
  if (selectedOption == null || selectedOption === "") return "unanswered";
  return selectedOption === correctOption ? "correct" : "incorrect";
}

/**
 * Calculates session result totals from an array of per-question outcomes.
 */
export function calculateResults(outcomes: AnswerOutcome[]): SessionResults {
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  for (const outcome of outcomes) {
    if (outcome === "correct") correctCount++;
    else if (outcome === "incorrect") incorrectCount++;
    else unansweredCount++;
  }

  return {
    totalQuestions: outcomes.length,
    correctCount,
    incorrectCount,
    unansweredCount,
  };
}
