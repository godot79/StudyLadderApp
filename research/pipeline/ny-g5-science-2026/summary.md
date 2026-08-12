# Ingestion batch summary

**Source:** NY Grade 5 Science 2026
**Subject:** science
**Batch directory:** research/pipeline/ny-g5-science-2026

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 18 |
| Passed correctness verification (Step 4) | 18 |
| Passed deduplication (Step 5) | 15 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **15** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

- **[warn] answer-position-bias:** 7/15 (47%) of correct answers are option B — a child could learn to guess this letter.
- **[warn] age-band-mismatch:** Q? ("An invasive fish species, the lionfish, has spread through the Atlantic Ocean and Caribbean Sea. Lionfish are fast predators that eat small fish and crustaceans. Native fish and crustacean species are being eaten at much higher rates now that lionfish are present. Coral reef ecosystems depend on small reef fish to eat algae and keep corals healthy. Complete the explanation: 'The introduction of lionfish to coral reef ecosystems could ___1___ the number of algae-eating fish, which would ___2___ the amount of algae on the reef, ultimately ___3___ the health of coral colonies because lionfish are disrupting the ecosystem's ___4___.'") assigned Age 11 High Achiever but has a low difficulty-heuristic score (1) — check it isn't too easy for this band.

## Near-duplicate warnings (Step 5.5 — mechanical, non-blocking)

None raised.

## Fact verification status

**15 of 15 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- science: 15 (staging-science.json)

## Topic breakdown (approved items)

- shadows and sun position: 1
- day length and seasons: 1
- mineral identification and properties: 1
- solubility and dissolving: 1
- group behavior and survival: 1
- genetic variation and natural selection: 1
- sound energy transfer: 1
- energy transfer through objects: 1
- water cycle processes: 1
- hurricane formation and water temperature: 1
- climate and latitude: 1
- trait variation in plants: 1
- invasive species and ecosystem change: 1
- Earth's spheres and interactions: 1
- energy conversion: 1

## Age-band breakdown (approved items)

- Age 10 High Achiever: 4
- Age 10: 6
- Age 9: 4
- Age 11 High Achiever: 1

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
