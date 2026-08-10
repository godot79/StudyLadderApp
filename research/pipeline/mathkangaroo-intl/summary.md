# Ingestion batch summary

**Source:** Math Kangaroo (international) free sample questions
**Subject:** maths
**Batch directory:** research/pipeline/mathkangaroo-intl

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 9 |
| Passed correctness verification (Step 4) | 9 |
| Passed deduplication (Step 5) | 9 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **9** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

None raised.

## Fact verification status

N/A — this batch has no fact-based (non-computable) items, or all fact items have already been independently verified.

## Subject breakdown (approved items, may span multiple subjects in one source)

- maths: 9 (staging-maths.json)

## Topic breakdown (approved items)

- optimizing an arithmetic expression: 1
- place value / consecutive numbers: 1
- repeating patterns / modular reasoning: 1
- logical reasoning / grid sums: 1
- algebraic reasoning / linear equations: 1
- measurement / balancing equations: 1
- volume / measurement conversion: 1
- linear patterns / arithmetic sequences: 1
- spatial reasoning / combinatorial counting: 1

## Age-band breakdown (approved items)

- Age 9 High Achiever: 5
- Age 10 High Achiever: 4

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/maths.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
