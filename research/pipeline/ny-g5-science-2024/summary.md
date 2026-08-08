# Ingestion batch summary

**Source:** NY State Elementary-level Science Test, Grade 5, Spring 2024
**Subject:** science
**Batch directory:** research/pipeline/ny-g5-science-2024

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 13 |
| Passed correctness verification (Step 4) | 13 |
| Passed deduplication (Step 5) | 13 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **13** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

None raised.

## Fact verification status

**13 of 13 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- science: 13 (staging-science.json)

## Topic breakdown (approved items)

- Animal brain and memory: 1
- Force and motion during falling: 1
- Energy conversion and evidence: 1
- Collision and energy transfer: 1
- Engineering design and solution complexity: 1
- Water erosion and structural damage: 1
- Chemical reaction evidence: 1
- Animal senses and threat detection: 1
- Conservation solutions and logic: 1
- Scientific investigation and variables: 1
- Scientific prediction and data trends: 1
- Scientific investigation and comparison: 1
- Scientific trials and reliability: 1

## Age-band breakdown (approved items)

- Age 10: 9
- Age 9: 4

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
