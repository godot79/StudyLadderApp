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

// Groups questions by passageId; questions without a passageId form their
// own singleton group. Group order is shuffled, not question order within
// a group (which stays as given — source array order).
function groupByPassage(questions: Question[]): Question[][] {
  const groups = new Map<string, Question[]>();
  const singles: Question[][] = [];
  for (const q of questions) {
    if (!q.passageId) {
      singles.push([q]);
      continue;
    }
    const group = groups.get(q.passageId);
    if (group) group.push(q);
    else groups.set(q.passageId, [q]);
  }
  return shuffle([...groups.values(), ...singles]);
}

// Flattens shuffled groups into a list, stopping once `count` is reached —
// but never splitting a group across the boundary, so the result may
// slightly exceed `count` if the last included group is multi-question.
function flattenGroupsUpTo(groups: Question[][], count: number): Question[] {
  const result: Question[] = [];
  for (const group of groups) {
    if (result.length >= count) break;
    result.push(...group);
  }
  return result;
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
 * Questions sharing a `passageId` are always kept together and consecutive
 * in the result — a passage's questions are treated as one unit for
 * shuffling/recycling/count purposes. Because a group is never split, the
 * result may exceed `count` by a group's size minus one when a multi-
 * question group is the last one included.
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

  // A group counts as "seen"/"recent" based on its least-seen member, so a
  // passage group is only recycled once every question in it has been seen.
  const groupSeen = (group: Question[]) => group.every((q) => shownSet.has(q.id));
  const groupRecent = (group: Question[]) => group.some((q) => recentSet.has(q.id));

  const allGroups = groupByPassage(pool);

  const unseenGroups = allGroups.filter((g) => !groupSeen(g));
  const unseen = flattenGroupsUpTo(unseenGroups, count);

  if (unseen.length >= count) return unseen;

  // Recycling needed: prefer seen-but-not-recent groups over seen-and-recent.
  const seenGroups = allGroups.filter((g) => groupSeen(g));
  const seenNotRecentGroups = seenGroups.filter((g) => !groupRecent(g));
  const seenRecentGroups = seenGroups.filter((g) => groupRecent(g));

  const needed = count - unseen.length;
  const recycled = flattenGroupsUpTo(
    [...seenNotRecentGroups, ...seenRecentGroups],
    needed
  );

  return [...unseen, ...recycled];
}
