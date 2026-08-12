# Ingestion batch summary

**Source:** Texas STAAR Grade 5 Science 2023 (Practice Assessment + Paper Item Sampler)
**Subject:** science
**Batch directory:** research/pipeline/staar-g5-science-2023

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 33 |
| Passed correctness verification (Step 4) | 33 |
| Passed deduplication (Step 5) | 33 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **33** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

- **[warn] age-band-mismatch:** Q? ("Sedimentary rocks form through a series of steps. A student is given these five processes that happen in nature: Weathering, Erosion, Deposition, Compaction, and Cementation. In what order must these processes occur to form sedimentary rock?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.

## Near-duplicate warnings (Step 5.5 — mechanical, non-blocking)

None raised.

## Fact verification status

**33 of 33 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- space: 4 (staging-space.json)
- science: 29 (staging-science.json)

## Topic breakdown (approved items)

- planets and solar system: 1
- food chains and energy flow: 1
- water cycle and condensation: 1
- moon phases and lunar cycle: 1
- light and reflection: 1
- limiting factors in ecosystems: 1
- weather fronts and weather changes: 1
- mixtures and separation methods: 1
- forces and motion: 1
- soil composition and particle size: 1
- energy and sensory systems: 1
- food webs and energy paths: 1
- landforms and erosion: 1
- ocean food webs: 1
- light refraction and reflection: 1
- plant competition and allelopathy: 1
- experimental design and variables: 1
- magnetism and magnetic materials: 1
- predators and ecosystem balance: 1
- weathering and erosion: 1
- energy transformations: 1
- material properties and classification: 1
- innate and learned behaviors: 1
- Earth's rotation and day/night cycle: 1
- sun and moon properties: 1
- animal life cycles: 1
- sedimentary rock formation process: 1
- physical properties and matter: 1
- habitats and animal adaptations: 1
- inherited traits: 1
- mixture separation methods: 1
- seaweed and plant adaptations: 1
- living and non-living interactions: 1

## Age-band breakdown (approved items)

- Age 9: 16
- Age 10 High Achiever: 7
- Age 10: 9
- Age 11: 1

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
