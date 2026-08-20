// Step 5.7 — Answer-position rebalancing (deterministic, always runs).
//
// Every round so far has hit the same self-audit flag (answer-position bias,
// often 50%+ landing on one letter — an artifact of preserving the source's
// original correct-letter distribution through rewriting) and fixed it by
// hand with an ad-hoc rebalance script, then re-running dedup/self-audit/
// stage manually. This has caused real staleness bugs: the 2026-08-13
// ny-g4-science-2018 batch had its correct-letter distribution fixed by a
// one-off script that edited staging.json directly without re-running
// self-audit.ts or stage.ts, leaving audit-flags.json and summary.md
// reporting the pre-fix 53%-on-B figure even though staging.json itself was
// already correct — confusing for whoever reviews it.
//
// This script closes that gap by making rebalancing a normal, automatic
// pipeline step instead of a manual one-off: every batch gets its answer
// positions deterministically spread across A/B/C/D (round-robin target
// letter by item index), with the correct option's TEXT moved together with
// its new letter in one step — same rule the round prompts already require
// of human/agent rebalancing, now enforced by code so it can't be gotten
// wrong. Distractor texts keep their relative order in the remaining slots.
// Runs unconditionally (idempotent — a batch that's already balanced is
// simply reassigned to the same deterministic pattern) so self-audit's
// answer-position-bias check should no longer fire on any batch that goes
// through run-batch.ts from this point on; the check stays in self-audit.ts
// as a safety net in case this script has a bug or a batch bypasses it.
//
// Usage: npx tsx research/pipeline/scripts/rebalance.ts <deduped.json> <output-dir>
// Writes <output-dir>/deduped.json (overwritten in place, same filename so
// downstream steps need no changes).

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const LETTERS = ["A", "B", "C", "D"] as const;
type Letter = (typeof LETTERS)[number];

type Item = Record<string, unknown> & {
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
};

// Remaps letter references in explanation text (e.g. "(B)", "Option B") from
// their pre-rebalance letter to their post-rebalance letter. Only handles the
// two forms observed in practice — a parenthetical letter and "Option X" —
// not free-form prose like "as B states", which is a known residual gap.
function remapLetterReferences(
  explanation: string | undefined,
  oldToNew: Partial<Record<Letter, Letter>>
): string | undefined {
  if (!explanation) return explanation;

  // Two-pass placeholder swap avoids A->B->C style double-remapping when
  // old and new letters overlap (e.g. old B becomes new C, old C becomes new B).
  let result = explanation;
  for (const oldLetter of LETTERS) {
    const newLetter = oldToNew[oldLetter];
    if (!newLetter || newLetter === oldLetter) continue;
    const placeholder = `__REBALANCE_${oldLetter}__`;
    result = result
      .replace(new RegExp(`\\(${oldLetter}\\)`, "g"), `(${placeholder})`)
      .replace(new RegExp(`\\bOption\\s+${oldLetter}\\b`, "gi"), `Option ${placeholder}`);
  }
  for (const oldLetter of LETTERS) {
    const newLetter = oldToNew[oldLetter];
    if (!newLetter || newLetter === oldLetter) continue;
    const placeholder = `__REBALANCE_${oldLetter}__`;
    result = result.split(placeholder).join(newLetter);
  }
  return result;
}

function main() {
  const [, , inputPath, outputDir] = process.argv;
  if (!inputPath || !outputDir) {
    console.error("Usage: rebalance.ts <deduped.json> <output-dir>");
    process.exit(1);
  }

  const items: Item[] = JSON.parse(readFileSync(inputPath, "utf-8"));

  const rebalanced = items.map((item, i) => {
    const currentOptions = LETTERS.map((l) => item[`option${l}`] as string);
    const correctIndex = LETTERS.indexOf(item.correctOption as Letter);
    if (correctIndex === -1) {
      throw new Error(`Item ${i} has invalid correctOption "${item.correctOption}": ${item.prompt}`);
    }
    const correctText = currentOptions[correctIndex];
    const distractorOldLetters = LETTERS.filter((_, idx) => idx !== correctIndex);
    const distractors = currentOptions.filter((_, idx) => idx !== correctIndex);

    const targetLetter = LETTERS[i % 4];
    const newOptions: string[] = new Array(4);
    // Tracks where every old letter ends up, so any letter references inside
    // `explanation` can be remapped too (see header comment — a prior ad-hoc
    // rebalance left explanations pointing at pre-rebalance letters).
    const oldToNew: Partial<Record<Letter, Letter>> = {};
    let d = 0;
    for (let slot = 0; slot < 4; slot++) {
      if (LETTERS[slot] === targetLetter) {
        newOptions[slot] = correctText;
        oldToNew[LETTERS[correctIndex]] = targetLetter;
      } else {
        newOptions[slot] = distractors[d];
        oldToNew[distractorOldLetters[d]] = LETTERS[slot];
        d++;
      }
    }

    const explanation = remapLetterReferences(item.explanation as string | undefined, oldToNew);

    return {
      ...item,
      optionA: newOptions[0],
      optionB: newOptions[1],
      optionC: newOptions[2],
      optionD: newOptions[3],
      correctOption: targetLetter,
      ...(explanation !== undefined ? { explanation } : {}),
    };
  });

  writeFileSync(join(outputDir, "deduped.json"), JSON.stringify(rebalanced, null, 2));

  const finalCounts: Record<Letter, number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const item of rebalanced) finalCounts[item.correctOption as Letter]++;
  console.log(
    `Step 5.7 rebalance: ${rebalanced.length} items — correct-option distribution now A:${finalCounts.A} B:${finalCounts.B} C:${finalCounts.C} D:${finalCounts.D}`
  );
}

main();
