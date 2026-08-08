# Ingestion batch summary

**Source:** UK KS2 English Reading test, May 2025
**Subject:** english
**Batch directory:** research/pipeline/uk-ks2-english-reading-2025

## Status

**Blocked on passage support until 2026-08-08; unblocked once
`docs/passage-support-design.md` was implemented and merged (commit
`540d68b`).** This batch skipped the normal Steps 4-5 automation — see
"Deviation from standard pipeline" below — and went straight from
`02-transformed.json` to a hand-built `staging.json`.

## Deviation from standard pipeline

`research/pipeline/scripts/verify.ts` (Step 4) has no correctness-check
path for reading-comprehension items: it only understands
`answerType: "fraction"`, `"fact"` (web-search fact-checked), or plain
numeric (`checkExpression`). This batch's 8 items use descriptive
`answerType` values (`vocabulary-in-context`, `inference`, `sequencing`,
etc.) that match none of those paths — running `verify.ts` would reject
all 8 as "missing checkExpression/expectedValue." `"fact"` would also be
semantically wrong: fact-checking correctness against the *real world*
via web search makes no sense for a fictional passage, where correctness
is checked against the passage text itself.

**Resolution taken:** all 8 items were verified by hand against the full
passage text (already present in the batch's `02-transformed.json`) —
checked each correct answer is supported by an explicit passage quote or
inference, and each distractor is contradicted or unsupported by the
text. All 8 passed. `dedup.ts`/`self-audit.ts`/`stage.ts` were also
skipped (built around the numeric/fact schema) — duplicate-checked by
hand against `data/seed/english.json` (`grep` for passage/character
names — no overlap) instead.

This is a known gap, not fixed generally in this batch — a future
reading-comprehension source will hit the same wall unless `verify.ts`
gets a real passage-comprehension path. Flagged here rather than in
`research/pipeline/README.md`'s "Known gaps" section pending a decision
on whether to build that path.

## Copyright risk — flagged explicitly, human-approved to proceed

`01-source-note.json` (written at Step 1) flags this source as
**higher-risk than the pipeline's other sources**: the STA's Open
Government Licence covers question stems but explicitly excludes the
three reading passages themselves, and — critically — the real passage
text was never extracted (WebFetch failed on the source PDF). The
Step 2-3 rewrite agent was given only the answer booklet's quoted
question text (enough to infer plot beats) and instructed to write an
entirely new story, not reconstruct/paraphrase the original.

Note: `research/pipeline/README.md`'s "What changed from the original
design" section characterizes the resolution as "wholly original
passages," which is a stronger claim than `01-source-note.json`'s "heavy
rewrite... rather than... writing wholly original passages" — these two
batch documents were inconsistent with each other. Human review
(2026-08-08) compared the produced passage ("The Hidden Workshop": Maya,
her grandmother, a woodworking shed) against the three real STA passage
titles ("A Life-changing Game," "In the Cave," "Longbow Girl") — no
shared title, characters, or plot — and approved proceeding on the basis
that, since the real passage was never seen by anyone in this pipeline,
there is no concrete source text this could have paraphrased from.

## Funnel

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall, across all 3 source passages) | 40 |
| Carried into stylistic transformation (Step 3) — one passage's worth | 8 |
| Verified (manual passage cross-check, not `verify.ts`) | 8 |
| Deduplicated (manual check against `data/seed/english.json`) | 8 |
| **Approved for staging (human sign-off, Step 7)** | **8** |

Only 1 of the 3 source passages (13/14/13 questions each) was carried
through Steps 2-3 in the round-3 run — the other two passages' items were
not transformed and are not part of this batch.

## Self-audit flags

Not run (self-audit.ts is tuned for numeric/fact items; skipped per
"Deviation from standard pipeline" above). Manually reviewed instead:
answer-position distribution is B,C,B,B,C,C,C,B (correctOption) — some
concentration on B/C, worth a human eye but not evidence of a mechanical
pattern (matches genuine reading-comprehension answer distribution, not
a rewrite artifact).

## Subject / topic / age-band breakdown

- Subject: english (8/8)
- Topic: reading comprehension (vocabulary-in-context, inference,
  sequencing, character motivation, evidence-based x2, fact-check x2)
- Age band: Age 9 (8/8)
- passageId: `uk-ks2-2025-passage-1` (all 8 share one passage)

## Human review

First batch from this source (100% review per sampling guidance).
Staged in `staging.json` — not yet merged into `data/seed/english.json`.
Approved for merge 2026-08-08 after manual answer verification and the
copyright-risk discussion above.
