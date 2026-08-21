# Ingestion batch summary

**Source:** original-authorship (user-provided framework)
**Subject:** geography
**Batch directory:** research/pipeline/original-world-geography-round7

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 20 |
| Passed correctness verification (Step 4) | 20 |
| Passed deduplication (Step 5) | 20 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **20** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

- **[warn] age-band-mismatch:** Q? ("This map shows a small country in Northern Europe shaded in green, joined to the rest of the continent by only a narrow land border with Germany. Which country is it?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Look at this map of the Caribbean Sea. One long, narrow island nation is shaded in green, just south of Florida. Which country is it?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Only a couple of countries in the world are completely surrounded by a single other country. Which small African country sits entirely inside South Africa's borders?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Most major rivers cross the equator once, if at all. Which African river is unusual because its course crosses the equator twice on its journey to the Atlantic Ocean?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Measured from its base on the ocean floor to its peak, this Hawaiian mountain is actually taller than Mount Everest, though most of its height lies underwater. Which mountain is it?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Which desert lies along the border between India and Pakistan, and is sometimes called the Great Indian Desert?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Which flat valley in California, lying between the Sierra Nevada and the Coast Ranges, produces a large share of all the fruit and vegetables grown in the United States?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[info] topic-concentration:** Topic "capitals and countries" is 45% of this batch (9/20).

## Near-duplicate warnings (Step 5.5 — mechanical, non-blocking)

None raised.

## Fact verification status

**20 of 20 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- geography: 20 (staging-geography.json)

## Topic breakdown (approved items)

- capitals and countries: 9
- rivers: 4
- mountains: 4
- deserts: 2
- plains: 1

## Age-band breakdown (approved items)

- Age 9: 5
- Age 10: 5
- Age 9 High Achiever: 1
- Age 10 High Achiever: 1
- Age 11: 2
- Age 11 High Achiever: 6

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/geography.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
