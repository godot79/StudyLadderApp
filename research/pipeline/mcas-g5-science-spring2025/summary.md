# Ingestion batch summary

**Source:** MCAS Grade 5 Science Spring 2025
**Subject:** science
**Batch directory:** research/pipeline/mcas-g5-science-spring2025

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 16 |
| Passed correctness verification (Step 4) | 16 |
| Passed deduplication (Step 5) | 15 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **15** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

- **[warn] age-band-mismatch:** Q? ("A geologist studies two different regions. Region M has a cold, wet climate with fierce winter storms bringing heavy wind and rain. Region D has a hot, dry climate with intense sun and little precipitation all year. In Region M, what type of erosion is most common, and in Region D, what type is most likely?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A toy contains a small weight attached to a string that unwinds and causes a fan propeller to spin. When released, the weight falls and transfers energy to spin the propeller. Assume the string length is constant. Which change would cause the propeller to spin for the longest amount of time?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A cyclist rides over a hill. Her speed is 8 meters per second going uphill, 5 meters per second at the peak of the hill, and 14 meters per second riding downhill. A student claims that the bicycle has its maximum kinetic energy when it reaches the hilltop. What evidence proves this claim is incorrect?") assigned Age 11 but has a low difficulty-heuristic score (2) — check it isn't too easy for this band.

## Fact verification status

**15 of 15 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- science: 15 (staging-science.json)

## Topic breakdown (approved items)

- weathering and erosion: 1
- plant adaptation and defense: 1
- engineering design and filtration: 1
- climate and weather patterns: 1
- weather events and erosion types: 1
- renewable energy and climate: 1
- gravitational potential energy: 1
- forces and motion: 1
- simple machines and mechanical function: 1
- communication technology: 1
- properties of matter: 1
- wind energy and kinetic energy: 1
- kinetic energy and motion: 1
- electrical conductivity: 1
- inheritance and learned behavior: 1

## Age-band breakdown (approved items)

- Age 10: 9
- Age 11: 3
- Age 9: 3

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
