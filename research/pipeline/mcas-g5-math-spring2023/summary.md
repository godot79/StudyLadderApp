# Ingestion batch summary

**Source:** Massachusetts MCAS Grade 5 Mathematics, Spring 2023
**Subject:** maths
**Batch directory:** research/pipeline/mcas-g5-math-spring2023

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 14 |
| Passed correctness verification (Step 4) | 14 |
| Passed deduplication (Step 5) | 14 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **14** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

None raised.

## Fact verification status

**7 of 14 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- maths: 14 (staging-maths.json)

## Topic breakdown (approved items)

- Multiplying a whole number by a fraction: 1
- Rounding decimals to the nearest hundredth: 1
- Place value - comparing the value of digits in different positions: 1
- Comparing decimals to the thousandths place: 1
- Interpreting whole number divided by fraction in a word problem: 1
- Powers of ten - matching exponential form to standard number form: 1
- Expanded form to word form with decimals: 1
- Geometry - hierarchy and classification of quadrilaterals: 1
- Order of operations with parentheses, multiplication, and division: 1
- Interpreting a fraction as division: 1
- Dividing a decimal by a whole number: 1
- Multi-step word problem with unit conversion (ounces to pounds): 1
- Multiplying a mixed number by a fraction: 1
- Dividing a four-digit number by a two-digit number: 1

## Age-band breakdown (approved items)

- Age 10: 10
- Age 9: 4

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/maths.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
