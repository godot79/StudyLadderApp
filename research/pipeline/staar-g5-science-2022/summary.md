# Ingestion batch summary

**Source:** Texas STAAR Grade 5 Science, May 2022
**Subject:** science
**Batch directory:** research/pipeline/staar-g5-science-2022

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

- science: 31 (staging-science.json)

## Topic breakdown (approved items)

- Earth's rotation and apparent motion: 1
- Light travels in straight lines: 1
- Density and floating: 1
- Producers in a food chain: 1
- Forms of energy affecting evaporation: 1
- Interpreting plant growth data: 1
- Relative distances of planets from the sun: 1
- Learned behavior versus instinct: 1
- Water cycle vocabulary: 1
- Biotic versus abiotic interactions: 1
- Types of mechanical energy: 1
- Structural adaptations for feeding: 1
- Identifying metal properties: 1
- Identifying biotic interactions: 1
- Dissolving as a physical change: 1
- Refraction of light through a lens: 1
- Renewable versus non-renewable energy: 1
- Shared structural adaptations: 1
- Testing for iron with a magnet: 1
- Animals and biome characteristics: 1
- Day-night cycle from Earth's rotation: 1
- Fossil evidence and past climate: 1
- Land formations and geological processes: 1
- Inherited versus acquired traits: 1
- Soil drainage properties: 1
- Density and liquid layering: 1
- Formation of fossil fuels: 1
- Newton's third law and action-reaction: 1
- Common properties of metals: 1
- Invasive species ecosystem effects: 1
- Designing controlled experiments: 1

## Age-band breakdown (approved items)

- Age 9: 13
- Age 10: 18

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
