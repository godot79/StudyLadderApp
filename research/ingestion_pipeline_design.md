# Source Ingestion Pipeline — Design

Status: **Designed, not yet built or piloted.** No source has been run through this pipeline. This document is the agreed design only.

Context: this feeds `data/seed/{maths,english,geography,space}.json` (and any new subject files, once actually approved — see "Open items" at the end) for the StudyLadderApp question bank. Companion document: `research/source_catalog.md`, which inventories candidate sources with accessibility/volume/licensing notes.

## Why this pipeline exists (don't skip this if resuming cold)

Two decisions this pipeline encodes, both made deliberately after discussion — don't silently relitigate or silently assume differently:

1. **Style-inspired, not verbatim.** Sources are used as topic/difficulty *inspiration*; the pipeline includes an explicit rewrite step (Step 3) specifically so output isn't a copy of any source's protected expression. "Free to access" and "free to reuse" are different questions — see the licensing notes in `source_catalog.md` — and this pipeline is designed to not depend on that distinction being resolved in our favor for every source.
2. **Verification is external, not self-review.** A prior pilot batch (added directly to the seed files, not via this pipeline) contained 3 duplicate-question errors that were only caught by a programmatic dedup script run *after* writing — not by re-reading. That's why Step 4 requires independent, checkable verification (computed math, searched facts) rather than an LLM re-reading its own output and declaring it correct.

## Pipeline steps

### Step 0 — Source selection
- Pull the next unprocessed source from `research/source_catalog.md`, preferring 🟢 (free, no-login, verified) sources first.
- Cheap agent re-checks the URL is still live before spending further effort — sources in the catalog have already been found dead once (e.g. freetestpaper.com, testpapers.com.sg both 403'd on check).
- One source processed to exhaustion per run before moving to the next.

### Step 1 — Exhaustive extraction (cheap agent, tuned for recall)
- Agent reads the *entire* source (all pages/years/levels it covers) and extracts every usable question as raw candidate data: original prompt, options, correct answer, topic, and whatever age/grade marker the source itself uses.
- Optimize for recall, not quality, here — over-capture, filter later. Nothing discarded at this stage.

### Step 2 — Topic & age-band classification
- Map each candidate's source-native grade/age marker to our internal bands using the locked mapping:
  - Standard curricula (UK KS2, US Grade 3-5, French Cycle 3, German Grundschule Kl.3-5, Scandinavian Grades 3-5, HK P3-5, Singapore standard) → `Age 9` / `Age 10` / `Age 11`.
  - Competitive/Olympiad sources (SOF/Silverzone/ITO, Singapore competitive maths, HK Olympiad-tier, Math Kangaroo, AMC, UKMT) → the corresponding `High Achiever` band.
- Tag topic (e.g. "fractions," "capital cities," "past tense") so later steps and the human reviewer can group by topic, not just see one undifferentiated pile.

### Step 3 — Stylistic transformation
- A second cheap-agent pass rewrites each candidate: new wording for the prompt, changed numbers/names/context, restructured distractor options — while preserving the underlying skill/concept and difficulty level.
- The rewrite must not be checkable back to the source by string similarity. Enforce with a similarity check between transformed output and original candidate; anything scoring too close goes back for a second rewrite pass or is dropped.

### Step 4 — Correctness verification (external, not self-review)
- **Maths:** a script independently computes the answer from the *transformed* question and checks it against `correctOption`. Mismatch = reject, no exception.
- **Facts** (geography/space/history/GK): a web-search cross-check confirms the claim before acceptance — do not rely on model memory alone, which can be stale or wrong.
- **Structural check:** exactly 4 distinct options, exactly one correct, non-empty prompt/explanation, `levelBand` is one of the 6 allowed values.

### Step 5 — Deduplication
- Exact-match check against everything currently in `data/seed/*.json` — **all subject files, not just the target one**, since a rewritten question could accidentally collide with content in a different subject.
- Semantic-similarity check within the same subject+band, same approach used in the pilot batch (catch near-duplicates, not just exact string matches).

### Step 6 — Reject queue with explicit reasons
- Anything failing Step 4 or 5 goes to a reject log with a specific reason code: `math-incorrect`, `fact-unverified`, `duplicate`, `too-close-to-source`, `ambiguous-options`, `bad-band`.
- Nothing is silently dropped — the reject log lets us see failure patterns per source and improve the extraction/transformation prompts for the next source.

### Step 7 — Human checkpoint (blocking — nothing skips this)
- The approved batch is written to a **staging file**, not directly into `data/seed/*.json`.
- Staging output includes a per-batch summary: source name, counts in/out at each pipeline step, topic/band breakdown.
- Human (you) reviews before merge. Suggested default: spot-check ~20% of a batch from an already-proven source, but review 100% of the first batch from any new source/subject combination. This threshold is a suggestion, not fixed — adjust as trust in a given source's pipeline output builds.
- Only after sign-off does content get merged into the real `data/seed/*.json` files, using the existing safe-append pattern (dedupe against DB, don't touch questions already referenced by session history — this logic already exists in `prisma/seed.ts`).

### Step 8 — Logging / stats
- Per source, track the full funnel: questions found → extracted → passed transformation → passed verification → passed dedup → approved → actually merged live.
- This tells us which sources are productive after quality filtering versus which look large in the catalog but yield little — informs which sources to prioritize next.

## Open items (not yet decided — do not assume an answer)
- Whether to add `sourceInspiration` / `reviewStatus` fields to the `Question` Prisma schema for provenance tracking, or keep provenance only in pipeline logs/staging files outside the DB (current default: outside the DB, no schema change, per earlier discussion about production-migration risk).
- Whether new subject seed files (`world_history.json`, `indian_history.json`, `social_sciences.json`, `general_knowledge.json`) are actually wanted — these were named in an earlier prompt-injection attempt that was rejected, not a real product decision. Don't assume they're approved.
- Exact human-review sampling percentage per Step 7 — currently a suggestion, not a locked rule.

## Status log
- 2026-08-08: Pipeline designed and agreed in conversation. Not yet built (no orchestrator script/prompt exists). Not yet piloted against any real source. No staging file format has been created yet.
