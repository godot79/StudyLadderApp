# Ingestion batch summary

**Source:** Texas STAAR Grade 5 Mathematics, May 2022
**Subject:** maths
**Batch directory:** research/pipeline/staar-g5-math-2022

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 24 |
| Passed correctness verification (Step 4) | 20 |
| Passed deduplication (Step 5) | 20 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **20** |

## Rejections by reason code (Step 6)

- `math-incorrect`: 4

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

None raised.

## Fact verification status

**7 of 20 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- maths: 20 (staging-maths.json)

## Topic breakdown (approved items)

- division with decimals: 1
- evaluating expressions with decimals: 1
- subtracting mixed numbers: 1
- multiplying decimals: 1
- coordinate plane conventions: 1
- dividing a fraction by a whole number: 1
- evaluating arithmetic expressions: 1
- identifying additive vs multiplicative relationships: 1
- coordinate plane vocabulary: 1
- division word problem: 1
- perimeter as sum of decimal lengths: 1
- order of operations: 2
- dividing decimals: 1
- budgeting and reasoning with a table: 1
- subtracting decimals: 1
- dividing a whole number by a unit fraction: 1
- reading a stem-and-leaf plot and computing a fraction: 1
- translating a word problem into an equation: 1
- recognizing repeated addition as multiplication with a fraction: 1

## Age-band breakdown (approved items)

- Age 10: 11
- Age 9: 9

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/maths.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
