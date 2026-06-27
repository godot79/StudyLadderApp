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
 * Selection priority (in order):
 *   1. Unseen questions (never shown to this child) — always preferred.
 *   2. When recycling is needed: seen questions NOT in `recentlyUsedIds` first,
 *      then recently-used seen questions as a last resort.
 *
 * Level-band filtering: when `levelBand` is given and the band contains at
 * least `count` active questions, selection is restricted to that band.
 * If the band is too small, the full active pool is used as a fallback.
 *
 * Returns fewer than `count` only if the total eligible pool is smaller.
 */
export function selectQuestions(
  allQuestions: Question[],
  shownQuestionIds: string[],
  count = SESSION_QUESTION_COUNT,
  levelBand?: string | null,
  recentlyUsedIds?: string[]
): Question[] {
  const shownSet = new Set(shownQuestionIds);
  const recentSet = new Set(recentlyUsedIds ?? []);

  const active = allQuestions.filter((q) => q.isActive);

  // Restrict to the level band when one is given and the band is deep enough.
  const bandPool = levelBand
    ? active.filter((q) => q.levelBand === levelBand)
    : active;
  const pool = bandPool.length >= count ? bandPool : active;

  const unseen = shuffle(pool.filter((q) => !shownSet.has(q.id)));

  if (unseen.length >= count) return unseen.slice(0, count);

  // Recycling needed: prefer seen-but-not-recent over seen-and-recent.
  const seenNotRecent = shuffle(
    pool.filter((q) => shownSet.has(q.id) && !recentSet.has(q.id))
  );
  const seenRecent = shuffle(
    pool.filter((q) => shownSet.has(q.id) && recentSet.has(q.id))
  );

  const needed = count - unseen.length;
  return [...unseen, ...[...seenNotRecent, ...seenRecent].slice(0, needed)];
}
