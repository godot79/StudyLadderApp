# Ingestion batch summary

**Source:** MCAS Grade 8 Science and Technology/Engineering, Spring 2025
**Subject:** science
**Batch directory:** research/pipeline/mcas-g8-science-2025

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 17 |
| Passed correctness verification (Step 4) | 17 |
| Passed deduplication (Step 5) | 17 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **17** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

- **[warn] age-band-mismatch:** Q? ("Two tuning forks are struck. Fork P vibrates with a very large motion up and down (tall peaks and valleys) and completes 2 full cycles in one second. Fork Q vibrates with very small motion (barely visible peaks and valleys) but completes 5 full cycles in one second. Which statement best compares the energy of fork P with fork Q?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (1) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Two regions were compared for natural gas deposits. Region A was dry land with mountains and forests 150 million years ago. Region B was covered by a shallow seabed with many sea creatures 150 million ago. Today, region B has large natural gas deposits, while region A has almost none. Which explanation best describes why region B has more natural gas?") assigned Age 11 but has a low difficulty-heuristic score (3) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A weather map shows a mass of very cold, dry air moving from the north toward a valley that contains warm, moist air. The cold air mass is sliding under the warm air, pushing it upward. What weather changes would observers in the valley most likely notice?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The snow hare population follows a cycle, peaking every 10 years. These hares eat shrubs and grasses. The hares are the main food for several predators including lynxes, eagles, and wolves. Why do you think the hare population keeps cycling up and down in this regular 10-year pattern?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (2) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A student places two cylindrical metal objects (cylinders A and B) on a smooth table, separated by a small gap so they do not touch. The student slowly pushes cylinder A toward cylinder B. Unexpectedly, cylinder B rolls away in the same direction that cylinder A is moving, even though the two objects never make contact with each other. Which explanation best accounts for this motion?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A genetic trait is controlled by a gene with two forms: the dominant form (T) causes tall height, and the recessive form (t) causes short height. A mother has genotype Tt (tall, carrying one short allele). A father has genotype tt (short). What are the possible genotypes of their children?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A student observes the Moon at different times over several weeks and sees it change from a thin crescent shape to a full circle to a thin crescent again. She notes that the lit-up part of the Moon always seems to have a different shape each night. Which explanation best describes why the Moon appears to change shape?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A student tracks the Moon's phases starting from a full moon (completely lit). How long does it take for the Moon to go through all its phases and return to a full moon again?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A student wants to make a model that accurately shows the structure of our galaxy, the Milky Way. Which of the following should the student use to represent a key feature of the Milky Way?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A child on a skateboard is standing still at the top of a slope (position M). The child then pushes off and rides the skateboard down the slope (position N, moving down the incline). Compared to position M, which statement best describes the energy changes at position N?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.

## Near-duplicate warnings (Step 5.5 — mechanical, non-blocking)

None raised.

## Fact verification status

**17 of 17 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- science: 17 (staging-science.json)

## Topic breakdown (approved items)

- waves: 1
- earth science: 1
- engineering: 3
- weather: 1
- food webs: 3
- population dynamics: 2
- magnetism: 1
- genetics: 1
- space: 3
- energy: 1

## Age-band breakdown (approved items)

- Age 11 High Achiever: 4
- Age 11: 6
- Age 10 High Achiever: 4
- Age 10: 3

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
