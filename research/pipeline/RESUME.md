# Resume prompt

Paste the text below into a fresh session to pick this work back up.

---

Read `research/pipeline/NEXT-ROUND-NOTES.md` and `research/pipeline/README.md` first — state as of 2026-08-13 (git log is authoritative over anything below if they conflict; latest commits are `0cf29ac` and `cfcea6e`).

**Closed out this session:**
- Cross-batch dedup script built (`research/pipeline/scripts/cross-batch-dedup.ts`), wired into README.md/ROUND-AGENT-PROMPT-TEMPLATE.md.
- Answer-position rebalancing is now automatic (`research/pipeline/scripts/rebalance.ts`, Step 5.7 in `run-batch.ts`, runs between dedup and self-audit). Don't hand-rebalance option order anymore — it happens deterministically every run, and self-audit's position-bias flag should now rarely fire. If it does fire on a future batch, that's a real signal something's wrong with rebalance.ts's output, not routine.
- History/politics/civics: **decided** — dedicated `history.json` subject approved (not folded into geography, not left thin). Documented in `docs/subject-taxonomy-and-question-bank.md` and `research/ingestion_pipeline_design.md`. **Not implemented yet** — no seed file, no `SUBJECTS` entry, no `prisma/seed.ts` wiring, the ~10-12 existing items are still sitting inside `geography.json` unmigrated, and no content has been sourced for it. This is real follow-up work, not just documentation.
- English High Achiever recall-vs-reasoning audit: found and fixed. 50 items rewritten from bare definitional recall ("What is a simile?") to application format across Age 9/10/11 HA bands; oxymoron cross-band duplicate resolved. Maths audited clean, no changes needed.
- Source catalog reprioritized: `research/source_catalog.md` now leads with an archive-vs-single-paper priority section. Confirmed dead ends: NY G4 science has no admin after 2022; Texas STAAR 2024+ is online-only (no PDF); CA/MA/UK/Australia/France/Germany don't test science at Grade 4 at all.
- Ran a full round against the newly-scouted NY State Regents archive: NY Grade 4 Science, June 2018 (nearest unmined year). 30 items extracted, fact-checked (30/30 confirmed), deduped, merged: `data/seed/science.json` 343→370, `data/seed/space.json` 216→219. Age 9 High Achiever went 7→8 (modest — most of this admin's content was genuine plain-band recall, correctly not padded into HA).

**Current seed sizes:** maths 360, english 271 (content unchanged by the HA rewrite, still 271), geography 261, science 370, space 219.

**Still the thinnest cell bank-wide:** science's Age 9 High Achiever, now at 8 (was 7) — still far below other subjects' 21-53. The NY Grade 4 Science well is now confirmed dry (no admin after 2022); further gains on this specific cell need either a different grade-4-equivalent source (scouting already ruled out most obvious countries — see source_catalog.md's dead-ends list) or accepting the ceiling.

**Scouted and ranked, not yet run:**
1. **NY State Regents/EI archive** — largest remaining opportunity, and NOT just for science. ELA and Math at every grade 3-8 are essentially untouched (only a couple of science years and 2 social-studies years have ever been pulled from this archive). This is the natural next target for rebalancing maths/english specifically, since those subjects haven't been touched by the pipeline in many rounds. Also still worth checking whether NY Grade 4 *ELA* or *Math* would be a good next batch here — the science well from this archive+grade combo is dry, but Math/ELA at Grade 4 (or other grades 3-8) are wide open.
2. **Hong Kong TSA/BCA** (`bca.hkeaa.edu.hk`) — archive actually runs 2004-2026 (deeper than the catalog previously documented), P3 and P6, multiple subjects per grade/year. Only one form/year (2023 P3) has ever been mined; P6 is completely untouched. Byte-range concurrent-fetch trick documented in source_catalog.md's HK section is required (server rate-limits serial connections to ~4KB/s) — re-confirm it still works before assuming.
3. **MCAS** — 8 admin years (2019-2026) live; Grade 3/4 Math and Grade 3/4/5 ELA all exist as released PDFs and are untouched (only G5 Science/Math and G8 Science have been mined so far). Lower setup cost than a new source since MCAS is already proven through this pipeline.

Not prioritized: Texas STAAR (real but narrower remaining pool, pre-2023 PDFs only, doesn't touch the science HA gap). Japan MEXT / Taiwan NTCU (structurally real archives but need more legwork before a first pilot — MEXT's index doesn't expose files directly, both carry translation risk) — worth a dedicated pilot round eventually, not the next one.

**Next natural move:** run NY State Regents Grade 4 (or another grade 3-8) Math or ELA — this is the biggest un-mined pool in the catalog and directly serves the "maths/english haven't been targeted in months" gap. Use `research/pipeline/ROUND-AGENT-PROMPT-TEMPLATE.md` verbatim, `model: sonnet` (this session found haiku's classification/rewrite pass needs a second pass to catch every audit-list item — sonnet did the extraction+staging round more reliably end-to-end). Remember: the pipeline now includes automatic rebalancing (Step 5.7) — don't have the agent hand-roll a rebalance script, that's exactly the stale-summary bug this session fixed.

**Standing rules still apply:** no Prisma schema changes without asking first; the `history.json` subject is approved in principle but its actual implementation (schema/UI wiring, migrating the ~10-12 existing geography.json items, first content batch) still needs to be proposed and scoped as its own task, not assumed pre-approved for silent implementation.
