---
title: Tool Selection
description: Choosing the right AI tools for each phase of development
---

# Tool Selection

## TLDR

**Start every project in Claude** (preferably Opus) **inside a Project.** The brainstorming and document generation quality is unmatched. This is non-negotiable.

**Use Cline or Claude Code** for execution. Both work. Cline has built-in Plan/Act modes. Claude Code has plan mode too. Pick what fits your workflow.

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

## Cline: Structured Execution

Cline is a VS Code extension with two explicit modes:

**Plan Mode:** AI reads your project, proposes an approach, asks clarifying questions.

**Act Mode:** AI executes the plan, creating/editing files and running commands.

This matches the methodology perfectly:
1. "Can we plan task 3?" → Plan Mode
2. Review the plan, adjust if needed
3. "Proceed" → Act Mode
4. Approve terminal commands as they come
5. Verify the result

**Why terminal approval matters:**
```
Cline wants to run: rm -rf node_modules && npm install
[Approve] [Reject] [Edit]
```

You see every command before it runs. This prevents disasters.

**Setup:**
1. Install "Cline" from VS Code extensions
2. Configure with your API key
3. Enable extended thinking
4. Keep `autoApproveCommands: false` (at least initially)

---

## Claude Code: Terminal-Native Execution

CLI tool for developers who prefer terminal workflows.

```bash
$ claude "plan task 3.2 from the sprint plan"
```

**Key features for this methodology:**
- **Plan mode** — `claude --plan` or ask it to plan before acting. Critical for fixes and debugging.
- **CLAUDE.md** — Claude Code reads this file automatically. Same role as `.clinerules` for Cline.
- **Project context** — reads your repo structure and docs

**When to use Claude Code vs Cline:**
- You prefer terminal over VS Code
- You want tighter Git integration
- Quick fixes and small tasks
- You're comfortable reviewing diffs instead of watching file edits

**When to use Cline instead:**
- You want visual Plan/Act mode separation
- You prefer seeing file changes in the editor
- You want explicit terminal command approval
- Larger, more complex tasks where visual feedback helps

**Both are valid.** The methodology works with either. The important thing is: **always plan before acting.**

---

## The Tool for Each Phase

| Phase | Tool | Why |
|-------|------|-----|
| **Initial brainstorm** | Claude (Opus, in a Project) | Best reasoning, persistent context |
| **Foundation docs** | Claude (same conversation) | Keeps brainstorm context |
| **Task execution** | Cline or Claude Code | Plan → Act → Verify cycle |
| **Fixes & debugging** | Cline or Claude Code | Plan mode first, always |
| **New features** | Claude (Project with repo synced) | Strategic discussion first |
| **Phase audits** | Claude (fresh conversation) | Fresh eyes, no dev context |
| **Quick tweaks** | Claude Code | Fast, low overhead |

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

| Task Type | Tokens | Approx. Cost |
|-----------|--------|-------------|
| Simple task | 5-10k | $0.05-0.15 |
| Medium task | 15-25k | $0.15-0.30 |
| Complex task | 30-50k | $0.30-0.60 |
| Brainstorm session | 50-100k | $1-3 |

**Typical MVP (25-35 tasks + brainstorming):** $200-500

The methodology adds ~20% overhead (documentation, scoring, audits). It saves 10x that in avoided rework.

---

## Proof It Works

This methodology built [RISE](https://github.com/The-Low-Code-Foundation/rise) — a desktop Electron app — in 4 weeks for ~$400. And [EventHive](https://github.com/visual-hive/eventhive) — a full community platform — using the same process with thorough sprint-based documentation.

---

**Next:** [The Brainstorming Session](/part-2/brainstorming) — The conversation that prevents expensive mistakes.
