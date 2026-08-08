// Step 4 (fact path) — apply verdicts from an independent web-search cross-check.
//
// A plain script cannot itself perform the web-search cross-check the design
// doc requires (WebSearch is a tool, not a library) — so this step is a
// script+agent pair, same shape as Steps 1-3:
//   1. This script reads <batch-dir>/unverified-facts.json (written by
//      verify.ts) and prints/returns the list of factClaims that need
//      checking — hand this list to a cheap agent with instructions to
//      WebSearch each claim independently and judge it.
//   2. The agent writes <batch-dir>/fact-check-results.json: an array of
//      { prompt, verdict: "confirmed"|"contradicted"|"uncertain", note, source }
//      one entry per item in unverified-facts.json, matched by `prompt`.
//   3. This script (run with --apply) merges those verdicts: "confirmed"
//      items are marked factVerified:true and kept; "contradicted" or
//      "uncertain" items are pulled OUT of verified.json into
//      rejects-fact-check.json with reasonCode "fact-unverified" so a bad
//      fact never silently reaches staging.
//
// Usage:
//   List claims needing a check:
//     npx tsx research/pipeline/scripts/apply-fact-check.ts <batch-dir> --list
//   Apply verdicts after fact-check-results.json exists:
//     npx tsx research/pipeline/scripts/apply-fact-check.ts <batch-dir> --apply

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

type Candidate = {
  prompt: string;
  factClaim?: string;
  [key: string]: unknown;
};

type Verdict = {
  prompt: string;
  verdict: "confirmed" | "contradicted" | "uncertain";
  note: string;
  source?: string;
};

function main() {
  const [, , batchDir, mode] = process.argv;
  if (!batchDir || !["--list", "--apply"].includes(mode)) {
    console.error("Usage: apply-fact-check.ts <batch-dir> --list|--apply");
    process.exit(1);
  }

  const unverifiedPath = join(batchDir, "unverified-facts.json");
  if (!existsSync(unverifiedPath)) {
    console.error(`No ${unverifiedPath} found — nothing to fact-check (verify.ts may not have run, or this batch has no fact-based items).`);
    process.exit(1);
  }
  const unverified: Candidate[] = JSON.parse(readFileSync(unverifiedPath, "utf-8"));

  if (mode === "--list") {
    console.log(`${unverified.length} fact claim(s) need an independent web-search cross-check:\n`);
    for (const item of unverified) {
      console.log(`- PROMPT: ${item.prompt}`);
      console.log(`  CLAIM TO CHECK: ${item.factClaim}\n`);
    }
    console.log(
      `Hand this list to an agent with WebSearch access. Instructions for that agent:\n` +
        `For each claim, run an independent web search (do not rely on memory alone) and judge whether\n` +
        `it is confirmed, contradicted, or uncertain/unclear from available sources. Write the results to\n` +
        `${join(batchDir, "fact-check-results.json")} as a JSON array of objects:\n` +
        `{ "prompt": "<exact prompt text from the list above>", "verdict": "confirmed"|"contradicted"|"uncertain", "note": "<1-2 sentence rationale>", "source": "<url or description of what was checked>" }\n` +
        `One entry per claim above, matched by exact prompt text. Then re-run this script with --apply.`
    );
    return;
  }

  // --apply
  const resultsPath = join(batchDir, "fact-check-results.json");
  if (!existsSync(resultsPath)) {
    console.error(`No ${resultsPath} found — run the fact-check agent first (see --list output for instructions).`);
    process.exit(1);
  }
  const results: Verdict[] = JSON.parse(readFileSync(resultsPath, "utf-8"));
  const verdictByPrompt = new Map(results.map((r) => [r.prompt, r]));

  const verifiedPath = join(batchDir, "verified.json");
  const verified: Candidate[] = existsSync(verifiedPath) ? JSON.parse(readFileSync(verifiedPath, "utf-8")) : [];

  const confirmed: Candidate[] = [];
  const rejected: Array<{ item: Candidate; reasonCode: string; detail: string }> = [];
  const missingVerdict: Candidate[] = [];

  for (const item of verified) {
    const isFactItem = unverified.some((u) => u.prompt === item.prompt);
    if (!isFactItem) {
      confirmed.push(item); // not a fact item (e.g. maths) — pass through untouched
      continue;
    }
    const verdict = verdictByPrompt.get(item.prompt);
    if (!verdict) {
      missingVerdict.push(item);
      continue;
    }
    if (verdict.verdict === "confirmed") {
      confirmed.push({ ...item, factVerified: true, factCheckSource: verdict.source });
    } else {
      rejected.push({
        item,
        reasonCode: "fact-unverified",
        detail: `Web-search cross-check verdict: ${verdict.verdict}. ${verdict.note}${verdict.source ? ` (source: ${verdict.source})` : ""}`,
      });
    }
  }

  // A "confirmed" verdict can still carry a substantive caveat (e.g. the
  // claim is true but the question's distractors are incomplete/misleading
  // given it) — a binary confirmed/rejected split would silently swallow
  // that. Surface it instead of trusting the verdict label alone.
  const caveatPattern = /\bhowever\b|\bincomplete\b|\bnuance\b|\bimportant\b|\bcaveat\b|\bmisleading\b|\boversimplif/i;
  const caveats = results.filter((r) => r.verdict === "confirmed" && caveatPattern.test(r.note));

  writeFileSync(verifiedPath, JSON.stringify(confirmed, null, 2));
  writeFileSync(join(batchDir, "rejects-fact-check.json"), JSON.stringify(rejected, null, 2));
  writeFileSync(join(batchDir, "fact-check-caveats.json"), JSON.stringify(caveats, null, 2));

  console.log(`Fact-check applied: ${confirmed.length} confirmed/pass-through, ${rejected.length} rejected (contradicted or uncertain).`);
  if (caveats.length > 0) {
    console.log(`\nWARNING: ${caveats.length} item(s) were marked "confirmed" but the verdict note itself flags a caveat — these passed the binary check but need a human look before merge (see fact-check-caveats.json):`);
    for (const c of caveats) console.log(`  - "${c.prompt.slice(0, 70)}..."\n    ${c.note}`);
  }
  if (missingVerdict.length > 0) {
    console.log(`WARNING: ${missingVerdict.length} fact item(s) had no matching verdict in fact-check-results.json (prompt text mismatch?) — left unchanged in verified.json, NOT cleared for staging. Check prompt text matches exactly.`);
  }
  if (rejected.length > 0) {
    console.log("Rejected:", rejected.map((r) => `"${r.item.prompt.slice(0, 60)}..." — ${r.detail}`).join("\n  "));
  }
}

main();
