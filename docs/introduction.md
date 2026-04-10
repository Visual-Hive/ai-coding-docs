---
title: Introduction
description: What this guide is and who it's for
---

# Introduction

## TLDR

Most AI-assisted coding fails because people skip the conversation, skip the documentation, and ask AI to build everything at once. Three weeks and $2000 later: broken code, no idea how to fix it, project abandoned.

This guide fixes that with a proven system: start with a real conversation with Claude Opus, produce iron-clad documentation, and let AI execute tasks with clear specs and quality gates.

It's not magic. It's structure that works.

---

## The Problem

You have a great idea. You prompt AI to build it. Three weeks and $2000 in tokens later, you have 50,000 lines of code that sort of works but breaks in weird ways. You can't fix the bugs. You can't hand it to another developer. Project abandoned.

This happens because:
- **No scoping conversation** — You jumped to "build me X" instead of discussing what X should be
- **No quality gates** — Broken code kept building on broken code
- **No documentation** — AI "forgot" early decisions every session
- **No structure** — Tasks were vague, sprints didn't exist, scope crept endlessly

## The Solution: A Repeatable Process

### Step 1: Brainstorm with Claude Opus in a Project

The conversation **always** starts in Claude Chat — not Cline, not Claude Code, not the API. Claude Chat gives you access to inbuilt skills (document generation, web search, artifacts) and a far more developed system prompt than the alternatives. Use **Opus** for this phase — it's significantly better than Sonnet at "big think" scoping, architecture reasoning, and documentation generation.

Create a **Claude Project** first. This gives Claude persistent context across conversations. Before starting the brainstorming conversation, add your project files: screenshots of mockups you've made or apps you want to emulate, any initial scope notes, supporting files like spreadsheets with example data or calculations, competitor analysis, pitch decks — anything that helps Claude understand what you're building and why.

Then have a real conversation. Multiple turns, not one prompt. Discuss your vision, debate V1 vs V2 scope, talk through tech stack options, get aligned on data architecture. **Challenge Claude's ideas.** The conversation should never be "here's my idea, make me the docs." Allow Claude time to reason and brainstorm, present options and proposals, and be prepared to push back on things you don't agree with or don't understand. Encourage Claude to perform web searches to verify what the latest available tech and solutions are — otherwise it may suggest outdated versions or deprecated approaches.

::: tip Artifacts, not inline previews
Tell Claude in your Project instructions or profile to **never use the inline chat HTML preview** for mockups. It should always use the artifacts system. The inline preview wastes tokens — you'll end up asking Claude to recreate the work as an artifact anyway so you can export it or share it with your team.
:::

### Step 2: Generate Foundation Documents

Once you're happy that you've debated enough with Claude — it's had at least one or more rethinks and adjustments to its proposed project plan and architecture — ask it to build out the documentation and foundation files.

**Before asking Claude to produce the docs, sync the AI Coding Docs repo.** Use the `+` icon on the chat input, select "GitHub", paste `https://github.com/Visual-Hive/ai-coding-docs`, and wait for the sync to finish (the send button will be disabled until it completes). You need to go through the Claude GitHub integration flow first if you haven't already.

Then be explicit: *"Please create the foundational files for Cline and VSCode to get the prototype built using the AI Coding Docs repo in project files."* This ensures Claude uses the templates and methodology rather than improvising its own structure. It will produce: README, Architecture (with real schemas), Learnings (empty template), `.clinerules` or `CLAUDE.md`, sprint rules, task template, and Sprint 1 plan with task index.

### Step 3: Generate Task Specs

Ask Claude to produce the individual task files that go with the sprint plan. Depending on the project's complexity, there may be a lot of task docs and Claude may need several turns to complete them all. This may push you past your daily usage limit — a $5 USD top-up will typically be enough to finish. It's worth it: Cline using the latest Sonnet will cost less money and be **10x more reliable** if Opus has already written specific, detailed task docs. The goal is to reach the point where you say to Cline "Please execute sprint 1" in plan mode, it reads the task docs, says "ok let's go" with no outstanding questions, and 10 minutes later the sprint is done with minimal errors.

### Step 4: Set Up Repo and Execute

Download the docs from Claude. Create a private or public GitHub repo. Copy the repo link, open VSCode, click "Clone Repository", paste the link and hit return. Now drag the extracted Claude docs into the VSCode file explorer.

**Expect to reorganize.** Claude often doesn't properly organize the docs into folders, so you may need to ask it what the file organization should look like, then manually create the folders and drag files into place. Also watch for a common mistake with the Cline rules file — Claude sometimes names it `clinerules.md` or `CLAUDE.md` when it should be `.clinerules` (with the dot prefix). Rename it and make sure it's in the **root** of the project, not inside a subfolder, so Cline picks it up automatically.

Point Cline at the repo and say "please start the tasks." Because the documentation is thorough and the rules are strict, the AI knows exactly what to build and how to build it.

### Step 5: Test, Feedback, Iterate

Test the build locally. Use the `+` icon on the Cline chat bar to add **screenshots** when something looks wrong — a visual is often better than trying to explain a UI problem in words. Get comfortable with the **JavaScript console** in your browser's devtools — you can copy-paste console output directly into the Cline chat to help debug frontend problems.

For new features, repeat from Step 1 with the GitHub repo synced in the Claude Project. For fixes and tweaks, use Cline or Claude Code directly — but **always plan mode first**.

### Step 6: Know When to Start Fresh

If a fix or feature starts going in circles, ask AI to write a task doc capturing progress and next steps, then start a new conversation. Fresh context beats polluted context every time.

---

## What You'll Learn

**Part I: Foundation**
- Why structure matters more than AI capability
- Choosing the right tools (Claude Projects, Cline, Claude Code)

**Part II: Pre-Development**
- The Opus brainstorming session that scopes your project
- Setting up your documentation architecture

**Part III: Execution**
- The Cline/Claude Code workflow (Plan → Act → Verify)
- Task documentation and sprint patterns
- Confidence scoring

**Part IV: Quality**
- Phase audits with fresh AI eyes
- Commenting philosophy

**Part V: Advanced**
- Context window management and the art of fresh conversations
- Common pitfalls and recovery
- Team workflows
- Deployment and platform targets (Docker, Vercel, Netlify, Hetzner, mobile, desktop)

**Part VI: Resources**
- Drop-in project templates (sync to any repo)
- Prompt library for every phase
- Real-world case study: VH Conference Toolkit

---

## Who This Is For

**Developers** — You want AI to accelerate your work without producing garbage code.

**Technical Founders** — You need to validate ideas quickly without burning your runway.

**Team Leads** — You want standards for how your team uses AI tools.

**Non-coders with technical sense** — You can read code and guide AI even if you don't write it fluently.

---

## What This Isn't

- A tutorial on using Claude or ChatGPT basics
- Magic that removes human judgment
- A way to build production apps with zero coding knowledge
- Guaranteed success (but much better odds)

---

## Prerequisites

- Basic understanding of software development
- Comfort with command line and Git
- Claude access (Pro, Team, or API) — **Opus strongly recommended for brainstorming**
- Cline extension for VS Code (primary) or Claude Code as an alternative
- Willingness to document before coding

---

## Expected Results

| Project Type | Token Cost | Output |
|--------------|------------|--------|
| Simple MVP | $150–$300 | Working proof of concept |
| Complex MVP | $300–$600 | Production-ready core |
| Large refactor | $500–$1500 | Documented, tested codebase |

These assume following the methodology. Skip steps and costs balloon.

::: tip We don't estimate timelines
AI is notoriously bad at predicting how long things take — a task that takes 30 minutes of focused Cline work gets estimated at "2-3 days." We've deliberately left timelines out of this guide. How fast you move depends on your experience, your documentation quality, and the complexity of what you're building. The methodology is designed to keep you moving efficiently, task by task.
:::

---

## Real Example: VH Conference Toolkit

The [VH Conference Toolkit](https://github.com/Visual-Hive/vh-conference-toolkit) is a suite of open-source tools for event professionals, built using this exact methodology. Its repo demonstrates what good project documentation looks like:

- Thorough architecture docs with full schemas and component hierarchy
- Strict development rules with mandatory testing and quality standards
- Sprint-based task documentation with individual task specs
- Architectural Decision Records (ADRs) for major choices
- Each tool built as an independent, well-documented module

Browse the repo to see the methodology in action.

---

## How to Read This

**If you're eager:** Jump to [Part II: Brainstorming](/part-2/brainstorming). That's where the real work starts.

**If you're skeptical:** Read [Philosophy](/part-1/philosophy) to understand why this works.

**If you just want templates:** Go to [Project Templates](/part-6/templates) — drop them into any repo.

**If you're setting up a team:** Start with Philosophy, then skip to [Team Workflows](/part-5/team-workflows).

---

<div class="vh-cta">
  <h3>Want expert guidance before you dive in?</h3>
  <p>The methodology in this guide works — but every project is different. If you'd like a second pair of eyes on your architecture, a strategy audit to identify risks early, or a team to build and ship alongside you, <a href="https://visualhive.co">Visual Hive</a> offers free consultations to help you find the right starting point.</p>
  <div class="vh-cta-actions">
    <a href="https://visualhive.co/contact/" target="_blank" class="vh-cta-btn vh-cta-btn-primary">Book a Free Consultation →</a>
    <a href="https://visualhive.co" target="_blank" class="vh-cta-btn vh-cta-btn-secondary">About Visual Hive</a>
  </div>
</div>

---

**Let's go:** [Philosophy & Approach](/part-1/philosophy)
