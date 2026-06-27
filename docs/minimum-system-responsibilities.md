# Minimum System Responsibilities

## Purpose
This document defines the minimum system responsibilities required to support the first vertical slice.

It is intended to prevent premature architecture decisions and broad overengineering.

---

## Scope
These responsibilities only cover the first vertical slice:
- one child
- maths subject
- 10-question timed session
- result recording
- progress update
- question non-repetition tracking

---

## Required System Responsibilities

### 1. Child Profile Access
The system must be able to access one existing child profile for use in the application.

For the first slice, this does not require multi-user support or authentication unless already present in the codebase.

---

### 2. Dashboard Data
The system must be able to provide the dashboard with enough information to show:
- the maths subject
- basic subject progress summary for the child

---

### 3. Session Creation
The system must be able to create a new maths practice session for the child.

A created session must have:
- a unique session identity
- subject association
- child association
- a selected set of 10 questions
- a session status

---

### 4. Question Selection
The system must be able to select 10 maths questions for a session.

Selection must:
- prefer unseen questions
- exclude already shown questions whenever enough unseen questions remain

Exact selection strategy beyond that is not yet defined and should not be overdesigned.

---

### 5. Question Delivery
The system must be able to provide one question at a time to the active session flow.

---

### 6. Answer Recording
The system must be able to record for each session question:
- the shown question
- the submitted answer if any
- whether it was correct, incorrect, or unanswered
- the final outcome for scoring

---

### 7. Timer-Driven Progression
The system must support strict per-question timeout behavior in the session flow.

At zero time remaining, the current question must be recorded as unanswered and the session must proceed.

---

### 8. Session Completion
The system must be able to mark a session complete once all 10 questions are finished.

---

### 9. Results Calculation
The system must be able to produce session results including:
- total questions
- correct count
- incorrect count
- unanswered count
- score

---

### 10. Progress Recording
The system must be able to persist enough information so the child’s maths progress summary can reflect completed sessions and scores.

For the first slice, only basic progress summary is required.

---

### 11. Question History Tracking
The system must be able to mark questions shown to the child so future sessions can avoid repeating them.

Shown questions must count as shown even if unanswered.

---

## Explicit Non-Responsibilities For This Stage
This stage does not require:
- multi-user identity design
- parent/admin systems
- advanced analytics
- rewards engine design
- difficulty engine design
- scalable distributed architecture
- content authoring systems
- cloud deployment design
- CMS design
- background workers unless already required by the existing stack

---

## Rule
If a proposed architecture element does not clearly support one of the responsibilities above, it should not be added yet.
