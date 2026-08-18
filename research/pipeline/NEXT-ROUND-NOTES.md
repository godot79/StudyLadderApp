# Notes for the next ingestion round

Written 2026-08-18, later same day, after merging NY State Regents Grade 5 Mathematics Spring 2025 (25 items, 384→409 maths). Appends to the geography-round notes below (still same-day current) rather than overwriting.

---

## 0. Duplicate-correct-answer defect struck a THIRD time — this is now a pattern, not a one-off

A "which number has the digit 8 worth 10x the value" item had two options (128.34 and 348.2) that both genuinely have 8 in the ones place — both mathematically correct. This is the same failure mode as the 2026-08-17 maths round's "1/4<1/3 vs 3/4<4/5" comparison item, and it slipped past the batch agent's own explicit "verify all four options" check *again*, despite that check being written into this exact round's briefing. Caught only on an independent third-party re-derivation (computing each option's ones-digit from scratch, not trusting the agent's stated verification).

**This is no longer an occasional gotcha — three rounds in a row have needed a human to independently recompute every option's value/truth from first principles, not just read the agent's claim that it checked.** The instruction "verify all four options" is evidently not sufficient on its own; agents doing this check are prone to confirming the labeled answer and pattern-matching the others as "obviously different" without literally recomputing each one. **Recommendation for the next template revision:** for any item type where options are computed/derived values (place-value extraction, unit conversion, "which of these equals X"), require the reviewing step to write out each option's derivation as a literal computation (not a truth-value judgment) before accepting the item — e.g. "A: ones digit of 128.34 is 8 → value 8. B: ones digit of 0.84 is 0 → value 0. C: ..." This forces the mechanical check that keeps getting skipped in practice.

Also fixed in the same pass: one borderline-ambiguous distractor (a "partially correct" option in a fraction-misconception critique item that was arguably also defensible as true, though not as clear-cut a duplicate as the digit-place item) — tightened to an unambiguously false statement rather than leaving it for interpretation.

## 1. NY Regents Math: Grade 5 confirmed viable, same borrow-a-harder-grade pattern works a second time

Grade 5 Math (Spring 2025 admin) was live, full item text + answer key present, first try (no fallback to Grade 6/7/8 needed). 25 of 28 released items usable (3 deferred: two image-only geometry figures, one line-plot-only item). Doubled the bank's Age 11 High Achiever content in one batch (24→35 pre-existing + this batch's own count), following the same "borrow one grade up, rewrite vocabulary not difficulty" pattern now confirmed three times (science round 7, Virginia geography, this round). NY Regents Math is confirmed to have real remaining volume at Grade 6/7/8 too, untouched — natural next lever if maths needs another round.

---

## 1. New defect class: self-answering option text ("giveaway parentheticals") — check for this on every batch now

The Haiku Step 2-3 subagent, writing this batch's geography items, had a strong habit of appending a clarifying/justifying parenthetical directly onto option text — e.g. `"West Africa (the world's largest cocoa producer)"` as the CORRECT option, or `"Manufacturing in factories (factories are built on relatively small pieces of land)"` for a wrong one explaining why it's wrong. This isn't a factual error — it's a format defect that converts a knowledge-recall item into a reading-comprehension/keyword-matching item, because the parenthetical states the very fact the question is supposed to be testing. **13 of 32 items in this batch had this pattern**; roughly 9 were severe enough to require a full option rewrite (stripping to bare answer text) before staging. One instance evaded a simple `'(' in option` scan entirely: a South America item phrased all four options as full sentences ("Peru has a long Pacific coastline" / "Brazil faces the Atlantic Ocean instead of the Pacific") rather than country names, letting a student answer via "which one says Atlantic" keyword-matching instead of geography knowledge — caught only on a full human read, not the automated scan.

**Not every parenthetical is this defect** — some are legitimate vocabulary scaffolding (e.g. defining an unfamiliar term like "orientation (meaning compass direction)" for a vocabulary-matching item) where the definitions don't single out which specific option is correct. Judgment call each time: does the added text tell you WHICH option is right/wrong, or does it just define a word neutrally across all four options equally? The former is a defect, the latter is fine (and sometimes necessary for genuinely unfamiliar Age-11 vocabulary).

**Action for future rounds:** add an explicit instruction to Step 2-3 subagent prompts: "options must stand alone as plausible answers — do not append a parenthetical or clause that states why an option is correct or incorrect; that defeats the purpose of a knowledge-recall item." And for human review: don't rely on a `grep '('` scan alone (it misses full-sentence-option formats like the South America item) — read every option's phrasing for whether it's giving away the reasoning it should be testing.

## 2. Virginia SOL World Geography: viable one-shot source, confirms the "borrow a harder grade for HA content" pattern works for geography too

Piloted the lead found in the prior round's dedicated source-research pass (see `research/source_catalog.md`'s "USA — Geography-specific research" section). 2012 Grade 9-10 World Geography released test, accessed via a third-party mirror (solpass.org) since VDOE's own site blocks automated access. Extraction, rewrite-down-to-Age-9-11-vocabulary, and difficulty recalibration worked well: 32 of the source's ~60 scored MC items were usable and successfully rewritten to Age 10/Age 11/Age 11 HA difficulty (21 Age 11, 7 Age 11 HA, 4 Age 10, deliberately none forced into Age 9) — following the same precedent as the earlier science round that borrowed Grade 8 content for the HA band, rewriting vocabulary down without diluting the underlying reasoning. This is confirmation that the "source one grade-level up, simplify language not concept" pattern generalizes beyond science.

**Caveats, unchanged from the source-research findings:** treat as a single sample paper, not a repeatable archive — only one year is confirmed accessible, and VDOE's own site (which might have more years) returned HTTP 403 to every automated access attempt tried across two separate rounds now. If a future round wants more from this specific source, it needs an actual browser-session check of `doe.virginia.gov`'s released-tests page, not another automated-fetch attempt (already tried twice, same result both times — don't try a third time the same way).

**44% topic concentration in "economic-geography"** was flagged by self-audit's topic-concentration check (non-blocking) — a reflection of the source's own emphasis (the VA course covers economic geography extensively), not a batch construction problem. Worth knowing if a future round pulls a second batch from a similar source: the topic mix will skew economic/political geography rather than physical geography unless deliberately balanced.

## 3. All 32 fact claims independently verified (9 via WebSearch, 23 against established encyclopedic knowledge) — all confirmed, no caveats needed

Followed the fact-check protocol per README.md. The 9 WebSearched (infant-mortality causation, cocoa production share, Timbuktu trade route, Kurdistan's extent, Chad's economy, urbanization/development correlation, polders, OPEC's founding purpose, EU single-market benefits) all confirmed cleanly; a couple (Angola/Botswana infant mortality, Chad's economy) have real-world multi-causal nuance similar to the previously-documented Colorado Springs/Seattle solar caveat, but the labeled answer remains the best available explanation among the four options given, not a misleading distractor situation — no caveat-driven rejections this round.

## 4. Standing defect-class reminder (from the 2026-08-17 maths round, re-applied successfully this round): verify ALL FOUR options' truth value

Applied this check across every "which of these is/is not true"-style item in the geography batch (there were several: cultural-region classification, factor-style "which country lacks X" items). No double-true-answer defect found this time, but the check is now a standing part of review for any batch with this item format — see the maths-round notes (folded into this file's history) for the original defect this check was built to catch.

## 5. Current subject/band state (checked 2026-08-18, post-maths-merge)

- **maths**: 409 items (Age 9: 112, Age 9 HA: 57, Age 10: 104, Age 10 HA: 52, Age 11: 49, Age 11 HA: 35) — just targeted this round; Age 11 HA went 24→35, no longer the bank's thinnest band.
- **geography**: 293 items (Age 9: 72, Age 9 HA: 43, Age 10: 63, Age 10 HA: 43, Age 11: 43, Age 11 HA: 29) — targeted the round before this one; Age 11 HA (29) is geography's own thinnest band.
- **english**: 288 items (Age 9: 88, Age 9 HA: 43, Age 10: 61, Age 10 HA: 44, Age 11: 27, Age 11 HA: 25) — targeted two rounds ago, not re-checked this round; Age 11 (27) and Age 11 HA (25) are its thinnest.
- **science, space**: not re-checked in several rounds — re-count from `data/seed/*.json` directly before picking a next target; these had heavy attention several rounds back and may or may not still be the thinnest overall.

**Next natural rebalancing target:** re-run the count across all five subjects' Age 11 / Age 11 HA bands before picking — after three consecutive rounds targeting maths→geography→maths again, english's Age 11 (27) and Age 11 HA (25) are now close contenders, and science/space haven't been checked in a while. Don't assume maths again by default; verify which band is genuinely thinnest bank-wide first.

## 6. Standing gaps carried forward, still unresolved

- History/politics/civics subject-scope decision: still approved in principle, still not implemented (no seed file, no `SUBJECTS` entry, no `prisma/seed.ts` wiring, ~10-12 items still sitting unmigrated inside `geography.json`). Also now relevant to a confirmed-dead-end source: NY Regents Grade 8 Social Studies (see the archived section below) would become usable if this is ever implemented. Not sourced further until scoped as its own task.
- Reading-comprehension batches still need manual verify/dedup and a hand-rebuilt `staging.json` (`stage.ts` strips `passage`/`passageId`, `verify.ts`/`dedup.ts` have no passage-item path). Will recur on the next english/reading round.
- No automated Step 3 similarity gate (source-closeness check for rewrites).
- Fraction verification only handles four basic operations on simple fractions/mixed numbers; no `floor`/`ceil`/comparison operators in `checkExpression`.
- Self-audit's difficulty heuristic is maths-shaped digit-counting — false-positives on non-numeric reasoning content (reading comprehension, geography/fact items — this round's batch had 29 of 32 items flagged this way, all correctly overridden on human review) AND can under-flag genuinely-hard multi-step interpretation problems as "too easy" even within maths. Treat all its age-band flags as a prompt to look closer, not a verdict either way.
- **New this round:** no automated check for "self-answering option text" (section 1 above) — a `grep '('` scan catches some instances but misses full-sentence-option formats. Still requires human read-through; no script fix proposed yet.
- Geography via NY Regents Social Studies (any grade) and Hong Kong General Studies are confirmed dead ends for geography specifically (history/civics-flavored, not geography) — don't re-check either without new information. Virginia SOL World Geography is a confirmed-viable but single-year source (see section 2) — don't attempt VDOE's own site again via automated fetch, it's been blocked twice.

---

## Archive: prior rounds' notes (superseded but kept for reference until next overwrite)

**Maths round (2026-08-17):** First Math admin ever mined from NY Regents archive (Grade 4, 2024) — 24 items, 360→384. Found a two-correct-answer defect (a comparison item where two options were both mathematically true) that slipped past both the subagent and an initial human check — caught only on a fully independent second read where every option's truth value was computed from scratch, not just the labeled one. This check is now standing practice (see section 4 above). Also hit a `floor()`/`ceil()`-in-`checkExpression` format gap in `verify.ts`, same root cause as the earlier units-parsing gap (STAAR/MCAS Math rounds) — worked around by hand, not fixed generally.

**Geography dead-end round (2026-08-17, no batch produced):** NY Regents Social Studies confirmed structurally unsuitable for geography — Grade 4 SS doesn't exist in the archive; Grade 5 SS (geography-flavored) already fully mined; Grade 8 SS is NY's "US History and Government" course by curriculum design, not geography (44/45 sampled items were history/civics). Full reasoning: `research/pipeline/ny-g8-socialstudies-2010/01-source-note.json`.
