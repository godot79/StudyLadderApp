# Ingestion batch summary

**Source:** original-authorship (user-provided framework)
**Subject:** geography
**Batch directory:** research/pipeline/original-world-geography-capitals-rivers-mountains

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 34 |
| Passed correctness verification (Step 4) | 34 |
| Passed deduplication (Step 5) | 34 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **34** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

- **[warn] age-band-mismatch:** Q? ("Look at this map of South Asia. One country is shaded in green, forming a large peninsula. What is its capital city?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Look at this map of Oceania. One country is shaded in green, surrounded entirely by ocean. What is its capital city?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The Danube River flows through many European countries before reaching the Black Sea. Which of these countries does the Danube flow through?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Which river flows through more countries than any other river in the world?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The Amazon River in South America was named after a group of legendary warriors described in an ancient myth. Where does the name 'Amazon' originally come from?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("What is the tallest mountain in Europe?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Which of these is the largest active volcano in the world?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Which of these is actually the largest desert in the world, even though it is covered in ice rather than sand?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The North European Plain is a large flat lowland stretching across much of northern Europe. Which of these countries lies mostly on this plain?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.

## Near-duplicate warnings (Step 5.5 — mechanical, non-blocking)

None raised.

## Fact verification status

**34 of 34 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- geography: 34 (staging-geography.json)

## Topic breakdown (approved items)

- capitals and countries: 12
- rivers: 7
- mountains: 8
- deserts: 3
- plains: 4

## Age-band breakdown (approved items)

- Age 9: 10
- Age 9 High Achiever: 2
- Age 10: 9
- Age 10 High Achiever: 4
- Age 11: 3
- Age 11 High Achiever: 6

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/geography.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
