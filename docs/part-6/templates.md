---
title: Project Templates
description: Drop-in files to start any AI-assisted project
---

# Project Templates

Drop these files into any repo and AI will know how to build your project. Each template is ready to customize — fill in the brackets, adjust the rules to your stack, and go.

**Quick start:** Copy the entire `project-templates/` directory from this repo into your project root. Customize each file. Point Cline or Claude Code at it and start working.

---

## What's Included

| File | Purpose | Customize? |
|------|---------|-----------|
| **README.md** | Project overview, vision, scope, tech stack, setup | Yes — fill in your project details |
| **ARCHITECTURE.md** | System design, DB schemas, components, API, deployment | Yes — critical to get right |
| **LEARNINGS.md** | Empty log for solutions and gotchas | Minimal — just start using it |
| **.clinerules** | Quality rules for Cline (VS Code) | Yes — add tech-specific rules |
| **CLAUDE.md** | Quality rules for Claude Code (CLI) | Yes — same content as .clinerules |
| **TASK_TEMPLATE.md** | Format for individual task specifications | Light customization |
| **SPRINT_PLAN_TEMPLATE.md** | Format for sprint planning documents | Light customization |
| **SPRINT_RULES.md** | Rules for sizing sprints, writing tasks, managing scope | Review and adjust |

### Prompt Templates

| File | When to Use |
|------|------------|
| **prompts/01-initial-brainstorm.md** | Starting a new project (Claude Opus, in a Project) |
| **prompts/02-generate-foundation-docs.md** | After brainstorming — generate all docs at once |
| **prompts/03-generate-task-docs.md** | Generate individual task specs for a sprint |
| **prompts/04-new-feature-brainstorm.md** | Adding features to an existing project |
| **prompts/05-fix-and-debug.md** | Debugging workflow with the 30-minute rule |
| **prompts/06-context-rescue.md** | When to start fresh and how to hand off context |
| **prompts/07-phase-audit.md** | Code review after completing a phase |

---

## How to Use These

### For a Brand New Project

1. **Brainstorm first** — Use `prompts/01-initial-brainstorm.md` in Claude (Opus, in a Project)
2. **Generate docs** — Use `prompts/02-generate-foundation-docs.md` to have Claude fill in all templates based on your brainstorming conversation
3. **Review and adjust** — Claude generates good first drafts, but review everything. Push back on vague schemas, weak rules, oversized sprints.
4. **Generate task specs** — Use `prompts/03-generate-task-docs.md` for detailed task documents
5. **Push to GitHub** — Add all docs and any starter code to your repo
6. **Start executing** — Point Cline or Claude Code at the repo and start with Task 1

### For an Existing Project

1. Add the templates you're missing (especially ARCHITECTURE.md and .clinerules/CLAUDE.md)
2. Fill them in based on your current codebase
3. Create a sprint plan for your next batch of work
4. Start using the task-per-conversation workflow

---

## The Templates

### README.md

```markdown
# [Project Name]

[One sentence: what this does and who it's for]

## Vision

[2-3 paragraphs: full picture of what this could become]

## Current Phase: MVP

Building the minimum to validate [core concept].

**In scope:**
- [Feature 1 — why it's essential]
- [Feature 2]
- [Feature 3]

**Deferred:**
- [Feature] → v1.0 (reason)
- [Feature] → Production (reason)

**Success criteria:**
- [Measurable criteria]

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | [X] | [Why] |
| Backend | [X] | [Why] |
| Database | [X] | [Why] |
| Hosting | [X] | [Why] |

## Setup

[Install and run instructions]

## Key Documentation

| Document | Purpose |
|----------|---------|
| `ARCHITECTURE.md` | System design, DB schema |
| `.clinerules` / `CLAUDE.md` | AI development rules |
| `dev-docs/sprints/` | Sprint plans and task specs |
| `LEARNINGS.md` | Solutions and gotchas |
```

---

### ARCHITECTURE.md (Key Sections)

```markdown
# Architecture

## System Overview
[High-level diagram and description]

## Database Schema
### [table_name]
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | |
| [field] | [type] | [constraints] | [notes] |

### Relationships
[Entity relationship descriptions]

## Component Architecture
[Component hierarchy and responsibilities]

## API Design
| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| POST | /api/auth/login | Authenticate | No |

## Key Technical Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| [Decision] | [Choice] | [Why] |

## Control Panel (if applicable)
[Convention files, routes, and registered automation flows]
[See The Project Control Panel](/part-5/control-panel) for the full pattern]
```

---

### .clinerules / CLAUDE.md (Key Sections)

```markdown
## Iron-Clad Developer Rules

### Quality Standards
- Unit tests mandatory for all business logic
- Smoke test after every change
- Browser testing for UI changes
- Handle errors explicitly — no silent failures
- Comment the "why" on non-obvious decisions
- Every function gets a docstring

### Development Workflow
- Plan mode FIRST — always
- One task at a time — no side quests
- Commit working code only
- Update docs after every task

### Prohibited
- Do NOT skip tests
- Do NOT refactor outside current task scope
- Do NOT add unspecified features
- Do NOT use `any` types

### Confidence Scoring
After each task: rate 1-10, 8 minimum to proceed.

### Ask Human When
- Security decisions
- Architectural changes
- Ambiguous requirements
- Confidence below 8

### Control Panel Conventions (if project has a backend)
[Deployment monitoring, automation flow annotations, user journey testing, security checks]
[See The Project Control Panel](/part-5/control-panel) for the full rules]
```

---

## Real-World Example: VH Conference Toolkit

The [VH Conference Toolkit](https://github.com/Visual-Hive/vh-conference-toolkit) demonstrates these templates in production:

- Thorough architecture documentation with full schemas and component specifications
- Strict development rules with mandatory testing, prohibited behaviors, and tech-specific conventions
- Sprint-based task documentation with individual task specs and architectural decision records (ADRs)
- Each tool built as an independent, well-documented module following the same methodology

Browse the repo to see what thorough project documentation looks like.

---

## Tips

**Don't skip ARCHITECTURE.md.** It's the single most impactful document. AI with real schemas writes correct code on the first try. AI without them guesses and you spend hours debugging.

**Make .clinerules strict.** "Tests are mandatory" not "try to write tests." AI follows explicit rules. Vague suggestions get ignored.

**Review Claude's output.** When you use the prompts to generate these docs, Claude produces good first drafts. But review everything — push back on vague schemas, weak rules, and oversized sprints.

**Keep docs updated.** After every task, check: is ARCHITECTURE.md still accurate? Is LEARNINGS.md up to date? Stale docs cause stale output.

---

**Next:** [Prompts](/part-6/prompts) — Copy-paste prompts for every phase.
