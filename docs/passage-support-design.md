# Passage Support Design (Reading Comprehension)

## Purpose
This document defines how the app will support passage-based reading
comprehension questions (a shared block of text with several questions
about it), extending the multiple-choice format decided in
`docs/question-format-decision.md`. It is a design proposal, not yet
implemented — see "Approval and Rollout" below for what still needs
sign-off before any code changes.

## Why This Is Needed
`data/seed/english.json` currently contains only standalone grammar,
vocabulary, and spelling questions — each question is fully self-contained.
The content ingestion pipeline (`research/pipeline/README.md`) hit a real
gap trying to ingest a reading-comprehension source (UK KS2 English
Reading, May 2025): several questions share one passage of text
("Look at the section...", "Find and copy one word which tells us...",
"Number the events 1-4..."), and there is currently no way to represent
"these N questions all refer to this one passage" in the data model.

## Decision
Extend the `Question` model with an **optional** `passage` field.

- When `passage` is present, the question is a reading-comprehension item:
  the child sees the passage text above the prompt.
- When `passage` is absent (the case for all 218 existing English items
  and every maths/geography/space/science item), behavior is unchanged —
  this is additive, not a breaking change to the existing format.
- Multiple questions may carry the *same* `passage` text — there is no
  separate "Passage" entity. This keeps the model simple (matches
  `docs/minimum-data-model.md`'s preference for the minimum structure that
  works) at the cost of repeating the passage text across each of its
  questions in storage. For a handful of ~300-500 word passages with 6-8
  questions each, this repetition is small and avoids a join.

## Data Implication
Each Question (seed JSON and Prisma model) gains one new optional field:

- `passage` (string, optional) — full text of the reading passage, shown
  before the prompt when present.

No other fields change. `answerType` (already used by fact-based
geography/space/science items) is unaffected — passage items are still
plain four-option multiple choice with a `correctOption`, using whichever
`answerType` variant fits the question (most will be `"fact"`-shaped: the
correct option is the one the passage supports).

## Interaction Rule
For a passage-based question:
- the child sees the passage text once, above the prompt
- if consecutive session questions share the same passage, the passage is
  shown once and stays visible/collapsible rather than being repeated
  question-to-question (avoids the child re-reading the same block 6-8
  times in a row) — **exact UI treatment (sticky passage vs. repeat vs.
  collapsible) is not decided here and needs a product call before
  implementation**
- otherwise the interaction is unchanged from `question-format-decision.md`:
  one prompt, four options, one correct answer, one submission

## Session Composition Rule (needs a decision before implementation)
If a practice session pulls passage-based questions, should it:
(a) treat them exactly like any other question and let them shuffle
    independently (simplest, but a child could see question 3 of a passage
    without questions 1-2, which may be confusing without re-showing the
    passage), or
(b) keep a passage's questions grouped together within a session (more
    natural for reading comprehension, but changes the "10 independently
    selected questions" assumption in `docs/minimum-data-model.md` and
    `src/lib/practice-session-service.ts`)?

This needs a product decision before `practice-session-service.ts` changes.
Recommendation: (b), since real reading tests never ask comprehension
questions in isolation from their passage, but this is flagged as a
decision, not settled by this document.

## Files Expected to Change (when implementation is approved)
- `prisma/schema.prisma` — add `passage String?` to `Question`.
  **Per `research/RESUME.md`'s standing rule, no Prisma schema change
  happens without explicit user approval — this design doc does not
  constitute that approval.** A migration is a production DB risk on a
  live Neon database and needs its own explicit go-ahead.
- `src/types/index.ts` — add `passage?: string` to the Question type.
- `data/seed/english.json` — new passage-based items carry `passage`;
  existing 218 items untouched.
- `prisma/seed.ts` — pass `passage` through on seed/upsert.
- `src/app/session/[sessionId]/SessionClient.tsx` (and/or
  `page.tsx`) — render the passage when present.
- `src/lib/practice-session-service.ts` — only if the session composition
  rule above is decided as (b) (grouping).
- `src/lib/scoring.ts` — likely unchanged; scoring is per-question
  regardless of shared passage, but should be double-checked once the
  session composition decision is made.

## Excluded For This Iteration
Matching `question-format-decision.md`'s existing exclusions:
- no separate `Passage` entity/table
- no passage-level media (images, audio)
- no partial credit or cross-question scoring tied to a passage
- no editing/highlighting of the passage by the child

## Approval and Rollout
Before implementation begins:
1. Confirm the interaction rule (sticky/collapsible passage) — product call.
2. Confirm the session composition rule ((a) vs (b) above) — product call.
3. Explicit go-ahead for the `prisma/schema.prisma` migration — required
   separately per the standing Prisma rule, even after 1-2 are settled.

Once approved, `research/pipeline/uk-ks2-english-reading-2025/` already has
a Step 2-3 output (`02-transformed.json`, an original passage + 8
questions) ready to carry through Steps 4-7 of the ingestion pipeline —
implementation of this design unblocks that batch, it doesn't require
re-running Steps 1-3.
