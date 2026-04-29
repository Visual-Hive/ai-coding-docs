---
title: Token Economics
description: What Cline actually sends with every request, and how to stop wasting it
---

# Token Economics

## TLDR

Cline sends your open VSCode tabs and a fair amount of workspace context with every single API request — confirmed in Cline's own documentation, not folklore. Without `.clineignore`, large folders like `node_modules` can blow past the context window. Without a max-requests-per-task limit, a runaway loop can burn $30 overnight. This chapter covers the four hygiene practices that, combined, cut wasted spend by 50-70% without sacrificing quality: tab discipline, a real `.clineignore`, hard circuit breakers, and Plan/Act mode discipline.

::: warning Cost discipline matters
The OpsNest deploy disaster — a polling loop on unstable WiFi — burned around $30 in a single overnight session. None of the spend produced useful work. The structural fixes below would have prevented every cent of it.
:::

---

## What Cline Actually Sends

Every API request Cline makes carries more than your latest message. The full payload includes:

- The Cline system prompt
- The conversation history (every prior turn, in full)
- Your `.clinerules` file (every line, every turn)
- Environment details: visible files, **open VSCode tabs**, working directory, recent terminal output
- Any files Cline has decided are relevant to the current task
- The current task's specifications and any read files

A "simple" follow-up message can easily be 10,000+ input tokens before you've typed anything. By the time you're 30 turns into a task, the conversation history alone is most of the cost.

Two non-obvious facts that catch people out:

1. **Open tabs are included in environment details on every request.** This is documented behaviour, not a bug. Ten unrelated open tabs adds thousands of tokens per turn.
2. **Cline's UI context-usage indicator can underrepresent what the API actually receives** — sometimes by 50%. Treat it as a rough guide, not a budget.

The implication: a lot of token spend is structural, not behavioural. You can write the perfect prompt and still bleed tokens because of what's around it.

---

## Tab Hygiene

The single biggest free saving. Close every VSCode tab before starting a Cline task. Open only the files you'll actually be working on. Make this a physical habit — keyboard shortcut, muscle memory, automatic.

A concrete before/after:

- **Before:** Ten tabs open from yesterday's work — old route files, a long config, two markdown notes. Each turn ships those tabs as part of environment details. On a 30-turn task, that's ~30 × the tab payload in wasted input tokens.
- **After:** One or two tabs related to the current task. The same task uses 20-30% fewer input tokens.

There's a related habit that costs even more: **when Cline finishes editing a file and moves on to another, close the previous tab.** Most users leave them open. The file content keeps shipping on every subsequent request even though Cline has moved on. Closing it costs you one keystroke and saves hundreds of tokens per remaining turn.

Treat your VSCode tab bar like the surface of an expensive desk. Only put things on it that you're using right now.

---

## `.clineignore`

The file Cline reads to decide which paths to exclude from context. Same syntax as `.gitignore`, same semantics. No project should ship without one.

The canonical exclusion list (the one that ships in [project templates](/part-6/templates)):

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
```

**Why each category matters.** `node_modules` is gigabytes; without exclusion, a single misplaced read can blow the context window. `.svelte-kit` and `build` are generated outputs that Cline should never reason from — they'll just confuse it. Lockfiles are huge and almost never the right thing to read; if Cline needs to know a version, it should read `package.json`. Screenshots and PNGs ship as binary that the model can't usefully process.

**The non-obvious entries: `docs/` and `dev-tasks/`.** Surprising at first. Why exclude your own docs? Because AI doesn't need *all* your docs in context unless the current task is editing them. It can read specific files on demand via the read-file tool. For doc-heavy projects (like the repo this guide lives in), excluding these is one of the largest single savings — often double-digit percentages per turn.

If you find AI failing to find documentation it genuinely needs, the answer is "tell it the path" — not "ungate the whole folder."

---

## Hard Circuit Breakers

Two settings that prevent runaway burn. Both should exist; defence in depth.

**1. Cline's max-requests-per-task setting.** A hard limit, enforced by Cline itself, that the model cannot override. Set it to:

- **20-25** for normal coding tasks
- **10** for deploy-class operations (where each request is expensive *and* a polling loop is catastrophic)
- **40+** only when you're deliberately doing a long migration and watching it actively

This is the second line of defence after the [non-polling deploy pattern](/part-5/deployment-platforms). The OpsNest deploy disaster — a polling loop on unstable WiFi that burned around $30 overnight — would have been capped at maybe $3 with a max-requests of 10. The structural fix (don't poll) is better. The circuit breaker catches the cases where structure fails.

**2. The "stop after 3 failures" rule** in `.clinerules`. A soft limit, enforced only by the model's adherence to its own rules. Works in practice for most cases:

```
- Hard stop after 3 failures. If the same operation fails three times,
  stop. Report what's been tried, what failed, and what's confusing.
  Do not attempt a fourth time without human input.
```

This catches the most common pattern: a missing dependency, a wrong file path, a broken assumption. Three retries is enough to rule out flake; the fourth is just ego.

Mention also Cline's `new_task` handoff mechanism: when a task gets long (50+ turns) and context is degrading, you can spawn a fresh session preloaded with structured state instead of letting the conversation grow indefinitely. This is the third tool in the box. Use it before the context window forces you to.

---

## Plan vs Act Mode Discipline

Plan mode is dramatically cheaper because it doesn't write files or run commands. Output is mostly text reasoning; input is mostly your existing context. Act mode costs more because of file writes, terminal output, retries, and the cycles of edit-and-check.

A common bad pattern that wastes a lot of tokens: jumping to Act, hitting a wall, going back to Plan with more context, returning to Act, hitting another wall. Each round-trip carries the entire conversation forward. By the third round, you're paying for most of the previous conversation on every poll-of-the-tools turn.

The fix: **stay in Plan until the approach is genuinely clear.** When Cline asks clarifying questions in Plan, answer them. When it proposes an approach, push back if it seems off. When it commits to a plan, *then* switch to Act and let it execute.

Specifically:

- Brainstorming and approach selection: always Plan
- File-by-file changes with a known approach: Act
- Debugging an unexpected error: Plan first to think, then Act to apply the fix
- "Just try it and see": Plan. Always Plan first. The phrase "just try it" is a sign you don't have a plan yet, which is exactly the moment Plan saves money.

---

## Auditing `.clinerules` Size

Every turn pays for the full `.clinerules` file. As rules accrete sprint after sprint, the file grows. By the time it's around 3-4k words, it's worth an audit pass.

Pattern: keep iron-clad, directive rules in `.clinerules` (the "what to do" part). Move expansion content — examples, rationale, lengthy guidance — into separate docs that AI reads on demand. Cross-reference [Documentation Architecture](/part-2/documentation-architecture).

The audit question for each rule:

> Does AI need to see this on every single turn, or only when the task is in scope?

If on-demand is enough, move it into a focused doc and add a one-line pointer to `.clinerules`. The pointer costs ~10 tokens; the full content was costing hundreds.

A practical example: cache-header guidance is iron-clad ("set `Cache-Control: no-cache`") and short — keep it inline. Detailed rationale for why caches stale is one read of a Part 5 chapter — move it.

---

## What This Adds Up To

Approximate savings table, drawn from observed before/after on real projects:

| Practice | Per-turn saving | Why |
|---|---|---|
| Close unused tabs | 10-30% | Open tabs ship every turn; each unrelated tab is dead weight |
| `.clineignore` (real one) | 5-20% | Avoids reading megabytes of generated/build files |
| Max-requests-per-task circuit breaker | Avoids catastrophic loops | One bad night without it can cost $20-50 |
| Plan/Act discipline | 20-40% on exploratory tasks | Each round-trip carries the full history |
| `.clinerules` audit | 5-15% on long-running projects | Long rule files multiply across every turn |

Cumulative effect on a typical project: **50-70% reduction in spend without quality loss.** Quality often *improves*, because Plan-mode discipline forces clearer thinking and `.clineignore` keeps Cline focused on relevant code.

---

## A Note on Multi-Model Strategies

Some teams switch to cheaper models (DeepSeek, smaller Sonnet variants, local models) for cost reasons. This is an option, not a recommendation. The methodology in this guide relies on the latest Sonnet's quality bar — the planning depth, the architectural reasoning, the willingness to say "I'm not sure" rather than confabulate. Operational complexity of multi-model setups (different APIs, different prompt patterns, different failure modes) usually isn't worth the savings at the scale most readers operate at. If you're spending hundreds of dollars a day, the trade-off shifts; for most readers, tab hygiene and `.clineignore` recover more spend with less risk.

---

::: tip This is most of the cost story
A team that closes tabs, ships a real `.clineignore`, sets max-requests sensibly, and stays in Plan until the approach is clear, will spend a fraction of what an undisciplined team spends — for the same or better output. None of these practices require model changes, paid plugins, or methodology changes. They just require habits.
:::

---

**Next:** [Deployment & Platform Targets](/part-5/deployment-platforms) — including the non-polling deploy pattern that would have prevented OpsNest's $30 night.
