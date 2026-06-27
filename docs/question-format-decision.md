# Question Format Decision

## Purpose
This document defines the question interaction format for the first vertical slice and Version 1 default unless explicitly revised later.

---

## Decision
For Version 1, maths questions use:

- multiple choice
- one question prompt
- four answer options
- one correct answer

---

## Why This Format Was Chosen
This format is chosen because it is the safest and simplest option for the first vertical slice.

It supports:
- mobile-first usability
- clear timed interaction
- deterministic answer evaluation
- simple result calculation
- simple seed data creation
- lower implementation risk

---

## Interaction Rule
For each question:
- the child sees one prompt
- the child sees four answer options
- the child selects one option
- the child submits one answer
- after submission, the session moves to the next question

---

## Validation Rule
A submitted answer is valid only if it matches one of the four provided options for that question.

---

## Excluded For Version 1
The following are not included in the first slice unless explicitly approved later:
- free-text answers
- typed numeric answers
- multi-select answers
- drag-and-drop answers
- image-based answer interaction
- partial credit

---

## Data Implication
Each maths question must support at least:
- subject
- prompt text
- four answer options
- correct option identifier
- active/usable status

---

## Future Rule
If other question formats are introduced later, they must be added intentionally and must not complicate the first-slice implementation.
