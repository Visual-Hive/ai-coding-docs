---
title: .clinerules / CLAUDE.md Template Additions
description: New section to add to project-templates/.clinerules and project-templates/CLAUDE.md
---

# Template Update: Frontend Tweaker Conventions

**What to do:** Add this section to both `project-templates/.clinerules` and `project-templates/CLAUDE.md`. Place it after the "Control Panel Conventions" section, before "What NOT To Do".

---

## Section to Add

```markdown
### Frontend Tweaker Conventions (all projects with a UI)

**Text management (i18n):**
- ALL user-facing text MUST use i18n translation keys — no hardcoded strings in components
- Use i18next (or framework equivalent: svelte-i18n, vue-i18n, next-intl)
- Set up i18n in Sprint 1 during project scaffolding, even for monolingual apps
- Keys MUST be hierarchical by page/feature: `dashboard.header.title`, `auth.login.submit_button`
- Never use generic keys like `text1`, `label2`, `btn_a`
- Interpolated variables use double braces: `"greeting": "Welcome back, {{name}}"`
- Pluralisation uses i18next suffix convention: `_one`, `_other`, `_zero`
- Locale files live in `src/locales/` (or framework convention path)

**Style tokens (@tweak annotations):**
- All tweakable visual properties MUST use CSS custom properties
- Every custom property that a user might want to adjust MUST have a `@tweak` annotation comment
- Annotation format: `/* @tweak [Label] | [type: color|range] | [optional: state, breakpoint] */`
- Properties requiring annotations: font sizes, colours, spacing (padding/margin), border radii, shadows, opacity, transition durations, hover/focus/disabled state values
- Group tokens hierarchically in a `design-tokens.css` or at the top of component files:
  - Brand tokens: `--brand-primary`, `--brand-dark`, `--brand-accent`
  - Semantic tokens: `--text-primary`, `--bg-surface`, `--border-default`
  - Component tokens: `--card-padding`, `--btn-font-size`, `--hero-title-color`
- Dark mode: define overrides in `.dark {}` with matching `@tweak` annotations suffixed "(dark mode)"
- Components MUST reference variables, never raw values, for any property that's annotated

**Link management:**
- All external URLs and internal navigation hrefs MUST reference `links.json`
- No hardcoded URLs in components — import from the config file
- Structure: group by purpose (`social`, `cta`, `footer`, `legal`)
- Update `links.json` when adding or changing any link destination

**SEO and meta content:**
- All page titles, meta descriptions, and OG image paths MUST reference `meta.json`
- No hardcoded `<title>` or `<meta>` tags in page components
- Structure: one key per page/route with `title`, `description`, and optional `og_image`
- Meta descriptions should target 150-160 characters

**Convention file maintenance:**
- When adding a new page: update `meta.json`, add i18n keys for all text, add links to `links.json`
- When adding a new component: add `@tweak` annotations for all visual properties, add i18n keys for all text
- When modifying an existing component: ensure all four convention layers are updated in the same task
- NEVER leave orphaned keys in convention files after removing a component
```

---

## Where It Goes

In `project-templates/.clinerules`:

```
## Iron-Clad Developer Rules

### Quality Standards
[existing content]

### Development Workflow
[existing content]

### Control Panel Conventions (if project has a backend)
[existing content from D2 task]

### Frontend Tweaker Conventions (all projects with a UI)    ← NEW
[the section above]

### What NOT To Do
[existing content]
```

In `project-templates/CLAUDE.md`, same placement in the equivalent section.

---

## Convention Files to Create in Project Setup

The AI coder should create these files during Sprint 1 scaffolding:

### `src/locales/en.json` (i18n base locale)

```json
{
  "common": {
    "app_name": "[PROJECT_NAME]",
    "loading": "Loading...",
    "error": "Something went wrong",
    "retry": "Try again"
  },
  "nav": {
    "home": "Home"
  }
}
```

### `src/config/links.json`

```json
{
  "social": {},
  "cta": {
    "primary": "#"
  },
  "footer": {
    "terms": "/legal/terms",
    "privacy": "/legal/privacy"
  }
}
```

### `src/config/meta.json`

```json
{
  "home": {
    "title": "[PROJECT_NAME]",
    "description": "[One sentence description]",
    "og_image": "/images/og-default.png"
  }
}
```

### `src/styles/design-tokens.css`

```css
:root {
  /* ===== Brand Tokens ===== */
  /* @tweak Brand primary colour | type: color */
  --brand-primary: #3b82f6;
  /* @tweak Brand dark colour | type: color */
  --brand-dark: #1e293b;
  /* @tweak Brand accent colour | type: color */
  --brand-accent: #f59e0b;

  /* ===== Semantic Tokens ===== */
  /* @tweak Body text colour | type: color */
  --text-primary: #1e293b;
  /* @tweak Secondary text colour | type: color */
  --text-secondary: #64748b;
  /* @tweak Background surface | type: color */
  --bg-surface: #ffffff;
  /* @tweak Default border colour | type: color */
  --border-default: #e2e8f0;

  /* ===== Typography ===== */
  /* @tweak Base font size | range: 14px, 20px */
  --font-size-base: 16px;
  /* @tweak Heading font size (h1) | range: 1.5rem, 4rem */
  --font-size-h1: 2.25rem;
  /* @tweak Body line height | range: 1.2, 2.0 */
  --line-height-body: 1.6;

  /* ===== Spacing ===== */
  /* @tweak Section vertical padding | range: 1rem, 6rem */
  --section-padding-y: 3rem;
  /* @tweak Container max width | range: 960px, 1440px */
  --container-max-width: 1200px;
  /* @tweak Card padding | range: 0.5rem, 3rem */
  --card-padding: 1.5rem;
  /* @tweak Card border radius | range: 0px, 24px */
  --card-border-radius: 8px;

  /* ===== Interactive ===== */
  /* @tweak Button padding horizontal | range: 0.5rem, 3rem */
  --btn-padding-x: 1.5rem;
  /* @tweak Button border radius | range: 0px, 24px */
  --btn-border-radius: 6px;
  /* @tweak Primary button background | type: color */
  --btn-primary-bg: var(--brand-primary);
  /* @tweak Primary button hover background | type: color | state: hover */
  --btn-primary-hover-bg: #2563eb;
}

.dark {
  /* @tweak Body text colour (dark mode) | type: color */
  --text-primary: #f1f5f9;
  /* @tweak Secondary text colour (dark mode) | type: color */
  --text-secondary: #94a3b8;
  /* @tweak Background surface (dark mode) | type: color */
  --bg-surface: #0f172a;
  /* @tweak Default border colour (dark mode) | type: color */
  --border-default: #334155;
}
```

These are starter files. The AI coder extends them as components are built. The `.clinerules` rules ensure they stay maintained.
