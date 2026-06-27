# First Vertical Slice

## Purpose
This document defines the first end-to-end slice that must work before broader implementation begins.

This slice should be the smallest useful proof that the product works as a real application.

---

## Slice Goal
Deliver one complete practice flow for one child in one subject.

The first subject for the slice is:
- maths

---

## Start State
The system already has one child profile available for use.

The child can open the application and access the dashboard.

---

## End-to-End Flow
The first slice must support this exact flow:

1. The child opens the dashboard.
2. The child sees the maths subject option.
3. The child starts a maths practice session.
4. The child answers a short timed question session.
5. The session ends clearly.
6. The child sees the result/score.
7. The result is recorded.
8. The child’s progress reflects the completed session.
9. Questions shown in that session are marked so they are not repeated later.

---

## Required Capabilities in This Slice
This slice must prove:

- dashboard access works
- subject selection works
- session creation works
- question delivery works
- timed answering works
- answer submission works
- session completion works
- score calculation works
- result persistence works
- progress update works
- question non-repetition tracking works

---

## Initial Slice Boundaries
This slice is intentionally narrow.

Included:
- one child
- maths only
- one complete practice session flow
- enough stored data to support progress and non-repetition

Excluded for this slice:
- the other subjects
- rewards unless needed for the slice
- advanced progression systems
- large-scale content loading strategies
- multi-user support
- parent/admin experiences
- visual polish beyond a clean usable interface

---

## Delivery Rule
If this slice cannot be implemented because product behavior is still unclear, those questions must be resolved before architecture or coding proceeds.

Architecture should support this slice first, not a hypothetical future platform.
