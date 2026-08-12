# Ingestion batch summary

**Source:** NY State Grade 4 Elementary-Level Science Test, 2021
**Subject:** science
**Batch directory:** research/pipeline/ny-g4-science-2021

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 28 |
| Passed correctness verification (Step 4) | 28 |
| Passed deduplication (Step 5) | 28 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **28** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

None raised.

## Near-duplicate warnings (Step 5.5 — mechanical, non-blocking)

None raised.

## Fact verification status

**28 of 28 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- space: 5 (staging-space.json)
- science: 23 (staging-science.json)

## Topic breakdown (approved items)

- moon-phases: 1
- earth-orbit: 1
- earth-rotation: 1
- erosion: 1
- rock-properties: 1
- electrical-conductivity: 1
- shadows-sun-position: 1
- mechanical-energy: 1
- friction: 1
- electrical-circuits: 1
- sun-uv-harmful: 1
- simple-machines: 1
- light-absorption-heat: 1
- life-processes: 1
- human-made-materials: 1
- inheritance: 1
- seed-dispersal: 1
- competition: 1
- growth-development: 1
- plant-life-cycle: 1
- adaptation: 1
- animal-communication: 1
- habitat-ecosystem: 1
- animal-needs: 1
- decomposition: 1
- controlled-variables: 1
- rate-and-extrapolation: 1
- data-validation: 1

## Age-band breakdown (approved items)

- Age 9: 12
- Age 10: 10
- Age 9 High Achiever: 6

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
