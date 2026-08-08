// Step 5 — Deduplication.
//
// - Exact-match check against every subject file in data/seed/*.json (not just
//   the target subject — a rewritten question could collide with a different
//   subject by accident).
// - Same-subject/same-band near-duplicate check within the incoming batch
//   itself and against existing seed content: normalized prompt string
//   (lowercase, whitespace-collapsed, punctuation-stripped) equality. This is
//   a simple normalized-match check, not a fuzzy semantic-similarity model —
//   documented limitation, sufficient to catch trivial near-duplicates
//   (same question, different capitalization/spacing) but not paraphrases.
//
// Usage: npx tsx research/pipeline/scripts/dedup.ts <verified.json> <subject> <output-dir>
// Writes <output-dir>/deduped.json and <output-dir>/rejects-step5.json

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, basename } from "path";

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

  // Load every existing seed file's prompts (cross-subject exact check).
  const existingNormalizedPrompts = new Set<string>();
  const seedFiles = readdirSync(SEED_DIR).filter((f) => f.endsWith(".json"));
  for (const file of seedFiles) {
    const questions: Array<{ prompt: string }> = JSON.parse(readFileSync(join(SEED_DIR, file), "utf-8"));
    for (const q of questions) existingNormalizedPrompts.add(normalize(q.prompt));
  }

  const deduped: Candidate[] = [];
  const rejects: Array<{ item: Candidate; reasonCode: string; detail: string }> = [];
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
    deduped.push(item);
  }

  writeFileSync(join(outputDir, "deduped.json"), JSON.stringify(deduped, null, 2));
  writeFileSync(join(outputDir, "rejects-step5.json"), JSON.stringify(rejects, null, 2));

  console.log(`Step 5 dedup: ${deduped.length} passed, ${rejects.length} rejected (checked against ${seedFiles.length} seed files: ${seedFiles.map((f) => basename(f)).join(", ")}).`);
}

main();
