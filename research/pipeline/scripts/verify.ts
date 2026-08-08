// Step 4 — Correctness verification (external, not self-review).
//
// Reads a transformed-candidates JSON file and checks each item independently:
// - Integer/decimal items: `checkExpression` is evaluated with a restricted
//   arithmetic evaluator (no external libs, no eval of arbitrary strings) and
//   compared against `expectedValue`, and separately against the numeric
//   value of whichever option `correctOption` points to. Both must match.
// - Fraction/mixed-number items: `checkFraction` is a JSON expression tree
//   (leaves are {num,den} or {whole,num,den}; ops are add/sub/mul/div)
//   evaluated with exact bigint rational arithmetic — no floating point, so
//   no false-pass/false-fail from rounding. The result is compared against
//   the correctOption string parsed as a fraction/mixed-number/integer, and
//   distractors are checked to NOT equal it. A JSON tree is used instead of
//   parsing a fraction-aware expression string to avoid writing a second,
//   more failure-prone parser for something this pipeline's output controls
//   anyway (transformation always emits the tree directly).
// - All items: structural check — exactly 4 distinct options, correctOption
//   is one of A-D, levelBand is one of the 6 allowed bands, prompt/explanation
//   non-empty.
//
// Usage: npx tsx research/pipeline/scripts/verify.ts <input.json> <output-dir>
// Writes <output-dir>/verified.json and <output-dir>/rejects-step4.json

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

// ---- Exact rational arithmetic (bigint numerator/denominator) ----

type Rational = { n: bigint; d: bigint };

function bgcd(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b) [a, b] = [b, a % b];
  return a === 0n ? 1n : a;
}

function makeRational(n: bigint, d: bigint): Rational {
  if (d === 0n) throw new Error("division by zero in fraction expression");
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  const g = bgcd(n, d);
  return { n: n / g, d: d / g };
}

function rAdd(a: Rational, b: Rational): Rational {
  return makeRational(a.n * b.d + b.n * a.d, a.d * b.d);
}
function rSub(a: Rational, b: Rational): Rational {
  return makeRational(a.n * b.d - b.n * a.d, a.d * b.d);
}
function rMul(a: Rational, b: Rational): Rational {
  return makeRational(a.n * b.n, a.d * b.d);
}
function rDiv(a: Rational, b: Rational): Rational {
  return makeRational(a.n * b.d, a.d * b.n);
}
function rEq(a: Rational, b: Rational): boolean {
  return a.n === b.n && a.d === b.d;
}

// FractionLeaf: {num, den} for a simple fraction (den=1 for whole numbers),
// or {whole, num, den} for a mixed number (whole + num/den, same sign as whole).
type FractionLeaf = { num: number; den: number; whole?: number };
type FractionNode =
  | FractionLeaf
  | { op: "add" | "sub" | "mul" | "div"; args: FractionExpr[] };
type FractionExpr = FractionNode;

function isLeaf(node: FractionExpr): node is FractionLeaf {
  return "num" in node && "den" in node;
}

function leafToRational(leaf: FractionLeaf): Rational {
  const frac = makeRational(BigInt(leaf.num), BigInt(leaf.den));
  if (leaf.whole !== undefined) {
    const wholeSign = leaf.whole < 0 ? -1n : 1n;
    const whole = makeRational(BigInt(leaf.whole), 1n);
    // Mixed number: whole and fractional part share the sign of `whole`.
    return rAdd(whole, makeRational(wholeSign * BigInt(leaf.num), BigInt(leaf.den)));
  }
  return frac;
}

function evalFractionTree(node: FractionExpr): Rational {
  if (isLeaf(node)) return leafToRational(node);
  const values = node.args.map(evalFractionTree);
  switch (node.op) {
    case "add":
      return values.reduce(rAdd);
    case "sub":
      return values.reduce(rSub);
    case "mul":
      return values.reduce(rMul);
    case "div":
      return values.reduce(rDiv);
  }
}

// Parses "40", "2/9", "-2/9", "1 1/12", "-1 1/12" into an exact Rational.
function parseFractionString(raw: string): Rational | null {
  const s = raw.trim();
  const mixedMatch = s.match(/^(-?\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const [, whole, num, den] = mixedMatch;
    const w = BigInt(whole);
    const wholeSign = w < 0n ? -1n : 1n;
    return makeRational(w * BigInt(den) + wholeSign * BigInt(num), BigInt(den));
  }
  const fracMatch = s.match(/^(-?\d+)\/(\d+)$/);
  if (fracMatch) {
    const [, num, den] = fracMatch;
    return makeRational(BigInt(num), BigInt(den));
  }
  const intMatch = s.match(/^-?\d+$/);
  if (intMatch) {
    return makeRational(BigInt(s), 1n);
  }
  return null;
}

const ALLOWED_BANDS = [
  "Age 9",
  "Age 9 High Achiever",
  "Age 10",
  "Age 10 High Achiever",
  "Age 11",
  "Age 11 High Achiever",
];

type Candidate = {
  sourceQNum?: number;
  sourceItemNum?: number;
  topic: string;
  levelBand: string;
  prompt: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  explanation?: string;
  answerType?: "fraction" | "fact"; // absent/undefined = plain numeric (checkExpression path)
  checkExpression?: string;
  expectedValue?: number;
  checkFraction?: FractionExpr;
  factClaim?: string;
};

type Reject = { item: Candidate; reasonCode: string; detail: string };

// Restricted arithmetic evaluator: only digits, `.`, `+ - * / ( ) ^`, and spaces
// are permitted in checkExpression. `^` is remapped to `**`. This avoids
// executing arbitrary JS while still letting the pipeline verify its own
// generated expressions without a dependency.
function safeEvalArithmetic(expr: string): number {
  const whitelist = /^[0-9+\-*/().\s^]+$/;
  if (!whitelist.test(expr)) {
    throw new Error(`checkExpression contains disallowed characters: ${expr}`);
  }
  const jsExpr = expr.replace(/\^/g, "**").replace(/\*\*/g, "**");
  // eslint-disable-next-line no-new-func
  const fn = new Function(`"use strict"; return (${jsExpr});`);
  const result = fn();
  if (typeof result !== "number" || !Number.isFinite(result)) {
    throw new Error(`checkExpression did not evaluate to a finite number: ${expr}`);
  }
  return result;
}

function optionValueOf(item: Candidate, letter: string): number | null {
  const raw = { A: item.optionA, B: item.optionB, C: item.optionC, D: item.optionD }[letter];
  if (raw === undefined) return null;
  const cleaned = raw.replace(/,/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function structuralCheck(item: Candidate): string | null {
  if (!item.prompt || !item.prompt.trim()) return "empty prompt";
  const options = [item.optionA, item.optionB, item.optionC, item.optionD];
  if (options.some((o) => o === undefined || o === null || o === "")) return "missing option";
  if (new Set(options).size !== 4) return "options not all distinct";
  if (!["A", "B", "C", "D"].includes(item.correctOption)) return "correctOption not A-D";
  if (!ALLOWED_BANDS.includes(item.levelBand)) return "levelBand not one of the 6 allowed values";
  return null;
}

function main() {
  const [, , inputPath, outputDir] = process.argv;
  if (!inputPath || !outputDir) {
    console.error("Usage: verify.ts <input.json> <output-dir>");
    process.exit(1);
  }

  const candidates: Candidate[] = JSON.parse(readFileSync(inputPath, "utf-8"));
  const verified: Candidate[] = [];
  const rejects: Reject[] = [];
  const unverifiedFacts: Candidate[] = [];

  for (const item of candidates) {
    const structuralIssue = structuralCheck(item);
    if (structuralIssue) {
      rejects.push({ item, reasonCode: "bad-band", detail: structuralIssue });
      continue;
    }

    // Fact items (geography/space/general-science claims) have no computable
    // check — the design doc's Step 4 for these is an independent web-search
    // cross-check, which is not automated yet. Structural checks still apply,
    // but these are NOT mathematically/factually verified by this script.
    // They're tracked separately so nothing pretends to be checked that isn't.
    if (item.answerType === "fact" || (item.factClaim && !item.checkExpression && !item.checkFraction)) {
      if (!item.factClaim) {
        rejects.push({ item, reasonCode: "fact-unverified", detail: "answerType is 'fact' but factClaim is missing — nothing to verify against" });
        continue;
      }
      unverifiedFacts.push(item);
      verified.push(item);
      continue;
    }

    if (item.answerType === "fraction") {
      if (!item.checkFraction) {
        rejects.push({ item, reasonCode: "math-incorrect", detail: "answerType is 'fraction' but checkFraction tree is missing" });
        continue;
      }
      let computed: Rational;
      try {
        computed = evalFractionTree(item.checkFraction);
      } catch (e) {
        rejects.push({ item, reasonCode: "math-incorrect", detail: `checkFraction failed to evaluate: ${(e as Error).message}` });
        continue;
      }

      const letters = ["A", "B", "C", "D"] as const;
      const optionRationals = new Map<string, Rational | null>();
      let malformedOption = false;
      for (const l of letters) {
        const raw = { A: item.optionA, B: item.optionB, C: item.optionC, D: item.optionD }[l];
        const parsed = parseFractionString(raw);
        if (parsed === null) malformedOption = true;
        optionRationals.set(l, parsed);
      }
      if (malformedOption) {
        rejects.push({ item, reasonCode: "ambiguous-options", detail: "one or more options are not parseable as an integer, fraction (a/b), or mixed number (a b/c)" });
        continue;
      }

      const correctOptVal = optionRationals.get(item.correctOption)!;
      if (!rEq(correctOptVal!, computed)) {
        rejects.push({
          item,
          reasonCode: "math-incorrect",
          detail: `correctOption (${item.correctOption} = "${item[("option" + item.correctOption) as "optionA"]}") does not match checkFraction result ${computed.n}/${computed.d}`,
        });
        continue;
      }

      const otherLetters = letters.filter((l) => l !== item.correctOption);
      const ambiguous = otherLetters.some((l) => rEq(optionRationals.get(l)!, computed));
      if (ambiguous) {
        rejects.push({ item, reasonCode: "ambiguous-options", detail: "a distractor option is an equivalent fraction to the correct answer" });
        continue;
      }

      verified.push(item);
      continue;
    }

    if (item.checkExpression === undefined || item.expectedValue === undefined) {
      rejects.push({ item, reasonCode: "math-incorrect", detail: "missing checkExpression/expectedValue for a non-fraction item" });
      continue;
    }

    let computed: number;
    try {
      computed = safeEvalArithmetic(item.checkExpression);
    } catch (e) {
      rejects.push({ item, reasonCode: "math-incorrect", detail: `checkExpression failed to evaluate: ${(e as Error).message}` });
      continue;
    }

    const EPSILON = 1e-9;
    if (Math.abs(computed - item.expectedValue) > EPSILON) {
      rejects.push({
        item,
        reasonCode: "math-incorrect",
        detail: `checkExpression evaluates to ${computed}, but expectedValue is ${item.expectedValue}`,
      });
      continue;
    }

    const correctOptVal = optionValueOf(item, item.correctOption);
    if (correctOptVal === null || Math.abs(correctOptVal - computed) > EPSILON) {
      rejects.push({
        item,
        reasonCode: "math-incorrect",
        detail: `correctOption (${item.correctOption} = "${item[("option" + item.correctOption) as "optionA"]}") does not match computed value ${computed}`,
      });
      continue;
    }

    // Cross-check the three distractors are NOT accidentally also correct.
    const otherLetters = ["A", "B", "C", "D"].filter((l) => l !== item.correctOption);
    const ambiguous = otherLetters.some((l) => {
      const v = optionValueOf(item, l);
      return v !== null && Math.abs(v - computed) <= EPSILON;
    });
    if (ambiguous) {
      rejects.push({ item, reasonCode: "ambiguous-options", detail: "a distractor option numerically equals the correct answer" });
      continue;
    }

    verified.push(item);
  }

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "verified.json"), JSON.stringify(verified, null, 2));
  writeFileSync(join(outputDir, "rejects-step4.json"), JSON.stringify(rejects, null, 2));
  writeFileSync(join(outputDir, "unverified-facts.json"), JSON.stringify(unverifiedFacts, null, 2));

  const idOf = (i: Candidate) => i.sourceQNum ?? i.sourceItemNum ?? "?";
  console.log(`Step 4 verification: ${verified.length} passed structural/computable checks, ${rejects.length} rejected.`);
  if (unverifiedFacts.length > 0) {
    console.log(`NOTE: ${unverifiedFacts.length} of those are fact-based claims with NO independent verification yet (no automated fact-checker built) — see unverified-facts.json. These must be manually fact-checked before merge.`);
  }
  if (rejects.length > 0) {
    console.log("Rejects:", rejects.map((r) => `Q${idOf(r.item)}: ${r.reasonCode} — ${r.detail}`).join("\n  "));
  }
}

main();
