# D4: Add Control Panel to Case Studies

**Status:** BACKLOG
**Est. effort:** 30 min
**Dependencies:** D1 (so the chapter exists to cross-reference)

---

## Context

The case studies chapter (`docs/part-6/case-studies.md`) documents real projects built with the methodology. The OpsNest control panel is a compact, well-documented case study — 9 tasks, 2 weeks, clear learnings, specific bugs caught. It should be added as a new case study section.

---

## What to Add

Add a new section to `docs/part-6/case-studies.md` after the existing case studies. Keep it concise — under 300 words (it's a case study, not a chapter).

### Section: "OpsNest Control Panel (Backend Visibility)"

**Project:** Admin control panel for a SvelteKit + Directus membership portal
**Complexity:** Medium (9 tasks, 2-week sprint)
**What it demonstrates:** The "build observability tools early" pattern from [The Project Control Panel](/part-5/control-panel) chapter

**The setup:**
- SvelteKit app deployed on Hetzner VPS, Directus CMS in Docker, n8n being replaced by SvelteKit API routes
- Admin had no way to see deployment health, data state, automation flows, or security posture
- Sprint 3 was a deliberate experiment: build the control panel, observe what the AI gets right/wrong, write the docs from real experience

**What was built (9 tasks):**
1. Tabbed control panel shell at /admin/control-panel
2. Deployment centre: deployment.json + live health checks
3. Data browser: Directus schema introspection + paginated data viewer
4. Data editing: inline cell editing + static-data JSON files
5. Automation annotations: @flow JSDoc + flowLog() utility + flow-registry.js
6. Automation visualiser: step diagram with live status overlay
7. Security runner: 8 automated checks (env vars, auth guards, cookie settings)
8. User journey testing: interactive pass/fail checklists with bug report generator
9. .clinerules update: codified all conventions as rules for future AI sessions

**What it caught immediately after deployment:**
- The deployment tab revealed Sprint 3 code was never deployed (stale build on server)
- The security runner found that the AI had used invented env var names (DIRECTUS_URL instead of VITE_DIRECTUS_URL) — looked correct, passed code review, failed at runtime

**Key metric:** 3 bugs caught by the control panel that would have gone unnoticed without it.

**The most valuable rule that emerged:** "When writing any code that references env var names, ALWAYS read .env.example first. Never invent names from conventions." This prevents a whole class of plausible AI hallucination.

**Numbers:**
| Metric | Value |
|--------|-------|
| Timeline | 2 weeks |
| Tasks | 9 |
| Token cost | ~$80 |
| Bugs caught by own monitoring | 3 |
| .clinerules rules added | 5 |

---

## Files to Modify

- `docs/part-6/case-studies.md` — add the section above

---

## Acceptance Criteria

- [ ] OpsNest control panel case study appears in the case studies page
- [ ] Under 300 words
- [ ] Cross-references the new control panel chapter
- [ ] Includes the specific bugs caught (stale deploy, hallucinated env vars)
- [ ] Includes the numbers table
- [ ] Conversational voice matching existing case studies
