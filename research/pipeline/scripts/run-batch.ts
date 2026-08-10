// Orchestrator for Steps 4-8 (everything after stylistic transformation).
// Steps 1-3 (extraction, classification, rewrite) are NOT automated here —
// per the agreed approach, those are done per-source (currently by Claude
// directly reading the source; the plan is to move this to cheap subagents
// once this deterministic half of the pipeline is trusted) and must produce
// a `02-transformed.json` in the batch directory before this script runs.
//
// Usage: npx tsx research/pipeline/scripts/run-batch.ts <batch-dir> <subject> <source-name>
//
// Requires <batch-dir>/02-transformed.json to already exist.
// Produces: verified.json, rejects-step4.json, deduped.json, rejects-step5.json,
//           near-duplicate-warnings.json, audit-flags.json, staging.json, summary.md
// Does NOT merge into data/seed/*.json — that is a separate, explicit step
// (scripts/merge.ts) taken only after human sign-off (Step 7).

import { execFileSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";

function run(script: string, args: string[]) {
  console.log(`\n--- ${script} ---`);
  execFileSync("npx", ["tsx", join(__dirname, script), ...args], { stdio: "inherit" });
}

function main() {
  const [, , batchDir, subject, sourceName] = process.argv;
  if (!batchDir || !subject || !sourceName) {
    console.error("Usage: run-batch.ts <batch-dir> <subject> <source-name>");
    process.exit(1);
  }
  const transformedPath = join(batchDir, "02-transformed.json");
  if (!existsSync(transformedPath)) {
    console.error(`Missing ${transformedPath} — run Steps 1-3 (extraction/classification/rewrite) first.`);
    process.exit(1);
  }

  run("verify.ts", [transformedPath, batchDir]);
  run("dedup.ts", [join(batchDir, "verified.json"), subject, batchDir]);
  run("self-audit.ts", [join(batchDir, "deduped.json"), batchDir]);
  run("stage.ts", [batchDir, subject, sourceName]);

  console.log(`\nBatch staged. Review ${join(batchDir, "summary.md")} and ${join(batchDir, "staging.json")}.`);
  console.log(`When approved: npx tsx research/pipeline/scripts/merge.ts ${join(batchDir, "staging.json")} ${subject}`);
}

main();
