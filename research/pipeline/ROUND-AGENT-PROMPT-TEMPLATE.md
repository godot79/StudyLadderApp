# Reusable ingestion-round agent prompt (template)

This is boilerplate — the reusable skeleton for briefing an `Agent` call to
run one source through the content pipeline. It is deliberately generic;
fill in the bracketed fields per round. Contrast with
`research/pipeline/NEXT-ROUND-NOTES.md`, which is the opposite: a specific,
disposable note about the *particular* defects/gaps found in the round just
finished, written fresh each time and meant to be read once and folded into
the next round's instructions (either into this template's blanks or as an
extra paragraph appended to the filled-in prompt).

Run one of these per source. Launch multiple in parallel (multiple `Agent`
calls in one message, `isolation: worktree` recommended so batches don't
collide on-disk) when targeting several sources in one round — proven to
work cleanly across at least two rounds now, no cross-batch contamination
observed.

---

## Fill in before sending

- `[SOURCE]` — name and URL of the source, from `research/source_catalog.md`.
- `[SUBJECT/GRADE TARGET]` — which subject and grade/age admin, and *why*
  this one (which gap it's meant to close — check current band/subject
  counts before picking, don't just take the next unmined row in the
  catalog).
- `[BATCH-DIR-SLUG]` — e.g. `ca-cast-g5-science`.
- `[ANYTHING FROM THE LAST ROUND'S NEXT-ROUND-NOTES.md THAT'S STILL OPEN]` —
  paste the relevant paragraph(s) in directly; don't assume the agent will
  go read that file's history unprompted (it will read the *current* copy,
  but only reflects the state at launch time — if you already incorporated
  a lesson into this template, you don't need to also paste it).

---

## The prompt

```
You are running one round of the StudyLadderApp content ingestion pipeline
for a single source. This repo builds a study app for one 9-year-old
(maths, english, geography, space, science question banks).

FIRST: read these files in full before doing anything else:
1. `research/pipeline/README.md` — the operating procedure (per-source
   workflow section), "Known gaps", and "What changed from the original
   design".
2. `research/pipeline/NEXT-ROUND-NOTES.md` — if present, it documents
   specific defects/gaps found in the immediately preceding round that
   this round should not repeat or should account for. If it doesn't
   exist, skip this.
3. `research/ingestion_pipeline_design.md` — especially "Why this pipeline
   exists."
4. `docs/subject-taxonomy-and-question-bank.md` — per-band content-focus
   rules for every subject, including what "High Achiever" is and isn't
   allowed to mean. Use this, not ad-hoc judgment, for band assignment.
5. `research/source_catalog.md` — search for your assigned source's name
   for what's already known about it.

YOUR ASSIGNED SOURCE: [SOURCE]
YOUR TARGET: [SUBJECT/GRADE TARGET] — [why this specific gap, backed by an
actual count from data/seed/*.json, not a guess]

WORKFLOW — follow README.md's "Per-source workflow" section exactly:
1. Verify the source is still live (don't trust the catalog blindly — it's
   been wrong before). If it's dead, paywalled, or doesn't actually publish
   full question text (not just an answer key/scoring guide), STOP and
   report that rather than fabricating content — this has happened before
   (California CAST) and stopping was the correct call.
2. Create `research/pipeline/[BATCH-DIR-SLUG]/` as your batch directory.
3. Step 1 (extraction, by hand): fetch the source, read every usable item
   (recall-first — capture everything, don't pre-filter). PDFs: WebFetch
   usually can't extract text — save the file, then Read the saved path
   directly. Note deferred items (image/diagram-dependent, open-ended/no
   fixed answer) and why, in `01-source-note.json` / `01-extracted-classified.json`.
4. Steps 2-3 (classification + rewrite): delegate to a subagent (Agent
   tool, model: haiku, run_in_background: false) with the raw extracted
   text pasted directly into its prompt. Instruct it to:
   - Classify subject only into subjects with an existing
     `data/seed/*.json` file (currently maths, english, geography, space,
     science) — flag "no destination file" rather than inventing one.
   - Assign age band by genuine difficulty using
     `docs/subject-taxonomy-and-question-bank.md`'s per-subject band
     descriptions, not a blanket grade->band mapping.
   - Explicitly apply the High-Achiever rule from that doc: High Achiever
     needs either a rarer/deeper fact or genuine multi-step reasoning —
     NOT a technical-sounding term the prompt itself already explained
     (this was a real, caught defect — see NEXT-ROUND-NOTES.md history).
   - Rewrite substantially — new wording/numbers/scenario, not checkable
     back to source by string similarity.
   - If doing any answer-position rebalancing, move the correct option's
     TEXT together with its letter in one step — never rotate the letter
     label after content is finalized (a past round corrupted 63% of a
     batch this way; caught only by full human review, not any script).
   - Write `02-transformed.json` in the schema documented in README.md
     step 3 (numeric: checkExpression+expectedValue; fraction:
     checkFraction tree; fact-based: answerType "fact" + factClaim).
5. Run:
   `npx tsx research/pipeline/scripts/run-batch.ts research/pipeline/[BATCH-DIR-SLUG] [subject] "[source name]"`
   This runs verify -> dedup (now includes a near-duplicate warning check
   against ALL existing seed content, any subject/band, not just exact
   matches — read `near-duplicate-warnings.json` if non-empty) ->
   self-audit (now includes a recall-vs-reasoning check for High-Achiever
   fact items, in addition to the original difficulty/position/topic
   checks) -> stage.
6. If `unverified-facts.json` is non-empty: run
   `apply-fact-check.ts --list`, verify each claim via WebSearch (yourself
   or a subagent), write `fact-check-results.json`, then `--apply`. Re-run
   dedup/self-audit/stage after, since verified.json changed.
7. Before finalizing: personally re-read every item where `correctOption`
   was touched by any rewrite/rotation step, and every item flagged by
   self-audit (including near-duplicate-warnings), and make a real
   judgment call on each — these checks narrow what needs review, they
   don't replace it.
8. Read `summary.md` and sanity-check `staging.json` yourself. Do NOT run
   merge.ts and do NOT touch `data/seed/*.json` — human review (mine) is a
   separate, blocking step that comes after your work, always.

HARD CONSTRAINTS:
- Do NOT modify the Prisma schema under any circumstances.
- Do NOT run merge.ts or write to `data/seed/*.json`.
- Do NOT invent a new subject file without explicit prior approval.
- Do NOT copy source content verbatim — substantial rewrite required.
- If the source yields near-zero usable content or can't be verified live,
  stop and report clearly rather than fabricating.

REPORT BACK: which specific admin/year/URL you used, items extracted vs
staged, band breakdown, self-audit AND near-duplicate-warning flags (with
your judgment on each, not just the raw count), fact-check outcomes, and
explicit confirmation you did the correct-option-text and near-duplicate
manual checks in step 7. Keep it factual and concise — this feeds a human
review step, not a final merge.
```

---

## After every round (do this yourself, not by delegating it)

1. Copy each agent's batch directory out of its worktree into the main
   repo (`isolation: worktree` agents don't land their files in your main
   working tree automatically).
2. Actually review each `staging.json` — read the flagged items, not just
   the flag counts. The two real defects caught in the 2026-08-10 round
   (recall-mislabeled vocabulary, cross-band duplicates) were both things
   the scripts flagged or could have flagged, but required someone to
   actually read the specific item text against its band/history to
   confirm — don't rubber-stamp a clean self-audit run.
3. Merge approved batches with `merge.ts`.
4. Write a fresh `research/pipeline/NEXT-ROUND-NOTES.md` (overwrite the old
   one, it's disposable) capturing anything this round surfaced that the
   next round should know: new gaps found, checks that need building,
   sources that turned out to be dead ends, subject/band counts worth
   targeting next.
