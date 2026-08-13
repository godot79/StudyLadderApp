// Cross-batch dedup — run once at the end of a parallel round, across all
// that round's batches together (dedup.ts only checks one batch against
// data/seed/*.json as it existed when that batch ran; it can never see a
// sibling batch running in parallel in a different worktree — see
// NEXT-ROUND-NOTES.md 2026-08-12 #3).
//
// Same philosophy/thresholds as dedup.ts's near-duplicate check: non-blocking,
// writes warnings for Step 7 human review, never auto-rejects. Checks every
// pair of staged items across ALL given batches (not just each batch's own
// output) via token-Jaccard on prompt + same-correct-answer-text.
//
// Usage: npx tsx research/pipeline/scripts/cross-batch-dedup.ts <batch-dir> [<batch-dir> ...]
//   Reads <batch-dir>/staging.json from each (falls back to deduped.json if
//   staging.json doesn't exist yet). Writes cross-batch-duplicate-warnings.json
//   into the CURRENT working directory (or pass a specific out path as the
//   first arg with --out=<path>).

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, basename } from "path";

const STOPWORDS = new Set(["earth's", "a", "the", "our", "earth", "planet's", "planet"]);

function tokenSet(prompt: string): Set<string> {
  return new Set(
    prompt
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((t) => t && !STOPWORDS.has(t))
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const t of a) if (b.has(t)) intersection++;
  return intersection / (a.size + b.size - intersection);
}

function answerText(q: Record<string, unknown>): string {
  const letter = q.correctOption as string | undefined;
  if (!letter) return "";
  const val = q[`option${letter}`];
  return typeof val === "string" ? val.trim().toLowerCase() : "";
}

type Item = Record<string, unknown> & { prompt: string };
type Loaded = { batch: string; item: Item };

function main() {
  const args = process.argv.slice(2);
  let outPath = join(process.cwd(), "cross-batch-duplicate-warnings.json");
  const batchDirs: string[] = [];
  for (const a of args) {
    if (a.startsWith("--out=")) outPath = a.slice("--out=".length);
    else batchDirs.push(a);
  }
  if (batchDirs.length < 2) {
    console.error("Usage: cross-batch-dedup.ts <batch-dir> <batch-dir> [...] [--out=path]");
    console.error("(need at least 2 batch dirs — this checks across batches, not within one)");
    process.exit(1);
  }

  const loaded: Loaded[] = [];
  for (const dir of batchDirs) {
    const stagingPath = join(dir, "staging.json");
    const dedupedPath = join(dir, "deduped.json");
    const path = existsSync(stagingPath) ? stagingPath : dedupedPath;
    if (!existsSync(path)) {
      console.error(`Skipping ${dir}: no staging.json or deduped.json found`);
      continue;
    }
    const items: Item[] = JSON.parse(readFileSync(path, "utf-8"));
    for (const item of items) loaded.push({ batch: basename(dir), item });
  }

  const warnings: Array<{
    batchA: string; promptA: string;
    batchB: string; promptB: string;
    similarity: number;
  }> = [];

  for (let i = 0; i < loaded.length; i++) {
    for (let j = i + 1; j < loaded.length; j++) {
      const a = loaded[i], b = loaded[j];
      if (a.batch === b.batch) continue; // within-batch already handled by dedup.ts
      const ansA = answerText(a.item);
      const ansB = answerText(b.item);
      if (!ansA || ansA !== ansB) continue;
      const sim = jaccard(tokenSet(a.item.prompt), tokenSet(b.item.prompt));
      if (sim > 0.55) {
        warnings.push({
          batchA: a.batch, promptA: a.item.prompt as string,
          batchB: b.batch, promptB: b.item.prompt as string,
          similarity: Math.round(sim * 100) / 100,
        });
      }
    }
  }

  writeFileSync(outPath, JSON.stringify(warnings, null, 2));
  console.log(`Cross-batch dedup: checked ${loaded.length} items across ${batchDirs.length} batches.`);
  if (warnings.length > 0) {
    console.log(`  ${warnings.length} cross-batch near-duplicate WARNING(s) written to ${outPath} — not auto-rejected, review before merging either batch.`);
  } else {
    console.log(`  No cross-batch near-duplicates found.`);
  }
}

main();
