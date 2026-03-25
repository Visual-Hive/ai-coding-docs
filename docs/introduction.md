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

Start a conversation with Claude — preferably Opus — inside a Claude Project. The Project gives Claude persistent context. The conversation quality will be dramatically better than any other tool or model for scoping and brainstorming. Discuss your vision, debate V1 vs V2 scope, talk through tech stack options, get aligned on data architecture.

### Step 2: Generate Foundation Documents

Ask Claude to produce the foundational docs: README, Architecture, Learnings (empty template), initial task roadmap, `.clinerules` or `CLAUDE.md` (with iron-clad quality rules including mandatory testing), task template, and sprint rules. Also have Claude generate any foundational code files it knows should exist from the start.

### Step 3: Generate Task Specs

Claude produces detailed task documentation for each task in the first sprint. Each spec is detailed enough that Cline or Claude Code can read it and start working without clarification.

### Step 4: Set Up Repo and Execute

Push the docs and starter code to GitHub. Point Cline or Claude Code at the repo and say "please start the tasks." Because the documentation is thorough and the rules are strict, the AI knows exactly what to build and how to build it.

### Step 5: Test, Feedback, Iterate

User tests the build. Feeds back. For new features, repeat from Step 1 with the GitHub repo synced in the Claude Project. For fixes and tweaks, use Cline or Claude Code directly — but **always plan mode first**.

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
- Cline extension for VS Code and/or Claude Code CLI
- Willingness to document before coding

---

## Expected Results

| Project Type | Timeline | Token Cost | Output |
|--------------|----------|------------|--------|
| Simple MVP | 2-3 weeks | $150-300 | Working proof of concept |
| Complex MVP | 4-6 weeks | $300-600 | Production-ready core |
| Large refactor | 6-12 weeks | $500-1500 | Documented, tested codebase |

These assume following the methodology. Skip steps and costs balloon.

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

**Let's go:** [Philosophy & Approach](/part-1/philosophy)
