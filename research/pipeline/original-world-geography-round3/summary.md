# Ingestion batch summary

**Source:** original-authorship round 3 (user-provided framework)
**Subject:** geography
**Batch directory:** research/pipeline/original-world-geography-round3

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 21 |
| Passed correctness verification (Step 4) | 21 |
| Passed deduplication (Step 5) | 21 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **21** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

- **[warn] age-band-mismatch:** Q? ("Look at this map. One long, narrow country shaded in green runs down the western edge of South America. What is its capital city?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("This map shows one island country shaded in green, southeast of Australia, made up of two main islands. Which country is it?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Most people assume the Mississippi is North America's longest river, but a different river that joins it is actually slightly longer. Which river is it?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The Tigris and Euphrates rivers flow through the region often called the 'cradle of civilisation'. Which present-day country do they mostly flow through?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Which desert, located in southern South America, is considered the largest desert in the Americas?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Mount Everest has the highest elevation above sea level, but the summit of a different mountain is actually the farthest point on Earth from the planet's centre. Which mountain?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The Danakil Depression, in a part of East Africa, is often called the hottest place on Earth by average temperature. Which country is it in?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.

## Near-duplicate warnings (Step 5.5 — mechanical, non-blocking)

None raised.

## Fact verification status

**21 of 21 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- geography: 21 (staging-geography.json)

## Topic breakdown (approved items)

- capitals and countries: 6
- mountains: 5
- plains: 3
- rivers: 4
- deserts: 3

## Age-band breakdown (approved items)

- Age 9: 3
- Age 10: 3
- Age 9 High Achiever: 5
- Age 10 High Achiever: 3
- Age 11: 4
- Age 11 High Achiever: 3

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/geography.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
