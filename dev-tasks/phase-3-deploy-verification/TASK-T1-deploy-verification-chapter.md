# T1 — Write Deploy Verification Chapter

**Status:** BACKLOG  
**File to create:** `docs/part-5/deploy-verification.md`  
**Estimated cost:** $3–$6 (single Cline conversation with extended context)

---

## Purpose

Write a complete new chapter for Part 5 of the guide. This chapter teaches readers how to **verify that deployed code actually reached production** — the one thing every other deploy guide skips.

The chapter must follow the repo's `.clinerules` conventions: frontmatter, TLDR, real examples, copy-paste templates, `**You say:** / **AI responds:**` conversation format, and cross-references.

---

## Chapter Outline & Draft Content

Below is the full content structure. Cline should write this into `docs/part-5/deploy-verification.md`, adapting the prose to match the guide's voice (casual, direct, "you/we", real examples).

---

### Frontmatter

```yaml
---
title: Deploy Verification
description: How to confirm your code actually reached production — the failure mode every AI deploy guide ignores.
---
```

---

### # Deploy Verification

### ## TLDR

- The most dangerous deploy failure isn't a crash — it's when everything looks green but old code is still running. Health checks pass, the CI says ✅, Docker says "Started" — and your changes aren't live.
- This happens because of image tag mismatches, Docker layer cache lies, bind-mount gotchas, and the fundamental gap between "container started" and "new code is running."
- The fix is a **build-info endpoint** baked into every Docker image at build time, mandatory **CI/CD pre-flight checks** before deploying, `--force-recreate` on every container restart, and **AI deploy rules** that prevent your coding assistant from declaring "done" without verification output.
- This chapter gives you copy-paste templates for all of it. If you deploy Docker containers to production, read this before your next deploy.

---

### ## The Problem: Everything Looks Green But Nothing Changed

Write this section as a narrative — the war story pattern. Generalize from the real incident:

**The scenario (use a hypothetical "you" framing):**

You push code to your `dev` branch. GitHub Actions builds a new Docker image and pushes it to GHCR (or Docker Hub, or ECR). You click "Deploy" in your ops dashboard (or run your deploy script). The output says:

```
✅ Pulled latest image
✅ Container recreated
✅ Health check passed
✅ Done
```

You tell your team "it's live." An hour later, someone reports the bug is still there. You SSH into the server and grep the running code — **it's the old version.**

**Why this happens:**

The deploy pipeline has multiple points of silent failure. Each one looks like success. Together they form a chain where the probability of at least one failing on any given deploy is surprisingly high — especially in AI-assisted workflows where the coding assistant confidently reports success at each step.

---

### ## The Nine Failure Modes

Present these as a numbered list with consistent format. For each:
- **Name** (catchy, memorable)
- **What happens** (1–2 sentences)
- **Why it's silent** (why health checks / logs don't catch it)
- **The fix** (1–2 sentences with cross-ref to the relevant section below)

#### FM-1: The CI That Never Ran

Your CI/CD workflow has `paths:` filters. You changed a file outside the trigger paths (config, deploy scripts, shared utils). No build triggered. The image on the registry is from the last triggered build — potentially days old. Your deploy pulls this stale image and says "✅ Done."

**Fix:** Pre-flight CI status check before every deploy. See [CI/CD Pre-Flight Checks](#cicd-pre-flight-checks).

#### FM-2: The CI That Failed Silently

The CI build went red. Nobody checked. The `:latest` (or `:dev`) tag on the registry still points to the last _successful_ build. Deploy pulls it. "✅ Done."

**Fix:** Same pre-flight check — verify the build for your latest commit is green, not just that _a_ build exists.

#### FM-3: The Docker Cache Lie

You pull the new image. `docker compose up -d myservice` says "myservice is up-to-date" or "Running" instead of "Recreated." Docker thinks the image digest hasn't changed (local layer cache). The container never restarts. Old Python/Node modules stay in memory.

**Fix:** Always use `--force-recreate`. See [Docker Cache Lies](#docker-cache-lies).

#### FM-4: The Bind-Mount Blind Spot

Your Docker image has the code baked in from build time. But the production `docker-compose.yml` has a bind-mount that overlays a directory from the host filesystem (e.g., `./packages/ingestion:/app/ingestion:ro`). The container runs the HOST version, not the IMAGE version. You updated the image but forgot to update the host files.

**Fix:** Rsync bind-mounted directories before restarting containers. See [Bind-Mount Gotchas](#bind-mount-gotchas).

#### FM-5: The Volume That Didn't Refresh

Static files (widget bundles, SPA builds) live in a Docker named volume populated by an init container. The init container exited on a previous deploy. Docker reuses the exited container instead of re-running it. The volume has old files.

**Fix:** `docker compose rm -f <init-container>` before `up -d`. Verify volume contents after deploy.

#### FM-6: The Browser Cache

Perfect server-side deploy. But the browser has cached the old JavaScript bundle / HTML / API response. User sees old UI.

**Fix:** Content-hashed filenames for JS/CSS (Vite/Webpack do this by default). `Cache-Control: no-cache` on HTML. Short TTL on API responses. See [Deployment Platforms — Frontend Caching](/part-5/deployment-platforms#frontend-caching-issues).

#### FM-7: The Forgotten Push

The AI wrote code, committed locally, said "done!" — but never pushed. Or pushed to the wrong branch. No CI build. Deploy pulls the old image.

**Fix:** AI deploy rules: verify `git log origin/main..HEAD` is empty before declaring ready. See [AI Deploy Rules](#ai-deploy-rules).

#### FM-8: The Env File Overwrite

Your deploy script rsyncs config files to the server. It accidentally includes `.env.production`, overwriting the server's environment variables (which contain image tag pins, secrets, API keys). The container restarts with wrong config.

**Fix:** Explicitly exclude `.env*` files from all rsync/copy operations. Never automate env file deployment.

#### FM-9: No Way to Ask "What Are You Running?"

After deploy, there's no programmatic way to ask the running container "what commit are you?" You'd need to SSH in and grep source files. The ops dashboard can't verify the deploy succeeded. You have no idea if the new code is live.

**Fix:** The build-info endpoint. See [The Build-Info Pattern](#the-build-info-pattern).

---

### ## The Build-Info Pattern

This is the single most important deploy verification mechanism. It takes 15 minutes to implement and saves hours of debugging.

**The idea:** Bake the git SHA and build timestamp into the Docker image at build time. Expose them via a `/api/build-info` endpoint. After every deploy, hit this endpoint and compare the SHA to what you pushed.

#### Template: Dockerfile Build Args

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

#### Template: Build-Info Endpoint (Python/FastAPI)

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

#### Template: GitHub Actions Build Args

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

#### Verification After Deploy

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

### ## CI/CD Pre-Flight Checks

Before pulling images, verify the CI pipeline actually built them.

**You say:**
> "Before deploying, check if the latest GitHub Actions build for the dev branch succeeded."

**AI responds:**
```bash
gh run list --branch dev -L 5
# Look for ✅ (success) on the most recent run for each workflow
# If the latest is ❌ (failure) or ⏳ (in progress), do NOT deploy
```

**Why this works:** The `gh` CLI queries GitHub's API directly. If the latest build failed, the `:dev` tag on GHCR points to the _previous_ successful build — deploying it gives you old code with a "success" message.

#### Template: Pre-Flight Check Script

```bash
#!/bin/bash
# pre-deploy-check.sh — run before any production deploy
set -e

echo "=== Pre-Deploy Checks ==="

# 1. Verify all changes are pushed
UNPUSHED=$(git log origin/main..HEAD --oneline 2>/dev/null | wc -l | tr -d ' ')
if [ "$UNPUSHED" -gt 0 ]; then
  echo "❌ $UNPUSHED unpushed commit(s). Push first."
  git log origin/main..HEAD --oneline
  exit 1
fi
echo "✅ All commits pushed"

# 2. Check latest CI build status (requires gh CLI)
LATEST_RUN=$(gh run list --branch main -L 1 --json conclusion,name,headSha -q '.[0]')
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

### ## Docker Cache Lies

Docker `compose up -d` skips container recreation if it believes the image hasn't changed. This is a lie — the tag may point to a new digest, but Docker's local cache disagrees.

**The rule:** Always use `--force-recreate` when deploying from a registry.

```bash
# ❌ WRONG — may skip restart if Docker cache thinks image is same
docker compose up -d backend

# ✅ CORRECT — always restarts the container
docker compose up -d --force-recreate backend
```

**You say:**
> "Update the deploy script to always use --force-recreate when pulling from the registry."

**Why this works:** `--force-recreate` bypasses Docker's digest comparison. The container is always stopped, removed, and started fresh from the pulled image. The cost is ~5 seconds of extra downtime — a price worth paying for certainty.

---

### ## Bind-Mount Gotchas

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
Audit your `docker-compose.yml` for ALL bind-mounts. For each one, ask: "Is this directory also rsynced during deploy?" If not, it's a blind spot.
:::

---

### ## The GOTCHAS.md Pattern

Every project should have a `GOTCHAS.md` (or `docs/GOTCHAS.md`) — an **evergreen, bite-you-tomorrow list** of things that have already caused real incidents.

**Why this is different from a README or LEARNINGS file:**
- `README.md` is for onboarding. It gets stale.
- `LEARNINGS.md` is a session log. It grows forever and becomes unreadable.
- `GOTCHAS.md` is curated. Each entry follows a strict format and is there because it has **already cost real time**.

#### Template: GOTCHAS.md Entry

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

### ## AI Deploy Rules

These rules go in your `.clinerules` (Cline) or `CLAUDE.md` (Claude Code) file. They prevent your AI coding assistant from declaring "deploy done" without evidence.

#### Template: Deploy Verification Rules

**Purpose:** Add to your project's `.clinerules` or `CLAUDE.md`.

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

---

### ## The Deploy Verification Checklist

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

### ## Quick Reference

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

---

## Cross-References to Add

- From [Deployment Platforms](/part-5/deployment-platforms): "For verifying your deploy actually worked, see [Deploy Verification](/part-5/deploy-verification)."
- From [Project Control Panel — Deployment Centre](/part-5/control-panel): "The Deployment Centre should display the running build SHA from `/api/build-info`. See [Deploy Verification — The Build-Info Pattern](/part-5/deploy-verification#the-build-info-pattern) for implementation."
- From [Pitfalls & Recovery](/part-5/pitfalls-recovery): New Pitfall 9 entry (see T3).

---

## Writing Notes for Cline

- Match the guide's voice: casual, direct, "you/we", not academic
- Use real terminal output in code blocks — make it feel like a real deploy session
- The war story in "The Problem" section should feel universal, not specific to one project
- Every template must have both a `**Template:**` and an `**Example (filled in):**`
- Include the `::: tip` callout boxes for key insights
- Don't include time estimates per the repo's .clinerules
- Cross-reference existing chapters with relative links
