// Step 6.5 — Self-audit (mechanical sanity checks, runs after dedup, before staging).
//
// This does NOT replace the human checkpoint (Step 7) — it catches the class
// of mistake a human reviewer would otherwise have to catch by eye, so the
// human review can focus on things a script genuinely can't judge (wording,
// age-appropriateness of content/tone, whether a "fact" question's claim is
// actually true). It exists because of a concrete miss in the first pilot
// batch: every item from one source paper was blanket-assigned to a single
// age band, when the paper itself mixes easy and hard items across a wide
// difficulty range. That was caught by human review; this script is here so
// the next batch doesn't need a human to catch it.
//
// Checks (all heuristic — they flag for human attention, they never auto-reject):
// 1. Answer-position bias: no letter should dominate the batch.
// 2. Age-band vs. difficulty-heuristic mismatch: a rough complexity score
//    (digit count, decimals, fractions, percentages, exponents, operator
//    count) is compared against the assigned band; only flags gross
//    mismatches (e.g. a single-digit fact assigned to the hardest band).
// 3. Topic concentration: one topic dominating the batch limits variety.
//
// Usage: npx tsx research/pipeline/scripts/self-audit.ts <deduped.json> <output-dir>
// Writes <output-dir>/audit-flags.json (empty array if nothing to flag).

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

type Item = {
  sourceQNum?: number;
  topic: string;
  levelBand: string;
  prompt: string;
  correctOption: string;
  checkExpression?: string;
  answerType?: string;
};

type Flag = { severity: "info" | "warn"; check: string; detail: string };

function complexityScore(item: Item): number {
  const numbers = item.prompt.match(/\d+/g) ?? [];
  const maxDigits = numbers.length ? Math.max(...numbers.map((n) => n.length)) : 0;
  const hasDecimal = /\d\.\d/.test(item.prompt);
  const hasFraction = item.answerType === "fraction" || /\d\/\d/.test(item.prompt);
  const hasPercent = /%/.test(item.prompt);
  const hasExponent = /[²³^]/.test(item.prompt);
  const operatorCount = (item.checkExpression?.match(/[+\-*/]/g) ?? []).length;
  // Digit-counting alone misses why some operations are hard: a 2-digit-divisor
  // long division or 2-digit long multiplication is a distinct, later-taught
  // skill even when every number involved is short. Topic name is a more
  // reliable signal than raw magnitude for these.
  const advancedTopic = /long division|long multiplication|large subtraction|order of operations/i.test(item.topic);

  return (
    maxDigits +
    (hasDecimal ? 2 : 0) +
    (hasFraction ? 3 : 0) +
    (hasPercent ? 2 : 0) +
    (hasExponent ? 3 : 0) +
    (advancedTopic ? 4 : 0) +
    Math.max(0, operatorCount - 1)
  );
}

function main() {
  const [, , inputPath, outputDir] = process.argv;
  if (!inputPath || !outputDir) {
    console.error("Usage: self-audit.ts <deduped.json> <output-dir>");
    process.exit(1);
  }

  const items: Item[] = JSON.parse(readFileSync(inputPath, "utf-8"));
  const flags: Flag[] = [];

  // Check 1: answer-position bias.
  if (items.length >= 8) {
    const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
    for (const item of items) counts[item.correctOption] = (counts[item.correctOption] ?? 0) + 1;
    for (const [letter, count] of Object.entries(counts)) {
      const share = count / items.length;
      if (share > 0.4) {
        flags.push({
          severity: "warn",
          check: "answer-position-bias",
          detail: `${count}/${items.length} (${Math.round(share * 100)}%) of correct answers are option ${letter} — a child could learn to guess this letter.`,
        });
      }
    }
  }

  // Check 2: age-band vs. difficulty-heuristic mismatch.
  // Bands only compared within the same "family" (standard vs High Achiever)
  // since High Achiever bands are intentionally harder than their base band.
  const bandFloor: Record<string, number> = {
    "Age 9": 0,
    "Age 10": 0,
    "Age 11": 0,
    "Age 9 High Achiever": 0,
    "Age 10 High Achiever": 0,
    "Age 11 High Achiever": 0,
  };
  for (const item of items) {
    const score = complexityScore(item);
    const isAge9 = item.levelBand.startsWith("Age 9");
    const isAge11 = item.levelBand.startsWith("Age 11");
    if (isAge9 && score >= 9) {
      flags.push({
        severity: "warn",
        check: "age-band-mismatch",
        detail: `Q${item.sourceQNum ?? "?"} ("${item.prompt}") assigned ${item.levelBand} but has a high difficulty-heuristic score (${score}) — check it isn't too hard for this band.`,
      });
    }
    if (isAge11 && score <= 3) {
      flags.push({
        severity: "warn",
        check: "age-band-mismatch",
        detail: `Q${item.sourceQNum ?? "?"} ("${item.prompt}") assigned ${item.levelBand} but has a low difficulty-heuristic score (${score}) — check it isn't too easy for this band.`,
      });
    }
  }

  // Check 3: topic concentration.
  const topicCounts = new Map<string, number>();
  for (const item of items) topicCounts.set(item.topic, (topicCounts.get(item.topic) ?? 0) + 1);
  for (const [topic, count] of topicCounts) {
    const share = count / items.length;
    if (items.length >= 10 && share > 0.4) {
      flags.push({
        severity: "info",
        check: "topic-concentration",
        detail: `Topic "${topic}" is ${Math.round(share * 100)}% of this batch (${count}/${items.length}).`,
      });
    }
  }

  writeFileSync(join(outputDir, "audit-flags.json"), JSON.stringify(flags, null, 2));
  console.log(`Self-audit: ${flags.length} flag(s) raised.`);
  for (const f of flags) console.log(`  [${f.severity}] ${f.check}: ${f.detail}`);
}

main();
