# Ingestion batch summary

**Source:** original-authorship (user-provided framework)
**Subject:** geography
**Batch directory:** research/pipeline/original-world-geography-round6-ha

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

- **[warn] age-band-mismatch:** Q? ("Look at this map of East Africa. One landlocked country is shaded in green, sitting on the equator right next to one of the world's largest lakes. What is its capital city?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Look at this map of South America. One landlocked country is shaded in green, high in the Andes mountains, with two official capital cities instead of one. Which country is shaded?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The Zambezi River flows through several southern African countries, forming Victoria Falls along the way, before finally reaching the Indian Ocean. In which country does the Zambezi meet the ocean?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Cotopaxi, in Ecuador, is one of the highest active volcanoes in the world and a striking, near-perfect cone shape. Which mountain range is Cotopaxi part of?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Puncak Jaya, in Indonesia, is the tallest mountain in Oceania — taller than any peak in Australia. Despite sitting near the equator, it is unusual for having what at its summit?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The Manchurian Plain is a major farming region in northeastern China, hemmed in by mountains on most sides. Which large country lies immediately to the north of the Manchurian Plain?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.

## Near-duplicate warnings (Step 5.5 — mechanical, non-blocking)

None raised.

## Fact verification status

**20 of 20 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- geography: 20 (staging-geography.json)

## Topic breakdown (approved items)

- capitals and countries: 7
- rivers: 5
- plains: 2
- deserts: 2
- mountains: 4

## Age-band breakdown (approved items)

- Age 9 High Achiever: 7
- Age 10 High Achiever: 7
- Age 11 High Achiever: 6

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/geography.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
