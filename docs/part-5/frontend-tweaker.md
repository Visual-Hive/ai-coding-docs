---
title: The Frontend Tweaker
description: Stop invoking AI for padding changes — bake editability into your frontend from Sprint 1
---

# The Frontend Tweaker

::: warning Opinionated by design
This guide makes strong recommendations. We don't present three options and let you choose — we tell you what works and why. The conventions below are defaults for every project. Override them if you have a reason, but the burden of proof is on the override.
:::

## TLDR

After every big build, you'll want to tweak twelve small things — a font size, a button colour, a heading that's too long, a link that points to the wrong URL. Each one is a 5-second fix if you could just *edit it*, but a full AI round-trip if you have to describe it, wait for the AI to search the codebase, and pray it doesn't touch anything else.

The fix: bake editability into the frontend the same way the [control panel](/part-5/control-panel) bakes observability into the backend. Four structured convention files, one simple dev-mode panel, zero AI involvement for cosmetic changes.

---

## The Pattern

Same philosophy as the control panel. Establish conventions. Make the AI maintain them via `.clinerules`. Build a simple tool that reads the conventions.

The backend version gives you visibility into automations and deployment. The frontend version gives you direct control over styles, text, links, and SEO — the four things people tweak constantly after a build.

| Layer | Convention file | Tweaker control | What it covers |
|-------|----------------|-----------------|----------------|
| Styles | CSS custom properties + `@tweak` annotations | Sliders, colour pickers | Spacing, sizes, colours, borders, shadows |
| Text | i18n JSON locale files | Text inputs, textareas | Every visible string in the app |
| Links | `links.json` | URL inputs | Social links, CTAs, footer links, external hrefs |
| SEO | `meta.json` | Text inputs + char counts | Page titles, meta descriptions, OG content |

---

## Styles: CSS Custom Properties with @tweak Annotations

Instead of hardcoding values in component CSS, the AI coder extracts every tweakable property into a named CSS custom property with a structured comment.

```css
:root {
  /* @tweak Hero title size | range: 1rem, 4rem */
  --hero-title-font-size: 2.5rem;
  /* @tweak Hero title colour | type: color */
  --hero-title-color: #1a1a2e;
  /* @tweak Primary button hover background | type: color | state: hover */
  --btn-primary-hover-bg: #e6e82b;
  /* @tweak Card padding mobile | range: 0.5rem, 3rem | breakpoint: 768px */
  --card-padding-mobile: 1rem;
}
```

The component references these variables: `font-size: var(--hero-title-font-size)`. The tweaker panel scans for `@tweak` comments, parses the metadata, and renders the right control — a slider for ranges, a colour picker for colours, grouped by component and state.

Changes apply live via `document.documentElement.style.setProperty()`. Hit save, the values write back to the CSS file. No AI loop, no risk of side effects, no searching the codebase.

**Brand colours cascade.** Structure tokens hierarchically — brand → semantic → component. Change `--brand-primary` in the tweaker, everything referencing it updates. Dark mode is a second set of the same variables under `.dark {}`.

---

## Text: i18n as a Universal Text Management Layer

This is the move most people miss. i18next (or any i18n library) isn't just for translation — it's a text management architecture. Every visible string in the app lives in structured JSON:

```json
{
  "hero": {
    "title": "Welcome to OpsNest",
    "subtitle": "Your operations dashboard",
    "cta_button": "Get Started Free"
  },
  "nav": {
    "home": "Home",
    "dashboard": "Dashboard",
    "settings": "Settings"
  }
}
```

Components use `{t('hero.title')}` instead of hardcoded strings. The tweaker reads the JSON, renders text inputs for every key, writes updated values back. Change a button label, a heading, a menu item — all without touching component code.

**Even monolingual apps use i18n.** The overhead argument doesn't hold when AI writes the code. One `.clinerules` rule and the AI wraps every string automatically. You get centralised text management for free, and if you ever need translations, the architecture is already there.

**Interpolation stays safe.** Keys with variables like `"Welcome back, {{name}}"` render in the tweaker with `{{name}}` as a protected pill — you can edit the surrounding text but not accidentally delete the placeholder.

---

## Links: Centralised URL Management

Social media URLs, CTA destinations, footer links, "book a call" URLs, terms of service paths — these aren't text content (i18n doesn't catch them) and they're not styles. They live in `links.json`:

```json
{
  "social": {
    "twitter": "https://twitter.com/visualhive",
    "linkedin": "https://linkedin.com/company/visualhive"
  },
  "cta": {
    "primary": "https://calendly.com/visualhive/consult",
    "secondary": "/pricing"
  },
  "footer": {
    "terms": "/legal/terms",
    "privacy": "/legal/privacy"
  }
}
```

Components import from this file. The tweaker renders URL input fields. When you change your Calendly link or add a new social profile, it's one edit in one file.

---

## SEO: Per-Page Meta Configuration

Page titles, meta descriptions, and OG image paths are invisible on the page but obsessively tweaked after launch. They don't belong in the i18n layer because they're not rendered in components. `meta.json` handles them per-page:

```json
{
  "home": {
    "title": "OpsNest — Operations Dashboard for Small Teams",
    "description": "Monitor deployments, track automations, and manage data from one dashboard.",
    "og_image": "/images/og-home.png"
  },
  "pricing": {
    "title": "Pricing — OpsNest",
    "description": "Simple, transparent pricing for teams of all sizes."
  }
}
```

The tweaker renders a "SEO" tab with text inputs per page and character count indicators — meta descriptions have optimal lengths around 155 characters, and seeing the count while editing prevents the "too long, Google truncated it" cycle.

---

## The .clinerules Additions

Add these to your project rules. They're non-negotiable defaults:

1. All user-facing text MUST use i18n translation keys — no hardcoded strings in components
2. i18n keys MUST be hierarchical by page/feature (e.g. `dashboard.header.title`, not `text1`)
3. All tweakable styles (spacing, font sizes, colours, border radii, hover/disabled states) MUST use CSS custom properties with `@tweak` annotations
4. Group style tokens hierarchically: brand → semantic → component
5. All external URLs and internal navigation links MUST reference `links.json` — no hardcoded hrefs in components
6. All page meta (title, description, OG image) MUST reference `meta.json` — no hardcoded meta tags
7. When adding a new page or component, update the relevant convention files in the same task

Rule 7 is the equivalent of the control panel's "update deployment.json whenever a service changes." Without it, the convention files go stale.

---

## When to Build It

**Always.** The convention files cost nothing — they're just structured data the AI maintains. Set them up in Sprint 1 alongside your control panel.

The tweaker panel itself (the dev-mode HTML page that reads these files and renders editing controls) is a half-day task. Build it after Sprint 1 when you have enough UI to tweak. Or don't build it at all — even without the panel, the convention files make every value easy to find and change manually. The panel is convenience; the conventions are the real value.

::: tip Start with i18n
If you only adopt one convention from this chapter, make it i18n for all text. It's the highest-value, lowest-effort change, and it transforms how you maintain content across the entire app.
:::

---

**Next:** [Deployment & Platform Targets](/part-5/deployment-platforms) — Getting your app running everywhere.
