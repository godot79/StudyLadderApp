# Task Request Template

Use this when asking Claude Code to make a change.

---

## Task
Describe the exact change requested.

## Why
Describe the purpose of the change.

## In Scope
List exactly what is allowed to change.

## Out of Scope
List exactly what must not change.

## Files
List known files to inspect first, if any.

## Constraints
List constraints such as:
- no dependency changes,
- no schema changes,
- no UI changes outside target area,
- preserve existing behavior,
- mobile-first,
- etc.

## Validation Required
State what must be verified:
- direct behavior,
- regression checks,
- tests to run,
- manual flows to test.

## Open Questions
List anything that is still undecided.
If important open questions exist, Claude must ask before coding.

---

## Example

### Task
Add a "Start Practice" button to the maths subject card on the dashboard.

### Why
Allow the child to begin a maths session directly from the dashboard.

### In Scope
- dashboard maths card UI
- button click behavior for starting maths practice

### Out of Scope
- changes to other subject cards
- reward logic
- scoring logic
- question generation
- visual redesign of the whole dashboard

### Files
- `src/app/dashboard/page.tsx`
- any directly related component used by the maths subject card

### Constraints
- no dependency changes
- mobile layout must remain intact
- existing dashboard behavior must remain unchanged except for the new button

### Validation Required
- verify button renders on mobile and desktop
- verify clicking starts maths practice
- regression-check other dashboard navigation

### Open Questions
- none
