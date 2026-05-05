# T2–T5 — Supporting Updates for Deploy Verification

**Status:** BACKLOG  
**Depends on:** T1 (the chapter must exist before cross-references work)  
**Estimated cost:** $2–$3 (single Cline conversation, mostly edits to existing files)

---

## T2 — Update Deployment Platforms Chapter

**File:** `docs/part-5/deployment-platforms.md`

### Changes Required

#### 1. Add cross-reference after the intro/TLDR

Add a callout box early in the chapter:

```markdown
::: tip Deploy Verification
This chapter covers _where_ and _how_ to deploy. For verifying that your code actually reached production (the failure mode that bites hardest), see [Deploy Verification](/part-5/deploy-verification).
:::
```

#### 2. Add "Image Tag Strategy" section in the Docker / Hetzner area

After the existing Docker content, add a new subsection:

```markdown
## Image Tag Strategy

When using a container registry (GHCR, Docker Hub, ECR), your `docker-compose.yml` references images by tag:

\`\`\`yaml
image: ghcr.io/your-org/backend:${IMAGE_TAG:-latest}
\`\`\`

The tag you choose determines what code gets deployed:

| Tag | When Updated | Use Case | Risk |
|-----|-------------|----------|------|
| `:latest` | Only on `main` branch builds | Stable release channel | If you develop on `dev`, `:latest` is always stale |
| `:dev` | Every push to `dev` branch | Active development | Safe if your CI is reliable |
| `:sha-abc1234` | Every build (immutable) | Rollbacks, pinning | Most precise — use for rollback |

**The most common mistake:** Your CI builds on `dev` but your production `.env` has `IMAGE_TAG=latest`. Every deploy pulls the months-old `:latest` image. Everything looks green. Old code runs.

**The fix:** Set your production environment to pull the tag that your CI actually pushes:

\`\`\`bash
# .env.production
IMAGE_TAG_BACKEND=dev
IMAGE_TAG_DASHBOARD=dev
\`\`\`

For rollbacks, pin a specific SHA: `IMAGE_TAG_BACKEND=sha-abc1234`.

See [Deploy Verification — The Nine Failure Modes](/part-5/deploy-verification#the-nine-failure-modes) for the complete list of ways this goes wrong.
```

#### 3. Add `--force-recreate` note in the Docker section

Find the existing Docker commands section and add:

```markdown
::: warning Always use --force-recreate for registry deploys
`docker compose up -d` may skip container recreation if Docker's local cache thinks the image hasn't changed. Always use `docker compose up -d --force-recreate <service>` when deploying from a registry. See [Deploy Verification — Docker Cache Lies](/part-5/deploy-verification#docker-cache-lies).
:::
```

#### 4. Add CI/CD verification note

In the section about GitHub Actions / CI (or create one if it doesn't exist):

```markdown
## CI/CD Pipeline Verification

Before deploying, always verify your CI pipeline actually built the image you're about to pull:

\`\`\`bash
gh run list --branch dev -L 3
\`\`\`

If the latest run failed or didn't trigger, deploying will pull a stale image. See [Deploy Verification — CI/CD Pre-Flight Checks](/part-5/deploy-verification#cicd-pre-flight-checks) for a complete pre-deploy script.
```

---

## T3 — Add Pitfall 9: The Phantom Deploy

**File:** `docs/part-5/pitfalls-recovery.md`

### Content to Add

After the existing Pitfall 8, add:

```markdown
## Pitfall 9: The Phantom Deploy

**What it looks like:** You run a deploy. The output says success. Health checks pass. The AI declares "✅ Deploy complete." But the old code is still running. This is the hardest failure to catch because _every signal says success_.

**Why it happens:** There are at least nine ways a deploy can silently fail — image tag mismatches, Docker cache lies, CI builds that never triggered, bind-mount blind spots. Each one produces "success" output. The AI sees "success" and moves on. You see "success" and trust it.

**The core problem:** Health checks verify "is the process alive?" — not "is the _right_ process alive?" A container running months-old code passes health checks perfectly.

**How to recover:**
1. **Implement the build-info pattern** — a `/api/build-info` endpoint that returns the git SHA baked into the image. See [Deploy Verification — The Build-Info Pattern](/part-5/deploy-verification#the-build-info-pattern).
2. **Add AI deploy rules** to your `.clinerules` / `CLAUDE.md` — the AI must check `/api/build-info` and compare SHAs before declaring "done." See [Deploy Verification — AI Deploy Rules](/part-5/deploy-verification#ai-deploy-rules).
3. **Use the pre-flight checklist** before every deploy. See [Deploy Verification — The Deploy Verification Checklist](/part-5/deploy-verification#the-deploy-verification-checklist).

**Prevention:**
- Never trust "container started" as proof of a successful deploy
- Always verify with a code-level check (build-info SHA, grep a known string, check a version endpoint)
- Add `--force-recreate` to every registry-pull deploy command
- Check CI build status _before_ deploying, not after

::: tip
This pitfall is uniquely dangerous in AI-assisted workflows because the AI is _designed_ to report success confidently. It sees Docker output saying "Started" and concludes the deploy worked. The AI has no way to know the container is running old code unless you give it a verification mechanism.
:::
```

---

## T4 — Update Template Files with Deploy Rules

### File 1: `project-templates/.clinerules`

Add this section (find the appropriate place — after any existing deploy-related rules, or at the end before the closing):

```markdown
## Deploy Verification — MANDATORY

### Before declaring "ready to deploy":
1. Verify push: `git log origin/[MAIN_BRANCH]..HEAD` must be empty
2. Verify CI build: `gh run list --branch [MAIN_BRANCH] -L 3` — must show green ✅ for affected service
3. If CI build hasn't triggered (paths filter didn't match), warn: "⚠ No build triggered — file not in CI build paths. Consider `workflow_dispatch` to force a build."

### After ANY production deployment:
1. Check `/api/build-info` to confirm new code is running:
   ```bash
   curl -s https://[DOMAIN]/api/build-info | jq .
   ```
2. Compare the returned `git_sha` with the commit you pushed. They must match.
3. **Never declare "deploy is done" without verification output.**
4. If verification fails (SHA mismatch, endpoint 404, or old code still running):
   ```
   ❌ Deploy verification FAILED — code not live. SHA expected: XXX, got: YYY
   ```
5. If build-info endpoint returns `git_sha: "unknown"`, the image was built before build-info was added. Tell the human to trigger a fresh CI build.

### Image tag awareness:
- Know which tag your production environment pulls (`:latest`, `:dev`, `:sha-XXXXXXX`)
- Know which tag your CI pushes on which branch
- If these don't match, the deploy will silently pull old code
- **NEVER change `.env.production` to use a tag your CI doesn't push**
```

### File 2: `project-templates/CLAUDE.md`

Add the same section, adapted for Claude Code's format. The content is identical — Claude Code reads `CLAUDE.md` the same way Cline reads `.clinerules`.

---

## T5 — Update VitePress Sidebar

**File:** `docs/.vitepress/config.ts`

### Change Required

Find the Part 5 sidebar group and add `deploy-verification` after `deployment-platforms`:

```typescript
{
  text: 'Part 5: Advanced Workflows',
  items: [
    // ... existing items ...
    { text: 'Deployment Platforms', link: '/part-5/deployment-platforms' },
    { text: 'Deploy Verification', link: '/part-5/deploy-verification' },  // ← NEW
    // ... remaining items ...
  ]
}
```

The exact position should be immediately after `deployment-platforms` since it's a natural follow-on ("here's where to deploy" → "here's how to verify it worked").

---

## Execution Notes for Cline

1. **Do T1 first** (the chapter must exist before T2/T3 cross-references work)
2. **T2–T5 can be done in any order** after T1
3. **Match the existing writing style** in each file you edit — don't impose a different voice
4. **Test all cross-reference links** after making changes — VitePress will break on dead links
5. **Run `npm run docs:dev`** after all changes to verify the site builds and renders correctly
