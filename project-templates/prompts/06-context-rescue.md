# Prompt: Context Rescue (Fresh Start)

> **When to use:** When a conversation has gotten too long, the AI seems confused, or you've drifted from the original task. Also use when you're tempted to tackle a side issue in the current conversation.

## Signs You Need a Fresh Start

- AI keeps suggesting things you've already rejected
- AI seems confused about basic project facts
- Responses are getting slower, more generic, or contradicting earlier work
- You've been in the same conversation for 2+ hours
- You're about to start a side task unrelated to the current one
- The fix/feature is going in circles

## The "Write a Task Doc and Leave" Prompt

```
We need to stop here and capture progress. Please create a task document that includes:

1. **Original objective:** What we were trying to accomplish
2. **What was completed:** Changes made, files modified, what works
3. **What remains:** Specific things still needed to finish this task
4. **Blockers / Issues:** Any problems encountered and their current state
5. **Recommended next steps:** What a fresh conversation should do first
6. **Files to review:** Which files the next conversation should read to understand the current state

Format this as a proper task doc I can hand to a fresh conversation.
```

## Starting the Fresh Conversation

In the new conversation (or new Cline chat):

```
I'm picking up work on [task/feature name]. Here's the context document from the previous session:

[Paste or reference the task doc]

Please:
1. Read the project docs (ARCHITECTURE.md, .clinerules, LEARNINGS.md)
2. Read the files listed in the context document
3. Review what was done and what remains
4. Propose a plan to complete the remaining work
```

## The Side-Task Discipline Prompt

When you discover a side issue during a task:

```
I notice [describe the side issue]. This is important but NOT part of our current task.

Please write a quick task doc for this issue so we can address it in a separate conversation. Include:
- What the issue is
- Where it manifests (file paths)
- Suggested fix approach
- Priority level

Save it, then let's get back to our current task: [current task name].
```

## Why This Matters

Each conversation has limited context. Every message adds weight. The more unrelated work you pile into one conversation:
- The more expensive it gets (input tokens for context you're only 20% using)
- The more confused the AI gets (mixing concerns, losing track)
- The higher the chance of errors and regressions

**9 times out of 10, starting a fresh conversation is the better choice** over carrying on with a bloated one. The cost of reloading context is far less than the cost of confused AI output.
