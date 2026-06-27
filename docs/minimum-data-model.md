# Minimum Data Model for First Vertical Slice

## Purpose
This document defines the minimum logical data model needed for the first vertical slice.

It is a product-aligned modeling document, not yet a database-specific schema.

---

## Scope
This model supports:
- one child
- maths subject
- 10-question multiple-choice timed sessions
- result recording
- progress summary
- shown-question tracking

---

## Entities

### 1. Child
Represents the child using the app.

Minimum fields:
- id
- displayName
- createdAt
- updatedAt

---

### 2. Question
Represents one maths question.

Minimum fields:
- id
- subject
- prompt
- optionA
- optionB
- optionC
- optionD
- correctOption
- isActive
- createdAt
- updatedAt

Notes:
- subject is fixed to maths for the first slice but should still exist as a field
- correctOption should identify one of A, B, C, or D

---

### 3. PracticeSession
Represents one session started by the child.

Minimum fields:
- id
- childId
- subject
- status
- totalQuestions
- correctCount
- incorrectCount
- unansweredCount
- startedAt
- completedAt
- createdAt
- updatedAt

Notes:
- status should support at least: in_progress, completed
- totalQuestions should be 10 for the first slice

---

### 4. SessionQuestion
Represents one question shown inside one practice session.

Minimum fields:
- id
- sessionId
- questionId
- questionOrder
- selectedOption
- outcome
- shownAt
- answeredAt

Notes:
- selectedOption can be null if unanswered
- outcome should support at least: correct, incorrect, unanswered
- questionOrder should support ordered progression through the 10 questions

---

### 5. SubjectProgress
Represents the child’s visible progress summary for a subject.

Minimum fields:
- id
- childId
- subject
- sessionsCompleted
- totalQuestionsAnswered
- totalCorrect
- lastCompletedAt
- createdAt
- updatedAt

Notes:
- this is a simple summary model for the first slice
- advanced progression is intentionally excluded

---

### 6. ShownQuestion
Represents that a question has been shown to the child before.

Minimum fields:
- id
- childId
- questionId
- firstShownAt

Notes:
- a question counts as shown even if unanswered
- this supports non-repetition across future sessions

---

## Rules

### Session Rule
A PracticeSession has exactly 10 SessionQuestion records in the first slice.

### Non-Repetition Rule
Question selection should exclude questions already represented in ShownQuestion whenever enough unseen questions are available.

### Progress Rule
SubjectProgress should be updated only when a PracticeSession is completed.

### Outcome Rule
Every SessionQuestion must end in exactly one outcome:
- correct
- incorrect
- unanswered

---

## Out of Scope
This model does not yet include:
- parent users
- authentication
- rewards
- difficulty levels
- content authoring
- media assets
- multiple question formats
- multi-child support

---

## Implementation Rule
The database schema should stay as close as practical to this model for the first slice unless a strong implementation reason requires adjustment.
