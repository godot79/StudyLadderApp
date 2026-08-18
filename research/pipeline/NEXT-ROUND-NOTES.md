# Notes for the next ingestion round

Written 2026-08-18 after merging Virginia SOL World Geography 2012 (32 items, 261→293 geography). Overwrites the previous version — its content is folded in below where still relevant (sections 3-5), superseded where not.

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

## 5. Current subject/band state (checked 2026-08-18, post-merge)

- **geography**: 293 items (Age 9: 72, Age 9 HA: 43, Age 10: 63, Age 10 HA: 43, Age 11: 43, Age 11 HA: 29) — just targeted this round; Age 11 went 22→43, Age 11 HA went 22→29, no longer the thinnest bands in the subject (Age 11 HA is now geography's own thinnest band, but no longer tied for the bank's thinnest overall).
- **maths**: 384 items (Age 9: 112, Age 9 HA: 57, Age 10: 100, Age 10 HA: 50, Age 11: 41, Age 11 HA: 24) — targeted two rounds ago; Age 11 HA (24) is now the thinnest single band bank-wide.
- **english**: 288 items — targeted three rounds ago, not re-checked this round.
- **science, space**: not re-checked this round — see `data/seed/*.json` directly before picking a next target.

**Next natural rebalancing target: maths' Age 11 High Achiever (24 items)** — now the single thinnest band across the entire bank. The NY Regents archive has Math un-mined at every grade except the Grade 4 2024 admin already pulled — a different grade (e.g. Grade 5, 6, 7, or 8 Math, deliberately one level up per the now-twice-confirmed "borrow harder content, simplify vocabulary" pattern) would be a natural way to target Age 11 HA specifically, same approach as this round's geography source and the earlier science-round precedent.

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
