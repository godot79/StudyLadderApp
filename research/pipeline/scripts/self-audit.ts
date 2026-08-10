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
// 4. Recall-vs-reasoning mismatch (fact-type items only): a High Achiever
//    band should mean a child has to reason (compare, predict, trace a
//    chain, weigh conditions), not just recall a vocabulary term or a
//    single fact. Added after the NY Grade 8 Science round (2026-08-10)
//    shipped 5 items like "what is a gene called" / "what gas is released
//    during cellular respiration" mislabeled Age 11 High Achiever — check 2's
//    digit-counting heuristic scored them 0 (correctly flagged them as
//    "too easy"), but nothing distinguished "too easy because it's genuinely
//    simple reasoning" from "too easy because it's rote recall with no
//    reasoning at all," which is the more useful distinction for fact-type
//    content. That round was caught by hand; this check is here so the next
//    one doesn't need a human to catch it.
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
  factClaim?: string;
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

// Signals that the item requires tracing/comparing/predicting across more
// than one fact, not just naming one. Deliberately broad — false negatives
// (missing a genuinely reasoning-heavy item with unusual phrasing) are
// cheaper than false positives here, since this only ever produces a "warn"
// for a human to look at, never an auto-reject.
const REASONING_SIGNALS =
  /\b(why|predict|compare|which pattern|which best explains|most likely|in order to|both .* and|which combination|which of these (would|will)|if .* then|as .* increases|as .* decreases|relationship between|trace|sequence of|which two|what happens to (each|both)|how do(es)? .* compare)\b/i;

// Signals that the prompt is a single-fact lookup: "what is X called",
// "what is the name/term/word for/of", "what gas/word/process is made/
// produced/known as", etc. — answerable from one memorized fact with no
// comparison or multi-step inference. Kept as separate patterns (not one
// giant alternation) so each stays readable and easy to extend.
const RECALL_SIGNAL_PATTERNS = [
  /\bwhat (is|are) .{0,25}\bcalled\b/i,
  /\bwhat is (the|a) [\w\s]{0,20}\b(name|term|word)s?\b (of|for)\b/i,
  /\bwhat do (you|we) call\b/i,
  /\bwhat (gas|word|term|process|structure|organ|part|nutrient|substance) (is|are) (made|produced|released|called|known as)\b/i,
  /\bwhich (word|term|gas|process|structure) (is|means)\b/i,
];

function isRecallShaped(prompt: string): boolean {
  return RECALL_SIGNAL_PATTERNS.some((r) => r.test(prompt)) && !REASONING_SIGNALS.test(prompt);
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

  // Check 4: recall-vs-reasoning mismatch (fact-type items only).
  for (const item of items) {
    if (item.answerType !== "fact") continue;
    if (!item.levelBand.includes("High Achiever")) continue;
    if (isRecallShaped(item.prompt)) {
      flags.push({
        severity: "warn",
        check: "recall-not-reasoning",
        detail: `Q${item.sourceQNum ?? "?"} ("${item.prompt}") assigned ${item.levelBand} but reads as single-fact recall ("what is X called" / "what do we call") rather than multi-step reasoning — High Achiever should mean the child has to compare, predict, or trace a chain, not just name a term. Consider moving to a plain age band.`,
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
