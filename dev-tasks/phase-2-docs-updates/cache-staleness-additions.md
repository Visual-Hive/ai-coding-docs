# Cache & Staleness: Proposed Doc Additions

These are the specific text additions for three files: `.clinerules` template, `CLAUDE.md` template, and the deployment chapter. Each section shows exactly what to add and where.

---

## 1. `.clinerules` Template (`project-templates/.clinerules`)

**Where:** Add these rules to the end of the existing `### SvelteKit (if applicable)` section, after the existing `- Use +error.svelte boundary pages...` rule.

### New Rules to Add

```
- **Deploy command must always clean first:** The standard deploy build is `rm -rf .svelte-kit build && npm run build`. Never run `npm run build` alone on a deploy — stale `.svelte-kit` artifacts cause the new build to silently include old code.
- **Set cache headers in hooks.server.ts:** Every SvelteKit project must include a `hooks.server.ts` that sets `Cache-Control: no-cache` on all HTML/SSR responses. Without this, browsers and reverse proxies will serve stale HTML that points to old JS bundles — the #1 cause of "changes not appearing after deploy." See the cache header snippet below.
- **nginx must distinguish assets from pages:** When configuring nginx for SvelteKit, set `Cache-Control: public, max-age=31536000, immutable` for `/_app/immutable/` paths (they're content-hashed and safe to cache forever) and `Cache-Control: no-cache` for everything else. Never rely on nginx's default caching behaviour for SSR responses.
- **Use `pm2 restart`, not `pm2 reload`:** `pm2 reload` does a zero-downtime restart that can serve responses from the old process while the new one boots, causing intermittent stale responses. `pm2 restart` is a clean cut. For SvelteKit apps, a sub-second restart is less disruptive than serving stale pages.
- **Kill orphan service workers:** If the project does not intentionally use a service worker for offline/PWA functionality, include the service worker cleanup snippet in `+layout.svelte` (see below). An accidentally registered service worker will aggressively cache the app shell and override all other cache settings.
- **Add a visible build version:** Include a build timestamp or git commit hash visible in the app (footer, admin page, or console log). When "changes aren't appearing," check the version string first — if it's old, it's a cache problem. If it's current, the code change didn't take effect. This saves 30 minutes of guesswork every time.
```

### Cache Header Snippet (to include in .clinerules or a referenced doc)

```
**SvelteKit cache header pattern (hooks.server.ts):**

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);

    // Hashed assets are safe to cache forever
    if (event.url.pathname.startsWith('/_app/immutable/')) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
    // Everything else: browser must revalidate on every request
    else if (!event.url.pathname.startsWith('/api/')) {
        response.headers.set('Cache-Control', 'no-cache');
    }

    return response;
};
```

### Service Worker Cleanup Snippet

```
**Service worker cleanup (+layout.svelte onMount):**

import { onMount } from 'svelte';
import { browser } from '$app/environment';

onMount(() => {
    if (browser && 'serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(r => r.unregister());
        });
    }
});
```

### Build Version Snippet

```
**Build version stamp (vite.config.ts):**

define: {
    '__BUILD_TIME__': JSON.stringify(new Date().toISOString()),
    '__BUILD_HASH__': JSON.stringify(
        process.env.COMMIT_SHA?.slice(0, 7) || 'dev'
    )
}

Then reference in a component:
<span class="build-version">v{__BUILD_TIME__} ({__BUILD_HASH__})</span>
```

---

## 2. `CLAUDE.md` Template (`project-templates/CLAUDE.md`)

**Where:** Add these rules to the end of the existing `### SvelteKit (if applicable)` section, after the existing `- If a page throws a 500...` rule.

### New Rules to Add

```
- Deploy builds must always clean first: `rm -rf .svelte-kit build && npm run build`
- Every project needs `hooks.server.ts` with `Cache-Control: no-cache` on HTML responses and `immutable` on `/_app/immutable/` paths — this prevents stale deploys
- When setting up nginx, explicitly set cache headers: long cache for `/_app/immutable/`, no-cache for everything else
- Use `pm2 restart` not `pm2 reload` for SvelteKit deploys
- If the project doesn't use service workers intentionally, add the cleanup snippet to `+layout.svelte` onMount
- Include a visible build version (timestamp or commit hash) in the app footer or console
```

---

## 3. Deployment Chapter (`docs/part-5/deployment-platforms.md`)

**Where:** Insert this as a new section between "Production Hosting: Hetzner and Dev/Prod Separation" and "Mobile: Capacitor, PWA, and App Store Deployment."

### New Section: Cache, Staleness, and "My Changes Aren't Showing"

```markdown
---

## Cache, Staleness, and "My Changes Aren't Showing"

This is the single most common frustration with SvelteKit projects deployed to a VPS. You make a change, deploy it, visit the site — and see the old version. Hard refresh fixes it. Sometimes. Log out, log in, and it reverts. The problem gets worse when deploying to cloud servers and is almost guaranteed to surface when Cline deploys on your behalf.

The root cause is layer stacking. SvelteKit's JS and CSS assets are content-hashed by Vite — a change to your code produces a new filename like `chunk-abc123.js`, which naturally busts the cache. But the HTML document that _references_ those assets is not hashed. When any layer between your server and the browser (the browser's own cache, nginx, a CDN) serves a stale copy of the HTML, the user's browser loads old JS bundles. Everything looks fine from the server's perspective — the new build is there — but the user is looking at last week's app.

### Why It's Intermittent

It looks random but it isn't. Whether a user sees the new version depends on when their browser last cached the HTML response relative to when you deployed. Some users hit the cache, some don't. Hard refresh bypasses the browser cache and fetches fresh HTML. That's why it "fixes" the problem temporarily — until the next navigation caches a stale page again.

### Why Cloud Deploys Make It Worse

Locally, there's one layer between the Node process and the browser. On a VPS, there are at least two: nginx (or whatever reverse proxy) and the browser. If nginx isn't configured to pass through proper cache headers for SSR responses, it applies its own defaults — which usually means caching HTML. Add Cloudflare or any CDN in front and you've got three layers, each potentially serving stale content.

### The Fix: Cache Headers in hooks.server.ts

This is the single highest-impact change. In every SvelteKit project, create a `hooks.server.ts` that sets correct `Cache-Control` headers:

```ts
// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);

    // Hashed assets — safe to cache forever
    if (event.url.pathname.startsWith('/_app/immutable/')) {
        response.headers.set(
            'Cache-Control',
            'public, max-age=31536000, immutable'
        );
    }
    // HTML and SSR responses — browser must revalidate every time
    else if (!event.url.pathname.startsWith('/api/')) {
        response.headers.set('Cache-Control', 'no-cache');
    }

    return response;
};
```

`no-cache` does not mean "don't cache" — it means "cache it, but revalidate with the server before using it." This gives you the performance benefit of conditional requests (304 Not Modified) while ensuring the browser always checks for fresh HTML after a deploy.

### The Fix: nginx Configuration

When Cline sets up nginx for a SvelteKit app, the config must explicitly handle cache headers. The default nginx behaviour will cache SSR responses and cause stale deploys:

```nginx
# Inside your server block
location /_app/immutable/ {
    proxy_pass http://localhost:3000;
    add_header Cache-Control "public, max-age=31536000, immutable";
}

location / {
    proxy_pass http://localhost:3000;
    # Do NOT cache HTML responses from SSR
    add_header Cache-Control "no-cache";
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

### The Fix: Clean Build on Every Deploy

The `.clinerules` already mention `rm -rf .svelte-kit && npm run build` as a troubleshooting step, but it should be the default deploy step, not a fallback. Stale `.svelte-kit` artifacts can cause the new build to silently include old code. The standard deploy sequence should be:

```bash
rm -rf .svelte-kit build
npm run build
pm2 restart app-name    # restart, not reload
```

Use `pm2 restart` instead of `pm2 reload`. The reload command does a zero-downtime restart where the old process keeps serving requests while the new one boots. This is great for APIs, but for frontend apps it means some requests get the old HTML during the transition — exactly the intermittent staleness behaviour users report.

### The Fix: Kill Orphan Service Workers

If at any point a service worker was registered — from a PWA experiment, a library that injects one, or a Cline task that added offline support and then removed it — the service worker will aggressively cache the app shell and serve stale content regardless of what the server returns. Service workers sit _in front of_ the network, so they override your cache headers entirely.

If your project does not intentionally use service workers, add this cleanup to `+layout.svelte`:

```svelte
<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    onMount(() => {
        if (browser && 'serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                registrations.forEach(r => r.unregister());
            });
        }
    });
</script>
```

### The Fix: Visible Build Version

When someone reports "my changes aren't showing," the first question is always "is the new code actually running?" A visible build version eliminates the guesswork:

In `vite.config.ts`:
```ts
export default defineConfig({
    define: {
        '__BUILD_TIME__': JSON.stringify(new Date().toISOString()),
    }
});
```

Then display it somewhere — a footer, an admin page, or a `console.log` on app startup. When the build version is old, it's a cache or deploy problem. When it's current, the code change itself didn't work. This saves 30 minutes of guesswork every single time.

### The Checklist

Bake these into `.clinerules` for every SvelteKit project:

1. **`hooks.server.ts` with cache headers** — `no-cache` on HTML, `immutable` on `/_app/immutable/`
2. **nginx configured explicitly** — don't rely on defaults for SSR responses
3. **Clean build on every deploy** — `rm -rf .svelte-kit build && npm run build`
4. **`pm2 restart` not `pm2 reload`** — clean process switch, not zero-downtime overlap
5. **Service worker cleanup** if no intentional PWA use
6. **Visible build version** — timestamp or commit hash in the UI

If you're using Cloudflare in front, add one more: set a page rule for your domain that sets `Cache Level: Bypass` on HTML responses, or configure the cache to respect origin headers. Cloudflare's default edge caching behaviour will cache your SSR responses at the CDN layer even if your server sends correct headers, unless you explicitly tell it not to.

::: tip The Deployment Centre catches this
If you've built the [Project Control Panel](/part-5/control-panel), the Deployment Centre tab pings `/api/health` and shows the build version. A stale deploy shows up immediately as a version mismatch — no guesswork needed.
:::
```

---

## 4. Foundation Doc Generator Prompt (`project-templates/prompts/02-generate-foundation-docs.md`)

**Where:** In the list of things Claude should generate for `.clinerules` / `CLAUDE.md`, under "Tech-specific rules for our chosen stack", add:

```
   - SvelteKit cache and staleness prevention (hooks.server.ts cache headers, nginx config, clean builds, service worker cleanup, build versioning)
```

This ensures Claude includes the cache prevention rules when generating fresh project foundations, not just in the template files.

---

## Summary of Changes

| File | What Changes |
|------|-------------|
| `project-templates/.clinerules` | 6 new rules in SvelteKit section + 3 code snippets |
| `project-templates/CLAUDE.md` | 6 new rules in SvelteKit section (condensed) |
| `docs/part-5/deployment-platforms.md` | New ~800-word section with code examples and checklist |
| `project-templates/prompts/02-generate-foundation-docs.md` | One line addition to prompt template |

The goal: anyone using these docs to start a SvelteKit project gets cache prevention baked in from Sprint 1, not discovered after their third "why can't I see my changes" debugging session.
