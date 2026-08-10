# Ingestion batch summary

**Source:** NY Grade 8 Science June 2021 (v202)
**Subject:** science
**Batch directory:** research/pipeline/ny-g8-science-2021

## Funnel (Step 8)

| Stage | Count |
|---|---|
| Questions found on source (Step 1, full recall) | n/a |
| Deferred at classification (Step 2 — not transformed this batch) | n/a |
| Carried into stylistic transformation (Step 3) | 42 |
| Passed correctness verification (Step 4) | 42 |
| Passed deduplication (Step 5) | 42 |
| **Approved for staging (awaiting human sign-off, Step 7)** | **42** |

## Rejections by reason code (Step 6)

None.

## Self-audit flags (Step 6.5 — mechanical, not a substitute for your review)

- **[warn] age-band-mismatch:** Q? ("Inside each cell in your body, a process happens that releases energy from food. What gas is made as a waste product of this energy-making process?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("DNA is organized in a specific order: DNA → sections → full structures. What is the name of those sections that hold instructions for one specific trait?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Scientists describe all the thousands of chemical reactions happening inside your body right now. What is the single word for all these reactions combined?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("In a forest ecosystem, mountain lions are the top predators. Which path shows energy flowing from plants all the way up to a mountain lion?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Two animals both want to eat the same food source in the forest. Coyotes and mountain lions both hunt and eat deer. What does this struggle show?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("A comet appears in Earth's sky only during certain years. Why does it follow this pattern?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("As snowflakes fall through the air and begin to melt, two things happen: the snowflakes change and the air around them changes. What happens to each?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("In science class, you have a compound microscope that makes things look 400 times bigger. Which of these is too tiny to see, even with this powerful microscope?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (3) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Scientists study where earthquakes happen around the world and notice a pattern. The main cause of most earthquakes is the movement of huge sections of Earth's outer layer. What causes this movement?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Earthquakes follow a pattern - they're concentrated along certain belts on a world map. If you plotted other natural disasters on the same map, which would show the most similar pattern?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("It is 2:00 p.m. at location A. Your location B is east of location A. What time is it at location B?") assigned Age 11 but has a low difficulty-heuristic score (2) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("You want to dissolve as much sugar as possible in 100 grams of water. Which combination of conditions would let you dissolve the most sugar?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (3) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Three types of light - infrared, visible, and ultraviolet - all travel at the same speed and are made of waves. What is the main difference between these three types?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Looking at the same substance in solid, liquid, and gas form, how do the forces between particles compare in the liquid compared to the other two?") assigned Age 11 but has a low difficulty-heuristic score (0) — check it isn't too easy for this band.
- **[warn] age-band-mismatch:** Q? ("Two roller coaster hills: hill 1 is much taller than hill 2. At the top of each hill, the coaster has potential energy. How do these compare?") assigned Age 11 High Achiever but has a low difficulty-heuristic score (1) — check it isn't too easy for this band.

## Fact verification status

**42 of 42 staged items are fact-based claims with NO automated independent verification** (no web-search fact-checker built yet — see `unverified-facts.json` for the `factClaim` each one rests on). These must be manually fact-checked before merge, in addition to the normal content review.

## Subject breakdown (approved items, may span multiple subjects in one source)

- science: 42 (staging-science.json)

## Topic breakdown (approved items)

- cell biology: 1
- ecology/decomposers: 1
- levels of organization: 1
- digestion: 1
- cellular respiration: 1
- body systems: 1
- hormones: 1
- genetics: 1
- metabolism: 1
- photosynthesis: 1
- energy/organisms: 1
- nutrition/calories: 1
- producers: 1
- food webs: 4
- plant structures: 2
- energy flow: 1
- Halley's Comet/periodicity: 1
- orbits: 1
- Moon phases: 1
- Earth's shape: 1
- heat transfer/phase change: 1
- phase changes: 1
- scale/microscopy: 1
- minerals: 1
- plate tectonics: 2
- time zones/longitude: 1
- solubility: 1
- electromagnetic spectrum: 1
- states of matter: 2
- potential energy: 1
- simple machines: 1
- gravity/orbits: 1
- electricity: 2
- measurement: 1
- weather/hurricanes: 1

## Age-band breakdown (approved items)

- Age 9: 11
- Age 10 High Achiever: 5
- Age 10: 11
- Age 11 High Achiever: 12
- Age 11: 3

## Human review

Staged questions are in `staging.json` in this directory — **not yet merged into `data/seed/science.json`.**
Per the pipeline design (Step 7), review 100% of this batch since it is the first batch from this source/subject combination.
Nothing merges until you sign off.
