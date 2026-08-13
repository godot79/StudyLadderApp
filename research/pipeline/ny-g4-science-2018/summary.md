# Ingestion batch summary

**Source:** NY State Grade 4 Elementary Science, June 2018
**Subject:** science
**Batch directory:** research/pipeline/ny-g4-science-2018

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 30 |
| Passed correctness verification (Step 4) | 30 |
| Passed deduplication (Step 5) | 30 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **30** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

None raised.

## Near-duplicate warnings (Step 5.5 — mechanical, non-blocking)

None raised.

## Fact verification status

**30 of 30 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- science: 27 (staging-science.json)
- space: 3 (staging-space.json)

## Topic breakdown (approved items)

- life processes: 1
- adaptations: 1
- camouflage: 1
- habitat and resources: 1
- life cycles: 1
- plant reproduction: 1
- energy and nutrition: 1
- animal senses: 1
- food chains: 2
- animal adaptations: 1
- energy and water cycle: 1
- environmental conservation: 1
- light and ecosystems: 1
- Earth's orbit: 1
- moon phases: 1
- precipitation: 1
- properties of matter: 1
- light and reflection: 1
- phase changes: 1
- states of matter: 1
- forms of energy: 1
- erosion and deposition: 1
- measurement: 2
- friction: 1
- energy conversion: 1
- gravity: 1
- simple machines: 1
- fact vs. opinion: 1

## Age-band breakdown (approved items)

- Age 9: 22
- Age 9 High Achiever: 1
- Age 10: 7

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
