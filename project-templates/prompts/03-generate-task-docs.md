# Prompt: Generate Task Documentation

> **When to use:** After the foundation docs and sprint plan are created. Claude should generate individual task specs for each task in the sprint.

## The Prompt

```
Now I need you to generate detailed task documentation for each task in Sprint 1. Each task document should follow the TASK_TEMPLATE.md format and include:

1. **Context** — why this task exists, what value it delivers
2. **Requirements** — numbered, specific, testable
3. **Technical approach** — how to implement, which files to create/modify, which existing patterns to follow
4. **Acceptance criteria** — objective checkboxes including tests and smoke tests
5. **Notes** — edge cases, gotchas, related decisions

Generate a separate document for each task:
- TASK-[ID]-[short-name].md

The task docs should be detailed enough that Cline or Claude Code can read the task spec + the project docs (ARCHITECTURE.md, .clinerules) and start working immediately without needing to ask clarifying questions.

Reference specific file paths, function signatures, and database tables from ARCHITECTURE.md. Don't be vague — the more specific the task doc, the better the AI output will be.
```

## Tips

- Each task doc should reference ARCHITECTURE.md for schema details, not repeat them
- Include code examples for non-obvious patterns
- If a task depends on another, reference what the prior task created
- Make acceptance criteria objectively checkable — "works correctly" is not a criterion; "returns 401 for unauthenticated requests" is
- This step may take several turns depending on how many tasks are in the sprint. If you hit your daily Claude usage limit, a $5 USD top-up is typically enough to finish. It's worth it — Opus-quality task docs mean Cline executes faster and cheaper with Sonnet, often completing entire sprints with no clarifying questions.
- The goal: you should be able to say "Please execute sprint 1" to Cline in plan mode, and it reads the task docs, says "ok let's go" with no outstanding questions.
