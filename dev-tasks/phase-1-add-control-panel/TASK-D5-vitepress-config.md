# D5: Update VitePress Config + Sidebar for New Chapter

**Status:** BACKLOG
**Est. effort:** 10 min
**Dependencies:** D1 (chapter file must exist)

---

## Context

The VitePress sidebar config in `docs/.vitepress/config.ts` needs to include the new control panel chapter in Part V: Advanced Topics.

---

## What to Change

In `docs/.vitepress/config.ts`, find the Part V sidebar section and add the new entry:

```typescript
{
  text: 'Part V: Advanced Topics',
  collapsed: true,
  items: [
    { text: 'Context Management', link: '/part-5/context-management' },
    { text: 'Common Pitfalls', link: '/part-5/pitfalls-recovery' },
    { text: 'Team Workflows', link: '/part-5/team-workflows' },
    { text: 'The Project Control Panel', link: '/part-5/control-panel' },  // ← NEW
  ]
},
```

Also update COMPLETE_OUTLINE.md to reflect this chapter is now written (change status from non-existent to complete).

---

## Files to Modify

- `docs/.vitepress/config.ts` — add sidebar entry
- `COMPLETE_OUTLINE.md` — add chapter to Part V section with ✅ status

---

## Acceptance Criteria

- [ ] "The Project Control Panel" appears in the Part V sidebar
- [ ] It's the last item in Part V (after Team Workflows)
- [ ] Clicking it navigates to `/part-5/control-panel`
- [ ] The site builds without errors after the change
- [ ] COMPLETE_OUTLINE.md reflects the new chapter
