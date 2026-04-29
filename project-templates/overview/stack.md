# Stack

> Generated from `package.json` and `deployment.json`. Do not edit by hand.

## Frameworks and runtime

| Layer | Technology | Version | Notes |
|---|---|---|---|
| [Frontend] | [e.g. SvelteKit] | [from package.json] | [purpose / key choices] |
| [Backend] | [e.g. Node + Hono] | [from package.json] | [purpose / key choices] |
| [Database] | [e.g. PostgreSQL via Drizzle] | [from package.json] | [purpose / key choices] |
| [ORM / Query layer] | [e.g. Drizzle] | [from package.json] | [purpose / key choices] |

## Key dependencies

| Package | Version | Why it's here |
|---|---|---|
| [package] | [version] | [English-language reason this is in the stack] |

## Services and hosting

| Service | Where it runs | Health endpoint | Deploy method |
|---|---|---|---|
| [App name] | [e.g. Hetzner VPS via Docker] | [/api/health] | [git pull + docker compose] |
| [Database] | [e.g. managed Postgres] | [n/a or URL] | [n/a — managed] |

## Environments

- **Development:** [URL or local]
- **Staging / dev server:** [URL]
- **Production:** [URL]

> Source-of-truth files: `package.json` (frameworks, versions), `deployment.json` (services, hosting). Update those, regenerate this file.
