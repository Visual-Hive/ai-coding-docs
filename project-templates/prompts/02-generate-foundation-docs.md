# Prompt: Generate Foundation Documents

> **When to use:** After the brainstorming conversation has converged on a clear MVP scope. Still in the same Claude Project conversation.

## The Prompt

```
Based on everything we've discussed, I'd like you to generate the foundational documents for this project. These are the documents that will guide AI-assisted development — Cline or Claude Code will read these before every task to know exactly what to do and how to do it.

Please generate all of the following:

1. **README.md** — Project overview, vision, current phase (MVP), tech stack with rationale, setup instructions, project structure
2. **ARCHITECTURE.md** — System design, database schema with all tables/columns/types/constraints, component architecture, API design, auth flow, deployment architecture, key technical decisions
3. **LEARNINGS.md** — Empty template ready to be filled during development
4. **.clinerules** (for Cline) AND/OR **CLAUDE.md** (for Claude Code) — Iron-clad developer rules including:
   - Mandatory reading list before every task
   - Quality standards (unit tests mandatory, smoke tests after every change, browser testing for UI)
   - Development workflow rules (plan mode first, one task at a time, commit working code)
   - Architecture rules (follow existing patterns, no unauthorized dependencies, use import aliases)
   - Prohibited behaviors (no skipping tests, no scope creep, no untyped code)
   - Confidence scoring format (8/10 minimum)
   - When to ask the human
   - Tech-specific rules for our chosen stack
5. **SPRINT_RULES.md** — Rules for sizing sprints, writing tasks, handling discovered work, finishing tasks
6. **TASK_TEMPLATE.md** — Template for individual task specifications
7. **Sprint 1 Plan** — The initial sprint plan with task index, execution order, dependencies, and definition of done

Also generate any foundational code files that you know should exist from the start to avoid common mistakes — things like:
- Project config files (tsconfig, eslint, prettier, etc.)
- Database schema/migration files
- Environment variable templates (.env.example)
- Base layout or app shell components
- Auth utility stubs
- Any other boilerplate that, if not set up correctly from the start, causes painful refactoring later

For the sprint plan, break the MVP into tasks that each take 30 minutes to half a day. Each task should have clear acceptance criteria. Order them by dependency so Cline/Claude Code can just start at task 1 and work through them sequentially.
```

## Important Notes

- Review every document Claude generates. Push back on anything that doesn't feel right.
- The .clinerules / CLAUDE.md file is the most critical — this is the "quality contract" that prevents sloppy AI output
- Make sure the ARCHITECTURE.md has actual database schemas, not just descriptions. Column names, types, constraints.
- The sprint plan should be realistic. If Claude lists 20+ tasks for a 2-week sprint, push back.
