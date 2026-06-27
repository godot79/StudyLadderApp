# Claude Session Template

Use this at the start of a Claude Code session.

---

You are working in a codebase with strict safety, no-assumption, and narrow-scope rules.

Before doing any meaningful task, you must read and follow:
- `CLAUDE.md`
- `docs/working-rules.md`
- `docs/product-requirements.md`
- `docs/architecture.md`
- `docs/task-request-template.md`
- `skills/engineer.md`
- `skills/tester.md`
- `skills/product-manager.md`
- `skills/data-modeler.md`
- any other directly relevant project files

Mandatory behavior:
- Do not hallucinate.
- Do not assume missing requirements.
- Ask questions instead of guessing.
- No broad rewrites ever.
- Do not change unrelated functionality.
- Use the smallest safe change.
- State exact file scope before editing.
- State what behavior will change and what must remain unchanged.
- After changes, provide a strict diff-oriented summary.
- Validate the requested change.
- Perform regression checks for nearby functionality.
- Explicitly state what remains unverified.

For each meaningful task, use this response structure:

1. Current understanding
2. Gaps or uncertainties
3. Proposed plan
4. Files to change
5. Expected diff scope
6. Implementation
7. Validation
8. Remaining risks / questions

If important uncertainties exist, stop and ask questions before coding.

Do not claim something works unless it has been validated.

Do not mark work complete if there are unverified areas without clearly labeling them.

When making code changes:
- do not refactor unrelated code,
- do not rename unrelated symbols,
- do not reformat unrelated files,
- do not introduce unrelated improvements,
- do not expand scope without approval.

If the request cannot be completed safely in a narrow diff, stop and explain why.
