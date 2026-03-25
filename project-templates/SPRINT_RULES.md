# Sprint & Task Writing Rules

## Sprint Sizing

- **A sprint should contain 4-12 tasks** — fewer means the tasks are too large, more means the sprint is too ambitious
- **Each task should take 30 minutes to half a day** — if it's bigger, split it. If it's smaller, merge it with a related task.
- **A sprint should take 1-2 weeks** — longer sprints lose focus. Shorter sprints have too much overhead.
- **Maximum 3 P0 (critical) tasks per sprint** — if everything is critical, nothing is. Force prioritization.

## Task Writing Rules

### Every task MUST have:
1. **Clear context** — WHY does this task exist? What value does it deliver?
2. **Specific requirements** — numbered, testable, unambiguous
3. **Acceptance criteria** — checkboxes that define "done" objectively
4. **Dependencies listed** — what must be completed before this task can start
5. **Effort estimate** — honest estimate, not optimistic fantasy

### Every task MUST NOT:
1. Bundle unrelated work — "Add auth AND redesign the homepage" is two tasks
2. Be vague — "Improve the UI" is not a task. "Add loading states to the dashboard data tables" is.
3. Assume context — the AI (or developer) reading this task should understand it without having read every prior conversation
4. Include scope creep bait — don't write "and any other improvements you notice". Be specific.

## Task Dependencies

- **Draw the dependency graph before starting** — which tasks block which?
- **Independent tasks can run in parallel** — identify these to maximize throughput
- **Circular dependencies mean your task breakdown is wrong** — rethink the split
- **If a task has more than 2 dependencies, it might be too complex** — consider breaking it down further

## During Sprint Execution

### Starting a task
1. Read the task spec completely before starting
2. Read ARCHITECTURE.md and LEARNINGS.md
3. Use plan mode to propose an approach
4. Get approval, then execute

### Discovering new work during a task
- **Bug in current task scope?** Fix it now.
- **Bug in a different area?** Write a new task doc for it. Don't fix it inline.
- **"Nice to have" improvement?** Add to backlog. Don't do it now.
- **Architectural issue?** Stop. Discuss with the human. This may change the sprint.

### Finishing a task
1. Run all tests (unit + smoke)
2. Update task status to DONE
3. Provide confidence score (8/10 minimum)
4. Update LEARNINGS.md if you discovered anything
5. Commit with a clear message referencing the task ID
6. Move to the next task in a fresh conversation

## Sprint Retrospective

After completing a sprint:
1. Were effort estimates accurate? Adjust for next sprint.
2. What got deferred? Does it need to be in the next sprint?
3. Were there surprises? Add them to LEARNINGS.md.
4. Is ARCHITECTURE.md still accurate? Update if needed.
5. Is the overall project roadmap still on track?

## The Golden Rule

**Better to finish 6 well-tested, documented tasks than to half-finish 12.**

Quality compounds. Cutting corners on task 3 creates bugs in task 7 that take twice as long to fix. Keep the bar at 8/10 minimum and never lower it.
