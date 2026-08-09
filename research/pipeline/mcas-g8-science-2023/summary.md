# Ingestion batch summary

**Source:** MCAS Grade 8 Science and Technology/Engineering, Spring 2023
**Subject:** science
**Batch directory:** research/pipeline/mcas-g8-science-2023

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 14 |
| Passed correctness verification (Step 4) | 14 |
| Passed deduplication (Step 5) | 14 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **14** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

- **[warn] age-band-mismatch:** Q? ("Your body breaks down the apple you eat for breakfast into tiny pieces inside your cells. These pieces then get combined with a gas you breathe in through your lungs. This process releases heat that keeps you warm, plus other materials that leave your body through your breath and sweat. What are the THREE main things needed for this cell-power process to work?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A school needs to clear ice from a walkway next to a playground where kids play in winter. The school tested four different materials to see which works best: salt, rock salt crystals, urea, and sand. They measured three things: how much money each costs, how quickly each melted the ice, and whether it hurt the nearby plants. The rock salt crystals worked fastest and could melt ice even when it was extremely cold outside. However, one of the other materials was cheaper. Based on the school's testing, why did they choose to use rock salt crystals instead of the cheaper choice?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Two children have the same mother and father. One child has dark brown eyes and the other has light blue eyes. The parents notice their eyes are different colors even though they come from the same family. Which best explains why each child has a different eye color?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Heat can move from one place to another in different ways. Which of these examples shows heat moving mainly through DIRECT TOUCHING between two materials?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A scientist performs four different chemical reactions in sealed containers and measures the total weight before and after each reaction. In Container A, the weight dropped from 100g to 97g. In Container B, the weight dropped from 140g to 138g. In Container C, the weight went up from 120g to 121g. In Container D, the weight stayed exactly the same at 150g before and after. Which container was most likely completely sealed with nothing able to escape or enter?") assigned Age 11 but has a low difficulty-heuristic score (3) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Deep under the ocean floor, a diagram shows two giant pieces of the Earth's crust moving apart from each other. Hot, flowing material from deep inside the Earth is shown rising up between them, pushing the crust pieces away from each other on both sides. What force is pushing these enormous pieces of crust in opposite directions?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A weather scientist compares two cities: San Diego is right next to the Pacific Ocean on the California coast, while Phoenix is far inland in the desert. The scientist notices that San Diego's summers are much cooler than Phoenix's summers, even though they are at almost the same distance from the equator. What is the main reason San Diego stays cooler in summer?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Scientists studied the fossils of ocean creatures found in rock layers spanning 600 million years. They made a graph showing how many different groups of ocean animals lived at different times. The graph showed the number of animal groups gradually growing for most of history. Then, suddenly, at a point 250 million years ago, the number dropped sharply. After that drop, the numbers started rising again toward today. What does this sudden drop in the number of animal groups tell us happened at that time?") assigned Age 11 but has a low difficulty-heuristic score (3) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Scientists studied the bones of three very different animals—a tiger's front paw, a human's arm, and a frog's leg. Even though these animals look completely different on the outside and use their limbs in totally different ways, the bones are arranged in surprisingly the same pattern: one long bone, two bones next to each other, then a cluster of smaller bones at the end. What does this similarity in bone structure suggest about these three animals?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.

## Fact verification status

**14 of 14 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- science: 14 (staging-science.json)

## Topic breakdown (approved items)

- cellular respiration: 1
- material properties: 2
- cell biology: 2
- genetics: 1
- heat transfer: 1
- conservation of mass: 1
- evolution: 2
- plate tectonics: 1
- climate: 1
- extinction: 1
- paleoclimatology: 1

## Age-band breakdown (approved items)

- Age 11: 10
- Age 10: 2
- Age 9: 2

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
