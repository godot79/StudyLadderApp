import { calculateResults } from "@/lib/scoring";
import type { SessionCompletionData, SessionQuestionOutcome } from "@/types";

/**
 * Produces all data needed to mark a session complete and update progress.
 * Does not touch the database — the persistence layer applies this data.
 *
 * progressDelta contains increments, not absolute values, because this
 * function has no knowledge of the child's existing progress totals.
 */
export function buildSessionCompletion(
  sessionQuestions: SessionQuestionOutcome[]
): SessionCompletionData {
  const outcomes = sessionQuestions.map((sq) => sq.outcome);
  const results = calculateResults(outcomes);
  const completedAt = new Date();

  return {
    results,
    completedAt,
    shownQuestionIds: sessionQuestions.map((sq) => sq.questionId),
    progressDelta: {
      sessionsCompletedDelta: 1,
      totalQuestionsAnsweredDelta: results.totalQuestions,
      totalCorrectDelta: results.correctCount,
      lastCompletedAt: completedAt,
    },
  };
}
