# Ingestion batch summary

**Source:** original-authorship round 2 (user-provided framework)
**Subject:** geography
**Batch directory:** research/pipeline/original-world-geography-round2

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 22 |
| Passed correctness verification (Step 4) | 22 |
| Passed deduplication (Step 5) | 22 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **22** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

- **[warn] age-band-mismatch:** Q? ("This map shows one long, narrow country shaded in green, high up near the Arctic Circle in Northern Europe. Which country is it?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Look at this map of East Asia. One country is shaded in green, occupying the southern half of a peninsula. What is its capital city?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The Mississippi River's name comes from a Native American language. What does the original name mean?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The Arabian Desert is one of the largest deserts in the world. On which peninsula is it mostly located?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The Great Dividing Range separates Australia's flat interior plains from a narrower strip of land. What lies on the other side of the range, along most of Australia's east coast?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.

## Near-duplicate warnings (Step 5.5 — mechanical, non-blocking)

None raised.

## Fact verification status

**22 of 22 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- geography: 22 (staging-geography.json)

## Topic breakdown (approved items)

- capitals and countries: 6
- rivers: 5
- mountains: 5
- deserts: 2
- plains: 4

## Age-band breakdown (approved items)

- Age 9: 6
- Age 10: 5
- Age 10 High Achiever: 3
- Age 11: 4
- Age 11 High Achiever: 3
- Age 9 High Achiever: 1

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/geography.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
