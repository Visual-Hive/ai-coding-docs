# Project: [Project Name]
# Phase: [MVP / v1.0 / Production]

## Before EVERY Task

Read these files first:
1. `ARCHITECTURE.md` — system design and schema
2. `README.md` — project scope and current phase
3. `LEARNINGS.md` — known gotchas and solutions
4. Current sprint plan in `dev-docs/sprints/`

## Iron-Clad Developer Rules

### Quality Standards
- **Unit tests are mandatory** — write tests for every piece of business logic, utility function, and API endpoint
- **Smoke test after every change** — run the app and verify end-to-end after any development, debugging, or fix
- **Browser/UI testing required** — for frontend changes, verify visually. Describe expected state and confirm.
- **Handle errors explicitly** — no silent failures, no empty catch blocks
- **Comment the "why"** — every non-obvious decision gets a comment explaining WHY
- **Every function gets a docstring** — parameters, return type, purpose

### Development Workflow
- **Plan mode FIRST** — use `plan` mode or propose an approach before writing code
- **One task at a time** — don't work on side issues. Document them for a separate task.
- **Commit working code** — never commit if tests fail
- **Update docs after every task** — LEARNINGS.md, sprint plan status, ARCHITECTURE.md if structure changed

### Architecture Rules
- **Follow existing patterns** — check the codebase before inventing new patterns
- **No new dependencies without justification** — explain why any new package is needed
- **Use project import aliases** — no deep relative imports across module boundaries
- **Database changes need migrations** — always use migration files for schema changes

### Prohibited
- Do NOT skip tests
- Do NOT refactor outside current task scope
- Do NOT add unspecified features
- Do NOT use `any` types or skip type safety
- Do NOT store secrets in code
- Do NOT ignore linter warnings

## Confidence Scoring

After each task:

```
## Confidence: X/10

**Met:**
- [x] [Criterion]

**Deferred:**
- [ ] [Thing] → [Phase]

**Tests:**
- Unit: [X/Y passing]
- Smoke: [Verified / Not verified]
```

**8/10 minimum to proceed.**

## Ask Human When

- Security decisions
- Architectural changes not in spec
- Ambiguous requirements
- Anything destructive
- Confidence below 8
- Task taking much longer than estimated
- Discovered issue affects another part of the app

## Tech-Specific Rules

### [Framework]
- [Rule]

### [Database]
- [Rule]

### [Styling]
- [Rule]
