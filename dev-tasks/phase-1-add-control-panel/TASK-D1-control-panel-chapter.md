# D1: Write the "Project Control Panel" Chapter

**Status:** BACKLOG
**Est. effort:** 1.5 hr
**Dependencies:** None

---

## Context

This is the core deliverable. A new chapter for the AI-Assisted SE Guide that documents the Project Control Panel pattern — a localhost admin dashboard that gives non-technical users visibility into deployment, data, automations, and security in AI-coded projects.

The chapter is based on real experience building the OpsNest control panel (Sprint 3). It should reference OpsNest as the concrete example but frame everything as a generalisable pattern.

---

## Requirements

1. Follow the guide's chapter structure: frontmatter, TLDR, main sections, tips
2. Follow WRITING_GUIDE.md rules: 1,500 word max, conversational voice, no throat-clearing, short paragraphs
3. Reference OpsNest as the worked example throughout
4. Include the specific file conventions (deployment.json, flow-registry.js, USER_JOURNEYS.json, static-data/)
5. Include the .clinerules rules the AI coder must follow
6. Include the "minimum viable control panel" recommendation for new projects
7. Cross-reference existing chapters (Documentation Architecture, Phase Audits, Execution Workflow)

---

## Chapter Outline

**File:** `docs/part-5/control-panel.md`

```markdown
---
title: The Project Control Panel
description: Give non-technical users visibility into what's happening under the hood
---

# The Project Control Panel
```

### TLDR (~120 words)

- People from Bubble/n8n/Pocketbase expect to *see* what their backend is doing
- AI-coded projects are opaque — data schema, automations, deployment status are all invisible
- The control panel is a localhost admin page with four tabs: Deployment, Data, Automations, Testing
- Each tab reads from a convention file (deployment.json, flow-registry.js, USER_JOURNEYS.json) that the AI coder maintains
- Build it in Sprint 1 as part of project setup — it pays for itself immediately
- It caught real bugs in OpsNest that would have been invisible otherwise

### Section 1: The Problem (~200 words)

Why AI-coded backends are a black box for non-technical users. The visual programming gap — people who've used n8n, Directus, Pocketbase, Bubble had GUIs for these things. When AI writes the backend in code, that visibility disappears.

The four questions the control panel answers:
- "Is my app actually running?" → Deployment Centre
- "What data does the AI create?" → Data Browser
- "What are the automations doing?" → Automation Visualiser
- "Is this thing secure? How do I test it?" → Security & Testing

### Section 2: The Four Tabs (~400 words, ~100 each)

**Deployment Centre**
- Convention: `deployment.json` at project root listing all services with health endpoints
- AI rule: update deployment.json whenever a service changes
- The health check API pings each endpoint, dashboard shows green/amber/red
- Real example: OpsNest's deployment.json with SvelteKit + Directus + n8n
- Key learning: the deployment tab immediately caught that Sprint 3 hadn't been deployed — the new /api/health endpoint returned 404 on the old build

**Data Browser**
- Convention: introspects the database schema (Directus, Postgres, etc.) and shows tables + rows
- Static data tables: `static-data/*.json` for option sets the user defines (like Bubble's option sets)
- AI rule: check static-data/ before creating enum-like dropdowns
- Read-heavy, write-light: browse and edit data, but schema changes go through Cline
- Warning banner: "Schema changes should be made via Cline, not here"

**Automation Visualiser**
- Convention: `@flow` annotations at top of each automation file + `flow-registry.js` listing all flows
- Convention: `flowLog()` calls at each step, writing to a structured log
- The visualiser renders registry data as a step diagram, overlays live log data to show what actually happened
- Colour-coded by status: green (success), red (error), grey (not reached)
- Technology choice: Svelte Flow (or React Flow for React projects) for custom node components, plain HTML/CSS as the fallback for simpler stacks
- Real example: OpsNest's AC webhook flow — 4 steps, click an execution to see where it failed
- Key learning: the AI hallucinated env var names in the security checks, but the automation visualiser made the flow logic correct and easy to debug

**Security & Testing**
- Two sub-tools: automated security checks + interactive user journey testing
- Security: encode checks as functions (hardcoded secrets scan, auth guard verification, cookie settings, error leakage). Run from browser, not CI — catches real runtime config issues
- Testing: `USER_JOURNEYS.json` defines step-by-step test flows. Dashboard renders as interactive checklists. Failed steps generate Cline-ready bug reports
- AI rule: append to USER_JOURNEYS.json after every feature task
- Key learning: the security runner found that the AI had used invented env var names (DIRECTUS_URL instead of VITE_DIRECTUS_URL) — a "plausible hallucination" that passed code review but failed at runtime

### Section 3: The Conventions (~250 words)

Summary table of what the AI coder must maintain:

| File | Purpose | AI Rule |
|------|---------|---------|
| `deployment.json` | Service registry | Update when services change |
| `static-data/*.json` | Option sets | Check before creating dropdowns |
| `src/lib/config/flow-registry.js` | Automation declarations | Add entry for every new flow |
| `USER_JOURNEYS.json` | Test checklists | Append after every feature |
| `src/lib/utils/flowLog.js` | Step logging | Call at each automation step |
| `src/lib/utils/securityChecks.js` | Security checks | Add checks for new patterns |

The .clinerules additions — the 5 rules that emerged from OpsNest Sprint 3:
1. Every automation MUST have a @flow annotation + registry entry + flowLog calls
2. flowLog NEVER includes passwords, tokens, API keys
3. After implementing a user-facing feature, append a journey to USER_JOURNEYS.json
4. When referencing env vars in checks/monitoring code, read .env.example — never invent names
5. Deploy after every sprint — include the deploy command as a checklist item

### Section 4: When to Build It (~150 words)

- Minimum viable: Deployment Centre + Security Runner (2-3 hours, catches the most critical issues)
- Recommended: all four tabs (1-2 day sprint for an experienced AI coder)
- The control panel should be a standard Sprint 1 task for any project with a backend
- Projects without a backend (static sites, client-only SPAs) don't need it

### Section 5: What We Learned (~200 words)

Key findings from the OpsNest experiment:
1. The control panel's own monitoring caught bugs the code review missed (stale deploys, hallucinated env vars)
2. Pure CSS step diagrams beat Svelte Flow for simple linear flows — simpler, no dependency, fewer AI mistakes. Svelte Flow is worth it only when you need expandable data panels inside nodes
3. The "observations for docs" pattern on each task was useful for capturing learnings but needs to be filled in during implementation, not after — by then you've forgotten the details
4. The biggest .clinerules addition: "always ground env var names in .env.example" — a rule that prevents a whole class of plausible hallucination
5. flow-registry.js became the most-used reference file in the project — both for the visualiser and as documentation for new AI sessions

::: tip Start with deployment.json
If you only do one thing from this chapter, add a `deployment.json` to your project root and a `/api/health` endpoint. The next time a deploy doesn't take effect, you'll know in 5 seconds instead of 30 minutes.
:::

---

## Acceptance Criteria

- [ ] Chapter exists at `docs/part-5/control-panel.md` with correct frontmatter
- [ ] TLDR is under 150 words
- [ ] Full chapter is under 1,500 words
- [ ] Conversational voice (matches existing chapters)
- [ ] No throat-clearing phrases
- [ ] OpsNest referenced as concrete example at least 3 times
- [ ] Convention summary table included
- [ ] .clinerules rules listed
- [ ] Cross-references to Documentation Architecture and Phase Audits chapters
- [ ] "When to build it" section gives a clear minimum viable recommendation
- [ ] At least one ::: tip callout
- [ ] No repeated explanations between TLDR and body

---

## Reference Material

Read before writing:
- `docs/SPRINT_3_OBSERVATIONS.md` in the OpsNest repo (the raw learnings)
- `docs/PROGRESS.md` Sprint 3 section (what was actually built)
- `.clinerules` Sprint 3 Learnings section (the rules that emerged)
- `docs/part-4/phase-audits.md` (for voice and format reference)
- `docs/part-5/pitfalls-recovery.md` (for voice and format reference)
- `WRITING_GUIDE.md` (hard rules on word limits and style)
