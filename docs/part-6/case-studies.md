---
title: Case Studies
description: Real projects built with this method, what went right, and what went wrong
---

# Case Studies

Real projects, warts included. Some of these were built when this guide was centred on Cline, and I say so where that's the case. The method carried over to Claude Code almost untouched. What changed was the tool, the cost and a few habits, which I point out as I go.

::: tip The big one
NodeGX has its own page: a stalled legacy codebase, 3,865 commits in two months, and a code export people said wasn't worth attempting. Read [Case Study: NodeGX](/part-6/nodegx).
:::

---

## Rocket School: a game tested by a robot and a grown-up

**What it is:** A maths and typing game for 8 to 12 year olds, in English and French. Children make a player, then race a rocket to a planet by answering questions. It's a template for [NodeGX](https://github.com/The-Low-Code-Foundation/NodeGX) (formerly OpenNoodl), my open-source visual app builder. A script generates it, so it can be rebuilt from scratch at any time.
**Built with:** Claude Code.

### The first play test

I played it for the first time and came back with ten complaints. Text didn't wrap. The "show me how" button didn't show anything. French children had to hold Shift to type a number on their keyboards. The answer popped up below the fold, so you scrolled on every question. And the look was, in my words, "a bit sad".

Here's the uncomfortable bit. **All ten had shipped past 140 passing tests and a 17 out of 17 browser drive.** The tests were checking what the code did. None of them was checking what a French eight-year-old on a tablet would feel.

### What we did about it

1. **Found the real cause of each complaint before touching anything.** Every finding got a cause read from the source, with the file and line. "Text doesn't wrap" turned out to be one helper that set every text box to a mode that never wraps. One fix, every screen.
2. **One task per finding**, in an order that made sense (fix the text first, so every later screenshot is honest).
3. **Headless play tests after every change.** A script drives the game in a real browser in the background: real mouse clicks, real key presses, screenshots at the end. It runs at five screen sizes, from a laptop to a phone, and the main run is French with a French keyboard. I don't watch it. It goes beep, boop, beep, and I get a pass or a fail with pictures.
4. **Reproduce before fixing.** Each task's first check had to fail on the old build, so the fix was measured against what I actually saw.
5. **Look at the screenshot.** Text checks couldn't see a doubled button or a clipped line. Claude has to open the pictures and look.
6. **A green run closes nothing on its own.** Each task stays open until I've replayed it on a tablet and a French laptop and said so in writing.

### What it teaches

- Backend tests aren't enough for anything with a screen. Add headless browser tests to your CLAUDE.md. See [Testing](/part-4/testing).
- A person still has to play it. The robot catches regressions. You catch "this is no fun".
- When Claude needs a ruling from me (which look? which new question types?), it builds an artifact with options, recommendation first. I click, and my answers go back to Claude Code.
- The docs got big. Very big. That's where my rules on [doc length](/part-2/documentation-architecture) came from.

---

## The meeting record: task management in reverse

**What it is:** A system that keeps a large client programme honest. Lots of people, lots of meetings, and decisions made in one call and quietly contradicted in the next. It's private client work, so the names and examples below are made up. The shape is real.
**Built with:** Claude Code.

### The problem

Normal project management starts with tasks. Someone writes "set up the login system", assigns it, and ticks it off. That works when everyone agrees on what the tasks are.

On this programme they didn't. The real work happened in meetings, and what came out of them lived in transcripts, emails and spreadsheets. The main spreadsheet was on its umpteenth version. Cells had turned into changelogs. The same fact had three different values in three places, and nobody could say which was right or who had said so.

### Turning it round

So we built it backwards. Instead of starting from tasks, it starts from **what people said**.

1. **Sources go in and never change.** Every transcript, email and spreadsheet gets its own folder with a short manifest: date, who was there, how reliable it is.
2. **Claude reads each one and pulls out the items.** A decision, a fact, a person, a deadline, who owns what. **One item per file**, each a small Markdown file that says which source it came from, who said it and when.
3. **Contradictions are kept, not smoothed over.** If the Tuesday call says launch is in March and the Thursday email says April, the item is marked *contested*, with both readings side by side. Someone has to rule on it, and the ruling records who ruled and why.
4. **Scripts build the views.** Open decisions, soonest first. Who needs to be in the room for which question. What nobody owns yet. What's gone stale. Nobody edits these by hand. They're rebuilt from the items on every commit.
5. **A person signs off at every judgement call.** Claude does the reading and filing. It stops and asks whenever something needs a human: a name it isn't sure of, two readings that disagree, anything sensitive.

So the "tasks" come out of the meetings, instead of the meetings serving the tasks. When someone asks "didn't we agree on this?", the answer is one command away, with the quote and the date.

### What it teaches

- **This is the "lakehouse" memory idea in practice.** Raw sources at the bottom, small structured items in the middle, generated views on top. Claude loads the view it needs, not the whole pile. More in [Project Memory](/part-5/project-memory).
- **One item per file beats one giant document.** Git becomes the version history. No more "tracker_final_v3_REALLY_FINAL.xlsx".
- **Keep "someone said it" separate from "it's confirmed".** Most project confusion comes from mixing the two.
- **Skills carry the stops.** The repo has a few skills for the regular jobs, like filing a new meeting or answering a question from the record. Each one knows where it must stop and ask. See [Skills](/part-5/skills).
- **Views have audiences.** One build shows everything. A second build only includes what's safe to share with the client, and a check makes sure nothing sensitive leaks into it.

---

## RISE: a desktop app

**What it is:** A desktop app for low-code, AI-assisted development (Electron, several processes, webpack).
**Built with:** Cline, in the Cline era.
**Result:** Production-ready in four weeks. About $400 of pay-as-you-go API spend.

**Scoping saved weeks.** The full vision had a visual editor, AI code generation, a template marketplace, cloud sync and team features. The brainstorm cut about 80% of that. The MVP was project scaffolding with AI help. One core feature. The rest stayed documented for later.

**The docs handled Electron.** Electron has a main process, a renderer, messages between them, webpack and native modules. The rules file had Electron-specific standards, and the learnings file caught the messaging traps. Every new session started with the full picture.

**Confidence scoring caught a race condition.** The messaging task first scored 7/10: "works but timing feels fragile." I pushed. The renderer was sending messages before the main process was listening. Fixed before it became a nightmare.

**The phase audit found a security gap.** The preload script exposed too much to the renderer. It went on the fix list and was sorted before any release.

| Metric | Value |
|--------|-------|
| Timeline | 4 weeks |
| Lines of code | about 15,000 |
| Tasks | 32 |
| Average confidence | 8.2/10 |

**Code:** [github.com/The-Low-Code-Foundation/rise](https://github.com/The-Low-Code-Foundation/rise)

---

## OpsNest control panel: seeing the back end

**What it is:** An admin control panel for a SvelteKit and Directus membership portal on a Hetzner server.
**Built with:** Cline, in the Cline era.
**What it shows:** The "build your observability tools early" pattern from [The Project Control Panel](/part-5/control-panel).

The admin had no way to see deployment health, data, automation flows or security. So one sprint was a deliberate experiment: build the control panel, watch what the AI got right and wrong, and write the docs from that.

**Nine tasks:** a tabbed shell, a deployment centre with live health checks, a data browser, inline data editing, automation annotations, an automation diagram with live status, a security runner with eight checks, a user-journey checklist that writes bug reports, and a last task to turn all the conventions into rules.

**What the panel caught in its own project:**

- **A phantom deploy.** The deployment tab showed the sprint had never actually been deployed. The new health endpoint returned 404 on the live server.
- **Made-up environment variable names.** The security runner found `DIRECTUS_URL` used where the real name was `VITE_DIRECTUS_URL`. It looked right and passed review. It failed at runtime.
- **Unchecked assumptions** in the types that normal testing would never have shown.

Three bugs, none of them visible in code review. The rule that came out of it: "Before writing code that uses an environment variable name, read `.env.example`. Never invent names." One rule, one whole class of mistake gone. It now lives in the CLAUDE.md template.

---

## VH Conference Toolkit: small tools, one at a time

**What it is:** A set of open-source event tools, starting with an operations tracker and a countdown planner.
**Built with:** Cline, in the Cline era.

Each tool is its own folder, planned and built separately, with its own README. It's a good example of keeping scope small: ship one tool that works, then start the next. **Code:** [github.com/Visual-Hive/vh-conference-toolkit](https://github.com/Visual-Hive/vh-conference-toolkit)

---

## The eight-gap launch: observability

**What it is:** A client web app getting close to launch.
**What it shows:** Why source maps and release tags belong in Sprint 1, not launch week.

The app was built fast for early testing. Near launch, the client listed eight gaps: no error tracking, no source maps, no alerts, no grouping, no release tags, no dev/production split, no link to session replays, no crash reports from the mobile build. It looked like eight projects.

Most of them honestly didn't matter while five testers were poking at it. **Two did, and they couldn't be fixed after the fact.** Source maps for builds already shipped were never kept, so every production error from those weeks read like `a.b.c is not a function at vm:1:12345`, for good. And without release tags, nobody could say which deploy a bug started in.

The fix was about 15 minutes of plumbing: switch on error tracking in the tool they already had, upload source maps and tag releases in the deploy script, split the environments. It should have been Sprint 1. See [Observability & Error Tracking](/part-5/observability).

---

## Three shorter ones

**A simple dashboard.** Five charts, one database, manual refresh. Real-time updates, drill-downs and alerts were deferred. Four tasks, each one independent, done in about a week and a half. Small projects don't need heavy process, but they still need a clear scope, one task at a time, and a confidence score. About two hours of docs up front.

**Modernising a legacy back end.** 50,000 lines of callback-style JavaScript with no tests. The brainstorm turned "rewrite everything" into "modernise the auth module first, then decide". Writing the docs became the discovery phase: it dragged out the hidden dependencies. Four phases, one module per task, everything else kept working. The audits after each phase caught twelve regressions before users did.

**The one that failed.** A real-time collaboration tool, abandoned after three weeks. No brainstorm, straight to "build a real-time collaborative editor". No docs ("I'll add them later"), so every session started confused. No confidence scores, so it was built on "it works... mostly". By week three there were problems everywhere and no clear way back. The MVP should have been a single-user editor, with syncing only once that worked. The method feels like overhead until you skip it.

---

## What they have in common

**What works every time:**
- The brainstorm cuts scope, hard.
- Docs mean every session starts knowing what the last one knew.
- Confidence scoring catches the shaky bits early.
- Audits find what piled up.
- One task per session keeps Claude focused.
- A person has to use the thing before it's done.

**What varies:** how much documentation, how small the tasks, how often you audit.

Half an hour of planning saves days of rework. Every time.

---

<div class="db-cta">
  <h3>Want these results on your own project?</h3>
  <p>These projects followed a clear process, and yours can too. If you want help applying it, whether that's an architecture review, an audit of what the AI has already built, or an end-to-end build, book a call.</p>
  <div class="db-cta-actions">
    <a href="https://visualhive.co/contact#book-a-call" target="_blank" rel="noopener" class="db-cta-btn db-cta-btn-primary">Book a call →</a>
    <a href="https://visualhive.co" target="_blank" rel="noopener" class="db-cta-btn db-cta-btn-secondary">About Visual Hive</a>
  </div>
</div>

---

**Next:** [Getting Started](/introduction). Ready to try it yourself?
