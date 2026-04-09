# Docs Update: The Project Control Panel

**Goal:** Add a new chapter to the AI-Assisted SE Guide covering the Project Control Panel pattern, update existing templates with the conventions learned from OpsNest Sprint 3, and add the OpsNest control panel as a case study.

**Status:** PLANNING
**Estimated effort:** 3-4 hours across 5 tasks
**Source material:** OpsNest Sprint 3 observations (`docs/SPRINT_3_OBSERVATIONS.md`), sprint task docs, and `.clinerules` updates

---

## Context

We built a Project Control Panel for the OpsNest dashboard (Sprint 3) as a deliberate experiment: test the idea in a real project, observe what worked, then write the docs. Sprint 3 is complete and deployed. The observations are captured. Now we write it up.

The control panel has four components: Deployment Centre, Data Browser, Automation Visualiser, and Security & Testing. Each establishes conventions (config files, annotation formats, check functions) that the AI coder maintains going forward. The key insight from OpsNest: the control panel's own monitoring caught bugs that would have been invisible otherwise (stale deploys, hallucinated env var names, missing type narrowing).

---

## Task Index

| ID | Task | Est. | Dependencies |
|----|------|------|-------------|
| D1 | Write the "Project Control Panel" chapter | 1.5 hr | None |
| D2 | Update .clinerules / CLAUDE.md template with control panel conventions | 30 min | None |
| D3 | Update ARCHITECTURE.md template with control panel section | 20 min | None |
| D4 | Add control panel to the case studies chapter | 30 min | D1 |
| D5 | Update VitePress config + sidebar for the new chapter | 10 min | D1 |

---

## Where the new chapter goes

The control panel chapter fits in **Part V: Advanced Topics** alongside Context Management, Common Pitfalls, and Team Workflows. It's an advanced pattern that projects adopt after they have a working backend — not a foundation chapter.

Sidebar position: after "Team Workflows", before Appendices.

Route: `/part-5/control-panel`
File: `docs/part-5/control-panel.md`
