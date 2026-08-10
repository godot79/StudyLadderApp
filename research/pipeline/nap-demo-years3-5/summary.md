# Ingestion batch summary

**Source:** ACARA NAPLAN 2016 (Year 3 & Year 5)
**Subject:** maths
**Batch directory:** research/pipeline/nap-demo-years3-5

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 71 |
| Passed correctness verification (Step 4) | 66 |
| Passed deduplication (Step 5) | 50 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **50** |

## Rejections by reason code (Step 6)

- `ambiguous-options`: 1
- `math-incorrect`: 4
- `duplicate`: 15

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

None raised.

## Fact verification status

**39 of 50 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- maths: 23 (staging-maths.json)
- english: 27 (staging-english.json)

## Topic breakdown (approved items)

- multiplication (equal groups): 1
- number range/inequalities: 1
- balance/mass: 1
- place value/numeral writing: 1
- repeated addition/multiplication: 1
- multiplication word problems: 1
- division (equal shares): 1
- money/change: 1
- number sentences (subtraction): 1
- probability reasoning: 1
- number puzzles/place value: 1
- equivalent number sentences: 1
- perimeter: 1
- word problems/addition-subtraction: 1
- money/multiplication: 1
- estimation/number sentences: 1
- odd/even reasoning: 1
- money/coins: 1
- decimal number patterns: 1
- elapsed time: 1
- logical reasoning: 1
- division with remainder: 1
- fraction-decimal equivalence: 1
- word choice/adverbs: 1
- prepositions: 1
- modal verbs: 2
- subject-verb agreement: 2
- contractions: 1
- adverbs: 2
- nouns: 1
- capitalisation: 1
- conjunctions: 1
- sentence fragments/independent clauses: 1
- adjectives: 1
- past tense: 1
- pronoun reference: 2
- punctuation (reported vs direct question): 1
- apostrophes of contraction: 1
- combining sentences/relative clauses: 1
- redundant words: 1
- parts of speech (verb): 1
- apostrophes of contraction vs possession: 1
- reported speech: 1
- adverbs of time: 1
- parts of speech (adjective): 1
- compound sentences: 1

## Age-band breakdown (approved items)

- Age 9: 29
- Age 10: 21

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/maths.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
