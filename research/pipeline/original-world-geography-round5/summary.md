# Ingestion batch summary

**Source:** original-authorship round 5 (user-provided framework)
**Subject:** geography
**Batch directory:** research/pipeline/original-world-geography-round5

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 19 |
| Passed correctness verification (Step 4) | 19 |
| Passed deduplication (Step 5) | 19 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **19** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

- **[warn] age-band-mismatch:** Q? ("Look at this map of Central Europe. One small, mountainous, landlocked country is shaded in green, famous for the Alps and for staying neutral in wars. What is its capital city?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("This map shows one densely populated country shaded in green, sitting mostly on a river delta in South Asia. Which country is it?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The Sahara Desert stretches across North Africa. Roughly how many separate countries does it spread across?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The Sahel is a band of dry grassland stretching across Africa, forming a transition between two very different regions. Which two regions does it lie between?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Mount Ararat, in eastern Turkey, is famous in religious tradition as the resting place of Noah's Ark. What kind of mountain is it, geologically?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Death Valley, in the United States, holds two extreme records for North America. What are they?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The Nile River is actually formed by two major rivers joining together in Sudan. What are they called?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.

## Near-duplicate warnings (Step 5.5 — mechanical, non-blocking)

None raised.

## Fact verification status

**19 of 19 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- geography: 19 (staging-geography.json)

## Topic breakdown (approved items)

- capitals and countries: 6
- mountains: 5
- deserts: 3
- rivers: 3
- plains: 2

## Age-band breakdown (approved items)

- Age 9: 3
- Age 10: 3
- Age 9 High Achiever: 3
- Age 10 High Achiever: 3
- Age 11: 4
- Age 11 High Achiever: 3

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/geography.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
