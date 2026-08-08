# Ingestion batch summary

**Source:** NY State Grade 5 Social Studies Test (Nov 2008)
**Subject:** geography
**Batch directory:** research/pipeline/ny-g5-socialstudies-2008

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 6 |
| Passed correctness verification (Step 4) | 6 |
| Passed deduplication (Step 5) | 6 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **6** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

None raised.

## Fact verification status

**6 of 6 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- science: 1 (staging-science.json)
- geography: 5 (staging-geography.json)

## Topic breakdown (approved items)

- Environmental science / Air pollution: 1
- Climate zones and latitude: 1
- Latitude and hemisphere location: 1
- Political geography and world seas: 1
- Continent sizes and world geography: 1
- Continent sizes: 1

## Age-band breakdown (approved items)

- Age 9: 6

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/geography.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
