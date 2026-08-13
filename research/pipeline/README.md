# Ingestion pipeline — how to run a batch

Status: piloted twice, a third round of 3 sources run in parallel, then a
fourth round (single source, deliberately not parallelized) for Texas STAAR.

7. Three sources run in parallel (round 7), deliberately targeting Grade 8
   admins of sources already proven reliable (MCAS, STAAR) plus a new NY
   Grade 4 admin, specifically to close two gaps flagged after round 6:
   science volume and zero "High Achiever" band coverage. MCAS Grade 8
   Science and Technology/Engineering Spring 2023 (14 usable items — the
   previously-abandoned MCAS Grade 5 Science Spring 2023 PDF was a *different*
   grade/admin and remains untouched; this Grade 8 source is unrelated and
   extracted cleanly), Texas STAAR Grade 8 Science May 2022 (33 usable items,
   9 deferred as image-dependent — topographic map, H-R diagram, weather
   maps, orbital-position diagram, moon-phase diagram, speed-time graph,
   satellite photo, electron-shell diagrams, and a food web too complex to
   restate reliably), and NY State Grade 4 Science June 2022 (29 of 30
   multiple-choice items usable, Part II's 15 open-ended items excluded per
   the standing no-fixed-answer rule). Grade 8 content was deliberately
   borrowed one level above this app's target age to source genuinely harder
   reasoning for the High Achiever band, rewritten into age-appropriate
   language for a 9-year-old without softening the underlying difficulty.
   **Steps 2-3 caught a new, serious defect class**: on the STAAR Grade 8
   batch, the Haiku subagent's answer-position-rotation step moved
   `correctOption` to a different letter without moving the correct option's
   *text* to match — corrupting 21 of 33 items (63%) so the labeled correct
   answer was wrong, sometimes self-contradictory (e.g. an item stating an
   object "produces its own light" had `correctOption` pointing at the
   option calling it a planet). This was NOT caught by verify.ts, dedup.ts,
   or self-audit.ts — all three passed the corrupted batch cleanly, because
   those scripts check structural validity and factual plausibility of the
   labeled answer text, not whether the label matches the *reasoning* laid
   out in the explanation/factClaim. Only 100%-human review (reading each
   option against its explanation) caught it. Fixed by hand: for each
   broken item, matched the correct-answer text (identified from the
   explanation/factClaim) to its actual option letter and repointed
   `correctOption`; one item (rocket acceleration) had a second, independent
   defect where two options shared identical mass/force values producing a
   genuine tie, fixed by changing one rocket's mass so the intended answer
   is unambiguous. The other two batches (MCAS Grade 8, NY Grade 4) showed
   no such corruption on the same check. **Lesson for future rounds:**
   explicitly instruct answer-rotation subagents to move option TEXT along
   with the letter, or better, generate correct/incorrect content first and
   assign the letter last as a single non-repeated step, never a
   post-hoc "rotate to balance letters" pass applied after content is
   finalized. 76 items merged into `data/seed/science.json` (72 -> 148):
   14 MCAS + 33 STAAR (after the fix) + 29 NY. Science's High Achiever band
   went from 0 to 5 items (plus 13 more at plain "Age 11"), closing the gap
   flagged after round 6. Cross-subject total now 1,162 (was 1,086).

4. Texas STAAR Grade 5 Mathematics, May 2022 (released test form) — 24 items
   extracted (12 items deferred: scatterplot/graph-selection, tally-mark
   images, ruler-measurement, and other genuinely image-dependent items with
   no way to restate them in text). Steps 2-3 delegated to a single Haiku
   agent (`research/pipeline/staar-g5-math-2022/`). Step 4 verify.ts caught a
   real script gap: `optionValueOf` used a bare `Number()` parse, which
   silently failed (treated as unparseable) on any option containing a `$`
   prefix or a unit suffix like "cm"/"lb"/"points" — none of the prior
   batches' options had used units, so this was never hit before. Fixed by
   widening `optionValueOf` to strip a leading currency symbol and a
   trailing unit word before parsing (still requires an exact numeric match
   after stripping — doesn't weaken the check). This took the batch from
   10/24 to 20/24 passing. The remaining 4 rejects were genuine content
   errors from the subagent (an estimation item verified against an exact
   value, two items whose options were prose/ordinal text but got the
   numeric-check item shape instead of "fact", and a rounding item whose
   checkExpression evaluated the pre-rounded input instead of the rounded
   target) — correctly left rejected rather than force-fixed. Self-audit
   flagged 60% of correct answers landing on option B (an artifact of
   preserving the source's original correct-letter distribution through
   rewriting) — fixed by rotating option order on a subset of items before
   staging. 20 items merged into `data/seed/maths.json` (282 -> 302). This
   batch's "fact"-type items (7 of them) were self-contained
   logical/definitional claims (e.g. coordinate-plane conventions, additive
   vs multiplicative patterns) rather than empirical claims about the world,
   so they were verified by hand instead of dispatching the
   apply-fact-check.ts WebSearch pass — that script is for claims that need
   external verification (geography/science facts), not pure reasoning.
5. Three sources run in parallel again (round 5, confirming the round-3
   pattern still works after a deliberately single-source round 4): NY State
   Grade 5 Science Spring 2025, MCAS Grade 5 Mathematics Spring 2023 (a
   different subject/admin than the MCAS science batch already merged), and
   NY State Grade 5 Social Studies Nov 2006 (a different admin than the Nov
   2008 batch already merged, filling out the geography/social-studies
   pool). 15+14+31 = 60 items extracted, 60 merged (0 dropped) after fixes:
   MCAS math hit the same optionValueOf-strips-units gap partially (a
   rounding-expression mismatch and a fraction-option-with-unit-suffix, both
   fixed the same way as the STAAR round) plus one item that was really a
   "which value satisfies an inequality" fact question mislabeled as
   numeric-checkable (fixed by switching it to answerType "fact"). Human
   review caught one real defect in the NY social-studies rewrite: a
   subagent's "Canada and Brazil are both on the continent of ___" rewrite
   broke the source item's premise (the two countries are on different
   continents; original was US/Mexico, correctly same continent) - fixed by
   swapping in Kenya/Egypt (both Africa). The NY social-studies source PDF
   had no official answer key (unlike MCAS/NY-science, which do) - answers
   were derived from general grade-5 civics/history knowledge instead;
   flagged in the batch's source-note for extra scrutiny, and none were
   found wrong on review. 15 science items merged into `data/seed/science.json`
   (13 -> 28), 14 maths items into `data/seed/maths.json` (302 -> 316), 31
   geography items into `data/seed/geography.json` (231 -> 262).
6. Two more sources run in parallel (round 6), this time deliberately targeting
   science specifically since a count-by-subject audit showed it at 28 items
   vs 200+ for every other subject, with zero "High Achiever" band coverage:
   Texas STAAR Grade 5 Science May 2022 (31 usable items, no official answer
   key captured in extraction - same manual-reasoning caveat as the NY Social
   Studies 2006 batch, all 31 hand-reviewed and found sound) and NY State
   Grade 5 Science Spring 2024 (13 usable items, this one DID have an official
   answer key - most of this source's 34 items are constructed-response,
   which this pipeline skips, so yield was lower than STAAR's). A third
   planned source, MCAS Grade 5 Science and Technology/Engineering Spring
   2023, was abandoned mid-round: its PDF was 13.8MB and unusually
   image-heavy, and extracting it reliably within the session would have
   risked fabricating item content rather than faithfully transcribing it -
   deferred to a future round rather than guessed at. Both completed batches
   hit the same answer-position-bias self-audit flag as the STAAR Math round
   (52-54% of correct answers landing on one letter) - same fix, rotate
   option order on a subset before staging. 44 items merged into
   `data/seed/science.json` (28 -> 72). Science remains the thinnest subject
   by a wide margin and still has no High Achiever items - worth prioritizing
   again before broadening to other subjects.
1. UK KS2 Maths Paper 1, 2025 — 33 questions merged into `data/seed/maths.json`.
2. MCAS Grade 5 Science, Spring 2025 — Steps 2-3 done by a Haiku subagent
   (not by hand) for the first time; 15 items split across two subjects, 3
   merged into `data/seed/geography.json`, 12 into a newly-created
   `data/seed/science.json` (a 5th subject, added to `src/app/page.tsx`'s
   `SUBJECTS` list and `prisma/seed.ts` — see git history for the exact
   diff). The Step 4 fact cross-check (`apply-fact-check.ts`) was built and
   run on this batch — it caught a real defect (see below).
3. Three sources run in parallel for the first time (previously only ever
   sequential): NY State Grade 5 Social Studies (Nov 2008), MCAS Grade 5
   Science Spring 2025 (a different administration than pilot #2 above), and
   UK KS2 English Reading (May 2025). Steps 1 (extraction) done by hand for
   all three; Steps 2-3 dispatched as three separate `Agent` calls
   (`model: haiku`) in a single message — **this worked cleanly**, all three
   completed and produced valid `02-transformed.json` files with no
   cross-contamination between batches. NY (6 geography items) and MCAS (15
   science items after fact-check) are fact-checked and staged in
   `research/pipeline/ny-g5-socialstudies-2008/` and
   `research/pipeline/mcas-g5-science-spring2025/`, awaiting human review —
   **not yet merged**. The UK English batch is blocked: see "Known gaps"
   below, it surfaced a real data-model gap rather than a content problem.

This doc is the operating procedure for the next cycle. Full design
rationale lives in `research/ingestion_pipeline_design.md` — read that first
if anything here seems to skip a step; it isn't skipped, it's just
implemented differently than originally sketched (see "What changed from the
original design" below).

## Per-source workflow

1. Pick the next source from `research/source_catalog.md` (prefer 🟢, prefer
   sources with an explicit reuse license like the UK's Open Government
   Licence over "free to access but licensing unconfirmed" sources).
2. Create a batch directory: `research/pipeline/<source-slug>/`.
3. **Step 1 (extraction) — done by hand, not scripted.** Fetch the source and
   read every item on it (recall-first: capture everything, defer/reject
   later, don't pre-filter). PDFs: WebFetch usually can't extract text from
   government PDFs (returns raw stream data) — instead let it save the file,
   then `Read` that saved path directly, which renders it properly. Note
   which items are unusable (diagram/graph-dependent with no way to restate
   the data in text, open-ended/no-fixed-answer) and why.
   **Steps 2-3 (classification, rewrite) — delegate to a cheap subagent.**
   Once Step 1's raw items are in hand, spawn an `Agent` (model: `haiku`,
   `run_in_background: false` since you need the result before continuing)
   with the raw item text pasted directly into the prompt, and explicit
   instructions to: classify each item's subject (only classify into
   subjects that already have a `data/seed/*.json` file, or flag "no
   destination file" rather than inventing one — see the MCAS batch for why
   this matters), assign an age band by genuine difficulty (not a blanket
   "this source's grade level = one band" — the maths pilot got this wrong
   and it had to be corrected by hand), rewrite substantially (new wording/
   numbers/scenario, not checkable back to source by string similarity), and
   write the result as `<batch-dir>/02-transformed.json` in the schema below.
   Also have it (or write yourself) `01-extracted-classified.json` /
   `01-source-note.json` as the Step 1-2 audit trail (full recall list, what
   was deferred and why, source license).

   `02-transformed.json` item shape — one of three answer-verification paths:
   - Numeric: `checkExpression` (plain arithmetic string) + `expectedValue`.
   - Fraction/mixed number: `answerType: "fraction"` + `checkFraction` (a
     JSON expression tree — see `verify.ts` for the leaf/op shape).
   - Fact-based claim (geography/space/science): `answerType: "fact"` +
     `factClaim` (a single checkable sentence stating why the correct answer
     is correct) — this path has no computable check, see step 5 below.
   Every item also needs: `subject`, `topic`, `levelBand`, `prompt`,
   `optionA`-`optionD`, `correctOption`, `explanation`.
4. Run the deterministic half in one command:
   ```
   npx tsx research/pipeline/scripts/run-batch.ts <batch-dir> <subject> "<source name>"
   ```
   This runs verify (Step 4) -> dedup (Step 5) -> self-audit (Step 6.5) ->
   stage (Step 7 prep), and prints the summary location.
5. **If the batch has non-computable (fact-based) items** — check
   `<batch-dir>/unverified-facts.json`. If it's non-empty, run the Step 4
   fact cross-check before review:
   ```
   npx tsx research/pipeline/scripts/apply-fact-check.ts <batch-dir> --list
   ```
   Hand the printed claim list to an agent with WebSearch access (a cheap
   model is fine) with the instructions the script prints. Once it writes
   `<batch-dir>/fact-check-results.json`, apply the verdicts:
   ```
   npx tsx research/pipeline/scripts/apply-fact-check.ts <batch-dir> --apply
   ```
   This removes contradicted/uncertain items from `verified.json` into
   `rejects-fact-check.json`, and — importantly — also flags items marked
   "confirmed" whose verdict note itself contains a caveat (e.g. "confirmed,
   but this explanation is incomplete because...") into
   `fact-check-caveats.json`. Read that file: a confirmed-with-caveat item
   is not automatically safe to merge. The MCAS science pilot caught exactly
   this — a "confirmed" claim about why Colorado Springs generates more
   solar power than Seattle turned out to have a distractor option
   (elevation) that was also a real contributing factor, not a clean wrong
   answer. Re-run `dedup.ts` / `self-audit.ts` / `stage.ts` after applying
   fact-check verdicts, since `verified.json` changed.
6. **Human review (blocking).** Read `<batch-dir>/summary.md` — check the
   self-audit flags section first, then the funnel/topic/band breakdown, then
   spot-check or fully review `staging.json` per the sampling guidance below.
   **If this is a multi-batch (parallel) round**, also run the cross-batch
   dedup check once, across all of that round's batches together, before
   merging any of them — `dedup.ts` only ever sees `data/seed/*.json` as it
   existed when its own batch ran, so it can't catch two sibling batches
   independently sourcing the same fact:
   ```
   npx tsx research/pipeline/scripts/cross-batch-dedup.ts <batch-dir-1> <batch-dir-2> [...]
   ```
   Writes `cross-batch-duplicate-warnings.json` in the current directory
   (non-blocking, same philosophy as dedup.ts's own near-duplicate check —
   review flagged pairs by hand, nothing is auto-rejected).
7. Once approved:
   ```
   npx tsx research/pipeline/scripts/merge.ts <batch-dir>/staging.json <subject>
   ```
   This only touches `data/seed/<subject>.json`. It does not touch the live
   database — running `prisma/seed.ts` against a real DB is a separate,
   explicit step, same as any other seed-file change.

## Human review sampling (per design doc Step 7 — suggestion, not fixed)

- First batch from a new source/subject combination: review 100%.
- Once a source has produced 2-3 clean batches (self-audit raised nothing
  wrong, your review found nothing wrong): spot-check ~20%.
- If a batch raises any self-audit flags: review 100% of that batch
  regardless of the source's track record.

## What the self-audit script does and doesn't catch

`self-audit.ts` (Step 6.5) is mechanical pattern-matching, not judgment. It
catches: answer-position bias, gross age-band/difficulty mismatches (via a
crude complexity heuristic — digit count, decimals, fractions, percentages,
exponents, topic keywords like "long division" — this heuristic is tuned for
maths and is known to false-positive on reasoning-heavy non-maths items, see
the MCAS batch run), and topic over-concentration in a batch. It does NOT
catch: wording that's confusing or not age-appropriate for a 9-year-old, or a
rewrite that's still too close to the source's exact phrasing (the Step 3
similarity gate the design doc specifies — still not built). Fact-based
correctness IS now checked, but only if you actually run Step 5 below —
`self-audit.ts` itself doesn't check facts.

## What changed from the original design, and why

- **Step 1 (extraction) is still done directly, not by a subagent** — PDF
  reading via WebFetch is unreliable enough (see step 3 above) that it's
  been kept as a direct step rather than delegated. **Steps 2-3
  (classification, rewrite) are now subagent-delegated** (first proven on
  the MCAS science batch) — a single Haiku call did both in one pass, given
  the raw extracted text. **Running multiple sources' Steps 2-3 in parallel
  is now tested and works** (round 3, three `Agent` calls in one message,
  `model: haiku`, `run_in_background: false` for each — sending them
  together in a single message is what parallelizes them, not the
  background flag). Each agent only needs its own batch's raw text and
  source note in its prompt; no shared state or cross-batch leakage
  observed. Still worth a human skim of each `01-extracted-classified.json`
  before trusting the classification calls, same as sequential runs.
- **Step 4's fact-check path is a script+agent pair, not a plain script** —
  `apply-fact-check.ts` can't call WebSearch itself (it's a tool, not a
  library), so it prepares the claim list (`--list`) and applies verdicts
  after an agent writes them (`--apply`). It also flags "confirmed" verdicts
  whose note contains a caveat, rather than trusting the binary label —
  this caught a real defect on the first run (a distractor option that was
  factually true, not a clean wrong answer — see the Colorado
  Springs/Seattle solar item in the science batch, fixed by hand in
  `data/seed/geography.json`).
- **Step 8 (funnel logging) is folded into `stage.ts`'s summary** rather than
  a separate script — one less file, same information.
- **Step 6.5 self-audit was added** (not in the original design doc) after
  the maths pilot's age-band mismatch was caught by human review instead of
  earlier. It doesn't replace Step 7, it narrows what Step 7 needs to look
  for by hand.
- **New subject files are not pre-approved.** The design doc flags this
  explicitly (a prior prompt-injection attempt tried to sneak in new subject
  files). `data/seed/science.json` was added, but only after asking and
  getting an explicit yes — don't assume the same answer applies to a future
  new subject.
- **Passage-based reading comprehension has no destination format yet.**
  The round-3 UK KS2 English Reading batch is blocked on this, not on
  content quality — see `research/pipeline/uk-ks2-english-reading-2025/`.
  `data/seed/english.json` only supports standalone grammar/vocabulary
  items (no `passage` field, no way to group several questions under one
  shared text). Design for adding this is being scoped separately (see
  `docs/passage-support-design.md` once it exists) — do not invent a
  workaround field on `02-transformed.json` and stage it without that
  design being settled first; a subagent did exactly this on the UK batch
  and it was correctly not carried forward into staging.
- **Sources whose passages/texts are third-party copyrighted, distinct from
  the test questions' own license, are a real and recurring risk** — not
  just a Singapore/HK aggregator problem as the source catalog originally
  flagged. The UK KS2 English Reading batch surfaced this directly: the
  gov.uk OGL license covers the STA's own question stems and instructions,
  but explicitly excludes the three reading passages themselves
  ("obtain permission from the relevant copyright owners... or remove the
  unlicensed content"). Any future ELA/reading-comprehension source needs
  this checked explicitly, separate from checking the source's overall
  accessibility tier in the catalog. Current resolution for the UK batch
  (human-approved): write wholly original passages inspired only by the
  observed *question types*, never reusing or closely paraphrasing the
  source stories' plot/characters/scenes.

## Starting the next round

Use `research/pipeline/ROUND-AGENT-PROMPT-TEMPLATE.md` to brief each
source's agent — it's the reusable skeleton, kept generic on purpose.
`NEXT-ROUND-NOTES.md` is the opposite: specific and disposable, rewritten
each round to capture what that round actually found. Read both before
picking sources.

## Known gaps, carried forward from the pilots

- **Before starting the next round, read `research/pipeline/NEXT-ROUND-NOTES.md`**
  — it covers a new self-audit check (recall-vs-reasoning for High Achiever
  fact items), where level-band content rules now live per-subject
  (`docs/subject-taxonomy-and-question-bank.md`), and a confirmed content
  gap (no history/politics content anywhere in the seed files) that needs a
  subject-scope decision before it's sourced, not just picking a source.
- No automated Step 3 similarity gate (source-closeness check) — a rewrite
  could in principle still be too close to the source's wording and nothing
  would catch it.
- Fraction verification only handles the four basic operations on simple
  fractions and mixed numbers (see `verify.ts`'s `checkFraction` tree) — not,
  e.g., fractions inside percentage-of-a-fraction compound expressions.
- The self-audit difficulty heuristic is maths-shaped (digit/decimal/
  fraction/percent counting) and produces false positives on reasoning-heavy
  non-maths content — treat its age-band-mismatch flags on non-maths batches
  with more skepticism than on maths ones.
- Fact-check verdicts come from a single cheap-agent web search pass, not
  multiple independent sources or a stronger model — for higher-stakes
  content it may be worth a second pass or a stronger model.
