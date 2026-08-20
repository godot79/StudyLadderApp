// Step 7 — Human checkpoint staging output, plus Step 8 — funnel logging.
//
// Combines the two into one script for this pilot: writes the approved batch
// to a staging file (NOT into data/seed/*.json — nothing merges automatically)
// and a summary with the full step-by-step funnel and topic/band breakdown.
//
// Usage: npx tsx research/pipeline/scripts/stage.ts <batch-dir> <default-subject> <source-name>
// <default-subject> is used only for items that don't carry their own `subject`
// field (single-subject batches, e.g. the maths pilot). Batches with
// per-item subject classification (e.g. a science source split into
// geography/general-science) are grouped by each item's own subject.
// Reads <batch-dir>/{01-extracted-classified.json (optional), 02-transformed.json,
//   verified.json, rejects-step4.json, deduped.json, rejects-step5.json,
//   unverified-facts.json (optional)}
// Writes <batch-dir>/staging-<subject>.json for each subject present,
// plus <batch-dir>/staging.json (all subjects concatenated, back-compat)
// and <batch-dir>/summary.md

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

type QuestionOut = {
  subject: string;
  levelBand: string;
  prompt: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  explanation?: string;
  passage?: string;
  passageId?: string;
  image?: string;
  imageAlt?: string;
};

function readJsonIfExists<T>(path: string, fallback: T): T {
  return existsSync(path) ? JSON.parse(readFileSync(path, "utf-8")) : fallback;
}

function main() {
  const [, , batchDir, subject, sourceName] = process.argv;
  if (!batchDir || !subject || !sourceName) {
    console.error("Usage: stage.ts <batch-dir> <subject> <source-name>");
    process.exit(1);
  }

  const transformed = readJsonIfExists<any[]>(join(batchDir, "02-transformed.json"), []);
  const rejectsStep4 = readJsonIfExists<any[]>(join(batchDir, "rejects-step4.json"), []);
  const deduped = readJsonIfExists<any[]>(join(batchDir, "deduped.json"), []);
  const rejectsStep5 = readJsonIfExists<any[]>(join(batchDir, "rejects-step5.json"), []);
  const extracted = readJsonIfExists<any>(join(batchDir, "01-extracted-classified.json"), null);
  const auditFlags = readJsonIfExists<any[]>(join(batchDir, "audit-flags.json"), []);
  const nearDuplicateWarnings = readJsonIfExists<any[]>(join(batchDir, "near-duplicate-warnings.json"), []);
  const unverifiedFacts = readJsonIfExists<any[]>(join(batchDir, "unverified-facts.json"), []);
  const unverifiedFactPrompts = new Set(unverifiedFacts.map((f) => f.prompt));

  const staging: QuestionOut[] = deduped.map((item) => ({
    subject: item.subject ?? subject,
    levelBand: item.levelBand,
    prompt: item.prompt,
    optionA: item.optionA,
    optionB: item.optionB,
    optionC: item.optionC,
    optionD: item.optionD,
    correctOption: item.correctOption,
    explanation: item.explanation,
    ...(item.passage ? { passage: item.passage, passageId: item.passageId } : {}),
    ...(item.image ? { image: item.image, imageAlt: item.imageAlt } : {}),
  }));

  writeFileSync(join(batchDir, "staging.json"), JSON.stringify(staging, null, 2));

  const bySubject = new Map<string, QuestionOut[]>();
  for (const q of staging) {
    if (!bySubject.has(q.subject)) bySubject.set(q.subject, []);
    bySubject.get(q.subject)!.push(q);
  }
  for (const [subj, qs] of bySubject) {
    writeFileSync(join(batchDir, `staging-${subj}.json`), JSON.stringify(qs, null, 2));
  }

  const topicCounts = new Map<string, number>();
  for (const item of deduped) {
    topicCounts.set(item.topic, (topicCounts.get(item.topic) ?? 0) + 1);
  }
  const bandCounts = new Map<string, number>();
  for (const item of deduped) {
    bandCounts.set(item.levelBand, (bandCounts.get(item.levelBand) ?? 0) + 1);
  }

  const allRejects = [...rejectsStep4, ...rejectsStep5];
  const rejectReasonCounts = new Map<string, number>();
  for (const r of allRejects) {
    rejectReasonCounts.set(r.reasonCode, (rejectReasonCounts.get(r.reasonCode) ?? 0) + 1);
  }

  const foundCount = extracted?.recallVsDeferred?.totalFound ?? "n/a";
  const deferredCount = extracted?.recallVsDeferred?.deferred ?? "n/a";

  const summary = `# Ingestion batch summary

**Source:** ${sourceName}
**Subject:** ${subject}
**Batch directory:** ${batchDir}

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | ${foundCount} |
| Deferred at classification (Step 2 — not transformed this batch) | ${deferredCount} |
| Carried into stylistic transformation (Step 3) | ${transformed.length} |
| Passed correctness verification (Step 4) | ${transformed.length - rejectsStep4.length} |
| Passed deduplication (Step 5) | ${deduped.length} |
| **Approved for staging (awaiting human sign-off, Step 7)** | **${staging.length}** |

## Rejections by reason code (Step 6)

${allRejects.length === 0 ? "None." : [...rejectReasonCounts.entries()].map(([code, count]) => `- \`${code}\`: ${count}`).join("\n")}

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

${auditFlags.length === 0 ? "None raised." : auditFlags.map((f: any) => `- **[${f.severity}] ${f.check}:** ${f.detail}`).join("\n")}

## Near-duplicate warnings (Step 5.5 — mechanical, non-blocking)

${
  nearDuplicateWarnings.length === 0
    ? "None raised."
    : nearDuplicateWarnings
        .map(
          (w: any) =>
            `- **[${Math.round(w.similarity * 100)}% overlap, same answer]** "${w.item.prompt}" (${w.item.levelBand}) closely resembles an existing item in \`${w.matchedAgainst}\`: "${w.matchedPrompt}". If this is the same fact just reworded across bands, it's not adding real difficulty — consider dropping it rather than staging it.`
        )
        .join("\n")
}

## Fact verification status

${
  unverifiedFacts.length === 0
    ? "N/A — this batch has no fact-based (non-computable) items, or all fact items have already been independently verified."
    : `**${deduped.filter((d) => unverifiedFactPrompts.has(d.prompt)).length} of ${staging.length} staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see \`unverified-facts.json\` for the \`factClaim\` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.`
}

## Subject breakdown (approved items, may span multiple subjects in one source)

${[...bySubject.entries()].map(([subj, qs]) => `- ${subj}: ${qs.length} (staging-${subj}.json)`).join("\n")}

## Topic breakdown (approved items)

${[...topicCounts.entries()].map(([topic, count]) => `- ${topic}: ${count}`).join("\n")}

## Age-band breakdown (approved items)

${[...bandCounts.entries()].map(([band, count]) => `- ${band}: ${count}`).join("\n")}

## Human review

Staged questions are in \`staging.json\` in this directory — **not yet merged into \`data/seed/${subject}.json\`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
`;

  writeFileSync(join(batchDir, "summary.md"), summary);
  console.log(`Staged ${staging.length} questions -> ${join(batchDir, "staging.json")}`);
  console.log(`Summary written -> ${join(batchDir, "summary.md")}`);
}

main();
