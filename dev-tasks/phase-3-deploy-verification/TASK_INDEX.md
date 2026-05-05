# Phase 3: Deploy Verification & CI/CD Hardening

**Status:** BACKLOG  
**Source:** Real-world production incident from Visual Hive vh-command-centre (2026-05-05). Code pushed, CI green, deploy "succeeded" — but old code was still running. Root cause: image tag mismatch + Docker cache lies + zero post-deploy verification. Led to a comprehensive 9-failure-mode audit and systemic fixes.

**Why this matters for the guide:** The existing deployment chapter covers platforms and the non-polling pattern, but says nothing about _verifying that code actually reached production_. This is the #1 failure mode in AI-assisted deployments — the AI says "✅ Done", Docker says "✅ Started", health checks say "✅ Healthy" — and old code is still running. Every reader using Docker + CI/CD will hit this.

---

## Tasks

| Task | Title | Files Modified | Status |
|------|-------|---------------|--------|
| T1 | Write `deploy-verification.md` chapter | `docs/part-5/deploy-verification.md` | BACKLOG |
| T2 | Update `deployment-platforms.md` with CI/CD section + cross-refs | `docs/part-5/deployment-platforms.md` | BACKLOG |
| T3 | Add Pitfall 9: "The Phantom Deploy" | `docs/part-5/pitfalls-recovery.md` | BACKLOG |
| T4 | Update template `.clinerules` + `CLAUDE.md` with deploy rules | `project-templates/.clinerules`, `project-templates/CLAUDE.md` | BACKLOG |
| T5 | Update VitePress sidebar config | `docs/.vitepress/config.ts` | BACKLOG |

---

## Task Details

### T1 — Write Deploy Verification Chapter (THE BIG ONE)

**File:** `docs/part-5/deploy-verification.md`

The core new chapter. Covers the 9 failure modes, the build-info pattern, CI/CD pre-flight checks, Docker cache lies, bind-mount gotchas, the GOTCHAS.md project artifact pattern, and AI deploy rules.

Full spec in: `TASK-T1-deploy-verification-chapter.md`

### T2 — Update Deployment Platforms Chapter

**File:** `docs/part-5/deployment-platforms.md`

Add:
- A "CI/CD Pipeline Verification" section (GHA/GitLab CI status checks before deploy)
- Cross-reference to the new deploy-verification chapter
- A note in the Docker section about `--force-recreate`
- A note in the Hetzner section about image tag strategy (`:latest` vs `:dev` vs `sha-XXXXXX`)

### T3 — Add Pitfall 9: The Phantom Deploy

**File:** `docs/part-5/pitfalls-recovery.md`

Add a new pitfall entry:
> **Pitfall 9: The Phantom Deploy** — Everything looks green but nothing changed. The AI ran the deploy, got success output, and declared done. But the old code is still running. This is the hardest failure to catch because every signal says "success."

With recovery steps pointing to the deploy-verification chapter.

### T4 — Update Templates with Deploy Rules

**Files:** `project-templates/.clinerules`, `project-templates/CLAUDE.md`

Add a "Deploy Verification Rules" section to both template files:
- Never declare "deploy done" without verification output
- Always check `git log origin/main..HEAD` before declaring ready
- Always verify CI/CD build status before deploying
- After deploy, hit `/api/build-info` (or equivalent) and confirm SHA matches
- If verification fails, say "❌ Deploy verification FAILED"

### T5 — Update VitePress Sidebar

**File:** `docs/.vitepress/config.ts`

Add `deploy-verification` to the Part 5 sidebar group, positioned after `deployment-platforms`.

---

## Learnings Source Material

All patterns in this phase come from real incidents documented in:
- `vh-command-centre/dev-docs/solo-sprints/WIP-SS-2026-05-04-chat-quality-fixes/TASK-04-PROD-DEPLOY-FIX.md`
- `vh-command-centre/docs/GOTCHAS.md` (entries G1–G37, especially G33–G37)
- `vh-command-centre/.clinerules` (Post-Deploy Verification section)

The content has been generalized to apply to any Docker + CI/CD + AI-assisted project.
