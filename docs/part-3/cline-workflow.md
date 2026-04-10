---
title: The Execution Workflow
description: Plan → Act → Verify, one task at a time
---

# The Execution Workflow

## TLDR

**New conversation for every task.** Prevents context pollution.

**Plan mode FIRST.** Whether using Cline or Claude Code, always review the approach before AI writes code. For fixes and debugging, this is **critical**.

**Minimal prompting.** "Can we plan task 2.3?" is enough — AI reads your docs for context.

**Verify and score.** Check the work, assign confidence, close, next task.

---

## The Cycle

```
1. Open new Cline chat / Claude Code session
2. "Can we please plan task X.X?"
3. AI reads docs, proposes approach
4. Review plan, ask questions, adjust
5. "Proceed" → execution
6. Approve commands as needed
7. AI completes work, provides confidence score
8. Verify it works (run app, check browser, run tests)
9. Close conversation
10. Next task
```

Every task follows this cycle. No exceptions.

---

## Why New Conversation Per Task

Long conversations accumulate garbage:
- Old debugging tangents
- Superseded decisions
- Conflicting context from abandoned approaches
- Token costs for context you're barely using

By message 80, AI is confused and you're paying for 80 messages of context on every response.

New conversation = fresh start. Your documentation provides continuity, not chat history.

**The pattern:**
- Task 1 → New conversation → Complete → Close
- Task 2 → New conversation → Complete → Close
- Task 3 → New conversation → Complete → Close

---

## Plan Mode: Non-Negotiable for Fixes

For new tasks following a sprint plan, plan mode confirms alignment. For **fixes, debugging, and tweaks**, plan mode is absolutely critical:

```
I need to fix this: [describe the problem]

Please investigate and propose a plan before making any changes.
```

**Why this matters for fixes:**
- Without a plan, AI starts changing code based on its first guess
- First guesses are often wrong for bugs
- Changes without a plan create new bugs
- A 2-minute plan review saves 30 minutes of rework

**In Cline:** Use the explicit Plan Mode toggle.
**In Claude Code:** Ask it to plan, or use `--plan` flag.

---

## Minimal Prompting

You don't need elaborate prompts. This works:

> "Can we please plan task 2.3?"

AI will:
1. Read your `.clinerules` / `CLAUDE.md` for rules
2. Read `ARCHITECTURE.md` for the system design
3. Read the sprint plan to find the task
4. Read the task spec for details
5. Check `LEARNINGS.md` for gotchas
6. Propose an approach

If your docs are good, the prompt can be simple.

**When to add context:**
- External APIs: "Here's the API docs: [link]"
- Changed requirements: "Actually, we're using X instead of Y"
- Specific constraints: "This needs to work offline"

Otherwise, trust your docs.

---

## Execution

Once the plan looks right:

> "Looks good. Proceed."

AI starts working — creating files, editing code, running commands.

**Terminal approval (Cline):**
```
Cline wants to run: npm install bcrypt jsonwebtoken
[Approve] [Reject] [Edit]
```

Quick approval for standard stuff (install, test). Careful review for anything destructive (rm, database operations, git operations).

**Claude Code:** Review the proposed changes in your terminal. You can stop it at any point.

---

## Completion and Scoring

When AI finishes, it should provide:

```markdown
## Confidence: 8/10

**Done:**
- Login endpoint working
- Register endpoint working
- JWT tokens generating correctly
- Tests passing (8/8)
- Smoke tested in browser

**Deferred:**
- Rate limiting (Sprint 2 per roadmap)
- Refresh tokens (V2)

**Notes:**
- Used 24h token expiry as discussed
- Added entry to LEARNINGS about bcrypt cost factor
```

**Your job:**
1. Run the app, test manually
2. Check confidence score makes sense
3. Below 8/10? Fix before moving on
4. Close conversation, move to next task

---

## Visual Debugging

When testing locally, you don't always need to describe problems in words. Cline supports visual input that can dramatically speed up debugging.

**Screenshots:** Use the `+` icon on the Cline chat bar to attach a screenshot when something looks wrong in the browser. A picture of a broken layout, a misaligned element, or an unexpected error page communicates the problem faster and more accurately than trying to describe it in non-developer language. This is especially useful for CSS issues, responsive layout problems, and visual regressions.

**JavaScript console output:** Get comfortable with the browser's developer tools (F12 or right-click → Inspect → Console tab). When the frontend misbehaves, the console often shows the actual error — a failed API call, a null reference, a missing module. Copy-paste the console output directly into the Cline chat. This gives Cline the exact error message, stack trace, and context it needs to diagnose the problem without guessing.

**The combination is powerful:** Screenshot of what's wrong + console output of the error = Cline can usually diagnose and fix the issue in one conversation turn instead of three.

---

## When Things Go Wrong

**AI seems confused:** Your docs might be incomplete or contradictory. Check them.

**AI does something unexpected:** Stop execution, go back to plan mode, discuss.

**Confidence below 8:** Don't move on. Ask what's missing and fix it.

**Task taking way too long:** Probably too big. Split into subtasks.

**Going in circles on a bug:** Stop. Write a task doc capturing what's been tried and what's left. Start fresh. (See [Context Management](/part-5/context-management) for details.)

---

## The Side-Task Trap

During a task, AI (or you) notices something else that needs fixing in a different part of the app.

**Wrong approach:** "While we're here, let's fix that too."

**Right approach:** "That's important but not our current task. Write a quick task doc for it and let's stay focused."

Resist the temptation. Each conversation has limited context. Piling unrelated work into it:
- Increases token costs (paying for context you're only 20% using)
- Increases confusion (AI mixing concerns)
- Increases error risk (changes in unrelated areas without proper planning)

Write the task doc. Start a fresh conversation for it later.

---

## Quick Reference

| Phase | What Happens |
|-------|--------------|
| New conversation | Fresh context, AI reads docs |
| Plan Mode | AI proposes approach, you review |
| Execution | AI writes code, you approve commands |
| Completion | Confidence score, verification |
| Close | Done. Next task gets new conversation |

---

**Next:** [Task Patterns](/part-3/task-patterns) — How to document completed tasks.
