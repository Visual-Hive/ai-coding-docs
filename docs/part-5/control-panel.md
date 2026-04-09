---
title: The Project Control Panel
description: Give non-technical users visibility into what's happening under the hood
---

# The Project Control Panel

## TLDR

AI-coded backends are a black box. Data schema, automation flows, deployment status — all invisible unless you know where to look in the code.

The control panel fixes this. It's a localhost admin page with four tabs: Deployment, Data, Automations, and Security. Each tab reads from a convention file your AI coder maintains. Build it in Sprint 1 — it pays for itself immediately.

OpsNest built one in Sprint 3 as a deliberate experiment. It caught three bugs in the first hour after deployment: code that was never actually deployed, invented environment variable names that passed code review but failed at runtime, and missing type narrowing in security checks.

Build it once, keep the conventions enforced, and your project stays visible for its entire lifetime.

---

## The Problem

People who come from n8n, Directus, Pocketbase, and Bubble are used to seeing their backend. They click around, inspect data, watch automations run, check what's deployed. It's all in the UI.

When AI codes your backend, that visibility disappears. The same functionality exists — but it's in files, environment variables, and terminal logs. If you don't know how to look, you're flying blind.

Four questions come up constantly on any backend project:

- "Is my app actually running?" → Deployment Centre
- "What data did the AI create?" → Data Browser
- "What are the automations doing?" → Automation Visualiser
- "Is this thing secure? How do I test it?" → Security & Testing

The control panel answers all four from a browser tab.

---

## The Four Tabs

### Deployment Centre

Convention: a `deployment.json` at your project root listing every service with its URL, health endpoint, and deploy method.

```json
{
  "services": [
    { "name": "SvelteKit", "url": "http://localhost:5173", "health": "/api/health", "deploy": "git push + pm2 restart" },
    { "name": "Directus", "url": "http://localhost:8055", "health": "/server/health", "deploy": "docker compose up -d" }
  ]
}
```

The dashboard pings each health endpoint and shows green/amber/red. AI rule: update `deployment.json` whenever a service changes.

**What it caught in OpsNest:** The deployment tab immediately revealed that Sprint 3 code was never deployed. The new `/api/health` endpoint returned 404 on the live server — stale build. Without the dashboard, this would have been invisible until a user hit the new feature.

### Data Browser

Convention: introspects your database schema and shows tables and rows. For option sets (the things Bubble calls "options"), store them as `static-data/*.json` files.

```
static-data/
  membership-tiers.json
  event-categories.json
  notification-types.json
```

AI rule: check `static-data/` before creating enum-like dropdowns in code. If the file exists, use it. If it doesn't, create it and check with the human before inventing values.

The data browser has a standing warning banner: "Schema changes should be made via Cline, not here." Browse and edit data freely; schema changes stay in code.

### Automation Visualiser

Convention: every backend automation gets a `@flow` JSDoc annotation, an entry in `flow-registry.js`, and `flowLog()` calls at each step.

```javascript
/**
 * @flow
 * @name ac-webhook-sync
 * @trigger POST /api/webhooks/activecampaign
 * @steps validate → find-member → update-directus → send-confirmation
 */
export async function handleACWebhook(event) {
  flowLog('validate', { contactId: event.contact_id });
  // ...
}
```

The visualiser renders the registry as a step diagram and overlays live log data — colour-coded green (success), red (error), grey (not reached). Click any execution to see exactly where it failed.

Technology note: plain CSS step diagrams beat Svelte Flow or React Flow for simple linear flows. Simpler, no dependency, fewer AI mistakes. Use a flow library only when you need expandable data panels inside nodes.

### Security & Testing

Two sub-tools in one tab.

**Security runner:** Automated checks encoded as functions — hardcoded secrets scan, auth guard verification, cookie settings, error leakage detection. Run from the browser, not CI. This catches runtime config issues that static analysis misses entirely.

**User journey testing:** `USER_JOURNEYS.json` defines step-by-step test flows. The dashboard renders them as interactive pass/fail checklists. Failed steps generate a Cline-ready bug report with full context.

AI rule: append a journey to `USER_JOURNEYS.json` after every user-facing feature.

**What it caught in OpsNest:** The security runner found that the AI had used `DIRECTUS_URL` instead of `VITE_DIRECTUS_URL` throughout the monitoring code. Both names look correct. Both follow conventions. Only one actually exists in `.env`. The code passed review, but would have failed silently at runtime. See [Documentation Architecture](/part-2/documentation-architecture) for why grounding AI in real files matters.

---

## The Conventions

Everything the control panel needs to function — and everything your AI coder must maintain:

| File | Purpose | AI Rule |
|------|---------|---------|
| `deployment.json` | Service registry with health endpoints | Update when services change |
| `static-data/*.json` | Option sets for forms and dropdowns | Check before creating dropdowns |
| `src/lib/config/flow-registry.js` | Automation flow declarations | Add entry for every new flow |
| `USER_JOURNEYS.json` | Interactive test checklists | Append after every feature |
| `src/lib/utils/flowLog.js` | Step logging utility | Call at each automation step |
| `src/lib/utils/securityChecks.js` | Security check functions | Add checks for new patterns |

The `.clinerules` additions that emerged from OpsNest Sprint 3:

1. Every automation MUST have a `@flow` annotation + registry entry + `flowLog()` calls
2. `flowLog()` NEVER includes passwords, tokens, API keys, or raw JWTs
3. `flowLog()` NEVER crashes the actual flow — always wrap in try/catch
4. After implementing any user-facing feature, append a journey to `USER_JOURNEYS.json`
5. When referencing env var names in any monitoring or check code, read `.env.example` first — never invent names from conventions

Rule 5 is the most important. It prevents a whole class of plausible hallucination — names that look right, follow conventions, but don't exist.

---

## When to Build It

**Minimum viable (2–3 hours):** Deployment Centre + Security Runner. These two catch the most critical issues — stale deploys and runtime config failures. Worth doing even for simple projects.

**Full control panel (1–2 day sprint):** All four tabs. Do this for any project with a backend that non-technical users will operate or that you'll maintain beyond the initial build.

Projects without a backend — static sites, client-only SPAs — don't need it.

The right time to build it is Sprint 1, after the basic backend is running. Building it later works, but you'll have already shipped bugs it would have caught. See [The Cline Workflow](/part-3/cline-workflow) for how to slot this into your sprint structure.

---

## What OpsNest Taught Us

Five things that weren't obvious until we built and ran it:

1. **The control panel caught bugs code review missed.** Three in the first hour: stale deploy, hallucinated env vars, missing type narrowing. None were caught by reading the code.

2. **Simple CSS step diagrams beat Svelte Flow** for linear flows. Svelte Flow is only worth the dependency when you need expandable data panels inside nodes.

3. **Capture learnings during the task, not after.** The "observations for docs" pattern on each task was useful, but details fade. Fill it in while the code is in front of you.

4. **`flow-registry.js` became the most-used reference file in the project** — both for the visualiser and as documentation for new AI sessions. It's the single source of truth for "what automations exist."

5. **The biggest single rule:** always ground env var names in `.env.example`. One line in `.clinerules` prevents an entire category of silent failure.

See [Phase Audits](/part-4/phase-audits) for how to use the security runner output as audit evidence.

::: tip Start with deployment.json
If you only do one thing from this chapter, add a `deployment.json` to your project root and a `/api/health` endpoint. The next time a deploy doesn't take effect, you'll know in 5 seconds instead of 30 minutes.
:::
