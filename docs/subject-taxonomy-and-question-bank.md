# Subject Taxonomy and Question Bank

## Purpose

Define the v1 structure for subjects, level bands, and question-bank growth.

This app is moving from a single working maths slice into a fuller learner-facing learning app.
The question bank should grow in a way that is simple, maintainable, and aligned with the current architecture.

This document defines:
- subject taxonomy
- level-band expectations
- question-bank organisation
- content-writing rules
- expansion priorities

It is intended to support efficient implementation with low prompt overhead.

---

## Core principles

- keep the content model simple
- prefer explicit structure over clever abstractions
- grow breadth and depth gradually
- make progress visible by subject and level band
- support motivating learner-facing feedback
- keep content appropriate for desktop/tablet use
- optimise for a child using the app regularly
- preserve compatibility with the current app architecture

---

## v1 product direction

The app should feel like a growing learning platform, not a one-off quiz.

That means the content system should support:
- multiple subjects
- multiple level bands
- repeatable practice sessions
- visible progress by subject
- future progress by level band
- a steadily expanding question bank

The first expansion should remain modest and practical.

---

## Subject taxonomy

### v1 active subject

- Maths

Maths is the first fully supported subject and remains the priority until the dashboard, rewards, and content loop feel solid.

### v1 placeholder subjects

These may appear in the UI as "coming soon" if needed, but should not yet require full implementation:

- English
- Geography
- Space

These are acceptable placeholders because they match the intended child-facing product direction, but should not drive unnecessary architecture work before content exists.

### v1 implementation rule

Only fully implement the subjects that have actual question-bank support.
Do not build deep infrastructure for placeholder subjects.

---

## Subject definitions

### Maths

Maths should be the first fully developed subject.

Initial maths content should focus on:
- arithmetic fluency
- age-appropriate number sense
- short-answer or multiple-choice practice
- quick session-based repetition
- confidence-building progression

Maths is currently the benchmark subject for:
- sessions
- progress tracking
- rewards
- dashboard summaries

### English

Planned future subject.
Likely early content areas:
- spelling
- vocabulary
- grammar
- reading comprehension

Do not implement deeply yet unless specifically requested.

### Geography

Planned future subject.
Likely early content areas:
- countries
- capitals
- maps
- landmarks
- continents and oceans

Do not implement deeply yet unless specifically requested.

### Space

Planned future subject.
Likely early content areas:
- planets
- solar system
- stars
- moons
- simple science facts

Do not implement deeply yet unless specifically requested.

### History (decided 2026-08-13)

Planned future subject — **approved as a dedicated subject**, not a fold-in
to Geography. Decision context: ~10-12 history/politics/civics items had
accumulated inside `data/seed/geography.json` as an incidental byproduct of
social-studies sources (all US-specific — colonial settlement, American
Revolution, government/civics), with no distinguishing topic tag. Explicitly
decided (see `research/ingestion_pipeline_design.md`'s Open Items) not to
leave this folded into Geography or deliberately thin.

Not yet implemented: no `data/seed/history.json` exists, it is not in
`src/app/page.tsx`'s `SUBJECTS` list or `prisma/seed.ts`, and the existing
~10-12 items have not been migrated out of `geography.json`. Content
sourcing for this subject must not start in the same session as this scope
decision — implementation (schema/UI wiring, seed file creation, migrating
existing items, sourcing a first batch) is separate follow-up work.

Likely early content areas (not yet locked — needs its own level-band
content-focus pass like the other subjects have below, before sourcing):
- US founding/colonial history (existing content is entirely US-specific;
  whether to broaden beyond that is undecided)
- civics/government structure (branches, elections, representation)
- major historical figures and events at an age-appropriate level

Do not implement deeply yet unless specifically requested.

---

## Level-band taxonomy

Use level bands instead of generic difficulty labels.

### Initial level bands

- Age 9
- Age 9 High Achiever
- Age 10
- Age 10 High Achiever
- Age 11
- Age 11 High Achiever

These level bands should become first-class content metadata over time.

### Meaning

- standard age bands represent expected age-appropriate challenge
- high achiever bands represent extension material for children comfortably above the standard level

### What "High Achiever" means (clarified 2026-08-10)

High Achiever is primarily a stretch **within** its own age, not a guaranteed preview of the next age up — but the two aren't mutually exclusive, and the maths content structure below already reads that way on purpose: Age 9 High Achiever's "larger-number arithmetic" and Age 10 plain's "stronger arithmetic fluency, larger numbers" naturally overlap, because skill progression is continuous, not a hard wall between bands. Don't treat High Achiever as capped at "just under the next age" or as required to reach it — judge each item on whether it's a genuine stretch for a child comfortably ahead of their own age, not against the neighboring band's description.

For fact-based subjects (geography, space, science) specifically: a High Achiever item can earn that label through **either** of two independent routes, and both are legitimate:
- **Rarer/deeper factual knowledge** — same recall operation as the plain band, just a less commonly known fact (e.g. plain "capital of France" vs High Achiever "capital of India" — harder because it's less frequently taught, not because it requires reasoning).
- **Multi-step reasoning** — comparing, predicting, or tracing a chain across more than one fact (e.g. "which food-chain path correctly connects grass to a top predator").

What does **not** qualify, regardless of how technical the vocabulary sounds: a term or fact that's core-curriculum for the very topic being tested, especially when the prompt itself hands the child everything except a one-word label (e.g. describing cellular respiration in full and then asking "what gas is released" is asking the child to name a term the question already explained — that's plain-band recall wearing a High Achiever costume, not extension content). `research/pipeline/scripts/self-audit.ts`'s `recall-not-reasoning` check flags this specific pattern for fact-type items; see that script's comment header for the batch that surfaced it.

### v1 implementation rule

If the current schema does not yet support level bands cleanly, implement the smallest clear change needed when level-band-aware content expansion begins.

Do not add speculative complexity before it is needed.

---

## Question-bank model

The question bank should support repeatable session generation and future progress reporting.

Each question should eventually be attributable to:

- subject
- level band
- prompt
- answer options
- correct answer
- optional explanation
- optional topic tag later

### v1 rule

Do not introduce topic-tag complexity yet unless it is clearly necessary.
Subject and level band are the first important axes.

---

## v1 maths content structure

Maths should expand first across level bands.

### Age 9 maths

Focus on:
- addition
- subtraction
- multiplication
- division
- simple word problems
- place value
- number patterns
- basic fractions
- simple measurement/time/money where appropriate

### Age 9 High Achiever maths

Focus on:
- larger-number arithmetic
- more complex word problems
- multi-step reasoning
- stronger multiplication/division fluency
- more demanding fractions
- more challenging patterns and logic

### Age 10 maths

Focus on:
- stronger arithmetic fluency
- larger numbers
- more formal fractions and decimals
- more varied word problems
- time, money, measurement
- introductory factors/multiples and simple geometry where appropriate

### Age 10 High Achiever maths

Focus on:
- harder multi-step problems
- stronger decimal and fraction work
- extension reasoning
- higher cognitive load
- more advanced mental arithmetic
- richer problem-solving

### Age 11 maths

Focus on:
- secure upper-primary arithmetic
- more demanding fractions/decimals/percentages
- ratio beginnings where appropriate
- geometry and measurement
- more structured reasoning

### Age 11 High Achiever maths

Focus on:
- extension and challenge problems
- denser reasoning
- multi-step numerical problems
- advanced upper-primary fluency
- preparation for more advanced secondary-style thinking

---

## v1 english content structure

Added 2026-08-10 once english had real seed content to observe a pattern in (271 items across all six bands via the ingestion pipeline) — previously this subject only had the placeholder note above. Mirrors the maths structure's format; English's difficulty axis is grammatical/structural complexity and vocabulary rarity rather than number size.

### Age 9 english
Focus on: basic punctuation (full stops, question marks, simple apostrophes for possession/contraction), common spelling patterns, simple/compound sentences, common synonyms/antonyms, basic parts of speech.

### Age 9 High Achiever english
Focus on: subordinate clauses, less common spelling rules (exceptions, silent letters), a wider synonym/antonym range, early figurative language (simple similes/metaphors).

### Age 10 english
Focus on: a wider range of punctuation (commas in lists, apostrophes in more contexts), compound and complex sentences, more varied vocabulary, comprehension of moderately complex short passages.

### Age 10 High Achiever english
Focus on: more advanced punctuation (colons, semicolons introduced), multi-clause sentence analysis, richer figurative language, inference-based comprehension questions (not just fact-lookup from a passage).

### Age 11 english
Focus on: dashes and more advanced punctuation conventions, formal vs informal register, prefixes/suffixes and word-root vocabulary work, comprehension requiring some inference.

### Age 11 High Achiever english
Focus on: nuanced vocabulary (e.g. Greek/Latin root meanings like "-ology"), dense multi-clause sentence structures, comprehension requiring synthesis across a passage rather than single-line lookup, preparation for more advanced secondary-style reading.

---

## v1 geography content structure

Added 2026-08-10 (262 seed items already exist). Geography's difficulty axis is a mix of factual rarity (see "What High Achiever means" above) and the scale/abstractness of the concept being tested.

### Age 9 geography
Focus on: continents and oceans, well-known capital cities and countries, basic map/compass concepts, simple physical geography (mountains, rivers, deserts).

### Age 9 High Achiever geography
Focus on: less commonly known capitals/countries, basic climate zones, simple comparisons between places (e.g. hot vs cold regions).

### Age 10 geography
Focus on: world population/size facts, landmarks, biomes, basic human geography (where people live and why), simple cause-effect physical geography.

### Age 10 High Achiever geography
Focus on: multi-fact comparisons (e.g. comparing two regions' climates and explaining why they differ), less common landmarks/countries, introductory environmental concepts.

### Age 11 geography
Focus on: current world facts requiring some estimation/reasoning (e.g. population figures), environmental concepts (greenhouse effect, climate zones), basic economic geography.

### Age 11 High Achiever geography
Focus on: multi-step environmental/climate reasoning, less common geographic facts, comparisons requiring the child to weigh more than one factor (e.g. why one region generates more solar power than another — see the Colorado Springs/Seattle item this pipeline caught and fixed for what NOT to oversimplify here).

---

## v1 space content structure

Added 2026-08-10 (210 seed items already exist).

### Age 9 space
Focus on: the planets and their order, what the Sun/Moon are, basic day/night and seasons.

### Age 9 High Achiever space
Focus on: less commonly known facts about planets/moons, simple comparisons between space objects (e.g. probe vs station).

### Age 10 space
Focus on: solar system scale, basic facts about stars, simple explanations of phenomena (sunburn from UV radiation, tides).

### Age 10 High Achiever space
Focus on: comparisons across space phenomena, less common terminology, simple multi-fact reasoning about orbital mechanics or stellar life cycles.

### Age 11 space
Focus on: more advanced concepts (radiation types, basic orbital mechanics), current space-exploration facts.

### Age 11 High Achiever space
Focus on: genuinely advanced/rare concepts (dark energy, dark matter) explained at a level a keen 11-year-old could grasp, or multi-step reasoning about orbital/astronomical patterns (e.g. why a comet is only visible during certain years) — not just naming an advanced-sounding term the question already defined.

---

## v1 science content structure

Added 2026-08-10. Science is the thinnest and newest subject (148 -> 205 items as of this note) and is the subject where the recall-vs-reasoning distinction above was first caught as a real defect, so read that section before writing science content.

### Age 9 science
Focus on: basic life science (plant/animal parts and needs), simple physical science (states of matter, simple forces), basic classification (living vs non-living).

### Age 9 High Achiever science
Focus on: less commonly known basic facts, simple comparisons (e.g. plant vs animal cells).

### Age 10 science
Focus on: ecosystems and food chains, basic chemistry (mixtures, dissolving), simple earth science (rock layers, weather).

### Age 10 High Achiever science
Focus on: multi-step food-web/energy-flow reasoning, comparisons across conditions (e.g. what affects how much sugar dissolves), less common but still core-curriculum facts.

### Age 11 science
Focus on: body systems, phase changes and heat transfer, basic earth science (plate tectonics, earthquakes).

### Age 11 High Achiever science
Focus on: genuine multi-step reasoning (energy pyramids, comparative potential energy, plate-tectonics-to-other-phenomena pattern matching) or genuinely advanced/rare facts (electromagnetic spectrum differences) — explicitly NOT a vocabulary term the question prompt already explained (see the recall-vs-reasoning note above; this was a real, caught defect in this subject specifically).

---

## Question-writing rules

Questions should be:
- clear
- concise
- unambiguous
- age-appropriate
- encouraging rather than intimidating
- answerable without long reading load unless reading is part of the challenge

### Good question characteristics

- one clear skill focus
- understandable wording
- plausible distractors
- one correct answer
- no trick phrasing
- suitable for rapid session play

### Avoid

- ambiguous wording
- culturally specific assumptions unless intentional
- unnecessarily verbose prompts
- overly exam-like tone
- “gotcha” distractors
- questions requiring excessive working memory for the age band
- duplicate or near-duplicate questions unless purposeful repetition is intended

---

## Multiple-choice guidance

The current app works well with multiple-choice questions.
Continue using that as the default format unless a specific expansion requires otherwise.

### Rules

- usually provide 4 answer options
- exactly one correct option
- distractors should be plausible
- distractors should reflect realistic mistakes
- answer ordering should not reveal the correct answer

### Example distractor logic

For a multiplication question:
- one correct answer
- one common addition error
- one near-miss arithmetic error
- one unreasonable but not absurd option

---

## Session composition guidance

Sessions should feel balanced, achievable, and motivating.

### v1 default

- keep the current short session format
- maintain a consistent session size unless there is a clear reason to change it

### Future composition goals

For a given subject and level band, sessions should eventually aim for:
- a mix of straightforward and moderately challenging questions
- repeatability without feeling identical
- enough pool depth to reduce repetition fatigue

---

## Question-bank growth strategy

Grow content in a controlled order.

### Recommended order

1. deepen maths at the currently supported level
2. add maths coverage across all agreed level bands
3. improve breadth within maths content types
4. only then begin a second fully supported subject
5. expand level-band reporting once content justifies it

### Why

This preserves product coherence.
A strong maths experience is more valuable than several shallow subjects.

---

## Minimum useful depth

A subject-level-band combination should not be treated as truly supported until it has enough questions to avoid obvious repetition.

### Practical guidance

Aim for enough content that multiple sessions can be played without the experience feeling recycled too quickly.

Do not claim support for a subject-level-band combination if the pool is too thin.

---

## Progress reporting expectations

As the question bank grows, the dashboard should increasingly be able to report progress by:

- subject
- level band
- cumulative performance
- recent session performance

### v1 rule

If only subject-level reporting is currently practical, that is acceptable.
But new content work should avoid blocking future level-band reporting.

---

## Data and architecture guidance

Stay aligned with the current architecture.

### Rules

- avoid redesigning the app around content
- keep schema changes minimal and intentional
- prefer explicit fields over premature generalisation
- keep content-loading logic understandable
- preserve testability

### When schema changes are justified

Schema changes are justified when they unlock clear product capability, such as:
- level-band tagging
- multi-subject question selection
- progress reporting by content dimension

Do not introduce generic taxonomy systems before they are actually needed.

---

## Content quality guidance

The child should feel:
- successful often enough to stay motivated
- challenged enough to keep progressing
- rewarded for consistency

So the question bank should aim for:
- strong clarity
- fair challenge
- low frustration
- visible progression over time

---

## UX implications for content

As content expands, the UI should eventually help the learner understand:
- which subject they are practising
- which level band they are in
- what progress they are making
- what they are working towards

The content system should support this without requiring major rework.

---

## v1 scope boundary

This document does not yet require:
- full curriculum mapping
- topic dependency graphs
- adaptive difficulty algorithms
- free-text answer marking
- teacher tooling
- parental controls
- complex authoring systems

These may come later if needed.

---

## Recommended next implementation order

1. verify current dashboard and rewards UX
2. formalise maths level-band support in the data model if needed
3. expand the maths question bank across agreed level bands
4. make session generation level-band aware
5. expose clearer level-band progress on the dashboard
6. consider adding the next fully supported subject only after maths feels deep enough
