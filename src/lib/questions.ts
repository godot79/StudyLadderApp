import type { Question } from "@/types";

const SESSION_QUESTION_COUNT = 10;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Selects up to `count` questions for a session.
 * Prefers unseen questions. Falls back to seen if unseen pool is insufficient.
 * Never duplicates within the returned set.
 * Only includes active questions.
 * Returns fewer than `count` only if the total active pool is smaller.
 */
export function selectQuestions(
  allQuestions: Question[],
  shownQuestionIds: string[],
  count = SESSION_QUESTION_COUNT
): Question[] {
  const shownSet = new Set(shownQuestionIds);
  const active = allQuestions.filter((q) => q.isActive);
  const unseen = shuffle(active.filter((q) => !shownSet.has(q.id)));
  const seen = shuffle(active.filter((q) => shownSet.has(q.id)));

  if (unseen.length >= count) {
    return unseen.slice(0, count);
  }

  const needed = count - unseen.length;
  return [...unseen, ...seen.slice(0, needed)];
}
