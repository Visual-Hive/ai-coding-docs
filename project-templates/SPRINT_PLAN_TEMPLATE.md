# Sprint [N]: [Sprint Name]

**Goal:** [One sentence — what does completing this sprint achieve?]
**Duration:** [Estimated time]
**Status:** PLANNING | IN_PROGRESS | COMPLETE

## Prerequisites

- [What must be true before this sprint starts]
- [Previous sprint complete, external dependency ready, etc.]

## Task Index

| ID | Task | Priority | Est. | Status | Dependencies |
|----|------|----------|------|--------|-------------|
| [S.1] | [Task name] | P0 | [time] | BACKLOG | None |
| [S.2] | [Task name] | P0 | [time] | BACKLOG | S.1 |
| [S.3] | [Task name] | P1 | [time] | BACKLOG | S.1 |
| [S.4] | [Task name] | P1 | [time] | BACKLOG | S.2, S.3 |
| [S.5] | [Task name] | P2 | [time] | BACKLOG | None |

## Execution Order

```
S.1 (foundation — must go first)
  ├── S.2 (depends on S.1)
  ├── S.3 (depends on S.1, can parallel with S.2)
  │   └── S.4 (depends on S.2 + S.3)
  └── S.5 (independent, can run anytime)
```

## Definition of Done

- [ ] All tasks at status DONE with confidence 8/10+
- [ ] All tests passing (unit + smoke)
- [ ] ARCHITECTURE.md updated if structural changes were made
- [ ] LEARNINGS.md updated with any discoveries
- [ ] Code pushed and verified on target environment
- [ ] [Sprint-specific acceptance criterion]

## Risks / Open Questions

- [Risk or question that could affect this sprint]
- [Decision that needs to be made before or during execution]

## Task Documentation

Individual task specs are in this directory:
- `TASK-[S.1]-[name].md`
- `TASK-[S.2]-[name].md`
- etc.
