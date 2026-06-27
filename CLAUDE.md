# CLAUDE.md

## Project Overview
This repository is for building a mobile-first educational web app for one child.
The app should help a 9-year-old practice subjects including maths, english, geography, and space.
The product should feel polished, simple, motivating, and safe for a child to use.

This is not a speculative prototype. This project should be built carefully, with explicit reasoning, verified implementation, and tested behavior.

---

## Core Operating Rules
You must not hallucinate, invent requirements, invent APIs, invent data, invent file contents, or assume missing business logic.

If information is missing, ambiguous, conflicting, or underspecified:
1. stop,
2. identify the uncertainty clearly,
3. ask targeted clarification questions,
4. wait for an answer before implementing that part.

Do not guess.

Do not silently fill in missing product decisions.

Do not claim a feature works unless it has been implemented and tested.

Do not say something is complete if there are known gaps, TODOs, assumptions, or untested paths.

---

## Required Workflow for Every Task
For every non-trivial task, follow this sequence:

1. Read relevant files first.
2. Summarize the current state briefly.
3. Identify ambiguities, risks, dependencies, and assumptions.
4. If anything important is unclear, ask questions before coding.
5. Propose a short implementation plan.
6. List the files you will create or modify.
7. Only then write or edit code.
8. After coding, run or specify validation steps.
9. Report exactly what was changed.
10. Report any remaining risks or unverified areas.

Do not skip this workflow.

---

## Engineering Rules
Prefer simple, maintainable, explicit code over clever code.

Do not add dependencies unless necessary.
If adding a dependency, explain why it is needed and what alternatives were considered.

Keep business logic separate from UI where practical.

Avoid hidden magic, unclear abstractions, and premature optimization.

Use clear naming.

When editing code, preserve existing behavior unless intentionally changing it.

If a refactor is suggested, explain why it is safer or better before doing it.

---

## Change Scope Discipline
No broad rewrites ever.

Only change the functionality explicitly requested.

Do not make unrelated improvements, refactors, renames, cleanup edits, formatting-only edits, dependency changes, or architectural changes unless explicitly approved.

Before changing code, state:
- which files will be modified,
- what behavior will change,
- what behavior must remain unchanged.

After changing code, provide a strict diff-oriented summary:
- files changed,
- exact scope of changes,
- affected behavior,
- intentionally untouched behavior.

If the requested change cannot be completed safely within a narrow scope, stop and ask for approval before expanding scope.

---

## Testing and Verification Rules
Every meaningful feature must be validated.

For each implemented feature:
- explain how it was tested,
- identify happy path,
- identify at least relevant edge cases,
- identify any untested path.

If automated tests exist, update or add tests where appropriate.

If automated tests do not exist yet, provide manual verification steps.

Never state "working" without evidence.

---

## Product Rules
This app is for a child.
Prioritize:
- clarity,
- simplicity,
- legibility,
- low friction,
- encouraging feedback,
- age-appropriate UX.

Do not introduce distracting complexity.

Do not add features that were not requested without first proposing them.

---

## Question Bank Rules
The long-term goal is 3000-5000 questions per subject with no repetition for the child.

Do not fake this with duplicate or near-duplicate content.

When working on question systems:
- distinguish exact duplicates from semantic duplicates,
- design for deduplication,
- design for no-repeat tracking per child,
- surface any scaling or quality concerns clearly.

If the content pipeline is not yet defined, ask before inventing one.

---

## Communication Style
Be concise, factual, and explicit.

When uncertain, say exactly what is uncertain.

When blocked, ask specific questions.

When giving status updates:
- separate facts,
- assumptions,
- completed work,
- unverified work,
- next steps.

Do not use hype language.
Do not overclaim.
