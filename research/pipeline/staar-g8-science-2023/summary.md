# Ingestion batch summary

**Source:** Texas STAAR Grade 8 Science 2023 Redesign Practice Assessment
**Subject:** science
**Batch directory:** research/pipeline/staar-g8-science-2023

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 27 |
| Passed correctness verification (Step 4) | 27 |
| Passed deduplication (Step 5) | 27 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **27** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

- **[warn] age-band-mismatch:** Q? ("A scientist studies different atoms of the element carbon. Some atoms have 6 neutrons, while others have 8 neutrons. What is the same about all of these carbon atoms?") assigned Age 11 but has a low difficulty-heuristic score (1) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A student balances this chemical equation: 3Mg + N₂ → Mg₃N₂. How many different chemical elements appear in this equation?") assigned Age 11 but has a low difficulty-heuristic score (1) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A scientist studies a model of an atom. The nucleus contains 16 subatomic particles. Of these particles, 6 have no electrical charge. Which statement about this atom is correct?") assigned Age 11 but has a low difficulty-heuristic score (2) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Two children push on opposite sides of a toy wagon on a smooth ice rink. One child pushes with a force of 35 newtons to the left. The other pushes with a force of 60 newtons to the right. What happens to the wagon?") assigned Age 11 but has a low difficulty-heuristic score (2) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A basketball player holds a ball at shoulder height, then drops it. At which moment does the ball have the most stored-up energy (potential energy) due to its height?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("The Andes Mountains in South America formed along the boundary where the Nazca Plate and the South American Plate meet. The Nazca Plate is moving beneath the South American Plate. Which type of plate boundary exists at this location?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A tennis player swings a racket and hits a tennis ball. According to Newton's Third Law of Motion, which statement correctly describes the forces between the racket and ball?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A student uses a classification key to identify an insect. Step 1: Does it have wings? If yes, go to 2. If no, go to 5. Step 2: Are the wings soft and folded? If yes, go to 3. If no, go to 4. Step 3: Does it have a long thin tail? If yes, it's a Silverfish. If no, it's a Beetle. Step 4: Are its wings hard on top? If yes, it's a Dragonfly. If no, it's a Butterfly. An insect has wings that are NOT soft and folded, but ARE hard on top. Which classification does this insect belong to?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (1) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A student operates a wind-up toy robot. After winding up the spring, she releases it and watches the robot walk across the floor. The robot gradually slows down and stops. Which statement best describes the energy conversion happening in this toy?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Which of the following environmental changes would most likely cause long-lasting effects on both the natural environment and the animals living there?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A student examines three materials and records their properties: Material A - solid, shiny, bends without breaking, conducts electricity easily. Material B - solid, shiny with a metallic luster, very hard, shatters when struck. Material C - solid, dull, breaks apart easily, does not conduct electricity. Based on these properties, which classification is most accurate?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("After eating a large meal with lots of sugar and carbohydrates, a person's blood sugar level rises. Which body system is responsible for producing the hormone that helps bring blood sugar back down to normal levels?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Geologists find identical rock formations and the same fossil species in South America and Africa, even though these continents are now separated by thousands of kilometers of ocean. Which explanation best accounts for this evidence?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.

## Near-duplicate warnings (Step 5.5 — mechanical, non-blocking)

None raised.

## Fact verification status

**25 of 27 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- science: 27 (staging-science.json)

## Topic breakdown (approved items)

- stars: 1
- cell-theory: 1
- density: 1
- ecosystems: 2
- chemical-reactions: 1
- weather: 1
- atoms: 2
- chemistry: 1
- physical-vs-chemical-change: 1
- forces: 1
- energy: 1
- plate-tectonics: 2
- forces-and-motion: 3
- classification: 1
- reproduction: 1
- erosion: 1
- cell-structure: 1
- energy-conversion: 1
- lunar-cycles: 1
- environmental-change: 1
- material-properties: 1
- body-systems: 1

## Age-band breakdown (approved items)

- Age 10: 8
- Age 11: 14
- Age 10 High Achiever: 2
- Age 11 High Achiever: 3

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
