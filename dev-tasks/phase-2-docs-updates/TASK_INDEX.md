# Docs Update: The Frontend Tweaker

**Goal:** Add a new chapter to the AI-Assisted SE Guide covering the Frontend Tweaker pattern, update existing templates with the conventions, and update cross-references.

**Status:** COMPLETE
**Estimated effort:** 2-3 hours across 5 tasks

---

## Context

The Frontend Tweaker applies the same philosophy as the Project Control Panel — bake conventions into the codebase that simple tools can read — but for the frontend. Instead of backend observability (deployment health, automation flows), it provides frontend editability (styles, text, links, SEO).

The pattern emerged from a common pain point: after a big AI-coded build, there are always a dozen small visual and content tweaks. Each one is trivial but requires a full AI round-trip. The tweaker conventions eliminate that loop for the most common categories of change.

Four convention layers:
1. **Styles** — CSS custom properties with `@tweak` annotations
2. **Text** — i18n locale JSON files (used even for monolingual apps)
3. **Links** — `links.json` for all URLs
4. **SEO** — `meta.json` for page titles, descriptions, OG content

---

## Task Index

| ID | Task | Est. | Dependencies |
|----|------|------|-------------|
| T1 | Write the "Frontend Tweaker" chapter | 1 hr | None |
| T2 | Update .clinerules / CLAUDE.md template with tweaker conventions | 30 min | None |
| T3 | Update ARCHITECTURE.md template with convention files section | 20 min | None |
| T4 | Update VitePress config + sidebar for the new chapter | 10 min | T1 |
| T5 | Add convention file templates to project-templates/ | 30 min | T2 |

---

## Where the new chapter goes

The Frontend Tweaker chapter fits in **Part V: Advanced Topics** alongside the Project Control Panel. It's a companion pattern — the control panel handles the backend, the tweaker handles the frontend.

Sidebar position: after "The Project Control Panel", before "Common Pitfalls & Recovery".

Route: `/part-5/frontend-tweaker`
File: `docs/part-5/frontend-tweaker.md`

---

## Files included in this deliverable

1. **`frontend-tweaker.md`** — The full chapter, ready to place at `docs/part-5/frontend-tweaker.md`
2. **`clinerules-additions.md`** — The .clinerules template section + all convention file starter templates
3. **This task index** — Implementation plan for integrating into the guide

---

## Integration checklist

- [ ] Copy `frontend-tweaker.md` to `docs/part-5/frontend-tweaker.md`
- [ ] Add the Frontend Tweaker Conventions section to `project-templates/.clinerules`
- [ ] Add the Frontend Tweaker Conventions section to `project-templates/CLAUDE.md`
- [ ] Add convention starter files to `project-templates/`:
  - [ ] `src/locales/en.json`
  - [ ] `src/config/links.json`
  - [ ] `src/config/meta.json`
  - [ ] `src/styles/design-tokens.css`
- [ ] Update `docs/part-6/templates.md` — add convention files to the template library
- [ ] Update `.vitepress/config.ts` sidebar to include the new chapter
- [ ] Update the control panel chapter's convention summary table to cross-reference the tweaker
- [ ] Update `COMPLETE_OUTLINE.md` to mark this chapter as complete
- [ ] Update `docs/part-5/control-panel.md` "Next" link if needed

---

## Cross-references to add

The following existing pages should reference the new chapter:

1. **`docs/part-5/control-panel.md`** — Add a sentence in the TLDR or closing tip: "For the frontend equivalent — tweaking styles, text, links, and SEO without an AI loop — see [The Frontend Tweaker](/part-5/frontend-tweaker)."

2. **`docs/part-3/cline-workflow.md`** — In the "Visual Debugging" section, add: "For small cosmetic tweaks (font sizes, colours, spacing, button labels), the [Frontend Tweaker](/part-5/frontend-tweaker) conventions let you edit these directly without invoking Cline at all."

3. **`docs/part-2/brainstorming.md`** — Where platform targets are discussed, mention: "If the project has a UI, plan for [Frontend Tweaker conventions](/part-5/frontend-tweaker) from Sprint 1."

4. **`project-templates/.clinerules`** — The new section (detailed in `clinerules-additions.md`)
