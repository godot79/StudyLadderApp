# Ingestion batch summary

**Source:** NY State Grade 4 Science, June 2022
**Subject:** science
**Batch directory:** research/pipeline/ny-g4-science-2022

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 29 |
| Passed correctness verification (Step 4) | 29 |
| Passed deduplication (Step 5) | 29 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **29** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

None raised.

## Fact verification status

**29 of 29 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- science: 29 (staging-science.json)

## Topic breakdown (approved items)

- life science - behavior: 1
- life science - animal adaptations: 1
- life science - structural adaptations: 1
- life science - animal behavior: 1
- life science - camouflage: 1
- life science - lifespan: 1
- life science - energy and nutrition: 1
- life science - seasonal plant growth: 1
- ecology - food chains: 1
- ecology - energy transfer: 1
- life science - population recovery: 1
- earth science - water cycle: 1
- earth science - environmental damage: 1
- earth science - Earth's rotation: 1
- physical science - forces: 1
- earth science - water cycle processes: 1
- earth science - weather hazards: 1
- physical science - matter: 1
- physical science - light and reflection: 1
- physical science - floating and sinking: 1
- physical science - changes in properties: 1
- physical science - light absorption: 1
- life science - observation skills: 1
- scientific method - tools: 1
- data analysis: 1
- weather data interpretation: 1
- data interpretation: 1
- physical science - friction: 1
- physical science - solid properties: 1

## Age-band breakdown (approved items)

- Age 9: 13
- Age 10: 16

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
