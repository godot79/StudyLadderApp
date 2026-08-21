# Ingestion batch summary

**Source:** original-authorship (user-provided framework)
**Subject:** geography
**Batch directory:** research/pipeline/original-world-geography-round8

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 20 |
| Passed correctness verification (Step 4) | 20 |
| Passed deduplication (Step 5) | 20 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **20** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

None raised.

## Near-duplicate warnings (Step 5.5 — mechanical, non-blocking)

None raised.

## Fact verification status

**20 of 20 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- geography: 20 (staging-geography.json)

## Topic breakdown (approved items)

- capitals and countries: 7
- rivers: 4
- mountains: 3
- deserts: 3
- plains: 3

## Age-band breakdown (approved items)

- Age 9: 11
- Age 10: 9

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/geography.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
