---
title: Introduction
description: How I build an app with Claude, start to finish, and how this guide is laid out.
---

# Introduction

## TLDR

Most people who try to build an app with AI open a chat, type "build me X", and watch it produce a lot of code very quickly. A few weeks later they have something that half works, breaks in odd places, and nobody can fix.

What works is slower at the start and much faster overall. Talk the idea through properly. Get mockups until you'd be happy if the thing already existed. Write it all down. Then let Claude build it one small task at a time, testing as it goes.

This page walks through that process. The rest of the guide goes into each step in detail.

---

## Why "just build it" goes wrong

When a project falls over, it's nearly always for the same reasons:

- **Nobody talked it through.** You jumped to "build me X" before anyone worked out what X should be.
- **Nothing was written down.** Every new session, Claude had to guess at decisions made last week.
- **The jobs were too big.** One enormous request instead of a list of small tasks.
- **Nobody checked.** Broken code got built on top of broken code.

None of this is about the AI being bad. Claude is very good. It just can't read your mind, and it forgets everything between sessions unless you give it something to read.

---

## The process

### 1. Talk it through in Claude Chat

Every project starts as a conversation, and I use **Opus** for it. Chat is the right place because it's built for discussion and it remembers you from previous chats. Claude Code knows your repo, but it doesn't see your Chat memory.

Make a **Claude Project** and put everything useful in it first: notes, screenshots of apps you like, a spreadsheet of example data, competitor links. Then have a real conversation over many turns. What's in V1 and what waits? Who uses it? What does it store? Push back when Claude says something you don't agree with or don't understand. Ask it to search the web so it doesn't suggest last year's tools.

More in [The Brainstorming Session](/part-2/brainstorming).

### 2. Get mockups

Before anyone talks about code, I ask for mockups. Claude Design draws the screens and you change them by chatting or leaving comments on the canvas. Keep going until you can honestly say "if this existed, I'd be happy". Changing a mockup takes seconds. Changing a built app takes days.

More in [Mockups First](/part-2/mockups-first).

### 3. Then the stack, the docs and the tasks

Now, and only now, talk about the tech stack, the database and where it will be hosted. Then ask Claude to write the foundation docs: a README, an architecture doc, a `CLAUDE.md` with the rules for your project, a sprint plan and a task file for each job.

::: tip Give Claude the templates
Add this guide's repo to your Claude Project (the `+` button on the chat input, then GitHub, then paste `https://github.com/Visual-Hive/ai-coding-docs`). Then ask: *"Create the foundation files for this project using the templates in the AI Coding Docs repo."* Claude will follow the structure instead of inventing its own.
:::

Each task file names the model that should run it. Most get Opus. Small, well-specified ones can go to Sonnet if you're watching your limits. The docs carry most of the weight in this whole process, which is why [Documentation Architecture](/part-2/documentation-architecture) is one of the longest chapters.

### 4. Build a V1 on your own machine

Put the docs in a folder (or a GitHub repo), open it in Claude Code, and start the first task.

::: simple
Open the Claude desktop app, go to the **Code** tab and pick your project folder. You don't need a terminal. When Claude starts your app, it shows up in the Browser pane right there.
:::

::: everything
Clone the repo, open it in VS Code, and run Claude Code in the terminal or the VS Code extension. Git, Docker and the rest are covered in [Setting Up Your Computer](/part-0/setting-up-your-computer).
:::

One task per session. Claude reads the task, plans, builds, runs the tests and tells you how confident it is. You read the plan before it starts (really read it), then click around the result. The daily loop is in [The Execution Workflow](/part-3/execution-workflow).

### 5. Fix, fix, fix

The first version will have bugs. That's normal and it's where a lot of the time goes. Send Claude **screenshots**: one picture of a broken layout beats three paragraphs describing it. Copy errors from the browser console straight into the chat. If a fix starts going round in circles, stop, ask Claude to write down what it's learned in a task file, and start a fresh session.

### 6. Put it live

Only once it works on your machine does it go on a real server with a real domain. That's covered in [Deployment & Platform Targets](/part-5/deployment-platforms) and [Deploy Verification](/part-5/deploy-verification).

---

## What's in the guide

- **Part 0: Before You Start.** Setting up, what the plans cost, and the basic ideas (how apps run, files, the browser's developer tools).
- **Part I: Foundation.** Why docs matter so much, and which bit of Claude to use for what.
- **Part II: Before You Build.** Brainstorming, mockups and the documentation set.
- **Part III: Execution.** The daily loop, task files and confidence scores.
- **Part IV: Quality.** Audits between phases, testing, and comments in code.
- **Part V: Advanced.** Sessions and handoffs, skills, memory, pitfalls, teams, deployment.
- **Part VI: Resources.** Templates, a prompt library and real projects.

If you picked **Keep it simple**, the pages you don't need are hidden. You can switch tracks from the top of the sidebar.

---

## Who this is for

- **Founders** who want a working version before they spend real money.
- **Non-coders** who are curious and patient. You don't need to write code, but you do need to read what Claude tells you.
- **Developers and team leads** who want Claude to speed them up without making a mess.

It isn't a tutorial on Claude basics, and it won't remove the need for your judgement. You're still the one who decides what gets built and whether it's right.

---

## What you'll need

- A paid Claude plan. Claude Code isn't on the Free plan. Pro is enough to start, and Max is worth it once you're serious. Details in [Plans & Limits](/part-0/plans-and-limits).
- The Claude desktop app. That's it for the simple track.
- Patience for the talking and the mockups. It's the cheapest part of the project and it saves the most.

::: tip Don't trust time estimates
Claude is bad at guessing how long things take. It will call a 30-minute task "two to three days". I've left timelines out of this guide on purpose. How fast you go depends on how good your docs are and how big the thing is.
:::

---

## A real example

The [VH Conference Toolkit](https://github.com/Visual-Hive/vh-conference-toolkit) is a set of open-source tools for event organisers, built this way. The repo shows what good project docs look like: architecture docs with full schemas, strict rules, a task file per job and decision records for the big choices. More in [Case Studies](/part-6/case-studies).

---

## How to read this

- **Keen to start?** Go to [The Brainstorming Session](/part-2/brainstorming).
- **Not convinced?** Read [Philosophy & Approach](/part-1/philosophy) first.
- **Just want the files?** They're in [Project Templates](/part-6/templates).
- **Setting up a team?** Read Philosophy, then [Team Workflows](/part-5/team-workflows).

---

<div class="db-cta">
  <h3>Want a second pair of eyes first?</h3>
  <p>Every project is different. If you'd like someone to look over your idea or your architecture before you start, book a call and we'll work out the right first step.</p>
  <div class="db-cta-actions">
    <a href="https://visualhive.co/contact#book-a-call" target="_blank" rel="noopener" class="db-cta-btn db-cta-btn-primary">Book a call</a>
    <a href="https://visualhive.co" target="_blank" rel="noopener" class="db-cta-btn db-cta-btn-secondary">About Visual Hive</a>
  </div>
</div>

---

**Next:** [Philosophy & Approach](/part-1/philosophy)
