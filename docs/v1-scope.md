# Version 1 Scope

## Purpose
This document defines the exact intended scope of Version 1 so implementation can proceed without hidden assumptions.

It is a delivery-scoping document, not a brainstorming document.

---

## Version 1 Goal
Deliver a working mobile-first educational web app for one child that supports short subject-based practice sessions, visible results, and basic progress tracking.

---

## Version 1 Users
Version 1 supports:
- one child

Version 1 does not yet support:
- multiple children
- parent accounts
- teacher accounts
- admin users

---

## Version 1 Subjects
Version 1 includes these subjects only:
- maths
- english
- geography
- space

No additional subjects are included unless explicitly approved.

---

## Version 1 Must Include
The application must include:

1. A child profile for one child.
2. A dashboard/home screen.
3. Subject selection from the dashboard.
4. Practice sessions by subject.
5. Timed question answering.
6. Session completion and scoring.
7. Basic progress visibility.
8. Question tracking so previously shown questions are not repeated.
9. Mobile-first usability.

---

## Version 1 May Include If Helpful But Not Required
These are allowed only if they directly support the Version 1 experience and do not expand scope significantly:
- simple encouraging rewards such as ribbons, stars, or medals
- lightweight difficulty progression
- basic streak or completion indicators

These are optional unless separately required by a later feature definition.

---

## Version 1 Explicitly Excludes
The following are out of scope for Version 1 unless explicitly approved:
- multiple child accounts
- authentication systems
- parent dashboards
- payments
- social features
- chat
- multiplayer
- advanced analytics
- content management systems
- broad admin tools
- native mobile apps
- offline mode
- push notifications
- AI-generated live question creation in production flows

---

## Delivery Strategy
Version 1 should be built as a narrow validated vertical slice first, then expanded carefully.

The first slice should prove:
- one child profile,
- one subject,
- one working practice session,
- timed questions,
- score/result display,
- progress recording,
- question non-repetition behavior.

Only after this works should the implementation expand to additional breadth.

---

## Rule for Ambiguity
If any Version 1 behavior is not explicitly defined in project documents, it must be clarified before implementation rather than guessed.
