# Ingestion batch summary

**Source:** Massachusetts DESE, Grade 5 Science and Technology/Engineering, Spring 2025 released items
**Subject:** science
**Batch directory:** research/pipeline/mcas-g5-science-2025

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

- **[warn] age-band-mismatch:** Q? ("A toy uses a hanging weight attached to a string to wind up and spin a propeller, until the weight reaches the ground. Which change would make the propeller spin for a longer time before stopping?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A bridge can be made from steel, wood, or stone. An engineer wants to know which material makes the strongest bridge. Which of the following is the best way for the engineer to determine which material is strongest?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A skateboarder rides down a hill, then up the other side. Their speed is 8 miles per hour part way up the hill, 5 miles per hour at the very top of the hill, and 12 miles per hour part way down the other side. A student says that the skateboard has the most kinetic energy when it is at the top of the hill. What evidence shows that this student's claim is incorrect?") assigned Age 11 but has a low difficulty-heuristic score (2) — check it isn't too easy for this band.

## Fact verification status

**15 of 15 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- geography: 3 (staging-geography.json)
- general-science: 12 (staging-general-science.json)

## Topic breakdown (approved items)

- weathering and erosion: 1
- animal adaptation and survival: 1
- renewable energy resources: 1
- climate and solar energy: 1
- potential energy and work: 1
- unbalanced forces and motion: 1
- natural hazard protection: 1
- experimental design and controls: 1
- chemical reactions and investigation: 1
- simple machines and functions: 1
- communication technology: 1
- wind energy and power: 1
- kinetic energy and motion: 1
- electrical conductivity: 1
- inherited versus learned traits: 1

## Age-band breakdown (approved items)

- Age 10: 9
- Age 9: 3
- Age 11: 3

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
