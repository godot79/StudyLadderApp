// Step 5 — Deduplication.
//
// - Exact-match check against every subject file in data/seed/*.json (not just
//   the target subject — a rewritten question could collide with a different
//   subject by accident). This is a hard reject.
// - Near-duplicate WARNING (added 2026-08-10, non-blocking): flags an incoming
//   item whose prompt overlaps heavily (token-Jaccard) with an existing seed
//   item AND shares the same correct-answer text, regardless of subject or
//   band. This exists because the exact-match check above missed three real
//   duplicates that later shipped: the same fact asked with different wording
//   across a plain band and its own High-Achiever sibling (e.g. "Earth's
//   orbit" vs "a planet's orbit" both asking for perihelion; "flows through"
//   vs "runs through" London/Thames; "second from the Sun" vs "second closest
//   to the Sun"). A High-Achiever item that's just a reworded copy of its own
//   plain-band item isn't harder, it's the same question — this check is
//   scoped to catch exactly that pattern before merge, not to replace human
//   judgment on genuinely different questions that happen to share wording.
//   Never auto-rejects (same philosophy as self-audit.ts) — writes to
//   near-duplicate-warnings.json for Step 7 human review; the item still
//   proceeds to deduped.json.
//
// Usage: npx tsx research/pipeline/scripts/dedup.ts <verified.json> <subject> <output-dir>
// Writes <output-dir>/deduped.json, <output-dir>/rejects-step5.json,
// <output-dir>/near-duplicate-warnings.json

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, basename } from "path";

const STOPWORDS = new Set(["earth's", "a", "the", "our", "earth", "planet's", "planet"]);

function tokenSet(prompt: string): Set<string> {
  const tokens = prompt
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t && !STOPWORDS.has(t));
  return new Set(tokens);
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const t of a) if (b.has(t)) intersection++;
  const union = a.size + b.size - intersection;
  return intersection / union;
}

function answerText(q: Record<string, unknown>): string {
  const letter = q.correctOption as string | undefined;
  if (!letter) return "";
  const val = q[`option${letter}`];
  return typeof val === "string" ? val.trim().toLowerCase() : "";
}

const SEED_DIR = join(__dirname, "..", "..", "..", "data", "seed");

type Candidate = {
  sourceQNum?: number;
  prompt: string;
  levelBand: string;
  [key: string]: unknown;
};

function normalize(prompt: string): string {
  return prompt.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function main() {
  const [, , inputPath, subject, outputDir] = process.argv;
  if (!inputPath || !subject || !outputDir) {
    console.error("Usage: dedup.ts <verified.json> <subject> <output-dir>");
    process.exit(1);
  }

  const candidates: Candidate[] = JSON.parse(readFileSync(inputPath, "utf-8"));

  // Load every existing seed file's full records (exact check + near-dup scan).
  const existingNormalizedPrompts = new Set<string>();
  const existingItems: Array<Record<string, unknown> & { prompt: string; sourceFile: string }> = [];
  const seedFiles = readdirSync(SEED_DIR).filter((f) => f.endsWith(".json"));
  for (const file of seedFiles) {
    const questions: Array<Record<string, unknown> & { prompt: string }> = JSON.parse(
      readFileSync(join(SEED_DIR, file), "utf-8")
    );
    for (const q of questions) {
      existingNormalizedPrompts.add(normalize(q.prompt));
      existingItems.push({ ...q, sourceFile: file });
    }
  }

  const deduped: Candidate[] = [];
  const rejects: Array<{ item: Candidate; reasonCode: string; detail: string }> = [];
  const nearDuplicateWarnings: Array<{ item: Candidate; matchedAgainst: string; matchedPrompt: string; similarity: number }> = [];
  const seenInBatch = new Set<string>();

  for (const item of candidates) {
    const norm = normalize(item.prompt);
    if (existingNormalizedPrompts.has(norm)) {
      rejects.push({ item, reasonCode: "duplicate", detail: `matches an existing question already in data/seed/*.json (checked all subjects)` });
      continue;
    }
    if (seenInBatch.has(norm)) {
      rejects.push({ item, reasonCode: "duplicate", detail: "duplicate within this batch" });
      continue;
    }
    seenInBatch.add(norm);

    // Near-duplicate warning: same answer text + heavy prompt overlap against
    // ANY existing item, regardless of subject/band. Non-blocking — see the
    // header comment for why this specific check exists.
    const itemAnswer = answerText(item);
    const itemTokens = tokenSet(item.prompt);
    if (itemAnswer) {
      for (const existing of existingItems) {
        if (answerText(existing) !== itemAnswer) continue;
        const sim = jaccard(itemTokens, tokenSet(existing.prompt));
        if (sim > 0.55) {
          nearDuplicateWarnings.push({
            item,
            matchedAgainst: existing.sourceFile,
            matchedPrompt: existing.prompt,
            similarity: Math.round(sim * 100) / 100,
          });
          break; // one match is enough to warn on this item
        }
      }
    }

    deduped.push(item);
  }

  writeFileSync(join(outputDir, "deduped.json"), JSON.stringify(deduped, null, 2));
  writeFileSync(join(outputDir, "rejects-step5.json"), JSON.stringify(rejects, null, 2));
  writeFileSync(join(outputDir, "near-duplicate-warnings.json"), JSON.stringify(nearDuplicateWarnings, null, 2));

  console.log(`Step 5 dedup: ${deduped.length} passed, ${rejects.length} rejected (checked against ${seedFiles.length} seed files: ${seedFiles.map((f) => basename(f)).join(", ")}).`);
  if (nearDuplicateWarnings.length > 0) {
    console.log(`  ${nearDuplicateWarnings.length} near-duplicate WARNING(s) written to near-duplicate-warnings.json — not auto-rejected, review before staging.`);
  }
}

main();
