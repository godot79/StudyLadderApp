# Ingestion batch summary

**Source:** original-authorship round 4 (user-provided framework)
**Subject:** geography
**Batch directory:** research/pipeline/original-world-geography-round4

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 17 |
| Passed correctness verification (Step 4) | 17 |
| Passed deduplication (Step 5) | 17 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **17** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

- **[warn] age-band-mismatch:** Q? ("Look at this map of the Iberian Peninsula. One country is shaded in green, along the Atlantic coast. What is its capital city?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("This map shows one island country shaded in green, in the North Atlantic Ocean, known for volcanoes and glaciers. Which country is it?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The Orinoco River is one of South America's longest rivers. In which country does it flow for most of its length?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The Great Victoria Desert is Australia's largest desert. In which part of Australia is it mostly located?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("K2 is the world's second-tallest mountain, but climbers consider it far more dangerous than Everest. Roughly how does its death rate compare to Everest's?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (1) — check it isn't too easy for this band.

## Near-duplicate warnings (Step 5.5 — mechanical, non-blocking)

None raised.

## Fact verification status

**17 of 17 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- geography: 17 (staging-geography.json)

## Topic breakdown (approved items)

- capitals and countries: 6
- rivers: 3
- mountains: 4
- plains: 2
- deserts: 2

## Age-band breakdown (approved items)

- Age 9: 3
- Age 10: 2
- Age 9 High Achiever: 3
- Age 10 High Achiever: 3
- Age 11: 3
- Age 11 High Achiever: 3

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/geography.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
