---
title: Deploy Verification
description: How to confirm your code actually reached production — the failure mode every AI deploy guide ignores.
---

# Deploy Verification

## TLDR

- The most dangerous deploy failure isn't a crash — it's when everything looks green but old code is still running. Health checks pass, the CI says ✅, Docker says "Started" — and your changes aren't live.
- This happens because of image tag mismatches, Docker layer cache lies, bind-mount gotchas, and the fundamental gap between "container started" and "new code is running."
- The fix is a **build-info endpoint** baked into every Docker image at build time, mandatory **CI/CD pre-flight checks** before deploying, `--force-recreate` on every container restart, and **AI deploy rules** that prevent your coding assistant from declaring "done" without verification output.
- This chapter gives you copy-paste templates for all of it. If you deploy Docker containers to production, read this before your next deploy.

---

## The Problem: Everything Looks Green But Nothing Changed

You push code to your `dev` branch. GitHub Actions builds a new Docker image and pushes it to GHCR (or Docker Hub, or ECR). You run your deploy script — or your ops dashboard does it for you. The output says:

```
✅ Pulled latest image
✅ Container recreated
✅ Health check passed
✅ Done
```

You tell your team "it's live." An hour later, someone reports the bug is still there. You SSH into the server and grep the running code — **it's the old version.**

This is the phantom deploy. Every signal said success. The CI was green. Docker said "Started." The health check returned 200. And none of your changes are running.

**Why does this happen?**

The deploy pipeline has multiple points of silent failure. Each one looks like success individually. Together they form a chain where the probability of at least one failing on any given deploy is surprisingly high — especially in AI-assisted workflows where the coding assistant confidently reports success at each step.

The AI sees Docker output saying "Started" and concludes the deploy worked. It has no way to know the container is running old code unless you give it a verification mechanism.

That's what this chapter provides.

---

## The Nine Failure Modes

These are the ways a deploy silently fails. Every one of them produces "success" output. Every one of them has bitten real projects.

### FM-1: The CI That Never Ran

**What happens:** Your CI/CD workflow has `paths:` filters. You changed a file outside the trigger paths — a config file, a deploy script, a shared utility. No build triggered. The image on the registry is from the last triggered build, potentially days old. Your deploy pulls this stale image and says "✅ Done."

**Why it's silent:** The deploy command succeeds because there IS an image to pull — it's just the old one. Docker doesn't know or care that the image doesn't contain your latest commit. Health checks pass because old code runs fine.

**The fix:** Pre-flight CI status check before every deploy. See [CI/CD Pre-Flight Checks](#cicd-pre-flight-checks).

### FM-2: The CI That Failed Silently

**What happens:** The CI build went red. Nobody checked. The `:latest` (or `:dev`) tag on the registry still points to the last _successful_ build. Deploy pulls it. "✅ Done."

**Why it's silent:** Same mechanism as FM-1 — a valid image exists on the registry, it's just not the one you think it is. The deploy pulls whatever the tag currently points to.

**The fix:** Same pre-flight check — verify the build for your latest commit is green, not just that _a_ build exists.

### FM-3: The Docker Cache Lie

**What happens:** You pull the new image. `docker compose up -d myservice` says "myservice is up-to-date" or "Running" instead of "Recreated." Docker thinks the image digest hasn't changed because of the local layer cache. The container never restarts. Old code stays in memory.

**Why it's silent:** Docker genuinely believes nothing changed. Its output says "up-to-date" — which is technically true from its perspective, just wrong from yours.

**The fix:** Always use `--force-recreate`. See [Docker Cache Lies](#docker-cache-lies).

### FM-4: The Bind-Mount Blind Spot

**What happens:** Your Docker image has the code baked in from build time. But the production `docker-compose.yml` has a bind-mount that overlays a directory from the host filesystem (e.g., `./packages/ingestion:/app/ingestion:ro`). The container runs the HOST version, not the IMAGE version. You updated the image but forgot to update the host files.

**Why it's silent:** The container starts fine. The code runs fine. It's just the wrong code. Nothing in Docker's output distinguishes "running code from the image" vs "running code from a bind-mount."

**The fix:** Rsync bind-mounted directories before restarting containers. See [Bind-Mount Gotchas](#bind-mount-gotchas).

### FM-5: The Volume That Didn't Refresh

**What happens:** Static files (widget bundles, SPA builds) live in a Docker named volume populated by an init container. The init container exited on a previous deploy. Docker reuses the exited container instead of re-running it. The volume has old files.

**Why it's silent:** The volume exists and has content. The main container starts and serves from it. Everything "works" — with stale assets.

**The fix:** `docker compose rm -f <init-container>` before `up -d`. Verify volume contents after deploy.

### FM-6: The Browser Cache

**What happens:** Perfect server-side deploy. But the browser has cached the old JavaScript bundle, HTML, or API response. The user sees the old UI.

**Why it's silent:** The server is serving the right code. The problem is between the server and the user's eyeballs. Server-side health checks all pass.

**The fix:** Content-hashed filenames for JS/CSS (Vite and Webpack do this by default). `Cache-Control: no-cache` on HTML. Short TTL on API responses. See [Cache, Staleness, and "My Changes Aren't Showing"](/part-5/deployment-platforms#cache-staleness-and-my-changes-aren-t-showing) in the Deployment Platforms chapter.

### FM-7: The Forgotten Push

**What happens:** The AI wrote code, committed locally, said "done!" — but never pushed. Or pushed to the wrong branch. No CI build triggered. Deploy pulls the old image.

**Why it's silent:** The AI's local git state looks correct. `git log` shows the commit. But `git log origin/main..HEAD` would reveal unpushed commits. Nobody checked.

**The fix:** AI deploy rules: verify `git log origin/main..HEAD` is empty before declaring ready. See [AI Deploy Rules](#ai-deploy-rules).

### FM-8: The Env File Overwrite

**What happens:** Your deploy script rsyncs config files to the server. It accidentally includes `.env.production`, overwriting the server's environment variables — which contain image tag pins, secrets, API keys. The container restarts with wrong config.

**Why it's silent:** The container starts successfully. It may even pass health checks if the health endpoint doesn't depend on the overwritten values. The failure surfaces later as mysterious API errors or wrong behaviour.

**The fix:** Explicitly exclude `.env*` files from all rsync/copy operations. Never automate env file deployment. This is already a rule in the [Deployment Platforms](/part-5/deployment-platforms) chapter — but it bears repeating because it's so easy to get wrong.

### FM-10: The Disk That Filled Up

**What happens:** The server runs out of disk space. Containers fail to start with cryptic errors (`no space left on device`), logs can't write, builds fail mid-way, databases refuse to accept new data. Everything was fine yesterday.

**Why it's silent:** Nothing in the deploy process warns you the disk is filling up. Each `docker compose pull` downloads a fresh image — typically 200–800MB — but never removes the old one. After months of regular deploys, dozens of dangling images accumulate on disk. They're invisible in `docker ps` and `docker images` only shows the tagged ones.

**The fix:**
```bash
# Check the current state
docker system df
df -h /

# Immediate cleanup
docker image prune -f         # remove dangling images
# or more aggressively:
docker system prune -f --filter "until=72h"
```

**Prevent it permanently:**
1. Add `docker image prune -f` as the last step in every deploy script
2. Set up a weekly cleanup cron: `0 3 * * 0 root docker system prune -f --filter "until=168h" >> /var/log/docker-prune.log 2>&1`
3. Check disk space pre-deploy: `df -h / | awk 'NR==2 {print $5}'` — if above 80%, clean up first

See [Docker Image Cleanup: The Silent Disk Killer](/part-5/deployment-platforms#docker-image-cleanup-the-silent-disk-killer) for the full pattern.

### FM-9: No Way to Ask "What Are You Running?"

**What happens:** After deploy, there's no programmatic way to ask the running container "what commit are you?" You'd need to SSH in and grep source files. The ops dashboard can't verify the deploy succeeded. You have no idea if the new code is live.

**Why it's silent:** It's not a failure mode per se — it's the absence of a verification mechanism. Without it, every other failure mode is invisible.

**The fix:** The build-info endpoint. See [The Build-Info Pattern](#the-build-info-pattern).

---

## The Build-Info Pattern

This is the single most important deploy verification mechanism. It takes 15 minutes to implement and saves hours of debugging.

**The idea:** Bake the git SHA and build timestamp into the Docker image at build time. Expose them via a `/api/build-info` endpoint. After every deploy, hit this endpoint and compare the SHA to what you pushed.

If they match, your code is live. If they don't, the deploy failed silently — go investigate.

### Template: Dockerfile Build Args

**Purpose:** Bake git metadata into the Docker image at build time.

**Template:**

```dockerfile
# At the top of your Dockerfile (or in the runtime stage)
ARG GIT_SHA=unknown
ARG BUILD_DATE=unknown

# Set as environment variables so the running process can read them
ENV GIT_SHA=${GIT_SHA}
ENV BUILD_DATE=${BUILD_DATE}
```

**Example (filled in):**

```dockerfile
FROM python:3.12-slim AS runtime
ARG GIT_SHA=unknown
ARG BUILD_DATE=unknown
ENV GIT_SHA=${GIT_SHA}
ENV BUILD_DATE=${BUILD_DATE}
# ... rest of your Dockerfile
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Template: Build-Info Endpoint (Python/FastAPI)

**Purpose:** Expose the baked-in build metadata via HTTP so deploy tools can verify.

**Template:**

```python
@app.get("/api/build-info")
async def build_info():
    """Build metadata baked into the Docker image at build time.
    Used to verify deploys actually propagated."""
    import os
    return {
        "git_sha": os.environ.get("GIT_SHA", "unknown"),
        "build_date": os.environ.get("BUILD_DATE", "unknown"),
        "image_tag": os.environ.get("IMAGE_TAG", "unknown"),
        "environment": os.environ.get("ENVIRONMENT", "unknown"),
    }
```

**Example (Node.js/Express):**

```javascript
app.get('/api/build-info', (req, res) => {
  res.json({
    git_sha: process.env.GIT_SHA || 'unknown',
    build_date: process.env.BUILD_DATE || 'unknown',
    image_tag: process.env.IMAGE_TAG || 'unknown',
    environment: process.env.NODE_ENV || 'unknown',
  });
});
```

### Template: GitHub Actions Build Args

**Purpose:** Pass the git SHA and build date to Docker build at CI time.

**Template:**

```yaml
- name: Build and push image
  uses: docker/build-push-action@v5
  with:
    context: ./[YOUR_SERVICE_DIR]
    push: true
    tags: ${{ steps.meta.outputs.tags }}
    build-args: |
      GIT_SHA=${{ github.sha }}
      BUILD_DATE=${{ github.event.head_commit.timestamp }}
```

**Example (filled in):**

```yaml
- name: Build and push backend image
  uses: docker/build-push-action@v5
  with:
    context: ./packages/backend
    file: ./packages/backend/Dockerfile
    push: true
    tags: ${{ steps.meta.outputs.tags }}
    build-args: |
      GIT_SHA=${{ github.sha }}
      BUILD_DATE=${{ github.event.head_commit.timestamp }}
```

### Verification After Deploy

```bash
# After any deploy, run this:
curl -s https://your-domain.com/api/build-info | jq .

# Expected:
# {
#   "git_sha": "abc1234def5678...",
#   "build_date": "2026-05-05T10:30:00Z",
#   "image_tag": "dev",
#   "environment": "production"
# }

# Compare git_sha to what you pushed:
git rev-parse HEAD
# These MUST match. If they don't, the deploy failed silently.
```

::: tip
If `git_sha` returns `"unknown"`, the image was built before you added the build-info pattern. Trigger a fresh CI build with the updated Dockerfile, then redeploy.
:::

---

## CI/CD Pre-Flight Checks

Before pulling images, verify the CI pipeline actually built them. This catches FM-1 (CI never ran) and FM-2 (CI failed silently).

**You say:**
```
Before deploying, check if the latest GitHub Actions build for the dev branch succeeded.
```

**AI responds:**
```bash
gh run list --branch dev -L 5
# Look for ✅ (success) on the most recent run for each workflow
# If the latest is ❌ (failure) or ⏳ (in progress), do NOT deploy
```

**Why this works:** The `gh` CLI queries GitHub's API directly. If the latest build failed, the `:dev` tag on GHCR points to the _previous_ successful build — deploying it gives you old code with a "success" message.

### Template: Pre-Flight Check Script

**Purpose:** Run before any production deploy to catch the most common silent failures.

**Template:**

```bash
#!/bin/bash
# pre-deploy-check.sh — run before any production deploy
set -e

echo "=== Pre-Deploy Checks ==="

# 1. Verify all changes are pushed
UNPUSHED=$(git log origin/[BRANCH]..HEAD --oneline 2>/dev/null | wc -l | tr -d ' ')
if [ "$UNPUSHED" -gt 0 ]; then
  echo "❌ $UNPUSHED unpushed commit(s). Push first."
  git log origin/[BRANCH]..HEAD --oneline
  exit 1
fi
echo "✅ All commits pushed"

# 2. Check latest CI build status (requires gh CLI)
LATEST_RUN=$(gh run list --branch [BRANCH] -L 1 --json conclusion,name,headSha -q '.[0]')
CONCLUSION=$(echo "$LATEST_RUN" | jq -r '.conclusion')
SHA=$(echo "$LATEST_RUN" | jq -r '.headSha' | cut -c1-7)

if [ "$CONCLUSION" != "success" ]; then
  echo "❌ Latest CI build: $CONCLUSION (sha-$SHA)"
  echo "   Fix the build before deploying."
  exit 1
fi
echo "✅ Latest CI build: success (sha-$SHA)"

echo "=== All pre-flight checks passed ==="
```

**Example (filled in):**

```bash
#!/bin/bash
# pre-deploy-check.sh — run before any production deploy
set -e

echo "=== Pre-Deploy Checks ==="

# 1. Verify all changes are pushed
UNPUSHED=$(git log origin/dev..HEAD --oneline 2>/dev/null | wc -l | tr -d ' ')
if [ "$UNPUSHED" -gt 0 ]; then
  echo "❌ $UNPUSHED unpushed commit(s). Push first."
  git log origin/dev..HEAD --oneline
  exit 1
fi
echo "✅ All commits pushed"

# 2. Check latest CI build status
LATEST_RUN=$(gh run list --branch dev -L 1 --json conclusion,name,headSha -q '.[0]')
CONCLUSION=$(echo "$LATEST_RUN" | jq -r '.conclusion')
SHA=$(echo "$LATEST_RUN" | jq -r '.headSha' | cut -c1-7)

if [ "$CONCLUSION" != "success" ]; then
  echo "❌ Latest CI build: $CONCLUSION (sha-$SHA)"
  echo "   Fix the build before deploying."
  exit 1
fi
echo "✅ Latest CI build: success (sha-$SHA)"

echo "=== All pre-flight checks passed ==="
```

---

## Docker Cache Lies

Docker `compose up -d` skips container recreation if it believes the image hasn't changed. This is a lie — the tag may point to a new digest, but Docker's local cache disagrees.

**The rule:** Always use `--force-recreate` when deploying from a registry.

```bash
# ❌ WRONG — may skip restart if Docker cache thinks image is same
docker compose up -d backend

# ✅ CORRECT — always restarts the container
docker compose up -d --force-recreate backend
```

**You say:**
```
Update the deploy script to always use --force-recreate when pulling from the registry.
```

**AI responds:**
```bash
# Updated deploy command:
docker compose pull backend
docker compose up -d --force-recreate backend
```

**Why this works:** `--force-recreate` bypasses Docker's digest comparison. The container is always stopped, removed, and started fresh from the pulled image. The cost is a few seconds of extra downtime — a price worth paying for certainty.

::: warning
If Docker reports "up-to-date" instead of "Recreated" after a pull, your new code is NOT running. This is the single most common source of phantom deploys. Always check the output — you should see "Recreated", not "up-to-date" or "Running".
:::

---

## Bind-Mount Gotchas

If your `docker-compose.yml` has bind-mounts that overlay directories inside the container, those directories come from the **host filesystem**, not the Docker image.

```yaml
# docker-compose.yml
services:
  backend:
    image: ghcr.io/your-org/backend:dev
    volumes:
      - ../ingestion:/app/ingestion:ro  # ← This overrides what's in the image!
```

**The trap:** You push new ingestion code → CI builds a new image with the code baked in → you pull and deploy the new image → but the container reads from the HOST mount, which still has the old code.

**The fix:** Rsync bind-mounted directories to the server BEFORE restarting containers:

```bash
# In your deploy script, BEFORE docker compose up:
rsync -az --delete packages/ingestion/ user@server:/opt/app/packages/ingestion/
```

::: tip
Audit your `docker-compose.yml` for ALL bind-mounts. For each one, ask: "Is this directory also rsynced during deploy?" If not, it's a blind spot waiting to bite you.
:::

---

## The GOTCHAS.md Pattern

Every project should have a `GOTCHAS.md` (or `docs/GOTCHAS.md`) — an **evergreen, bite-you-tomorrow list** of things that have already caused real incidents.

**Why this is different from a README or LEARNINGS file:**
- `README.md` is for onboarding. It gets stale.
- `LEARNINGS.md` is a session log. It grows forever and becomes unreadable.
- `GOTCHAS.md` is curated. Each entry follows a strict format and is there because it has **already cost real time**.

### Template: GOTCHAS.md Entry

**Purpose:** Document a production gotcha in a consistent, searchable format.

**Template:**

```markdown
### G[NUMBER] — [SHORT MEMORABLE TITLE]

**Symptom:** [What you see when this bites you — the observable problem]
**Cause:** [Why it happens — the root cause]
**Fix:** [How to fix it — concrete steps]
**Verify:** [How to confirm the fix worked — a command or check]
```

**Example (filled in):**

```markdown
### G33 — GHCR pull deploys: --force-recreate is mandatory

**Symptom:** `docker compose up -d backend` after `docker pull` reports "up to date" — old code still running.
**Cause:** Docker `up -d` skips container recreation if it thinks the image digest is unchanged. The `:dev` tag was already pulled but the local layer cache lies.
**Fix:** Always use `--force-recreate` on registry-pull deploys.
**Verify:** `docker inspect deploy-backend-1 --format '{{.Created}}'` should show a recent timestamp.
```

**AI rule for GOTCHAS.md:**

> After any session where you discover a production gotcha, append it to GOTCHAS.md using the G[N] format. Never delete entries — they're there because they already bit someone. Only humans mark entries as "resolved" or "no longer applicable."

---

## AI Deploy Rules

These rules go in your `.clinerules` (Cline) or `CLAUDE.md` (Claude Code) file. They prevent your AI coding assistant from declaring "deploy done" without evidence.

Without these rules, here's what happens: the AI runs the deploy command, sees Docker output that says "Started," and declares "✅ Deploy complete!" It's not lying — it genuinely believes the deploy worked because every signal it can see says success. But it has no mechanism to verify that the _right_ code is running. These rules give it that mechanism.

### Template: Deploy Verification Rules

**Purpose:** Add to your project's `.clinerules` or `CLAUDE.md` to prevent phantom deploys.

**Template:**

```markdown
## Deploy Verification — MANDATORY

### Before declaring "ready to deploy":
1. Verify push: `git log origin/[BRANCH]..HEAD` must be empty
2. Verify CI build: `gh run list --branch [BRANCH] -L 3` — must show green ✅
3. If CI build hasn't triggered (paths filter), warn: "⚠ No build triggered — file not in CI paths. Consider manual trigger."

### After ANY production deployment:
1. Check `/api/build-info` to confirm new code is running:
   ```bash
   curl -s https://[YOUR_DOMAIN]/api/build-info | jq .
   ```
2. Compare `git_sha` with the commit you pushed. They must match.
3. **Never declare "deploy is done" without verification output.**
4. If verification fails:
   ```
   ❌ Deploy verification FAILED — code not live. SHA expected: XXX, got: YYY
   ```
```

**Example (filled in):**

```markdown
## Deploy Verification — MANDATORY

### Before declaring "ready to deploy":
1. Verify push: `git log origin/dev..HEAD` must be empty
2. Verify CI build: `gh run list --branch dev -L 3` — must show green ✅
3. If CI build hasn't triggered, warn: "⚠ No build triggered — file not in CI paths."

### After ANY production deployment:
1. Check `/api/build-info`:
   ```bash
   curl -s https://myapp.example.com/api/build-info | jq .
   ```
2. Compare `git_sha` with `git rev-parse HEAD`. Must match.
3. Never declare "deploy is done" without showing the verification output.
4. If they don't match: "❌ Deploy verification FAILED — code not live."
```

See [Project Templates](/part-6/templates) for the full `.clinerules` and `CLAUDE.md` templates that include these rules.

---

## The Deploy Verification Checklist

A quick-reference checklist to use for every deploy. Print it, pin it, paste it into your deploy script output.

```
╔══════════════════════════════════════════════════════════╗
║              DEPLOY VERIFICATION CHECKLIST               ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  PRE-DEPLOY:                                             ║
║  □ All changes committed and pushed                      ║
║  □ CI/CD build is green for latest commit                ║
║  □ No unpushed commits: git log origin/X..HEAD           ║
║  □ Bind-mounted directories rsynced to server            ║
║  □ Server disk space adequate: docker system df          ║
║                                                          ║
║  DEPLOY:                                                 ║
║  □ Used --force-recreate (not bare up -d)                ║
║  □ Init containers rm -f'd before re-run                 ║
║  □ DB migrations ran successfully                        ║
║  □ Reverse proxy restarted (nginx/caddy/traefik)         ║
║                                                          ║
║  POST-DEPLOY:                                            ║
║  □ /api/build-info returns expected git_sha              ║
║  □ Health endpoint returns 200                           ║
║  □ Static assets accessible (not 404)                    ║
║  □ Quick smoke test in browser                           ║
║                                                          ║
║  IF ANY CHECK FAILS: Do NOT declare "deploy done"        ║
║  Report: "❌ Deploy verification FAILED — [which check]" ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

---

## Quick Reference

| Problem | Fix | One-Liner |
|---------|-----|-----------|
| CI didn't trigger | Check GHA paths filter | `gh run list --branch dev -L 3` |
| CI build failed | Fix build before deploying | `gh run list --branch dev -L 1 --json conclusion` |
| Docker cache lie | Force-recreate | `docker compose up -d --force-recreate backend` |
| Bind-mount stale | Rsync before restart | `rsync -az packages/X/ user@host:/opt/app/packages/X/` |
| Volume not refreshed | Remove init container first | `docker compose rm -f init-container && docker compose up -d` |
| Browser cache | Content-hash + no-cache HTML | Check nginx `Cache-Control` headers |
| Forgot to push | Check unpushed commits | `git log origin/main..HEAD --oneline` |
| Env file overwritten | Never rsync .env files | Audit deploy script for `.env*` in rsync |
| Can't verify deploy | Build-info endpoint | `curl -s https://domain/api/build-info \| jq .git_sha` |
| Disk full / no space left | Prune dangling images | `docker image prune -f` then `docker system df` |

---

## Cross-References

- [Deployment & Platform Targets](/part-5/deployment-platforms) — where and how to deploy, including the non-polling pattern and cache staleness fixes
- [The Project Control Panel](/part-5/control-panel) — the Deployment Centre should display the running build SHA from `/api/build-info`
- [Common Pitfalls](/part-5/pitfalls-recovery) — Pitfall 9 (The Phantom Deploy) covers the recovery pattern when this goes wrong
- [Token Economics](/part-5/token-economics) — why polling during deploys burns money, and the circuit breakers that prevent it

---

**Next:** [Common Pitfalls](/part-5/pitfalls-recovery) — What goes wrong and how to recover.
