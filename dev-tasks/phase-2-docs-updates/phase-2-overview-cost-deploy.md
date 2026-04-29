# Phase 2 Mini-Sprint: Overview Folder + Cost Hygiene + Deploy Non-Polling

Three connected additions to the methodology, derived from real OpsNest pain points:

- **Bundle A: The Live Project Overview folder.** A generated, committed folder of focused markdown files giving AI (and humans) a current, accurate picture of the system without the staleness of hand-maintained docs.
- **Bundle B: Token cost hygiene.** Concrete settings, files, and rules to stop predictable token waste — confirmed open-tabs context inclusion, missing `.clineignore`, runaway loops.
- **Bundle C: Deploy non-polling pattern.** A structural fix for runaway deploy costs: never poll, always fire-and-confirm, build on the server, exclude `node_modules` from build context.

Bundles are independent. Tasks within a bundle have ordering: chapter first, then templates, then rules.

**Total tasks:** 7
**Estimated effort:** 4-6 hours of Cline time
**Estimated cost:** ~$15-25
**Suggested folder:** `dev-tasks/phase-2-overview-cost-deploy/`

---

## Bundle A: The Live Project Overview Folder

### TASK-A1: Write the "Live Project Overview" Chapter

**Status:** BACKLOG
**Est. effort:** 90 min
**Dependencies:** None

#### Context

ARCHITECTURE.md captures *intent* — how the system was supposed to be built. As a project evolves, the doc drifts. The Control Panel solved runtime visibility (what's running, what's in the DB, what flows are active) but only at runtime; AI sessions still rely on stale ARCHITECTURE.md.

The OVERVIEW folder pattern is the documentation equivalent of the Control Panel: a folder of small, focused markdown files generated from convention files and the actual codebase. AI reads only the file relevant to the current task — not a monolithic doc that wastes tokens.

This chapter sits in Part 2 (Documentation Architecture territory) because it extends, rather than replaces, the existing ARCHITECTURE.md pattern.

#### File to create

`docs/part-2/live-project-overview.md`

#### Chapter structure

**Frontmatter + TLDR (~100 words)**

```yaml
---
title: The Live Project Overview
description: A generated folder that keeps AI (and you) honest about the system as it actually is
---
```

TLDR: ARCHITECTURE.md captures intent. The OVERVIEW folder captures reality. It's a generated, committed set of focused markdown files (entities, routes, automations, stack, decisions) that AI reads selectively at the start of every task. One generator script keeps it current. PRs surface drift. Non-tech people can read it.

**Section 1: Why Generated, Why a Folder (~250 words)**

The drift problem with hand-maintained docs. Why Mermaid and a single OVERVIEW.md both fail (one stales, the other bloats). The two principles that emerge: generate from source-of-truth, and split into focused files so AI reads only what it needs. Cross-reference [Documentation Architecture](/part-2/documentation-architecture) and [The Project Control Panel](/part-5/control-panel).

**Section 2: The Folder Layout (~300 words)**

```
overview/                     ← generated, committed
├── README.md                 ← 1-page index: what the app is + recent decisions
├── stack.md                  ← from package.json + deployment.json
├── entities.md               ← from domain.config.js / DB introspection
├── routes.md                 ← from src/routes/ scan + JSDoc descriptions
├── automations.md            ← from flow-registry.js
├── decisions/                ← dated ADR stubs, AI appends one per non-obvious call
│   ├── 2026-04-12-svelte-flow-for-flows.md
│   └── 2026-04-18-cache-headers-default.md
└── DRIFT.md                  ← only generated when generator detects mismatch with ARCHITECTURE.md
```

One paragraph per file explaining what it contains and where it's sourced. Emphasise that AI reads selectively — README always (1 page, cheap), then only the sibling file relevant to the task.

**Section 3: The Generator (~250 words)**

A single Node script: `pnpm generate:overview`. Reads:
- `package.json` → stack frameworks and versions
- `deployment.json` → services and hosting
- `domain.config.js` (new convention) → entities with descriptions and relationships
- `src/routes/` filesystem scan + leading JSDoc → routes
- `src/lib/config/flow-registry.js` → automations
- Optional: introspect Directus schema directly for entity validation

Outputs the markdown files above. Re-run on demand or as end-of-task wrap-up.

Show a 30-line example of what the generator does for `entities.md`: read config, format as table with English description column, write file.

**Section 4: The Conventions That Make It Work (~250 words)**

| File / Convention | Purpose | AI Rule |
|---|---|---|
| `domain.config.js` | Entity definitions with English descriptions | Update when adding/changing entities |
| Route JSDoc | One-line description per `+page.server.ts` and `+server.ts` | Add before any new route |
| `overview/decisions/` | Dated ADR stubs (3-5 lines each) | Append when making any non-obvious call |
| `pnpm generate:overview` | Regenerate the folder | Run as last step of every task before commit |

Five rules emerge — list them as the bullet points to drop into `.clinerules`.

**Section 5: When to Build It (~200 words)**

Sprint 1 default for any project, like cache headers. The empty templates and the generator script ship with project scaffolding. The first sprint wires up entities + routes + stack (whatever the project actually has). Automations and decisions populate as those things appear.

Cost note: regenerating costs ~$0.00 (it's a local script, no AI). Reading `overview/README.md` at task start costs maybe ~500 tokens. Saves vastly more in avoided drift bugs and re-explanation.

**Section 6: What Non-Tech People See (~150 words)**

Show an example `entities.md` excerpt with the English description column. Make the case: a consultant, a future you, a client can open `overview/entities.md` and understand what the system is in 60 seconds. No code reading required. This is the closest the methodology gets to giving non-tech operators what Bubble or Pocketbase gave them visually.

#### Acceptance criteria

- [ ] Chapter exists at `docs/part-2/live-project-overview.md` with frontmatter
- [ ] TLDR present
- [ ] All six sections covered
- [ ] Folder layout block included exactly as above
- [ ] Generator example code block included
- [ ] Conventions table included
- [ ] Cross-references to documentation-architecture and control-panel chapters work
- [ ] Voice matches existing Part 2 chapters (directive, conversational, no fluff)
- [ ] VitePress sidebar updated to include this chapter (after `documentation-architecture`)

---

### TASK-A2: Add Overview Folder Templates and Generator Script

**Status:** BACKLOG
**Est. effort:** 60 min
**Dependencies:** TASK-A1 (so chapter exists to reference)

#### Context

New projects need the OVERVIEW folder scaffolded from day one — empty templates plus a working generator script. Cline runs `pnpm generate:overview` at the end of every task to refresh the folder.

#### Files to create

```
project-templates/overview/
├── README.md                 ← template with placeholders
├── stack.md                  ← template with placeholders
├── entities.md               ← template with placeholders
├── routes.md                 ← template with placeholders
├── automations.md            ← template with placeholders
└── decisions/.gitkeep
project-templates/scripts/generate-overview.js
project-templates/domain.config.js
```

#### Content for each template file

**`overview/README.md`** — index template:

```markdown
# Project Overview

> This folder is generated by `pnpm generate:overview`. Do not edit by hand.
> Last generated: [auto-filled timestamp]

## What is this?

[1-2 sentences pulled from project README — the elevator pitch]

## Quick stats

- Stack: [frameworks from stack.md]
- Entities: [count from entities.md]
- Routes: [count from routes.md]
- Automations: [count from automations.md]

## Recent decisions

[Last 3-5 entries from decisions/ as a bulleted list with dates]

## Files in this folder

- `stack.md` — frameworks, services, hosting
- `entities.md` — what data lives in the system, in plain English
- `routes.md` — every URL the app exposes
- `automations.md` — what runs automatically and when
- `decisions/` — log of non-obvious choices, dated
```

**`overview/entities.md`** — entities template:

```markdown
# Entities

> Generated from `domain.config.js`. Edit there, regenerate here.

## Summary

| Entity | What it is | Key fields | Related to |
|---|---|---|---|
| [Name] | [English description] | [field, field] | [other entity] |

## Detail

### [Entity name]

[English description — one or two sentences a non-developer could read]

**Fields**

| Field | Type | Notes |
|---|---|---|
| ... | ... | ... |

**Relationships**

- [How it connects to other entities, in English]
```

Same shape for `stack.md`, `routes.md`, `automations.md` — header explaining source, summary table, optional detail section.

**`scripts/generate-overview.js`** — minimal working generator:

A Node script (~80-120 lines) that:
1. Reads `package.json`, `deployment.json`, `domain.config.js`, `src/lib/config/flow-registry.js` if present
2. Scans `src/routes/` recursively for `+page.svelte`, `+page.server.ts`, `+server.ts` files
3. Extracts leading JSDoc comments from route files for one-line descriptions
4. Writes the six markdown files to `overview/`
5. Prints a summary: "Generated overview/ with N entities, M routes, P automations"
6. Exits non-zero if `domain.config.js` is missing (prompts the dev to create it)

Use plain Node fs/path APIs. No fancy libraries.

**`domain.config.js`** — new convention file template:

```javascript
/**
 * Domain configuration. Edit this file to declare your entities.
 * `pnpm generate:overview` reads it to produce overview/entities.md.
 */
export default {
  entities: [
    {
      name: 'Member',
      description: 'A person who has signed up. Members register for events, complete courses, receive newsletters.',
      fields: [
        { name: 'id', type: 'uuid', notes: 'PK' },
        { name: 'email', type: 'string', notes: 'unique, lowercase' },
        // ...
      ],
      relationships: [
        'has many Registrations (one per event)',
        'has many Enrolments (one per course)',
      ],
    },
    // Add more entities here...
  ],
};
```

#### `package.json` script addition

Add to the templates' `package.json` `scripts`:

```json
"generate:overview": "node scripts/generate-overview.js"
```

#### Acceptance criteria

- [ ] All six template files exist in `project-templates/overview/`
- [ ] `decisions/.gitkeep` exists
- [ ] `scripts/generate-overview.js` runs without error against the templates themselves
- [ ] `domain.config.js` template exists with one example entity
- [ ] `package.json` template has the `generate:overview` script
- [ ] Templates use placeholder syntax consistent with existing `project-templates/` files
- [ ] Generator script handles missing optional files gracefully (no `flow-registry.js`? skip automations.md generation, don't crash)

---

### TASK-A3: Update Rules and ARCHITECTURE Templates for Overview

**Status:** BACKLOG
**Est. effort:** 30 min
**Dependencies:** TASK-A2

#### Context

The OVERVIEW folder only works if AI actually reads it (selectively) and regenerates it (consistently). That's a `.clinerules` and `CLAUDE.md` change. Plus ARCHITECTURE.md needs a cross-reference noting that OVERVIEW captures live state.

#### Files to modify

- `project-templates/.clinerules`
- `project-templates/CLAUDE.md`
- `project-templates/ARCHITECTURE.md`
- `docs/part-6/templates.md` (rendered version)

#### What to add to `.clinerules` and `CLAUDE.md`

After the existing "Architecture Rules" section, add:

```markdown
### Live Project Overview Conventions

- **Read `overview/README.md` at the start of every task.** It's small (~1 page). It's your map of the current state.
- **Read additional `overview/*.md` files only when the task touches them.** Adding a route? Read `routes.md`. Adding an entity? Read `entities.md`. Do NOT read all overview files — be selective.
- **Update `domain.config.js` whenever entities change.** Adding a field, a relationship, a new entity — change it there, not just in code.
- **Add a JSDoc one-line description to every new route file** (`+page.server.ts`, `+server.ts`). The generator reads these.
- **Append a decision stub to `overview/decisions/` whenever you make a non-obvious call.** Format: `YYYY-MM-DD-short-slug.md`, three lines: what changed, why, alternatives considered.
- **Run `pnpm generate:overview` as the last step before committing.** Commit the regenerated folder. PR diffs surface drift.
- **If `overview/DRIFT.md` exists, READ IT before doing anything else** — it means current code disagrees with `ARCHITECTURE.md` and the situation needs human attention before further work.
```

#### What to add to `ARCHITECTURE.md` template

Add at the top, immediately after the title:

```markdown
> **Note:** This document captures the *intended* architecture — design decisions, schemas, conventions agreed at planning time.
> For the *current state* of the codebase (what entities actually exist, what routes are deployed, what automations are wired), see [`overview/`](../overview/) — it's regenerated by `pnpm generate:overview`.
> If the two disagree, `overview/DRIFT.md` will be present and should be reconciled before further work.
```

#### What to update in `docs/part-6/templates.md`

Update the rendered ".clinerules / CLAUDE.md (Key Sections)" block to mention the new "Live Project Overview Conventions" section. One sentence is enough — the full content lives in the templates.

#### Acceptance criteria

- [ ] `.clinerules` and `CLAUDE.md` both contain the new section, identical content
- [ ] All seven rules are present
- [ ] `ARCHITECTURE.md` template has the intent-vs-reality note at the top
- [ ] `templates.md` mentions the new section exists
- [ ] No existing rules removed or changed — addition only

---

## Bundle B: Token Cost Hygiene

### TASK-B1: Write the "Token Economics" Chapter and Update Setup Doc

**Status:** BACKLOG
**Est. effort:** 90 min
**Dependencies:** None

#### Context

The OpsNest deploy disaster ($30 in one night during a WiFi-unstable polling loop) crystallised that token economics deserve a dedicated chapter, not just scattered tips in the setup guide. A confirmed finding from research: Cline includes VSCode visible files and open tabs in environment_details on every API request — your hypothesis was correct, and it's not documented strongly enough anywhere.

This task adds a new chapter in Part 5 (operational/methodology) and a small update to the existing Part 0 cline-and-credits.md to flag the confirmed open-tabs behaviour where beginners will see it.

#### Files to create / modify

- **Create:** `docs/part-5/token-economics.md`
- **Modify:** `docs/part-0/cline-and-credits.md`
- **Modify:** `docs/.vitepress/config.ts` (sidebar)

#### Chapter structure (~1,500 words)

**Frontmatter + TLDR (~100 words)**

TLDR: Cline sends your open VSCode tabs and a fair amount of workspace context with every single API request. Without `.clineignore`, large folders like `node_modules` can blow past the context window. Without a max-requests limit, a runaway loop can burn $30 overnight. This chapter covers the four hygiene practices that cut wasted spend by 50-70% without sacrificing quality.

**Section 1: What Cline Actually Sends (~250 words)**

Plain English explanation: every API request includes the system prompt, conversation history, your `.clinerules` file, environment details (visible files, open tabs, working directory), and any files Cline has decided are relevant. So a "simple" message can be 10,000+ input tokens before you've said anything new. Source the open-tabs fact from the Cline blog. Note that the Cline UI's context-usage indicator can underrepresent what the API actually receives, sometimes by 50%, so don't trust it as your only signal.

**Section 2: Tab Hygiene (~200 words)**

The single biggest free saving. Close every VSCode tab before starting a Cline task. Open only what you'll work on. Make this a physical habit — keyboard shortcut, muscle memory. Show a before/after: ten tabs open with random files = several thousand wasted input tokens *per turn*. On a 30-turn task, that's measurable real money.

Note the related habit: when Cline finishes editing a file and moves to another, close the previous tab. Most users leave tabs open after Cline has moved on; the file content is still being shipped on every subsequent request.

**Section 3: `.clineignore` (~250 words)**

Show the canonical exclusion list (the one in TASK-B2). Explain why each entry matters: `node_modules` is gigabytes, `.svelte-kit` is generated, lockfiles are huge and rarely need reading, screenshots/logs can run into MB.

The non-obvious entries: `docs/` and `dev-tasks/` — surprising at first, but the AI doesn't need all your docs in context unless the current task is editing them. It can read specific files on demand. For doc-heavy projects (like this guide's own repo), excluding these is one of the largest single savings.

Format consistency note: `.clineignore` follows `.gitignore` syntax exactly.

**Section 4: Hard Circuit Breakers (~250 words)**

Two settings that prevent runaway burn:

1. **Cline's max-requests-per-task setting.** Set to 20-25 for normal tasks, 10 for deploy-class operations. Hard limit, can't be overridden by the model. Cite the OpsNest deploy disaster as the concrete reason.
2. **The "stop after 3 failures" rule** in `.clinerules`. Soft limit, can be ignored by the model in theory, but works in practice for most cases.

Both should exist. Defence in depth.

Mention also Cline's `new_task` handoff mechanism, which can start a new clean session with structured context preloaded based on rules — useful for long tasks before context degrades past 70%.

**Section 5: Plan vs Act Mode Discipline (~200 words)**

Plan mode is dramatically cheaper because it doesn't write files or run commands. Use it aggressively for "figure out the approach" — output is mostly text, input is mostly your existing context.

Act mode costs more because of file writes, terminal output, retries, and the cycles of editing-and-checking. A common bad pattern: jumping to Act, hitting a wall, going back to Plan with more context, returning to Act. Each round-trip is expensive. The fix: stay in Plan until the approach is genuinely clear, then commit to Act.

**Section 6: When to Audit `.clinerules` Size (~200 words)**

Every turn pays for the full `.clinerules` file. As rules accrete sprint after sprint, the file grows. At ~3-4k words it's worth auditing.

Pattern: keep iron-clad, directive rules in `.clinerules` (the "what to do" part). Move expansion content — examples, rationale, lengthy guidance — into separate docs that AI reads on demand. Cross-reference [Documentation Architecture](/part-2/documentation-architecture).

The audit question: "Does AI need to see this on every single turn, or only when the task is in scope?" If on-demand, move it.

**Section 7: What This Adds Up To (~100 words)**

Approximate savings table:

| Practice | Saving |
|---|---|
| Close unused tabs | 10-30% per turn |
| `.clineignore` (real one) | Avoids context-window crashes; saves 5-20% |
| Max-requests circuit breaker | Avoids catastrophic loops (worth $20-50 on a single bad night) |
| Plan/Act discipline | 20-40% on exploratory tasks |
| `.clinerules` audit | 5-15% per turn on long-running projects |

Cumulative effect: 50-70% reduction in spend without quality loss.

#### Update to `docs/part-0/cline-and-credits.md`

In the existing "Tips to Keep Costs Down" section, after the existing "Don't let Cline retry endlessly" item, add:

```markdown
**Close VSCode tabs before starting a Cline task.** Cline includes the contents of your open tabs and visible files in every API request — confirmed in the Cline source and documentation. Ten unrelated open tabs means thousands of wasted input tokens *per turn*. Close everything, open only what's relevant. See [Token Economics](/part-5/token-economics) for the full set of cost-hygiene practices once you're past the basics.
```

Don't expand further in Part 0 — beginners get the essential habit, the full chapter lives in Part 5.

#### Acceptance criteria

- [ ] `docs/part-5/token-economics.md` exists with frontmatter and TLDR
- [ ] All seven sections present
- [ ] Savings summary table at end
- [ ] `docs/part-0/cline-and-credits.md` has the tab-closing tip with cross-reference
- [ ] VitePress sidebar config includes the new Part 5 chapter
- [ ] Voice matches existing Part 5 chapters (directive, with TLDRs, real examples)
- [ ] Cite the Cline blog source where relevant; don't make claims that aren't backed

---

### TASK-B2: Add `.clineignore` Template and Cost Rules to Templates

**Status:** BACKLOG
**Est. effort:** 30 min
**Dependencies:** TASK-B1 (chapter to reference)

#### Files to create / modify

- **Create:** `project-templates/.clineignore`
- **Modify:** `project-templates/.clinerules`
- **Modify:** `project-templates/CLAUDE.md`
- **Modify:** `docs/part-6/templates.md`

#### Content for `.clineignore`

```
# Build artefacts and dependencies
node_modules/
.svelte-kit/
build/
dist/
.next/
.nuxt/

# Lockfiles (large, rarely read)
package-lock.json
pnpm-lock.yaml
yarn.lock

# Version control
.git/

# Environment files (secrets and runtime config)
.env
.env.*
!.env.example

# Logs and temp files
*.log
logs/
tmp/
.cache/

# OS / editor cruft
.DS_Store
.vscode/
.idea/
Thumbs.db

# Doc-heavy folders the AI doesn't need on every turn
# (it can read specific files on demand)
docs/
dev-tasks/

# Screenshots and design assets
screenshots/
design-assets/
*.png
*.jpg
*.jpeg
!public/**/*.png
!public/**/*.jpg

# Generated overview folder (read selectively, not en masse)
# Comment this out if AI needs to read the whole folder
# overview/
```

Note inline: the `overview/` exclusion is commented out by default because the README is meant to be read at task start. If projects find AI is over-reading the folder, they can uncomment.

#### Add to `.clinerules` and `CLAUDE.md`

After the existing "Development Workflow" section, add:

```markdown
### Cost Hygiene Rules

- **Read files selectively, not en masse.** Before reading a file, ask: do I actually need this for the current task? If not, skip it.
- **Avoid re-reading files Cline has already loaded** in the current task. Cline's context already has them.
- **For long-running tasks (>30 turns), use `new_task` handoff** at ~50-60% context to start a clean session preloaded with relevant state.
- **Hard stop after 3 failures.** If the same operation fails three times, stop. Report what's been tried, what failed, and what's confusing. Do not attempt a fourth time without human input.
- **For deploys and other long-running operations, run the command ONCE and stop.** Do not poll for status. (See deploy rules.)
- **At task start, read `overview/README.md` only.** Read additional overview files only if the task touches them.
- **Honour `.clineignore`.** Do not request reads for paths excluded by it; suggest editing `.clineignore` if a needed file is excluded.
```

#### Update `docs/part-6/templates.md`

Update the rendered `.clinerules` block to mention the new "Cost Hygiene Rules" section. Single sentence reference.

#### Acceptance criteria

- [ ] `project-templates/.clineignore` exists with the exclusion list above
- [ ] Comments explain non-obvious entries (`docs/`, `dev-tasks/`, `overview/`)
- [ ] Both rules templates updated identically
- [ ] All seven cost-hygiene rules present
- [ ] `templates.md` references the new section
- [ ] No existing rules removed

---

## Bundle C: Deploy Non-Polling Pattern

### TASK-C1: Update Deployment Chapter with Non-Polling and Build-on-Server

**Status:** BACKLOG
**Est. effort:** 60 min
**Dependencies:** None

#### Context

The OpsNest deploy disaster: WiFi dropped, Cline polled deploy status every 30 seconds for an hour, each poll a full API turn carrying the entire conversation history, costing ~$30 by morning. Two failure modes compounded:
1. Polling pattern (Cline checks → waits → checks again, each check a full turn)
2. Long context multiplier (by turn 50, every poll pays for 49 turns of history)
Plus a separate symptom: 300MB build contexts being uploaded to the remote Docker daemon because of missing `.dockerignore`.

This task adds two sections to the existing `deployment-platforms.md` chapter: the non-polling pattern and the build-on-server pattern. The complementary template files (`scripts/deploy.sh`, `.dockerignore`, rules) are TASK-C2.

#### File to modify

`docs/part-5/deployment-platforms.md`

#### What to add

After the existing "Production Hosting: Hetzner and Dev/Prod Separation" section and before "Dependency Version Management", insert two new sections.

**New Section: "Deploy Operations Are Non-Polling" (~400 words)**

Lead with the OpsNest cautionary tale: 30-second poll loop, unstable WiFi accelerant, $30 burned overnight. Diagnose: every poll is a full API turn carrying the entire conversation history, so by turn 50 you're paying for 49 turns of context just to ask "is it done yet?".

The fix is structural, not behavioural. Three rules:

1. **Run the deploy command ONCE.** Capture output to a log file. End the turn. Do not check status, do not "verify completion".
2. **If you genuinely need a status check, use a blocking command with a timeout** — `docker compose up --wait`, `kubectl rollout status --timeout=10m`, `pm2 logs --lines 50 --nostream`. These return when done or when the timeout fires. They are not polling loops.
3. **Wait for the human to confirm deploy outcome before any follow-up.** Cline does not poll, does not retry, does not "check on progress". The human comes back, looks at the log, confirms.

Show the canonical pattern as code:

```bash
# scripts/deploy.sh
#!/usr/bin/env bash
set -euo pipefail

LOG_FILE="./logs/deploy-$(date +%s).log"
mkdir -p ./logs

echo "Starting deploy at $(date)" | tee -a "$LOG_FILE"

ssh "$DEPLOY_USER@$DEPLOY_HOST" '
  set -euo pipefail
  cd /app
  git pull
  docker compose build
  docker compose up -d --wait --remove-orphans
' 2>&1 | tee -a "$LOG_FILE"

echo "Deploy finished at $(date)" | tee -a "$LOG_FILE"
```

Mention WiFi resilience: because the deploy runs on the server (not on Cline's machine), it survives network drops mid-deploy. Cline's job is to start it and stop. The human checks the log when convenient.

Cross-reference Hard Circuit Breakers in [Token Economics](/part-5/token-economics) — the max-requests-per-task setting is the second line of defence.

**New Section: "Build on the Server, Not Locally" (~350 words)**

Diagnose the second OpsNest symptom: 300MB+ uploads to the remote Docker daemon for a 1MB code change. Cause: no `.dockerignore` plus `node_modules` going into the build context plus `docker -H ssh://...` shipping the whole tarball every build.

Three layered fixes, easiest first.

**Layer 1: A real `.dockerignore`.** Show the canonical exclusion list (the one in TASK-C2). For SvelteKit specifically: `node_modules`, `.svelte-kit`, `build`, lockfiles other than the one being used, `.git`, screenshots, dev-tasks, docs. This alone usually drops context from hundreds of MB to single-digit MB.

**Layer 2: Build on the server, not locally.** The structural fix. Pattern:

```bash
ssh user@server 'cd /app && git pull && docker compose build && docker compose up -d --wait'
```

The "upload" is now a `git pull` — kilobytes for code-only changes. The server has the Docker layer cache, so unchanged layers (npm install, base image) are reused. Idempotent: same git commit = same deployment.

For this to work, your Dockerfile must order layers correctly. Copy package files first and run install before copying source — this is the standard Node Dockerfile pattern that lets dependency installation reuse Docker's layer cache when only source code changes. Show a minimal correct Dockerfile.

**Layer 3: For pure code changes, skip Docker rebuild entirely.** When using `adapter-node`, code-only changes (no `package.json` modification) don't need a Docker rebuild. Pattern:

```bash
ssh user@server 'cd /app && git pull && pnpm build && pm2 reload app'
```

Reserve `docker compose build` for when dependencies actually changed. A `.clinerules` rule encodes this: if the diff doesn't touch `package.json`, `pnpm-lock.yaml`, or the Dockerfile, use the fast path.

End with: combined with the non-polling rule above, this turns the 300MB-upload-plus-30-USD-night into a 10-second SSH command that succeeds, fails cleanly, or times out cleanly.

#### Acceptance criteria

- [ ] Both new sections inserted in the right place in `deployment-platforms.md`
- [ ] OpsNest cautionary tale referenced concretely (the $30 night)
- [ ] `scripts/deploy.sh` example included verbatim
- [ ] All three deploy rules listed
- [ ] All three layers of the upload-size fix explained with code examples
- [ ] Dockerfile layer-ordering rule cited and demonstrated
- [ ] Cross-reference to token-economics chapter present
- [ ] Voice matches existing chapter

---

### TASK-C2: Add Deploy Templates and Rules

**Status:** BACKLOG
**Est. effort:** 45 min
**Dependencies:** TASK-C1

#### Files to create / modify

- **Create:** `project-templates/.dockerignore`
- **Create:** `project-templates/scripts/deploy.sh`
- **Create:** `project-templates/Dockerfile` (SvelteKit + adapter-node reference)
- **Modify:** `project-templates/.clinerules`
- **Modify:** `project-templates/CLAUDE.md`
- **Modify:** `docs/part-6/templates.md`

#### Content for `.dockerignore`

```
# Dependencies — installed inside the container, do NOT ship
node_modules
.pnpm-store

# Build outputs — Docker rebuilds these
.svelte-kit
build
dist
.next
.nuxt

# Version control
.git
.gitignore
.gitattributes

# Environment files — passed at runtime, not baked in
.env
.env.*
!.env.example

# Logs and temp
*.log
logs
tmp
.cache

# Editor and OS cruft
.vscode
.idea
.DS_Store
Thumbs.db

# Project docs and dev-only files (not needed in production image)
README.md
docs
dev-tasks
overview
screenshots

# Lockfiles other than the one in use — keep your chosen one!
# yarn.lock
# package-lock.json
```

#### Content for `scripts/deploy.sh`

```bash
#!/usr/bin/env bash
# Deploy script — runs ONCE, never polls, server does the work.
# See docs/part-5/deployment-platforms.md for the rationale.

set -euo pipefail

# Required env vars (set in .env or shell)
: "${DEPLOY_USER:?DEPLOY_USER not set}"
: "${DEPLOY_HOST:?DEPLOY_HOST not set}"
: "${DEPLOY_PATH:?DEPLOY_PATH not set}"

LOG_FILE="./logs/deploy-$(date +%s).log"
mkdir -p ./logs

echo "=== Deploy starting at $(date) ===" | tee -a "$LOG_FILE"
echo "Host: $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH" | tee -a "$LOG_FILE"

# Detect fast path: only code changed, no deps
if git diff --name-only HEAD~1 HEAD | grep -qE '^(package\.json|pnpm-lock\.yaml|Dockerfile)$'; then
  DEPLOY_MODE="full"
  echo "Mode: full (deps or Dockerfile changed)" | tee -a "$LOG_FILE"
else
  DEPLOY_MODE="fast"
  echo "Mode: fast (code only)" | tee -a "$LOG_FILE"
fi

if [ "$DEPLOY_MODE" = "full" ]; then
  ssh "$DEPLOY_USER@$DEPLOY_HOST" "
    set -euo pipefail
    cd $DEPLOY_PATH
    git pull
    docker compose build
    docker compose up -d --wait --remove-orphans
  " 2>&1 | tee -a "$LOG_FILE"
else
  ssh "$DEPLOY_USER@$DEPLOY_HOST" "
    set -euo pipefail
    cd $DEPLOY_PATH
    git pull
    pnpm install --frozen-lockfile
    pnpm build
    pm2 reload app
  " 2>&1 | tee -a "$LOG_FILE"
fi

echo "=== Deploy finished at $(date) ===" | tee -a "$LOG_FILE"
echo "Log: $LOG_FILE"
```

Make executable note: include in instructions to run `chmod +x scripts/deploy.sh` after copying template.

#### Content for `Dockerfile` (SvelteKit + adapter-node reference)

```dockerfile
# syntax=docker/dockerfile:1
FROM node:20-alpine AS builder

WORKDIR /app

# Copy ONLY package files first — this layer is cached unless deps change
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# Copy source AFTER deps install — source changes don't bust install cache
COPY . .
RUN pnpm build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
RUN corepack enable && pnpm install --prod --frozen-lockfile

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "build"]
```

Comment in template: "If you add a new step that depends on deps, put it BEFORE the COPY . . line. Steps that depend only on source go AFTER."

#### Add to `.clinerules` and `CLAUDE.md`

After the existing rules sections, add:

```markdown
### Deploy Rules

- **Deploy operations are non-polling.** Run the deploy command ONCE, capture output to `./logs/deploy-<timestamp>.log`, end the turn. Do not check status, do not poll, do not retry without human input.
- **Use blocking commands with timeouts**, never status-poll loops. `docker compose up --wait`, `kubectl rollout status --timeout=10m`, `pm2 logs --lines 50 --nostream`.
- **Build on the server, not locally.** Standard pattern: SSH to server, `git pull`, `docker compose build`, `docker compose up -d --wait`. The "upload" is the git diff — kilobytes, not megabytes.
- **Use the fast path for code-only changes.** If the diff since last deploy doesn't touch `package.json`, `pnpm-lock.yaml`, or `Dockerfile`, skip Docker rebuild — `git pull && pnpm build && pm2 reload`. `scripts/deploy.sh` does this detection.
- **`.dockerignore` is mandatory.** No project ships without it. Exclude `node_modules`, `.svelte-kit`, `build`, `.git`, `.env*` (except `.env.example`), `docs`, `dev-tasks`, screenshots, logs.
- **Dockerfile layer ordering matters.** Copy `package.json` and lockfile FIRST, run install, THEN copy source. Source changes must not invalidate the dependency-install layer.
- **After the deploy command exits, STOP.** Wait for human confirmation. Do not check `/api/health`, do not curl the site, do not query the database to "verify". The human will do that.
```

#### Update `docs/part-6/templates.md`

Update the rendered `.clinerules` block to mention "Deploy Rules". Add `.dockerignore` and `scripts/deploy.sh` to the list of standard project files mentioned in templates.

#### Acceptance criteria

- [ ] `.dockerignore` template exists with all categories above
- [ ] `scripts/deploy.sh` template exists, includes fast-path detection, idempotent shebang, `set -euo pipefail`
- [ ] `Dockerfile` template exists with correct layer ordering and inline comment
- [ ] Both rules files updated identically with all seven deploy rules
- [ ] `templates.md` mentions the new section and new template files
- [ ] No existing rules removed

---

## Definition of Done (Mini-Sprint)

- [ ] All 7 tasks at DONE with confidence 8/10+
- [ ] New chapters in Part 2 and Part 5 build cleanly in VitePress
- [ ] Existing `cline-and-credits.md` and `deployment-platforms.md` updates merged
- [ ] All template additions present in `project-templates/`
- [ ] `.clinerules` and `CLAUDE.md` templates contain three new sections (Overview, Cost Hygiene, Deploy)
- [ ] `templates.md` reflects all rule additions
- [ ] VitePress sidebar updated for both new chapters
- [ ] Voice consistent with existing methodology — directive, structured, real examples
- [ ] OpsNest is referenced as the case study for both the deploy disaster and the original drift problem

---

## Observations Template (for Docs Research)

Each task should have its "Observations for Docs" section filled in during execution:

```markdown
## Observations for Docs

### What the AI did well
- [What Cline handled without issues]

### What the AI struggled with
- [Where you had to intervene, re-explain, or fix]

### What instructions would have helped
- [Conventions, rules, or examples that should go in the docs]

### Recommended .clinerules additions
- [Specific rules to add to CLAUDE_RULES template]

### Time estimate accuracy
- Estimated: [X] min → Actual: [Y] min — [why the difference]
```

---

## Open Questions

1. **Generator script: pure JS or include TypeScript types?** Default to plain Node JS for portability across project types. TypeScript users can convert if they want.
2. **Should `overview/` be in `.gitignore` or committed?** Committed. The whole point is that PR diffs surface drift.
3. **Should the Token Economics chapter mention DeepSeek/model-switching strategies?** Mention briefly as an option, do not endorse — the methodology's quality bar relies on Sonnet, and operational complexity of multi-model setups isn't worth the savings for most users at this scale.
4. **Where exactly does the OVERVIEW chapter sit in Part 2?** Suggest immediately after `documentation-architecture.md`. The chapter explicitly extends that one.
