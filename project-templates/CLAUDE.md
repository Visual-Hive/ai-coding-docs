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

### Frontend Tweaker Conventions (all projects with a UI)

**Text management (i18n):**
- ALL user-facing text MUST use i18n translation keys — no hardcoded strings in components
- Use i18next (or framework equivalent: svelte-i18n, vue-i18n, next-intl)
- Set up i18n in Sprint 1 during project scaffolding, even for monolingual apps
- Keys MUST be hierarchical by page/feature: `dashboard.header.title`, `auth.login.submit_button`
- Never use generic keys like `text1`, `label2`, `btn_a`
- Interpolated variables use double braces: `"greeting": "Welcome back, {{name}}"`
- Pluralisation uses i18next suffix convention: `_one`, `_other`, `_zero`
- Locale files live in `src/locales/` (or framework convention path)

**Style tokens (@tweak annotations):**
- All tweakable visual properties MUST use CSS custom properties
- Every custom property that a user might want to adjust MUST have a `@tweak` annotation comment
- Annotation format: `/* @tweak [Label] | [type: color|range] | [optional: state, breakpoint] */`
- Properties requiring annotations: font sizes, colours, spacing (padding/margin), border radii, shadows, opacity, transition durations, hover/focus/disabled state values
- Group tokens hierarchically in a `design-tokens.css` or at the top of component files:
  - Brand tokens: `--brand-primary`, `--brand-dark`, `--brand-accent`
  - Semantic tokens: `--text-primary`, `--bg-surface`, `--border-default`
  - Component tokens: `--card-padding`, `--btn-font-size`, `--hero-title-color`
- Dark mode: define overrides in `.dark {}` with matching `@tweak` annotations suffixed "(dark mode)"
- Components MUST reference variables, never raw values, for any property that's annotated

**Link management:**
- All external URLs and internal navigation hrefs MUST reference `links.json`
- No hardcoded URLs in components — import from the config file
- Structure: group by purpose (`social`, `cta`, `footer`, `legal`)
- Update `links.json` when adding or changing any link destination

**SEO and meta content:**
- All page titles, meta descriptions, and OG image paths MUST reference `meta.json`
- No hardcoded `<title>` or `<meta>` tags in page components
- Structure: one key per page/route with `title`, `description`, and optional `og_image`
- Meta descriptions should target 150-160 characters

**Convention file maintenance:**
- When adding a new page: update `meta.json`, add i18n keys for all text, add links to `links.json`
- When adding a new component: add `@tweak` annotations for all visual properties, add i18n keys for all text
- When modifying an existing component: ensure all four convention layers are updated in the same task
- NEVER leave orphaned keys in convention files after removing a component

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
- Do NOT estimate how long tasks will take — AI time predictions are wildly inaccurate and misleading. A task that takes 30 minutes of focused AI-assisted work gets estimated at "2-3 days." Omit all time estimates from plans, task docs, and status updates.

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
- Deploy builds must always clean first: `rm -rf .svelte-kit build && npm run build`
- Every project needs `hooks.server.ts` with `Cache-Control: no-cache` on HTML responses and `immutable` on `/_app/immutable/` paths — this prevents stale deploys
- When setting up nginx, explicitly set cache headers: long cache for `/_app/immutable/`, no-cache for everything else
- Use `pm2 restart` not `pm2 reload` for SvelteKit deploys
- If the project doesn't use service workers intentionally, add the cleanup snippet to `+layout.svelte` onMount
- Include a visible build version (timestamp or commit hash) in the app footer or console

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
