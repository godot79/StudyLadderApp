# Resume prompt

Paste the text below into a fresh session to pick this work back up.

---

Read `research/pipeline/README.md` first (operating procedure + status log — a third round of 3 sources just ran, see its top section and "Known gaps"). Also read `docs/passage-support-design.md` (a design proposal, not yet implemented). Note: the "no Prisma schema changes without asking me first" rule from earlier in this project still stands — it's restated in the design doc.

State as of now, not open questions — treat as settled unless I say otherwise:
- Two batches are staged and awaiting my review/merge decision, not yet merged into `data/seed/*.json`:
  - `research/pipeline/ny-g5-socialstudies-2008/staging.json` — 6 geography items, 0 audit flags.
  - `research/pipeline/mcas-g5-science-spring2025/staging.json` — 15 science items, 3 self-audit age-band flags (likely false positives from the maths-tuned heuristic, per README).
- A third batch, `research/pipeline/uk-ks2-english-reading-2025/`, has a Step 2-3 output (original passage + 8 questions) but is blocked — it can't run through Step 4+ until passage support exists in the data model. Do not stage or merge it as-is.
- `docs/passage-support-design.md` is a proposal for adding passage support (an optional `passage` field on Question) — it explicitly has NOT been approved for implementation. Three things still need explicit go-ahead before touching code: (1) the interaction/UI rule for showing a passage, (2) the session-composition rule (should a passage's questions stay grouped in a session?), (3) the Prisma migration itself, separately, per the standing no-Prisma-changes-without-asking rule.
- Running Steps 2-3 (classification+rewrite) across multiple sources in parallel via multiple `Agent` calls in one message is now proven to work (see README) — safe to reuse that pattern.

Tell me current repo state (git status, whether the two staged batches have been merged yet) and ask what to do next — most likely one of: (a) review/merge the two staged batches, (b) make the three passage-support decisions and implement it, (c) pick new sources for another ingestion round.
