# Resume prompt

Paste the text below into a fresh session to pick this work back up.

---

Read `research/pipeline/NEXT-ROUND-NOTES.md` and `research/pipeline/README.md` first — state as of 2026-08-13 (git log is authoritative over anything below if they conflict):

- `data/seed/*.json` sizes: maths 360, english 271, geography 261, science 343 (now the largest, was thinnest for months), space 216.
- Thinnest single cell bank-wide: science's Age 9 High Achiever (7 items, everything else in that column across subjects is 21-53).
- History/politics/civics content gap is confirmed real (only ~12 items anywhere, all US-specific, living inside geography.json) but the subject-scope decision (dedicated file vs. fold into geography vs. leave thin) is still NOT made — don't source content for this until it is.
- `dedup.ts` only checks a batch against `data/seed/*.json`, not against sibling batches running in the same parallel round — this has been caught by an ad-hoc manual script each round, never promoted into an actual pipeline script.
- Standing rule still applies: no Prisma schema changes without asking first; new subject seed files are not pre-approved.

Four independent threads to run in parallel this session, none blocking the others:

**1. Cross-batch dedup script (mechanical, low-cost bot).** Promote the ad-hoc cross-batch near-duplicate check (token-Jaccard + same-correct-answer-text, run manually after the last two multi-source rounds) into a real script under `research/pipeline/scripts/`. It should run once at the end of a round, after all that round's batches are staged, comparing every batch's `staging.json` against every other batch's in the same round (not just against `data/seed/*.json`, which `dedup.ts` already covers). Non-blocking output (a warnings file), same philosophy as the existing near-duplicate check in `dedup.ts`. Wire it into the round workflow docs (`README.md`, `ROUND-AGENT-PROMPT-TEMPLATE.md`) once built. This is pure mechanical work — a cheap/haiku agent can implement and test it against the existing merged batch directories in `research/pipeline/*/staging.json` as fixtures.

**2. Another Age 9 High Achiever science round (mechanical extraction, low-cost bot per source; you make the merge call).** NY Grade 4 sources have twice proven to be the right lever (2019, 2021 admins both landed genuine Age 9 HA items). Check the NY elementary-science archive index for any admin year not yet mined (2019, 2021, 2022 done — check 2023/2024/2025). If none exist, this thread is exhausted for NY specifically — consider a different country's native-Grade-4-equivalent source with full released item text (not just an answer key — see the California CAST dead end in git history for what to avoid). Use `research/pipeline/ROUND-AGENT-PROMPT-TEMPLATE.md` verbatim, targeting Age 9 High Achiever explicitly. Extraction/rewrite is cheap-bot work; you still do the human review/merge step yourself, same as every prior round — don't skip that even though it's tempting to batch it with the other threads.

**3. History/politics/civics scope decision (needs you, not a bot).** This is a real product decision, not mechanical work — a cheap bot shouldn't make it. Options to choose between: (a) leave it folded into geography as-is and stop treating it as a gap, (b) create a dedicated `data/seed/history.json` (or similar) subject file, (c) actively decide to leave it thin and not source for it. Once decided, update `docs/subject-taxonomy-and-question-bank.md` and `research/ingestion_pipeline_design.md`'s Open Items to reflect the decision, then (if (b)) that unblocks sourcing for it as a normal round later — don't source content in the same session as making this decision, to keep the decision and its consequences reviewable separately.

**4. maths/english/geography High Achiever audit (mechanical, low-cost bot).** These three haven't been touched by the pipeline in months and were never audited for the recall-vs-reasoning and cross-band-duplicate defects that were found and fixed in science/space on 2026-08-10 — that audit only covered science originally, then space/geography got a light pass. Run the same audit (self-audit.ts's recall-not-reasoning logic conceptually, plus a cross-band token-Jaccard duplicate check) against maths.json and english.json specifically, which have never been checked. This is read-only analysis a cheap bot can do reliably; have it report findings as a list for you to review and fix by hand (same pattern as the space/geography fixes), not auto-apply changes.

When launching parallel work, prefer background `Agent` calls (multiple in one message so they actually run concurrently) with `model: haiku` for threads 1, 2's extraction, and 4 — thread 3 is yours to decide, not delegate. Report back to the user with a consolidated status across all four threads rather than one at a time, since they explicitly asked for parallel handling.
