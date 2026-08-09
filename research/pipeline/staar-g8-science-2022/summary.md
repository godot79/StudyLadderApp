# Ingestion batch summary

**Source:** Texas STAAR Grade 8 Science, May 2022
**Subject:** science
**Batch directory:** research/pipeline/staar-g8-science-2022

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

- **[warn] age-band-mismatch:** Q? ("A dog breeder has two adult dogs with brown fur. When these dogs have puppies, some puppies have brown fur while others have black fur. Why don't all the puppies look like their parents?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A person picks up a 4-kilogram bowling ball and wants to accelerate it forward at a rate of 3 meters per second squared. What is the net force (in newtons) that must be applied to the bowling ball? (Use: Force = mass × acceleration)") assigned Age 11 High Achiever but has a low difficulty-heuristic score (1) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A chemistry teacher writes out a balanced equation for a reaction: 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O. If you count all the oxygen atoms on both the left and right sides of this equation, how many oxygen atoms are there in total?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (1) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A car engine burns fuel in a cylinder. The fuel releases heat energy that expands into hot gases. These hot gases push a piston down. The piston turns connected parts that make the wheels rotate. Which statement correctly describes the energy changes in this process?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.

## Fact verification status

**33 of 33 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- science: 33 (staging-science.json)

## Topic breakdown (approved items)

- genetics: 1
- chemistry: 9
- biology: 6
- physics: 8
- ecology: 5
- astronomy: 3
- earth science: 1

## Age-band breakdown (approved items)

- Age 11 High Achiever: 5
- Age 10: 21
- Age 9: 7

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
