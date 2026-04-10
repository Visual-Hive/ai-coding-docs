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
- **Ask questions when anything is unclear** — if a task spec is ambiguous or a requirement contradicts the architecture, ask before building
- **Never start serious development without a task document** — small bug fixes (2-3) in plan mode are acceptable, but substantial work must have a task doc first. Document all fixes in LEARNINGS.md or as an annex to the relevant task doc.
- **Handle API timeout errors gracefully** — if file writes time out, break the task into smaller chunks (e.g., write CSS first, then HTML body in sections, then footer)

### Architecture Rules
- **Follow existing patterns** — check the codebase before inventing new patterns
- **No new dependencies without justification** — explain why any new package is needed
- **Use project import aliases** — no deep relative imports across module boundaries
- **Database changes need migrations** — always use migration files for schema changes

### Control Panel Conventions (if project has a backend)

**Deployment monitoring:**
- Maintain `deployment.json` at project root listing all services, health endpoints, and deploy methods
- Update it whenever a service is added, removed, or its URL changes
- Implement `/api/health` returning `{ status: 'ok', timestamp: '...' }`

**Data visibility:**
- When creating enum-like data or option sets, create a JSON file in `static-data/` first
- The control panel reads these files — check there before inventing dropdown values in code

**Automation flows:**
- Every backend automation (webhook, cron, pipeline) MUST have:
  1. A `@flow` JSDoc annotation declaring name, trigger, and steps
  2. An entry in the flow registry file
  3. `flowLog()` calls at each logical step with sanitised input/output
- `flowLog()` MUST NEVER include passwords, tokens, API keys, or raw JWTs
- `flowLog()` MUST NEVER crash the actual flow — always wrap in try/catch

**User journey testing:**
- After implementing any user-facing feature, append a test journey to `USER_JOURNEYS.json`
- Include: journey name, user role, exact steps, exact expected outcomes
- The control panel renders these as interactive pass/fail checklists

**Security checks:**
- When referencing env var names in monitoring/check code, ALWAYS read `.env.example` first — never invent names from conventions
- All admin routes must have auth guards
- All API routes (except public webhooks) must verify authentication
- Error responses must not leak stack traces

### Prohibited
- Do NOT skip tests
- Do NOT refactor outside current task scope
- Do NOT add unspecified features
- Do NOT use `any` types or skip type safety
- Do NOT store secrets in code
- Do NOT ignore linter warnings
- Do NOT install dependencies without first searching the web for the latest stable version
- Do NOT overwrite production `.env` files with local values
- Do NOT push code to the production stack directly — dev first, user promotes to prod manually

### Git & Security Hygiene
- Set up `.gitignore` from the start and review it regularly — no API keys, SSH keys, `.env` files, or credentials in the repo
- When adding new env vars, update `.env.example` with the variable name and a description (not the secret)
- Before any git push, verify `.gitignore` covers all sensitive files

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

### SvelteKit (if applicable)
- After ANY code change, run `npm run build` and check for build errors before declaring the task complete
- If build artifacts seem stale, run `rm -rf .svelte-kit && npm run build` for a clean rebuild
- When modifying shared utilities, layouts, or server load functions, test ALL pages that could be affected — not just the page you worked on
- Guard all browser-only APIs (`window`, `document`, `localStorage`) with `if (browser)` from `$app/environment`
- If a page throws a 500, check the server terminal — the actual error is there, not in the browser

### Drizzle ORM + PostgreSQL (if applicable)
- After any schema migration on the dev server, ALWAYS run the seed script
- Include the seed command in the deployment checklist: migrations → seed → verify
- Use upsert logic in seed scripts rather than truncate-and-reinsert

### [Framework]
- [Rule]

### [Database]
- [Rule]

### [Styling]
- [Rule]
