# Product Requirements

## Product Summary
Build a mobile-first educational web application for one child.
The experience should be simple, motivating, polished, and age-appropriate.

The first user is a 9-year-old child.

This is Version 1.
The product should be built carefully and incrementally.

---

## Primary Goal
Help the child practice educational subjects through short tests, visible progress, and rewards.

---

## Initial Subjects
The initial subjects are:
- maths
- english
- geography
- space

Do not add more subjects unless requested.

---

## Core Version 1 Features
Version 1 should support:

1. A child profile for one child.
2. A dashboard showing subjects and progress.
3. Subject practice tests.
4. Timed question sessions.
5. Scoring and results.
6. Difficulty progression over time.
7. Rewards such as ribbons, medals, or similar encouragement.
8. A question bank per subject.
9. No repetition of questions shown to the child.
10. A mobile-first user experience.

---

## Question Bank Expectations
The long-term target is 3000-5000 questions per subject.

Version 1 does not need the full final question bank on day one, but the system must be designed so that large question banks can be added safely later.

Question content must avoid repetition.
The system should support tracking which questions have already been shown to the child.

Exact and near-duplicate question risks should be considered in the design.

---

## Delivery Expectations
The assistant should not assume missing implementation details.

If a feature is underspecified, the assistant must ask clarifying questions before building it.

The assistant should implement in small safe steps, with validation after each meaningful change.

The assistant should prefer maintainable, explicit solutions.

---

## Out of Scope Unless Requested
The following are out of scope unless explicitly requested:
- multiple child accounts
- parent accounts
- payments
- social features
- chat
- multiplayer
- advanced analytics
- native mobile apps
- broad admin systems

---

## UX Expectations
The UI should be:
- child-friendly
- clean
- visually encouraging
- simple to navigate
- readable on mobile devices

Avoid clutter and complexity.

---

## Technical Expectations
The implementation should be suitable for modern web deployment.

The project should be structured so it can be tested, extended, and deployed cleanly.

Do not assume a final hosting or database setup unless it is explicitly defined elsewhere.

---

## Safety and Quality Expectations
No feature should be marked complete without verification.

No unclear requirement should be guessed.

No unrelated code should be changed when implementing a feature.

All meaningful work should be accompanied by clear explanation of:
- what changed,
- how it was validated,
- what remains unverified.
