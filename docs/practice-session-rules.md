# Practice Session Rules

## Purpose
This document defines the exact product behavior for the first practice-session flow.

These rules apply to the first vertical slice unless later revised explicitly.

---

## Subject for Initial Slice
The initial slice uses:
- maths

---

## Session Length
A practice session contains:
- 10 questions

This is fixed for the first slice unless explicitly changed later.

---

## Timing Rule
Each question has:
- a 30-second timer

For the first slice:
- the timer is strict
- when time reaches zero, the question is treated as unanswered and the session moves to the next question

---

## Question Order
Questions are shown:
- one at a time
- in a fixed forward sequence within the session

The child cannot go backward to previous questions in the first slice.

---

## Answering Rule
For the first slice:
- each question has one correct answer
- the child can submit one answer per question
- after submission, the session moves to the next question

Answer changes after submission are not allowed.

---

## Unanswered Questions
A question is considered unanswered if:
- the timer expires before submission

Unanswered questions:
- count as not correct
- still count as shown
- must not be repeated later as if unseen

---

## Scoring Rule
At the end of the session, the score is:
- number of correct answers out of 10

Also store:
- total questions
- correct answers
- incorrect answers
- unanswered answers

---

## Session Completion
A session ends when:
- the 10th question is submitted, or
- the 10th question timer expires

Then the child is taken to the results view.

---

## Results View Must Show
The results view must show at least:
- subject
- total questions
- correct count
- incorrect count
- unanswered count
- final score

---

## Progress Rule
When a session is completed:
- the completion is recorded
- the score is recorded
- the child’s subject progress is updated

For the first slice, progress only needs to support a basic visible summary.
It does not yet require advanced progression logic.

---

## Non-Repetition Rule
Questions shown in a completed session must be tracked as already shown to the child.

Future session generation must exclude already shown questions whenever enough unseen questions remain.

---

## Not Yet Defined
The following are intentionally not fully defined yet and must not be guessed during implementation:
- exact maths question content format
- difficulty progression rules
- rewards logic
- dashboard progress display design
- what happens when the question bank runs low

If implementation depends on these, they must be clarified first.
