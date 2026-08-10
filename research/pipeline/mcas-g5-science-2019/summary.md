# Ingestion batch summary

**Source:** MCAS Grade 5 Science and Technology/Engineering, Spring 2019
**Subject:** science
**Batch directory:** research/pipeline/mcas-g5-science-2019

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

- **[warn] age-band-mismatch:** Q? ("A baker tests five unlabeled food ingredients: powdered sugar (dissolves in water), table salt (dissolves in water), iron filings (attracted to magnets), flour (does not dissolve), and cork pieces (float in water). The baker mixes three of these ingredients in a bowl of water, stirs the mixture with a strong magnet to remove anything magnetic, then removes the magnet. Only a clear solution remains with no visible particles. Which three ingredients were mixed together?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Two students set up composting experiments. Container A has solid walls and is opened only once a week for mixing. Container B has ventilation holes in the sides, allowing air to reach the waste at all times. Both containers have identical waste added at the same time. After eight weeks, the waste in Container B has broken down much faster than in Container A. What single change to Container A would most help speed up decomposition?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Scientists record climate data from four locations. Location W: temperatures range from 5°C to 20°C throughout the year, with 1–3 inches of rain; Location X: temperatures swing from -40°C to 25°C, with almost no rain (0–1 inch); Location Y: temperatures stay between 18°C and 22°C year-round, with 8–12 inches of rain every month; Location Z: temperatures range from 10°C to 15°C with 2–4 inches of rain per month. Which location is most likely a tropical rainforest?") assigned Age 11 but has a low difficulty-heuristic score (2) — check it isn't too easy for this band.

## Fact verification status

**15 of 15 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- science: 15 (staging-science.json)

## Topic breakdown (approved items)

- properties and mixtures: 1
- engineering design and testing: 1
- photosynthesis: 1
- decomposition and air exposure: 1
- decomposers and recycling matter: 1
- water conservation and resources: 1
- rock layers and relative age: 1
- fossils and paleontology: 1
- water absorption and engineering: 1
- climate and biomes: 1
- inherited traits: 1
- Earth's orbit and revolution: 1
- freshwater and saltwater bodies: 1
- ecosystems and habitat change: 1
- simple machines and motion transfer: 1

## Age-band breakdown (approved items)

- Age 11: 3
- Age 9: 4
- Age 10: 8

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
