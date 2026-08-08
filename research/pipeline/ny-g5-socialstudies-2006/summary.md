# Ingestion batch summary

**Source:** NY State Grade 5 Social Studies Test, November 2006
**Subject:** geography
**Batch directory:** research/pipeline/ny-g5-socialstudies-2006

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 31 |
| Passed correctness verification (Step 4) | 31 |
| Passed deduplication (Step 5) | 31 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **31** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

None raised.

## Fact verification status

**31 of 31 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- geography: 31 (staging-geography.json)

## Topic breakdown (approved items)

- culture: 1
- cultural transmission: 1
- continents: 1
- geography definition: 1
- climate zones: 2
- global trade: 1
- economics: 1
- local government: 2
- Haudenosaunee government: 1
- European exploration: 1
- Haudenosaunee settlement: 1
- Haudenosaunee housing: 1
- civics vocabulary: 1
- American Revolution: 1
- slavery in colonial America: 1
- Dutch colonization: 1
- American Revolution timeline: 2
- resource conservation: 1
- Erie Canal: 1
- transportation development: 1
- American symbols: 1
- national holidays: 1
- census: 1
- federal court system: 1
- patriotism: 1
- representative government: 1
- continents and equator: 1
- fact vs. opinion: 1

## Age-band breakdown (approved items)

- Age 9: 19
- Age 10: 12

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/geography.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
