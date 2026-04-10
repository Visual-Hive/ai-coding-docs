---
title: Setup Guide
description: Getting your tools ready in 15 minutes
---

# Setup Guide

Everything you need to start, in 30 minutes.

---

## Required

### 1. Claude Access

Get one of:
- **Claude Pro** ($20/month) — claude.ai with Opus access and extended thinking
- **Claude API** — Pay per token, use with Cline

For this methodology, Pro is usually cheaper for moderate use. Opus is **strongly recommended** for the brainstorming and documentation phase — the quality difference is significant.

### 2. Cline Extension

1. Open VS Code
2. Extensions → Search "Cline"
3. Install "Cline - AI Assistant"
4. Open Cline panel (View → Cline)
5. Configure:
   - API Provider: Anthropic
   - API Key: [your key]
   - Model: claude-sonnet-4-20250514
   - Auto-approve commands: **Off**
   - Sub-agents: **Off** (causes more errors than it saves time for most users)
   - Checkpoints: **Off** (slows Cline down significantly, advanced feature)

### 3. Git & GitHub

If Git is not installed:
- **Mac:** `xcode-select --install`
- **Windows:** [git-scm.com](https://git-scm.com)
- **Linux:** `sudo apt install git`

Verify: `git --version`

Create a GitHub account if you don't have one. You'll need it for the Claude GitHub integration and for deployment.

### 4. Docker Desktop (for backend projects)

If your project has a backend, install [Docker Desktop](https://www.docker.com/products/docker-desktop/). This keeps backend services (databases, APIs, caching) containerized and off your local machine. Not needed for frontend-only projects.

---

## Claude Project Setup

Before writing any code:

1. Go to claude.ai and create a new **Project**
2. Add your project files: mockups, scope notes, spreadsheets, competitor screenshots, pitch decks — anything relevant
3. Set up the **Claude GitHub integration** (Settings → Integrations → GitHub) — you'll need this to sync repos
4. Optionally add project instructions: "Always use artifacts for mockups, never inline HTML preview"

---

## Project Setup

**Create your GitHub repo and clone it:**

1. Create a new repository on GitHub (public or private)
2. Copy the repo URL
3. In VSCode: Ctrl/Cmd+Shift+P → "Git: Clone" → paste URL → choose local folder

**After brainstorming with Claude and downloading the foundation docs:**

1. Drag the extracted docs into the VSCode file explorer
2. Organize into folders if Claude didn't structure them properly (ask Claude what the structure should look like)
3. Verify the `.clinerules` file: it should be named `.clinerules` (with dot prefix), NOT `clinerules.md` — and it must be in the project root, not inside a subfolder
4. Commit and push: `git add . && git commit -m "Foundation docs" && git push`

---

## First Session Checklist

Before your first task:

- [ ] Cline installed, configured, sub-agents and checkpoints **off**
- [ ] API key working (test with simple prompt)
- [ ] Claude Project created with relevant files
- [ ] GitHub integration set up in Claude
- [ ] Project docs created from brainstorming session
- [ ] `.clinerules` in project root with correct filename
- [ ] README has your MVP scope
- [ ] Sprint plan has your first tasks
- [ ] Docker Desktop installed (if backend project)

---

## Verify Setup

Open Cline and try:

```
Can you read my .clinerules and tell me what this project is about?
```

If Cline reads the rules correctly and summarizes your project, you're ready.

---

## Ongoing Maintenance

**Chat history:** After a dozen task conversations, check Cline's history panel. Delete completed conversations regularly — the history can reach 100MB+ quickly. Star any half-finished conversations before bulk-deleting so you don't lose work in progress.

**Dependencies:** When Cline installs packages, verify it's using the latest stable versions. AI training data can be months old — a quick web search confirms you're not installing outdated dependencies.

**`.gitignore` review:** Check periodically that no API keys, `.env` files, SSH keys, or credentials have slipped into the repo. Cline should be maintaining this, but verify.

---

## Quick Reference

| Tool | Purpose | Setup Time |
|------|---------|------------|
| Claude Pro | Opus access for brainstorming | 5 min |
| Claude API key | Cline access for execution | 5 min |
| Cline | VS Code AI integration | 5 min |
| Git + GitHub | Version control, deployment | 5 min |
| Docker Desktop | Backend containerization | 10 min |
| Project docs | AI context from brainstorming | 30-60 min |

Total first-time setup: ~60 minutes
Subsequent projects: ~30 minutes (just brainstorming + docs)

---

## Troubleshooting

**Cline not responding:**
- Check API key is valid
- Check model name is correct
- Try restarting VS Code

**AI not reading docs:**
- Make sure docs are in project root
- Check file names are exact (README.md not Readme.md)
- Try explicit: "Please read README.md"

**Rate limits:**
- Wait a few minutes
- Check usage at console.anthropic.com
- Consider switching to claude-sonnet for cheaper tokens

**Cline not reading `.clinerules`:**
- Verify the file is named `.clinerules` (with the dot prefix), not `clinerules.md`
- It must be in the project root, not inside a subfolder
- On some systems, files starting with `.` are hidden — use `ls -a` to verify it exists

---

<div class="vh-cta">
  <h3>Stuck on setup? We can help.</h3>
  <p>Getting the tooling right matters — it shapes everything that follows. If you'd rather walk through setup with someone who's done it dozens of times, or you want advice on choosing the right stack for your project, <a href="https://visualhive.co">Visual Hive</a> offers free consultations to get you moving in the right direction.</p>
  <div class="vh-cta-actions">
    <a href="https://visualhive.co/contact/" target="_blank" class="vh-cta-btn vh-cta-btn-primary">Book a Free Consultation →</a>
    <a href="https://visualhive.co" target="_blank" class="vh-cta-btn vh-cta-btn-secondary">About Visual Hive</a>
  </div>
</div>

---

**Ready?** Start with [The Brainstorming Session](/part-2/brainstorming).
