# Notes for the next ingestion round

Written 2026-08-10 after the MCAS G5 Science 2019 / NY G8 Science 2021 merge round. Read this before picking the next sources — it captures three things settled or surfaced in that round's follow-up discussion.

---

## 1. New automated check: recall-vs-reasoning for High Achiever fact items

`research/pipeline/scripts/self-audit.ts` now has a fourth check (`recall-not-reasoning`). It flags fact-type items (`answerType: "fact"`) assigned to a High Achiever band whose prompt reads as a single-fact-lookup ("what is X called", "what do we call...") rather than requiring comparison/prediction/multi-fact reasoning.

Why: the NY Grade 8 Science 2021 batch shipped 5 items like "what is a gene called" and "what gas is released during cellular respiration" mislabeled Age 11 High Achiever — genuinely core-curriculum vocabulary the prompt itself had already explained, not extension content. The existing digit-counting difficulty heuristic (check 2) correctly scored these low, but didn't distinguish *why* they scored low (simple reasoning vs. no reasoning at all), so a human still had to read every flagged item to tell the difference. This check narrows that down for the recall-shaped subset specifically.

It's still heuristic and still only a `warn`, never an auto-reject — same as every other self-audit check. It's regex-based on the prompt's phrasing and will have false negatives on unusually-worded recall items (e.g. it didn't catch "why does it [a comet] follow this pattern" even though the answer is really just "it orbits the Sun" — "why" is a reasoning-signal word even when the actual cognitive task is thin). Don't treat a clean pass from this check as proof every High Achiever item is genuinely reasoning-based — it catches the clearest pattern, not all of them.

## 2. Level-band content rules now documented per subject

`docs/subject-taxonomy-and-question-bank.md` previously only had a fleshed-out per-band content structure for maths; english/geography/space/science had one-line "likely early content areas" placeholders, written before those subjects had real seed content. Now that each has 148-360 items, that doc has been updated with:
- A per-band ("Age 9" through "Age 11 High Achiever") content-focus description for all five subjects, mirroring the maths section's format.
- A clarified definition of what "High Achiever" means (see "What High Achiever means" under Level-band taxonomy): it's primarily a stretch *within* an age, not a guaranteed preview of the next age up, though the two naturally overlap since skill progression is continuous. For fact-based subjects specifically, High Achiever can legitimately come from either (a) a rarer/less-commonly-known fact at the same cognitive level, or (b) genuine multi-step reasoning — both are valid, and the existing geography/space seed content already uses both. What does NOT qualify is a technical-sounding vocabulary term that's core-curriculum for the exact topic being tested (the defect check 1 above catches).

Use this doc, not ad-hoc judgment, when instructing extraction/rewrite subagents on band assignment for the next round — it's more specific than the design doc's coarse "standard curricula -> Age N / competitive sources -> High Achiever" mapping.

## 3. Confirmed gap: no history or politics/civics content

Checked directly (not assumed): searching all five seed files for history/government/politics keywords turns up only ~12 items in `geography.json`, all from the NY State Social Studies 2006/2008 batches, and all US-specific (American Revolution figures/timeline, US census purpose, local/city government roles, one item on Haudenosaunee village governance). There is:
- No world history content (no other country's history, no ancient civilizations, no world wars, etc.)
- No general political-systems content (democracy vs other systems, how elections work outside the US, international relations, etc.)
- No dedicated seed file — this content currently lives inside `geography.json` as an offshoot of "social studies," not as its own subject.

This is a real, confirmed content gap, not a research gap — the source catalog already has candidate sources that would help (NY's Social Studies/Regents archive has more admins beyond the two already mined; NCERT/CBSE India sources cover Social Studies including Indian history; UK/other national curricula likely have civics-adjacent content too) but nobody has gone looking with history/politics specifically as the target the way this round targeted science.

**Do not use this note as approval to create a new `history.json` or `politics.json` seed file.** `research/ingestion_pipeline_design.md`'s "Open items" section already flags that new subject files are explicitly not pre-approved (a past prompt-injection attempt tried to sneak exactly this in) — a real product decision is still needed on whether history/politics becomes its own subject, gets folded further into geography as "social studies," or is deliberately left thin. Surface this as a decision to make before spending a round sourcing content that has nowhere clearly-approved to land.
