---
title: Context Management
description: The art of fresh conversations and focused work
---

# Context Management

## TLDR

AI's context window is limited. Long conversations degrade quality. The solution isn't fighting the limit — it's working with it: one task per conversation, documentation for continuity, and the discipline to start fresh when things drift.

**The single most important skill in AI-assisted development is knowing when to start a new conversation.**

---

## The Context Problem

Think of context as AI's working memory. It includes:
- Your conversation so far (every message)
- Files AI has read
- Code it's analyzing
- Documentation it's referencing

As this fills up, quality degrades. AI starts contradicting itself, forgetting patterns, and producing increasingly generic output. Worse: you're paying for all that accumulated context on every single response.

**Signs you've hit the limit:**
- AI contradicts earlier decisions
- AI re-asks questions you already answered
- AI "forgets" patterns it was following
- Responses get slower or more generic
- AI starts suggesting approaches you already rejected

---

## The Fresh Conversation Solution

Don't fight context limits. Work with them.

**One task = one conversation.**

```
Task 1: Database setup
└─ New conversation → Complete → Close

Task 2: Auth endpoints
└─ New conversation → Complete → Close

Task 3: User interface
└─ New conversation → Complete → Close
```

Each task gets AI's full attention without pollution from previous work.

**But what about continuity?**

That's what your documentation is for. AI reads ARCHITECTURE.md, .clinerules, LEARNINGS.md, and the task spec at the start of each conversation. Decisions persist in docs, not chat history.

---

## When to Start Fresh (The 9/10 Rule)

**9 times out of 10, starting a fresh conversation is the better choice** over carrying on. Here's when:

### Going in circles on a bug
If you've been debugging the same issue for 30+ minutes with no progress:
1. Ask AI to write a task doc capturing what's been tried and what remains
2. Close the conversation
3. Start fresh with the task doc as context

The new conversation approaches the problem without the weight of failed attempts. It often solves it immediately.

### Tempted to start a side task
You're working on Task 5 and notice a bug in a different part of the app:
1. Ask AI to write a quick task doc for the side issue
2. Stay focused on Task 5
3. Handle the side issue in a separate conversation later

**Don't** fix it in the current conversation. You'll be paying for Task 5's context while only 20% of it is relevant to the side fix. And if the side fix goes wrong, it pollutes your Task 5 context.

### Conversation is 2+ hours old
Even if things are going well, long conversations accumulate noise. If you've been in the same conversation for over 2 hours, consider whether it's time to close and start fresh for the remaining work.

### AI output quality is dropping
If responses feel increasingly generic, confused, or inconsistent — don't try to fix it by adding more messages. That makes it worse. Start fresh.

---

## The Context Cost Math

Every message in a conversation adds to what AI processes on the next response.

**Short conversation (10 messages):** AI reads ~20k tokens → fast, focused, cheap.

**Long conversation (80 messages):** AI reads ~150k tokens → slow, confused, expensive.

If you're on message 80 and working on a small side fix, you're paying for 150k tokens of context that's mostly irrelevant. A fresh conversation with just the docs and the side-fix description would cost ~20k tokens and produce better output.

**The math always favors fresh conversations for unrelated work.**

---

## Sizing Tasks for Context

Each task should be completable within a single focused conversation.

**Rules of thumb:**
- Task touches ≤5 files significantly
- Task takes 30 minutes to half a day
- Task has a clear "done" state
- Task doesn't require AI to hold two unrelated problems in mind

**Too big:**
> "Implement the entire authentication system"

**Right size:**
> "Create the login endpoint with validation and tests"

---

## What to Load, What to Skip

AI doesn't need your entire codebase for every task.

**Always loaded (via docs):**
- `.clinerules` / `CLAUDE.md` (rules)
- `ARCHITECTURE.md` (system design)
- `README.md` (project context)
- `LEARNINGS.md` (gotchas)
- Current task spec

**AI will find as needed:**
- Source files relevant to the task
- Dependencies and imports
- Related test files

**Don't pre-load:**
- Entire directories "just in case"
- Old task documentation
- Files unrelated to the current task

Trust AI to ask for what it needs.

---

## The Task Doc Handoff

When you need to transfer context between conversations, write a task doc:

```markdown
# Context Handoff: [Issue/Task Name]

## Original Objective
[What we were trying to accomplish]

## What Was Done
- [Change 1 — file path, what changed]
- [Change 2 — file path, what changed]

## What Remains
- [Specific thing still needed]
- [Specific thing still needed]

## What Was Tried (and didn't work)
- [Approach 1 — why it failed]
- [Approach 2 — why it failed]

## Files to Review
- `src/[path]` — [what's relevant here]
- `src/[path]` — [what's relevant here]

## Recommended Next Steps
1. [First thing the new conversation should do]
2. [Second thing]
```

This gives the new conversation everything it needs without carrying the weight of the old one.

---

## Quick Reference

| Situation | Action |
|-----------|--------|
| Starting a new task | New conversation |
| Going in circles (30+ min) | Write task doc, start fresh |
| Side issue discovered | Write task doc, handle separately |
| Conversation 2+ hours old | Consider starting fresh |
| AI quality dropping | Start fresh immediately |
| Quick follow-up to just-completed work | Continue (exception to the rule) |

**When in doubt, start fresh.** The cost of reloading context is always lower than the cost of confused AI.

---

**Next:** [Common Pitfalls](/part-5/pitfalls-recovery) — What goes wrong and how to fix it.
