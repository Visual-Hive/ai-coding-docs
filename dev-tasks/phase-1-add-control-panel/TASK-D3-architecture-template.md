# D3: Update ARCHITECTURE.md Template with Control Panel Section

**Status:** BACKLOG
**Est. effort:** 20 min
**Dependencies:** None

---

## Context

The `project-templates/ARCHITECTURE.md` template is what new projects copy to document their system design. It currently covers system overview, routes, database schema, components, auth, API, and deployment. It needs a new section for projects that include a control panel.

---

## What to Add

Add a new section at the end of `project-templates/ARCHITECTURE.md`, after "Key Technical Decisions":

```markdown
## Control Panel (if applicable)

### Convention Files
| File | Purpose | Maintained By |
|------|---------|--------------|
| `deployment.json` | Service registry with health endpoints | AI coder (on deploy changes) |
| `static-data/*.json` | Option sets for forms and dropdowns | Human (via dashboard) or AI |
| `[flow-registry-path]` | Automation flow declarations | AI coder (on new automations) |
| `USER_JOURNEYS.json` | Interactive test checklists | AI coder (on new features) |

### Control Panel Routes
| Route | Purpose | Auth |
|-------|---------|------|
| `/admin/control-panel` | Dashboard with tabs | Admin |
| `/api/health` | App health check | None |
| `/api/control-panel/deployment` | Service health aggregator | Admin |
| `/api/control-panel/schema` | Database introspection | Admin |
| `/api/control-panel/data/[collection]` | Data browser CRUD | Admin |
| `/api/control-panel/security` | Security scan runner | Admin |
| `/api/control-panel/automations` | Flow execution logs | Admin |
| `/api/control-panel/journeys` | Test journey definitions | Admin |

### Registered Automation Flows
| Flow ID | Trigger | Steps | File |
|---------|---------|-------|------|
| [flow-id] | [trigger description] | [count] | [source file path] |
```

---

## Files to Modify

- `project-templates/ARCHITECTURE.md` — add the section above
- `docs/part-6/templates.md` — update the "ARCHITECTURE.md (Key Sections)" block to mention the control panel section exists

---

## Acceptance Criteria

- [ ] ARCHITECTURE.md template has a "Control Panel" section with placeholders
- [ ] The section is marked "if applicable" — not every project needs it
- [ ] Convention files table, routes table, and flows table are all present with `[placeholder]` syntax
- [ ] The templates page in the guide mentions this section exists
