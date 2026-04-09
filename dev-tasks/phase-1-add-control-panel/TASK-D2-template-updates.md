# D2: Update .clinerules / CLAUDE.md Template with Control Panel Conventions

**Status:** BACKLOG
**Est. effort:** 30 min
**Dependencies:** None

---

## Context

The `project-templates/CLAUDE.md` and `project-templates/.clinerules` files are the drop-in quality rules templates for new projects. They need a new section covering the control panel conventions — the same rules we added to OpsNest's .clinerules after Sprint 3, but generalised for any stack.

---

## What to Add

Add a new section to both `project-templates/CLAUDE.md` and the `.clinerules` section in `docs/part-6/templates.md` (the rendered version in the guide).

### New Section: "Control Panel Conventions"

Place it after the "Architecture Rules" section, before "Prohibited".

```markdown
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
- flowLog MUST NEVER include passwords, tokens, API keys, or raw JWTs
- flowLog MUST NEVER crash the actual flow — always wrap in try/catch

**User journey testing:**
- After implementing any user-facing feature, append a test journey to `USER_JOURNEYS.json`
- Include: journey name, user role, exact steps, exact expected outcomes
- The control panel renders these as interactive pass/fail checklists

**Security checks:**
- When referencing env var names in monitoring/check code, ALWAYS read `.env.example` first — never invent names from conventions
- All admin routes must have auth guards
- All API routes (except public webhooks) must verify authentication
- Error responses must not leak stack traces
```

---

## Files to Modify

- `project-templates/CLAUDE.md` — add the section above after "Architecture Rules"
- `project-templates/.clinerules` — same content (these two files have identical structure)
- `docs/part-6/templates.md` — update the rendered ".clinerules / CLAUDE.md (Key Sections)" block to mention the control panel conventions exist

---

## Acceptance Criteria

- [ ] Both template files have the new "Control Panel Conventions" section
- [ ] The section is clearly marked as "if project has a backend" — not every project needs this
- [ ] The env var grounding rule is present (the most important single rule from Sprint 3)
- [ ] The flow annotation + flowLog convention is described
- [ ] The templates page in the guide mentions control panel conventions exist
- [ ] No existing rules are changed or removed — this is an addition only
