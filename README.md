# AI-Assisted Software Engineering Guide

A methodology for building production-ready apps with AI — systematically, not randomly.

## What This Is

A structured approach to AI-assisted development that prevents the common failure pattern: spending thousands on tokens and ending up with broken code.

**The process:**

1. **Brainstorm with Claude Opus** in a Project — real multi-turn conversation about scope, tech stack, architecture
2. **Generate foundation documents** — README, Architecture (with real schemas), iron-clad rules, sprint plans, task specs
3. **Execute in focused tasks** — one task per conversation, plan mode first, test after, confidence score
4. **Know when to start fresh** — side tasks, circular debugging, long conversations → write a task doc, new conversation
5. **Audit between phases** — fresh AI reviews code, fixes before continuing

## Quick Start

### Just Want Templates?

Copy `project-templates/` into your repo. It includes:
- README, ARCHITECTURE, LEARNINGS templates
- `.clinerules` and `CLAUDE.md` with strict quality rules
- Task template, sprint plan template, sprint rules
- Prompt templates for every phase (brainstorming, doc generation, debugging, audits)

### Want to Learn the Methodology?

1. Read the [Introduction](/docs/introduction.md)
2. Understand [the philosophy](/docs/part-1/philosophy.md)
3. Choose [your tools](/docs/part-1/tool-selection.md)
4. Have the [brainstorming session](/docs/part-2/brainstorming.md)
5. Set up your [documentation](/docs/part-2/documentation-architecture.md)
6. Start executing with the [workflow](/docs/part-3/cline-workflow.md)

## Project Structure

```
project-templates/           # Drop-in files for any project
├── README.md               # Project README template
├── ARCHITECTURE.md         # System design template
├── LEARNINGS.md            # Gotchas log template
├── .clinerules             # Cline quality rules template
├── CLAUDE.md               # Claude Code quality rules template
├── TASK_TEMPLATE.md        # Task specification format
├── SPRINT_PLAN_TEMPLATE.md # Sprint planning format
├── SPRINT_RULES.md         # Sprint sizing and task rules
└── prompts/                # Copy-paste prompts for each phase
    ├── 01-initial-brainstorm.md
    ├── 02-generate-foundation-docs.md
    ├── 03-generate-task-docs.md
    ├── 04-new-feature-brainstorm.md
    ├── 05-fix-and-debug.md
    ├── 06-context-rescue.md
    └── 07-phase-audit.md

docs/                       # The methodology guide (VitePress)
├── introduction.md
├── part-1/                 # Foundation
├── part-2/                 # Pre-Development
├── part-3/                 # Execution
├── part-4/                 # Quality
├── part-5/                 # Advanced
├── part-6/                 # Resources & templates
└── .vitepress/             # Site config
```

## Real Example

[EventHive](https://github.com/visual-hive/eventhive) was built using this methodology. Browse its repo to see thorough architecture docs, strict `.clinerules`, sprint-based task specs, and ADRs in action.

## Proof It Works

This methodology built [RISE](https://github.com/The-Low-Code-Foundation/rise) — an Electron desktop app — in 4 weeks for ~$400 in tokens. Production-ready, documented, maintainable.

## Status

Major update complete. Core methodology revised to reflect current best practices. Project templates and prompt library added.
