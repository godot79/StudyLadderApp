# Ingestion batch summary

**Source:** NY State Elementary-level Science Test, Grade 5, Spring 2025
**Subject:** science
**Batch directory:** research/pipeline/ny-g5-science-2025

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 15 |
| Passed correctness verification (Step 4) | 15 |
| Passed deduplication (Step 5) | 15 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **15** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

None raised.

## Fact verification status

**15 of 15 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- science: 15 (staging-science.json)

## Topic breakdown (approved items)

- inheritance and variation in offspring: 1
- traits influenced by genetics and environment: 1
- life cycle stages of organisms: 1
- conservation of matter in closed systems: 1
- separating mixtures using physical properties: 1
- earthquakes occur along tectonic plate boundaries: 1
- retrofitting existing structures vs designing new earthquake-safe buildings: 1
- photosynthesis and light energy capture: 1
- comparing life cycle timing and generations among species: 1
- habitat management through ecological practices: 1
- Earth's axial tilt and seasonal daylight changes: 1
- static electricity and like charges repelling: 1
- electrostatic force overcoming gravity: 1
- scientific method and importance of repeated trials: 1
- energy conversion and motion as evidence of energy transfer: 1

## Age-band breakdown (approved items)

- Age 10: 8
- Age 9: 7

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
