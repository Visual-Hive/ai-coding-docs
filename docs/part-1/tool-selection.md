---
title: Tool Selection
description: Choosing the right AI tools for each phase of development
---

# Tool Selection

## TLDR

**Start every project in Claude** (preferably Opus) **inside a Project.** The brainstorming and document generation quality is unmatched. This is non-negotiable.

**Use Cline in VS Code** for execution. It's a surgical coding tool — you watch the reasoning, you control the flow, you learn as it works. This guide is written for the Cline workflow throughout.

**Claude Code Desktop** is an alternative for people who prefer a "sit back and let it handle things" style — but most of this guide won't apply to that workflow.

**Use Claude Projects** for ongoing context. Sync your GitHub repo so Claude always knows where the project stands.

---

## Claude Projects: Where It All Begins

Every project starts here. A Claude Project gives you:

- **Persistent file context** — upload docs, sync a repo, Claude reads them every conversation
- **Opus-quality brainstorming** — the initial conversation quality is dramatically better with Opus. The resulting foundation docs will be 10X better than any other tool or model.
- **Multi-turn discussion** — brainstorming should be several turns of back-and-forth, not one prompt and one response

**How to use it:**

1. Create a Project in Claude
2. Optionally add initial files (design mockups, API docs, reference projects)
3. Start a conversation about what you want to build
4. Have a real discussion — multiple turns, questions, push-back, refinement
5. Ask Claude to generate your foundation documents
6. Review, refine, export to your repo

**When to come back:**
- Adding new features (sync the latest GitHub repo first)
- Major scope changes
- Strategic decisions about architecture or direction

---

## Cline: The Recommended Execution Tool

Cline is a VS Code extension and the primary tool this guide is built around. Here's why.

### Why Cline

**Cline is a surgical coding tool.** It works directly on your codebase and you're in control the whole time, watching what it's doing. It has two explicit modes:

**Plan Mode:** AI reads your project, proposes an approach, asks clarifying questions.

**Act Mode:** AI executes the plan, creating/editing files and running commands.

This matches the methodology perfectly:
1. "Can we plan task 3?" → Plan Mode
2. Review the plan, adjust if needed
3. "Proceed" → Act Mode
4. Approve terminal commands as they come
5. Verify the result

**The real power is watching it work.** As you get more experienced, you'll start reading Cline's reasoning in real-time and picking up on potential mistakes — seeing it turn in circles, noticing when it's missing information, catching when it's about to go down the wrong path. You can click **Cancel** at any point without repercussions and insert your advice, clues, or corrections to help it complete the task.

Cline is cleverly navigating the fuzzy world of AI coding:
- It knows how to split things up when tasks are too large
- It knows when its context is maxed out and a new conversation would be more efficient
- It manages token usage and context intelligently
- It gives you terminal command approval so you see every action before it happens

**Why terminal approval matters:**
```
Cline wants to run: rm -rf node_modules && npm install
[Approve] [Reject] [Edit]
```

You see every command before it runs. This prevents disasters.

### Setup

1. Install "Cline" from VS Code extensions
2. Top up credits directly in Cline (the default provider) — or configure with your own Anthropic API key for more control (see [Setting Up Cline & Credits](/part-0/cline-and-credits))
3. Select the latest **Sonnet** model
4. Keep `autoApproveCommands: false` (at least initially)

### Recommended Settings for Beginners

**Disable sub-agents.** In Cline settings, turn off "sub agents." In practice this feature leads to more time wasting and errors than having Cline complete the task in the main chat, even at the expense of the context limit. Advanced users with high-end hardware can experiment with this later, but for most users and most projects, keep it off.

**Disable checkpoints.** Turn off "checkpoints" in Cline settings. This causes Cline to slow down significantly, and only an advanced user would know how to make best use of it. Keep it off until you're comfortable with the basic workflow.

**Manage your chat history.** After a dozen or so task conversations, check the conversation history (the history button at the top of the Cline panel). There's a red "Delete all history" button at the bottom that shows the total size of stored conversations — this can reach 100MB+ quickly during a project. If your `.clinerules` are set right and Cline has been documenting its work properly, deleting history is safe to do regularly to free up disk space and memory. If a conversation is only half-finished, go into the history and star it first — clicking "Delete all history" will then show a modal offering "Delete all except favourites" so you can clean out completed conversations without losing work in progress.

---

## Claude Code: The Alternatives

Claude Code comes in two very different flavours, and it's important to understand which is which.

### Claude Code Desktop (Beginner-Friendly Alternative)

Claude Code Desktop is a standalone application — you don't need VS Code or a terminal. It's designed for people who want to describe what they want and let the AI handle the rest.

**The philosophy is different from Cline.** Claude Code Desktop is much more of a "just sit back and let me handle it" tool. It doesn't reveal its coding or reasoning in the chat the way Cline does. It seems designed for people who want to go with the vibes and see what happens.

**If that's your style, that's fine.** But be aware:
- Most of this guide's methodology (watching reasoning, surgical control, plan/act workflow, catching mistakes in real-time) doesn't apply to Claude Code Desktop
- You won't build the same intuition for AI-assisted coding because you're not watching the process
- You have less control over what changes are being made and why

**Our recommendation:** If you're just getting started and want the easiest possible entry point, Claude Code Desktop works. But if you want to actually learn how AI-assisted development works — and be able to guide it, correct it, and get better results over time — Cline in VS Code is the better investment of your time.

### Claude Code CLI (Advanced Users)

The Claude Code CLI is a terminal-based tool for developers who prefer working in the command line. It's powerful and our methodology works well with it, but it requires significantly more coding and development experience to handle effectively.

```bash
$ claude "plan task 3.2 from the sprint plan"
```

**Key features for this methodology:**
- **Plan mode** — `claude --plan` or ask it to plan before acting
- **CLAUDE.md** — Claude Code reads this file automatically. Same role as `.clinerules` for Cline.
- **Project context** — reads your repo structure and docs

**When the CLI makes sense:**
- You're an experienced developer comfortable reviewing diffs in the terminal
- You want tighter Git integration
- Quick fixes and small tasks where VS Code feels heavy
- You're already a terminal-native developer

**This guide doesn't cover the CLI workflow in detail.** The principles are the same (plan before acting, one task per conversation, confidence scoring) but the interface is different. If you're experienced enough to prefer the CLI, you're experienced enough to adapt the methodology.

---

## The Tool for Each Phase

| Phase | Tool | Why |
|-------|------|-----|
| **Initial brainstorm** | Claude Chat (Opus, in a Project) | Best reasoning, persistent context |
| **Foundation docs** | Claude Chat (same conversation) | Keeps brainstorm context |
| **Task execution** | Cline in VS Code | Plan → Act → Verify cycle with full visibility |
| **Fixes & debugging** | Cline in VS Code | Plan mode first, watch the reasoning |
| **New features** | Claude Chat (Project with repo synced) | Strategic discussion first |
| **Phase audits** | Claude Chat (fresh conversation) | Fresh eyes, no dev context |
| **Quick tweaks** | Cline in VS Code | Fast, low overhead, full control |

---

## Extended Thinking: Non-Negotiable

Extended thinking is when AI reasons through a problem before responding. Without it:

**Simple prompt → shallow answer:**
> "Design a matching algorithm"
>
> AI: "Here's cosine similarity..." [generic solution]

**With extended thinking:**
> AI reasons: "1000 users, needs to be fast, budget constraints, vector DB might be overkill for MVP..."
>
> AI: "For your MVP scale, simple tag overlap will be faster and cheaper. Here's why, and here's when you'd upgrade..."

Extended thinking catches problems before they become expensive.

---

## Cost Expectations

| Task Type | Approx. Cost |
|-----------|-------------|
| Simple task (small fix, minor feature) | $1–$2 |
| Medium task (new feature, moderate complexity) | $2–$5 |
| Complex task (major feature, lots of files) | $5–$10 |
| Brainstorming session | Free — use Claude Chat with your Pro subscription |

::: tip Brainstorming is covered by your subscription
All brainstorming and document generation happens in Claude Chat (claude.ai), which is covered by your Claude Pro subscription ($20/month). You only pay per-token costs for the **execution** work in Cline. This keeps the expensive part (Opus-quality brainstorming) essentially free, and the high-volume part (task execution with Sonnet) affordable.
:::

The methodology adds some overhead (documentation, scoring, audits). It saves many times that in avoided rework.

---

## A Note on Time Estimates

::: warning Don't trust AI time predictions
AI is hilariously bad at estimating how long tasks will take. A task that takes 30 minutes of focused Cline work will routinely be estimated at "2-3 days" by the AI — which is what a traditional developer might take, but bears no resemblance to the AI-assisted workflow.

**We don't include time estimates in this guide for that reason.** When you see AI-generated project plans or task docs predicting timelines, take them with a huge grain of salt. The methodology works on a "task by task" basis — how long each one takes varies wildly based on complexity, your experience, and how good your documentation is.

**Add this to your `.clinerules` and `CLAUDE.md`:** "Do not estimate how long tasks will take. AI time predictions are wildly inaccurate." This prevents misleading estimates from cluttering your project documentation.
:::

---

## Proof It Works

This methodology built [RISE](https://github.com/The-Low-Code-Foundation/rise) — a desktop Electron app — for ~$400 in token costs. And the [VH Conference Toolkit](https://github.com/Visual-Hive/vh-conference-toolkit) — a suite of open-source event tools — using the same process with thorough sprint-based documentation.

---

**Next:** [The Brainstorming Session](/part-2/brainstorming) — The conversation that prevents expensive mistakes.
