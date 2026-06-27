# Architecture Guidance

## Purpose
This document defines how architecture decisions should be handled in this project.

It does not pre-approve speculative architecture.
It exists to ensure architecture decisions are explicit, minimal, and driven by actual requirements.

---

## Core Rule
Do not assume architecture that has not been decided.

Do not invent infrastructure, services, deployment models, database choices, authentication systems, caching layers, background job systems, event systems, or third-party integrations unless explicitly defined.

If architecture is unclear and it materially affects implementation, stop and ask.

---

## Decision Standard
Prefer the smallest architecture that safely supports the current confirmed requirements.

Do not design for hypothetical future scale unless explicitly requested.

Do not introduce system complexity "just in case".

Do not broaden a narrow feature request into an architectural redesign.

---

## Change Scope
No broad rewrites ever.

Architecture changes must be tightly scoped to the requested need.

Do not restructure the project, move major modules, replace frameworks, replace libraries, or redesign data flow unless explicitly approved.

If a request cannot be completed safely without architectural expansion, explain why and ask for approval before proceeding.

---

## Required Architecture Analysis
Before proposing an architecture change, identify:
1. the requested behavior,
2. the current architecture relevant to that behavior,
3. the constraint or limitation in the current design,
4. the minimal change required,
5. alternatives considered,
6. risks,
7. validation implications.

Do not present architectural preference as necessity.

---

## Preference Order
When multiple options are possible, prefer:
1. no architecture change,
2. a localized implementation change,
3. a small extension of the current structure,
4. a larger structural change only if clearly necessary and approved.

---

## Technology Assumptions
Do not assume:
- a specific frontend framework,
- a specific backend framework,
- a specific database,
- cloud infrastructure,
- CI/CD setup,
- authentication provider,
- analytics platform,
- content management system,
- queue or job infrastructure.

Only rely on what is explicitly present in the repository or approved by the user.

---

## Documentation Expectations
If an architecture-relevant decision is made, document:
- what was decided,
- why it was needed,
- what alternatives were rejected,
- what parts of the system are affected,
- what remains unchanged,
- what validation is required.

Keep architecture notes concrete and brief.

---

## Communication Rules
Prefer:
- "This feature can be implemented without an architecture change."
- "This request appears to require a small structural change in these files..."
- "The current repository does not define the backend/storage architecture, so I need clarification before proceeding."

Avoid:
- speculative system design,
- premature scaling decisions,
- introducing patterns without a concrete need,
- broad redesign proposals for narrow requirements.
