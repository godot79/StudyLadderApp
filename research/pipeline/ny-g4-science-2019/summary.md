# Ingestion batch summary

**Source:** NY Grade 4 Science 2019
**Subject:** science
**Batch directory:** research/pipeline/ny-g4-science-2019

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 28 |
| Passed correctness verification (Step 4) | 28 |
| Passed deduplication (Step 5) | 28 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **28** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

- **[warn] recall-not-reasoning:** Q? ("Polar bears have thick fur and a layer of fat under their skin to stay warm in freezing Arctic temperatures. What is this feature called?") assigned Age 9 High Achiever but reads as single-fact recall ("what is X called" / "what do we call") rather than multi-step reasoning — High Achiever should mean the child has to compare, predict, or trace a chain, not just name a term. Consider moving to a plain age band.

## Near-duplicate warnings (Step 5.5 — mechanical, non-blocking)

- **[85% overlap, same answer]** "How long does it take for Earth to complete one full orbit around the Sun?" (Age 9) closely resembles an existing item in `space.json`: "How long does Earth take to complete one full orbit around the Sun?". If this is the same fact just reworded across bands, it's not adding real difficulty — consider dropping it rather than staging it.

## Fact verification status

**28 of 28 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- science: 28 (staging-science.json)

## Topic breakdown (approved items)

- living-vs-nonliving: 1
- growth: 1
- basic-needs: 1
- heredity: 1
- plant-structures: 1
- adaptation: 1
- life-cycle: 1
- animal-behavior: 2
- food-chains: 2
- thermoregulation: 1
- animal-communication: 1
- earth-science: 1
- moon-phases: 1
- evaporation: 1
- physical-properties: 2
- forces: 1
- measurement: 1
- magnetism: 1
- states-of-matter: 1
- light-absorption: 1
- energy: 1
- spatial-reasoning: 1
- friction: 1
- simple-machines: 1
- scientific-reasoning: 1

## Age-band breakdown (approved items)

- Age 9: 11
- Age 9 High Achiever: 5
- Age 10: 9
- Age 10 High Achiever: 3

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
