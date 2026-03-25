---
title: Prompts
description: Copy-paste prompts for every phase of development
---

# Prompts

Tested prompts for each stage. These are also available as individual files in `project-templates/prompts/` for easy reference.

---

## Phase 1: Initial Brainstorm

> **Where:** Claude (Opus), inside a Project. **Not** Cline or Claude Code.

```
I want to build [describe your full vision — don't hold back].

My situation:
- Technical level: [beginner / intermediate / advanced]
- Timeline goal: [e.g., MVP in 2-4 weeks]
- Budget: [e.g., $200-500 in AI tokens]
- Existing resources: [designs, APIs, datasets, code you have]

Let's have a thorough discussion before committing to anything:
1. Talk through the idea — what's exciting, what's risky
2. Identify the core value proposition
3. Discuss V1 (MVP) vs V2 scope
4. Talk through features I might be missing
5. Recommend technology with trade-offs and alternatives
6. Discuss data architecture

Don't just give me a plan. Let's have a real back-and-forth.
Ask me questions. Challenge my assumptions.
```

**Follow-ups:**
```
That still feels ambitious. What's the absolute minimum
to test whether [core concept] works?
```

```
Can you lay out 2-3 tech stack options with honest
pros/cons? Consider my skill level and timeline.
```

```
Can you sketch the main [page/screen] layout so I can
tell you if we're aligned?
```

---

## Phase 2: Generate Foundation Documents

> **Where:** Same Claude conversation as the brainstorm.

```
Based on everything we've discussed, generate the
foundational documents for this project:

1. README.md — vision, scope, tech stack, setup
2. ARCHITECTURE.md — full DB schemas, components, API,
   auth flow, deployment, key decisions
3. LEARNINGS.md — empty template
4. .clinerules AND/OR CLAUDE.md — iron-clad quality rules
   with mandatory testing, plan-first workflow,
   prohibited behaviors, tech-specific rules
5. SPRINT_RULES.md — sprint sizing and task writing rules
6. TASK_TEMPLATE.md — task specification format
7. Sprint 1 plan with task index and execution order
8. Any foundational code files that should exist from
   the start (configs, schemas, .env.example, etc.)

Make the ARCHITECTURE.md schemas specific — actual column
names, types, and constraints. Make the rules strict —
"tests are mandatory" not "try to test."
```

---

## Phase 3: Generate Task Specs

> **Where:** Same conversation, or new conversation in the same Project.

```
Generate detailed task specs for each Sprint 1 task.
Each should follow TASK_TEMPLATE.md format with:

1. Context — why this task exists
2. Requirements — numbered, specific, testable
3. Technical approach — files to create/modify, patterns
4. Acceptance criteria — checkboxes including tests
5. Notes — edge cases, gotchas

Reference specific file paths and schemas from
ARCHITECTURE.md. Each spec should be detailed enough
that Cline/Claude Code can execute without clarification.
```

---

## Phase 4: Task Execution

> **Where:** Cline or Claude Code. New conversation per task.

**Starting a task:**
```
Can we please plan task [X.X] - [task name]?
```

That's it. AI reads your docs for context.

**With additional context:**
```
Can we please plan task [X.X] - [task name]?

Additional context:
- [Relevant detail]
- [Changed requirement]
```

**Proceeding:**
```
Looks good. Proceed.
```

---

## Phase 5: Fixes & Debugging

> **Where:** Cline or Claude Code. **Plan mode is critical.**

**Standard fix:**
```
I need to fix this: [describe the problem]

Error: [paste error message]
Steps to reproduce: [1, 2, 3]

Please investigate and propose a plan before making changes.
```

**When going in circles (30+ minutes):**
```
We're not making progress. Please write a task doc capturing:
1. The original problem
2. What we've tried and why it didn't work
3. Current state of the code
4. Recommended next steps

I'll start a fresh conversation with this context.
```

---

## Phase 6: New Features

> **Where:** Claude (Opus), Project with GitHub repo synced.

```
I want to add [feature] to [project name].

Review the synced repo to understand the current state.
Let's discuss:
1. How does this fit with what exists?
2. What's the minimum viable version?
3. What should be deferred?
4. What existing patterns can we reuse?
5. Any architectural changes needed?
```

---

## Phase 7: Phase Audit

> **Where:** Fresh Claude conversation. No development context.

```
You're a senior developer auditing this codebase.

Project: [brief description]
Phase completed: [MVP / Sprint N / v1.0]
Tech stack: [list]

Review for:
1. Bugs and logic errors
2. Security issues (OWASP top 10)
3. Missing error handling
4. Code quality (dead code, duplication, naming)
5. Test coverage gaps
6. Architecture violations
7. Performance concerns

For each issue: severity, file reference, what's wrong, how to fix.
Rate 1-10 overall. Be critical.
```

---

## Phase 8: Context Rescue

> **Where:** Current conversation (to capture), then new conversation (to continue).

**Capturing progress:**
```
We need to pause. Write a task doc capturing:
1. Original objective
2. What was completed
3. What remains
4. Blockers and current issues
5. Files the next conversation should review
6. Recommended next steps
```

**Starting fresh:**
```
Picking up work on [task name]. Context from previous session:

[paste or reference the task doc]

Please read the project docs, review the listed files,
and propose a plan to complete the remaining work.
```

---

## Prompts to Avoid

**Too vague:**
```
Fix the bug
Make it better
Do whatever you think
```

**Too verbose:**
```
[500 words of context that exists in your docs]
```

**Priming for bad output:**
```
This is probably easy...
Just quickly...
Tell me my code is good
```

**Skipping plan mode:**
```
Just fix [the thing]     ← AI will dive in without thinking
```

Keep prompts direct and specific. Let docs provide context. Always plan before acting.

---

**Next:** [Case Studies](/part-6/case-studies) — Real projects built with this methodology.
