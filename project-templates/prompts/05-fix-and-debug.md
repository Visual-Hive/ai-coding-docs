# Prompt: Fix & Debug Workflow

> **When to use:** When fixing bugs or making tweaks. This can be done directly in Cline or Claude Code — you don't need to go to Claude web for small fixes. BUT you MUST use plan mode before acting.

## For Small Fixes (Cline / Claude Code)

```
I need to fix this issue: [describe the problem clearly]

Error message (if any):
[paste the error]

Steps to reproduce:
1. [step]
2. [step]
3. [expected vs actual behavior]

Please review the relevant code and propose a fix in plan mode before making changes.
```

**Critical:** Review the plan. Approve it. THEN let the AI act.

::: tip Visual debugging
Use the `+` icon on the Cline chat bar to attach a **screenshot** of what's wrong. For frontend issues, also open the browser's JavaScript console (F12 → Console tab) and **copy-paste the console output** into the chat. The combination of a screenshot + console error gives Cline enough context to usually diagnose and fix in one turn.
:::

## For Larger Debug Sessions

```
I'm dealing with a bug that I think is more complex:

[Describe the problem]
[Include error messages, logs, screenshots if relevant]

What I've already tried:
- [Attempt 1 — what happened]
- [Attempt 2 — what happened]

Please investigate systematically:
1. Read the relevant code paths
2. Identify possible root causes
3. Propose a plan to fix the most likely cause
4. Let's discuss before you make changes
```

## When Going in Circles

> **This is critical.** If a fix is taking too long and you're going round in circles, STOP. Don't keep throwing tokens at it.

```
We've been going back and forth on this issue and not making progress. Let's stop and take a different approach.

Please create a task document that captures:
1. What the original problem is
2. What we've tried so far and why it didn't work
3. What the current state of the code is (any partial changes made)
4. What the next investigation steps should be

Save this as a task doc so I can start a fresh conversation with clean context and a clear starting point.
```

Then: **Start a new conversation.** Give it the task doc. Let it approach the problem fresh without all the failed attempts polluting the context.

## The 30-Minute Rule

If a bug isn't solved in 30 minutes of AI-assisted debugging:
1. Something is wrong with the **approach**, not just the code
2. Stop. Write the task doc (above).
3. Start fresh. The new conversation will often solve it immediately because it doesn't have the weight of failed attempts confusing the context.
