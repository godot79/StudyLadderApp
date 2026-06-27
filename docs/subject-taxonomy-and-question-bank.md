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
