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
 *
 * When `levelBand` is provided and the band contains at least `count` active
 * questions, selection is restricted to that band. If the band pool is too
 * small (fewer active questions than `count`), the full active pool is used
 * as a fallback so the session is never short-changed.
 *
 * Within the chosen pool, unseen questions are preferred. Falls back to seen
 * questions when unseen pool is insufficient. Never duplicates within the
 * returned set. Returns fewer than `count` only if the total active pool
 * (after fallback) is smaller.
 */
export function selectQuestions(
  allQuestions: Question[],
  shownQuestionIds: string[],
  count = SESSION_QUESTION_COUNT,
  levelBand?: string | null
): Question[] {
  const shownSet = new Set(shownQuestionIds);
  const active = allQuestions.filter((q) => q.isActive);

  // Restrict to the level band when one is given and the band is deep enough.
  const bandPool = levelBand
    ? active.filter((q) => q.levelBand === levelBand)
    : active;
  const pool = bandPool.length >= count ? bandPool : active;

  const unseen = shuffle(pool.filter((q) => !shownSet.has(q.id)));
  const seen = shuffle(pool.filter((q) => shownSet.has(q.id)));

  if (unseen.length >= count) return unseen.slice(0, count);

  const needed = count - unseen.length;
  return [...unseen, ...seen.slice(0, needed)];
}
