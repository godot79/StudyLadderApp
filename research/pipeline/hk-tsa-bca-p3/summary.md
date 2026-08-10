# Ingestion batch summary

**Source:** HK TSA Primary 3 2023 (Maths translated + English R&W)
**Subject:** maths
**Batch directory:** research/pipeline/hk-tsa-bca-p3

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 30 |
| Passed correctness verification (Step 4) | 30 |
| Passed deduplication (Step 5) | 30 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **30** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

None raised.

## Fact verification status

**20 of 30 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- maths: 12 (staging-maths.json)
- english: 18 (staging-english.json)

## Topic breakdown (approved items)

- addition: 1
- multiplication: 1
- division with remainder: 1
- order of operations (brackets): 1
- subtraction word problem: 1
- division word problem: 1
- order of operations (mixed operators): 1
- multi-addend addition: 1
- multiplication word problem: 1
- multi-step addition/subtraction: 1
- commutative property of multiplication: 1
- division: 1
- reading comprehension (menu, detail lookup): 1
- reading comprehension (menu, counting): 1
- reading comprehension (menu, choosing correct option): 1
- reading comprehension (menu, arithmetic in context): 1
- reading comprehension (menu, promotion detail): 1
- reading comprehension (menu, comparison): 1
- reading comprehension (letter, main idea): 1
- reading comprehension (letter, detail lookup): 1
- reading comprehension (letter, what is Leo not good at): 1
- reading comprehension (letter, feeling word): 1
- reading comprehension (letter, multi-select detail): 1
- reading comprehension (letter, pronoun reference): 1
- reading comprehension (story, main idea): 1
- reading comprehension (story, setting): 1
- reading comprehension (story, vocabulary in context): 1
- reading comprehension (story, cause and effect): 1
- reading comprehension (story, gift/object detail): 1
- reading comprehension (story, pronoun reference): 1

## Age-band breakdown (approved items)

- Age 9: 30

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/maths.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
