# Notes for the next ingestion round

Written 2026-08-12 after merging STAAR G5 Science 2023, MCAS G8 Science 2025, NY G4 Science 2021, and STAAR G8 Science 2023 (105 items, 96→science, 9→space). Overwrites the previous version — that round's lessons (recall-vs-reasoning check, near-duplicate check, level-band rules) are now baked into `ROUND-AGENT-PROMPT-TEMPLATE.md` and the pipeline scripts, so they don't need repeating here.

---

## 1. Worktree agents branch from `origin`, not local HEAD — push before spawning

Two agents in the previous round got stale copies of `dedup.ts`/`self-audit.ts` because their worktrees branched from `origin/master`, which was several commits behind local `master` at launch time. One agent noticed and flagged it; the other didn't, and its batch had to be re-run against current scripts after the fact. **Push local `master` to `origin` before spawning any worktree-isolated agent round** — this was done before this round (confirmed both new checks ran cleanly and produced real output: a near-duplicate warning and 2 age-band-mismatch flags, both correctly triaged). If you forget to push, don't trust a clean self-audit/dedup run from that batch — re-run the deterministic pipeline steps (`dedup.ts`, `self-audit.ts`, `stage.ts`) against current scripts once the batch is copied into the main repo, before reviewing.

## 2. Don't assume a grade/subject combination exists — verify the test itself, not just the URL

Assigned Texas STAAR Grade 4 Science this round; the agent correctly reported that Texas doesn't administer STAAR Science at Grade 4 at all (only 5, 8, and Biology EOC) and stopped without fabricating anything. This wasn't a dead-URL problem — the test itself doesn't exist. Before assigning a source, spend one search confirming the state/country actually tests that subject at that grade, not just that the exam board's domain is live. Cheap to check, saves a wasted agent run.

## 3. Cross-batch duplicates are a real risk when running sources in parallel

`dedup.ts` (per-batch) only checks a batch against `data/seed/*.json` as it existed when that batch ran — it can't see a sibling batch running in parallel in a different worktree. Four batches ran in parallel this round with zero cross-batch duplicates found on a manual pairwise check afterward, but that was verified, not assumed — do this every multi-batch round:
```python
# token-Jaccard + same-correct-answer-text check across every pair of
# staged items from all batches in the round, not just each batch's own
# dedup.ts output — see this round's session for the exact script.
```
This is a real gap in the pipeline (dedup.ts operates per-batch, not per-round) — worth eventually promoting into a script rather than an ad-hoc check, if parallel rounds keep happening.

## 4. Remaining gaps in the question bank (checked 2026-08-12)

- **science.json is now the largest subject (343 items)**, having been the thinnest for the last several rounds — the deliberate targeting worked.
- **Age 9 High Achiever is still the thinnest single cell across the whole bank**: science at 7 (up from 2, still far below other subjects' 36-53), though NY Grade 4 sources have now twice proven to be the right lever for it (native grade + explicit routing instruction). Worth a third NY G4 admin (2023/2024/2025, if any exist beyond 2019/2021/2022 already mined) or a first attempt at a different country's native-Grade-4-equivalent source, if one exists with full released item text (not just an answer key, per the California CAST dead end).
- **space.json (216 items) is now the second-thinnest subject**, and its content still has never come from a source built specifically for space — it's grown entirely as a byproduct of classifying Earth-and-Space items out of general science tests (explicitly instructed this round, worked: 9 of 105 items landed there). This is fine and probably the correct long-term strategy given the source catalog's own finding that no dedicated space-content source exists anywhere — but it means space's growth rate is capped by how much Earth-and-Space content happens to appear in whatever science source gets picked next, not something you can target directly by picking a "space" source.
- **History/politics/civics gap from the 2026-08-10 note is still open** and still not resolved: no subject-scope decision has been made (dedicated subject vs. folding further into geography vs. deliberately leaving thin). Do not source content for this until that decision is made — see `research/ingestion_pipeline_design.md`'s Open Items.
- **maths/english/geography (261-360 items each) haven't been touched in several rounds** — all the recent rounds targeted science specifically. They're not urgent, but if science's gap keeps closing, the next natural rebalancing target is whichever of these three has the thinnest High Achiever band, not automatically "the next science source."
