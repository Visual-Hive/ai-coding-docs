---
title: Deployment & Platform Targets
description: Getting your app running — locally, on the web, on mobile, and on desktop
---

# Deployment & Platform Targets

## TLDR

Where your app runs shapes how you build it. For simple frontends, Netlify or Vercel offer free, painless deployment. For backends, Docker Desktop keeps your local machine clean and Hetzner gives you affordable cloud hosting. For mobile, Capacitor wraps your web app for the app stores — plan for this from the start, not after. For desktop, Tauri is the modern lightweight choice, Electron is the established heavyweight. Whatever the target, always maintain dev/prod separation and never let AI overwrite production environment variables.

---

## Local Development with Docker

Install **Docker Desktop** on your system. This gives Cline an easy way to run backend services — databases, APIs, caching layers — without installing packages directly on your machine. Every backend dependency runs in a container that can be started, stopped, and rebuilt without leaving traces on your system.

Claude and Cline should aim to use Docker for any backend work. The `.clinerules` should specify this. When starting a project with a backend, one of the first sprint tasks should be setting up `docker-compose.yml` with the required services.

Don't forget the **control panel** — even for the simplest backends, having a local interface to visualise backend processes is invaluable. See [The Project Control Panel](/part-5/control-panel) for the full pattern. The control panel is usually simpler to develop as an independent local app separate from the main project — just a GUI to interact with and understand the backend, data, automations, API calls, and deployment state.

---

## Simple Frontend Deployment: Netlify and Vercel

For a frontend app or landing page with no backend, Netlify or Vercel offer the fastest path to a live URL. Both have generous free tiers suitable for prototypes and small production apps.

Claude and Cline should guide the user through the process:

1. **Sign up** for Netlify or Vercel (whichever has the better free tier for the project's needs)
2. **Connect the GitHub repo** — both platforms can watch a repo and auto-deploy on push
3. **Configure build settings** — framework preset (SvelteKit, Next.js, etc.), build command, output directory
4. **Custom domain** (optional) — purchase or connect a domain, configure DNS with the platform's nameservers

Stick with the easiest, most non-technical-user-friendly route by default. Both platforms handle SSL, CDN, and preview deployments automatically. For most prototypes, the default `.netlify.app` or `.vercel.app` subdomain is fine to start.

---

## Production Hosting: Hetzner and Dev/Prod Separation

For real production applications with backends, Hetzner VPS or similar affordable cloud hosting is cost-effective and gives you full control. But once you're deploying to a server, **dev/prod separation becomes critical.**

**The rule:** Cline is allowed to push to the **dev** server. The user must manually promote dev to prod — either through the control panel, a GitHub merge flow, or a conscious deployment step. This prevents Cline from accidentally breaking production.

**The .env problem:** This is a real and recurring issue. Cline uses SSH to push new environment variable additions to the production server. But development and production often use separate API keys, database URLs, and configuration values. Cline has been known to overwrite the cloud `.env` with local values that were out of date and only used for testing. This can be catastrophic.

Rules to bake into `.clinerules`:

- **Never overwrite the production `.env` file directly.** When new env vars are needed in production, add them to `.env.example` with clear documentation, and notify the user to manually update the production `.env`.
- **Maintain separate `.env.development` and `.env.production` files** (or equivalent for your framework). Cline should know which environment it's targeting at all times.
- **Before any deployment action, Cline must confirm** with the user which environment is the target.

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

---

## Mobile: Capacitor, PWA, and App Store Deployment

If there's any intention of going to the mobile app store, **plan for it during brainstorming, not after.** Retrofitting mobile support is painful.

**Capacitor** is the recommended path for wrapping a web app into a native mobile shell. It works with any frontend framework (Svelte, React, Vue) and provides access to native device APIs (camera, filesystem, push notifications) through a plugin system. The key architectural decisions that Capacitor requires — like how routing works, how assets are bundled, and how native plugins are accessed — need to be baked into the project from Sprint 1.

**PWA (Progressive Web App)** is a great middle ground for testing prototypes without the pain of app store deployment. If the user isn't sure whether they need the app stores, start with PWA. It gives you home screen installation, offline capability, and push notifications on most platforms, without Apple or Google review processes.

**Fastlane** can automate the app store submission process — screenshots, metadata, code signing, uploading. For users who do need to publish to the stores, Cline should suggest and set up Fastlane as part of the deployment infrastructure.

**Framework choice matters here.** Svelte produces smaller bundle sizes and cleaner code, which translates to faster mobile performance. If the user has no framework preference and mobile is a target, Svelte with Capacitor is a strong recommendation. Make sure to include the SDKs needed for any outside service integrations (payment providers, analytics, auth services).

---

## Desktop: Electron vs Tauri

Desktop apps require a framework that bridges web technologies to native OS capabilities.

**Electron** is the established choice — VS Code, Slack, and Discord all run on it. It bundles a full Chromium browser and Node.js runtime, which means guaranteed cross-platform rendering consistency. The downsides are significant: apps start at 100-150MB, consume hundreds of MB of RAM, and each instance runs its own Chromium process.

**Tauri** is the modern alternative, built on Rust. It uses the operating system's native webview instead of bundling Chromium, producing apps that are often under 10MB with 50% less RAM usage. Tauri 2.0 went stable in late 2024 and added iOS and Android support from a single codebase. The trade-off is that you're subject to cross-platform webview differences (WebKit on macOS vs Chromium-based WebView2 on Windows), though in practice these are rarely an issue for typical apps. You don't need deep Rust expertise — most logic stays in your JavaScript frontend, and Tauri's built-in plugins cover common native features.

**For AI-coded projects specifically,** Tauri's smaller surface area is actually an advantage — fewer things to go wrong, simpler builds, and the security-by-default model (capabilities must be explicitly enabled) prevents a class of issues that Electron apps are prone to.

**Regardless of which you choose,** desktop apps can turn into a frustrating cycle of debugging, rebuilding, reinstalling, re-running, same problem, repeat. Mitigate this by:

- Building a control panel or companion logging interface from the start
- Setting up extensive console logging and error reporting
- Making rebuild/reinstall scripts that Cline can run quickly
- Keeping the build-test-debug cycle as short as possible

Discuss the desktop target during brainstorming so the architecture, build tooling, and debugging infrastructure are all planned from Sprint 1.

---

## Dependency Version Management

Claude and Cline's training data can be months out of date. When installing dependencies and frameworks, they often aren't installing the latest and most stable versions. This causes compatibility issues, deprecation warnings, and sometimes outright failures.

**The rule:** Before installing any dependency, Cline should do a web search to confirm what the latest stable and compatible versions are. This applies to frameworks, ORMs, CSS libraries, build tools — everything. Bake this into your `.clinerules`:

> "Before running any `npm install`, `pip install`, or equivalent, search the web to confirm the latest stable version of each package. Do not rely on training data for version numbers."

---

## Quick Reference

| Target | Tool | Key Consideration |
|--------|------|-------------------|
| **Static frontend** | Netlify / Vercel | Free tier, auto-deploy from GitHub |
| **Backend services** | Docker Desktop (local), Hetzner (cloud) | Always containerize, always separate dev/prod |
| **Mobile (app store)** | Capacitor + Fastlane | Plan from Sprint 1, not after |
| **Mobile (prototype)** | PWA | Quick to ship, no store review |
| **Desktop (lightweight)** | Tauri | Smaller, faster, security-first |
| **Desktop (established)** | Electron | Bigger ecosystem, guaranteed rendering |

---

**Next:** [Project Templates](/part-6/templates) — Drop-in templates for any project.
