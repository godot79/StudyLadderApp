# Minimum Architecture for First Vertical Slice

## Purpose
This document defines the minimum architecture needed to support the first vertical slice.

It does not define a final platform architecture for all future features.
It only defines the smallest reasonable structure needed for the first slice.

---

## First Slice Covered
This architecture supports:
- one child
- dashboard access
- maths subject
- 10-question timed practice session
- answer recording
- session completion
- result display
- progress summary update
- question non-repetition tracking

---

## Architecture Principles
1. Prefer the smallest working architecture.
2. Do not add systems that are not required by the first slice.
3. Keep data flow explicit and understandable.
4. Keep storage structures simple and evolvable.
5. Avoid speculative abstractions.
6. Avoid distributed or multi-service design unless already present and required.

---

## Minimum Logical Layers

### 1. UI Layer
Responsible for:
- rendering the dashboard
- rendering the practice-session screens
- rendering the results view
- collecting child interactions

This layer should not own business rules such as scoring, completion rules, or question-selection rules.

---

### 2. Application Logic Layer
Responsible for:
- starting sessions
- selecting questions
- progressing through questions
- enforcing timeout behavior
- recording answers
- completing sessions
- calculating results
- updating progress summaries
- updating shown-question history

This layer should contain the core first-slice behavior.

---

### 3. Data Access / Persistence Layer
Responsible for:
- reading child data
- reading question data
- creating sessions
- saving answers/session outcomes
- saving progress data
- saving question history

This layer should isolate storage operations from session logic.

---

## Required Persistent Data Concepts
The architecture must support persistence for at least:

- child
- subject progress summary
- question bank entries
- practice session
- session question records / answer outcomes
- shown-question history

These are logical concepts, not a commitment to any specific database technology.

---

## Data Flow Expectations

### Start Session Flow
1. UI requests start of maths practice.
2. Application logic requests eligible questions.
3. Persistence layer reads question bank and shown-question history.
4. Application logic creates a new session with 10 questions.
5. Persistence layer stores the session.
6. UI receives the first question.

---

### Answer Flow
1. UI submits answer or timeout event.
2. Application logic evaluates outcome.
3. Persistence layer saves the answer/outcome.
4. Application logic advances to next question or completes the session.
5. UI receives the next question or results.

---

### Completion Flow
1. Application logic computes final counts and score.
2. Persistence layer marks session complete.
3. Persistence layer updates progress summary.
4. Persistence layer updates shown-question history.
5. UI receives the completed result view data.

---

## Technology Rule
This document does not assume:
- frontend framework
- backend framework
- database type
- ORM
- hosting provider
- auth provider

Technology choices must come from the actual repository and approved project decisions, not from this document alone.

---

## Initial Simplicity Rule
For the first slice, a simple monolithic application structure is preferred if the repository allows it.

Do not split this into multiple services, background systems, or separate platforms unless the existing codebase already requires that.

---

## Validation Rule
No architectural element should be considered necessary unless it directly supports the first-slice flow and can be explained in concrete terms.
