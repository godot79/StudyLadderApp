// Step 7 completion — merge a signed-off staging.json into data/seed/<subject>.json.
//
// Only run this after a human has reviewed the batch's staging.json/summary.md
// and approved it (per the design doc, Step 7 is a blocking checkpoint — this
// script does not check for sign-off itself, it trusts it was already given).
// Strips the `subject` field on merge since data/seed/<subject>.json files
// don't carry it (the subject is implicit in the filename; prisma/seed.ts
// attaches it when writing to the DB). Re-checks for exact-duplicate prompts
// against the target file as a final safety net (Step 5 already checked this
// against ALL seed files, so this should be a no-op, but merging is a
// one-way append and cheap to double-check).
//
// Usage: npx tsx research/pipeline/scripts/merge.ts <staging.json> <subject>

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const SEED_DIR = join(__dirname, "..", "..", "..", "data", "seed");

function main() {
  const [, , stagingPath, subject] = process.argv;
  if (!stagingPath || !subject) {
    console.error("Usage: merge.ts <staging.json> <subject>");
    process.exit(1);
  }

  const seedPath = join(SEED_DIR, `${subject}.json`);
  const existing: any[] = JSON.parse(readFileSync(seedPath, "utf-8"));
  const staged: any[] = JSON.parse(readFileSync(stagingPath, "utf-8"));

  const existingPrompts = new Set(existing.map((q) => q.prompt));
  const toAppend = staged
    .filter((q) => !existingPrompts.has(q.prompt))
    .map(({ subject: _drop, ...rest }) => rest);

  const skipped = staged.length - toAppend.length;
  const merged = [...existing, ...toAppend];

  writeFileSync(seedPath, JSON.stringify(merged, null, 2) + "\n");

  console.log(`Merged ${toAppend.length} questions into ${seedPath} (${existing.length} -> ${merged.length}).`);
  if (skipped > 0) console.log(`Skipped ${skipped} that already matched an existing prompt exactly.`);
}

main();
