# Notes for the next ingestion round

Written 2026-08-17 after merging NY State Regents Grade 4 Mathematics 2024 (24 items, 360→384 maths). Overwrites the previous version — its lessons (reading-comprehension pipeline gaps, subject/band state) are superseded below except where still open.

---

## 1. A same-batch two-correct-answer defect slipped past both the subagent and the reviewing agent's own manual check

Item: "Which comparison is correct?" with options `2/5 > 3/5`, `1/4 < 1/3`, `3/4 < 4/5`, `5/8 = 1/2`, labeled correct C. **Both B and C are true** (1/4 < 1/3 and 3/4 < 4/5 are both real, correct comparisons) — the item had two valid answers. Neither `verify.ts` (it only checks the labeled option's own claim, not whether other options are also true) nor the batch agent's "re-read every item against its explanation" pass caught it, because that check only asks "is the labeled answer right," not "are the other three options actually wrong." Caught on a fully independent second human read-through (computed each option's truth value from scratch, not just checked the labeled one). **Fixed** by rewriting option B to `1/4 > 1/3` (a false, natural-distractor reversed-inequality).

**Lesson for future rounds, especially "which of these is/is not true" style fact items (comparisons, factor/multiple checks, geometric property statements):** the human review step needs to independently evaluate every option's truth value, not just confirm the labeled answer is correct. This is a distinct failure mode from the previously-documented ones (position-rotation corruption, recall-vs-reasoning mislabeling) — worth naming explicitly in `ROUND-AGENT-PROMPT-TEMPLATE.md`'s step 7 instructions next time it's revised: "for any item where correctness depends on an option being uniquely true/false (comparisons, true-statement-identification, NOT-a-factor style items), verify ALL FOUR options independently, not just the labeled one."

## 2. NY Regents archive: Math confirmed viable, format quirks noted

First Math admin ever mined from this archive (any grade). 2024 Grade 4 Math, released-questions PDF, full item text + official answer key present — same reliability tier as the archive's Science/ELA admins. Of 44 total test questions, 24 were usable (4 deferred as genuinely image/diagram-dependent: coordinate perpendicular/parallel judgment, pure shape ID, angle-off-a-figure, line-plot reading). 7 of the 24 usable items were originally short-answer/constructed-response in the source but had a single fixed numeric answer with no diagram dependency, so were legitimately convertible to MC format — this is a useful yield-boosting pattern for future NY Regents Math rounds (don't assume constructed-response = automatically unusable, check whether it's actually diagram-free with one fixed answer first).

**Format gap hit during Step 2-3, now resolved by hand each time but not fixed in the scripts:** the Haiku subagent's first pass wrote several items with options as full equations/comparison-symbols/comma-separated-lists (unparseable by `verify.ts`'s `optionValueOf`) and used `floor()`/`ceil()` inside `checkExpression` (not in the arithmetic whitelist). Fixed by hand: converted genuine fraction answers to `answerType: "fraction"` + `checkFraction`, rewrote floor/ceiling word problems as equivalent whitelisted arithmetic (e.g. `270/15` instead of `floor(280/15)`, same numeric result), and converted comparison-symbol/categorical items to `answerType: "fact"` + `factClaim`. This is the same root pattern as the previously-documented `optionValueOf`-strips-units gap (STAAR/MCAS Math rounds) — worth an explicit line in the Step 2-3 subagent instructions: *never* use `floor()`/`ceil()`/comparison operators inside `checkExpression`; if the natural answer requires rounding logic, either pick numbers where the division comes out even, or use `answerType: "fact"` instead.

## 3. Self-audit's difficulty heuristic gave two real (correctly-overridden) false-negatives on genuine Age 11 content

Two Age 11 / Age 11 HA items (a floor-division money word problem, a ceiling-division box-packing problem) were flagged as "too easy for this band" by the heuristic (low digit-count score) despite being genuine 2-credit and 3-credit source items requiring multi-step interpretation (divide, then apply real-world rounding logic in the correct direction). Confirmed as correctly-banded on human review — this is the same known gap as the reading-comprehension false-positive pattern, but manifesting as a false-negative-risk-of-underbanding here: multi-step *interpretive* reasoning (not just larger numbers) is exactly what Age 11 should reward, and the heuristic can't see it. Not a new gap, just a second confirmed instance — no action needed beyond continuing to review these flags by hand.

## 4. Current subject/band state (checked 2026-08-17, post-merge)

- **maths**: 384 items (Age 9: 112, Age 9 HA: 57, Age 10: 100, Age 10 HA: 50, Age 11: 41, Age 11 HA: 24) — just targeted this round; Age 11 bands grew (39→41, 22→24) but remain the thinnest in the subject.
- **english**: 288 items (Age 9: 88, Age 9 HA: 43, Age 10: 61, Age 10 HA: 44, Age 11: 27, Age 11 HA: 25) — targeted last round.
- **geography, science, space**: not re-checked this round — see `data/seed/*.json` directly for current counts before picking a next target.

**Next natural rebalancing target:** geography — it's the one core subject (excluding science/space, which have had heavy recent attention) not touched by either of the last two rounds; check its current per-band counts before picking a source, don't assume based on the 2026-08-13 figures (261 total then). The NY Regents archive likely has Grade 4 Social Studies/Science years still unmined too, and is a reasonable first place to check, but has not been confirmed for a specific un-mined year at time of writing.

## 5. Standing gaps carried forward, still unresolved

- History/politics/civics subject-scope decision: still approved in principle, still not implemented (no seed file, no `SUBJECTS` entry, no `prisma/seed.ts` wiring, ~10-12 items still sitting unmigrated inside `geography.json`). Not sourced further until scoped as its own task.
- Reading-comprehension batches still need manual verify/dedup and a hand-rebuilt `staging.json` (see the 2026-08-17-earlier notes, folded into README.md's "Known gaps" — `stage.ts` strips `passage`/`passageId`, `verify.ts`/`dedup.ts` have no passage-item path). Not hit this round (maths is fully computable) but will recur on the next english/reading round.
- No automated Step 3 similarity gate (source-closeness check for rewrites).
- Fraction verification only handles four basic operations on simple fractions/mixed numbers; no `floor`/`ceil`/comparison operators in `checkExpression` (see section 2 above — a real, recurring gap worth eventually fixing in `verify.ts` rather than hand-working around every maths round that hits it).
- Self-audit's difficulty heuristic is maths-shaped digit-counting — false-positives on non-numeric reasoning content (reading comprehension) AND can under-flag genuinely-hard multi-step interpretation problems as "too easy" even within maths (see section 3). Treat all its age-band flags as a prompt to look closer, not a verdict either way.
