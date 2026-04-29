# Automations

> Generated from `src/lib/config/flow-registry.js`. Edit there, regenerate here.
> If the registry doesn't exist yet, this file will note "No automations registered."

## Summary

| Flow ID | Trigger | Steps | Source file |
|---|---|---|---|
| [flow-id] | [e.g. POST /api/webhooks/...] | [count] | [path] |

## Detail

### [flow-id]

**Trigger:** [What kicks this off — webhook, cron, queue message, etc.]

**Steps:**
1. [step name — what it does]
2. [step name — what it does]
3. [step name — what it does]

**Source:** `[path/to/file.ts]`

**Logging:** Each step calls `flowLog()` with sanitised input/output. Logs are visible in the [Project Control Panel](/part-5/control-panel)'s Automation Visualiser tab.

---

## Convention

Every backend automation MUST have:

1. A `@flow` JSDoc annotation declaring name, trigger, and steps
2. An entry in `src/lib/config/flow-registry.js`
3. `flowLog()` calls at each logical step with sanitised input/output

`flowLog()` MUST NEVER include passwords, tokens, API keys, or raw JWTs.
`flowLog()` MUST NEVER crash the actual flow — always wrap in try/catch.

> Source-of-truth: the flow registry plus the `@flow` JSDocs. Update those, regenerate this file. See [The Project Control Panel](/part-5/control-panel) for the full pattern.
