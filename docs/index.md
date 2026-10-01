---
layout: home
title: Build it with Claude
description: How I build real apps with Claude, from first chat to live site. Free, practical, and honest about what it costs.

hero:
  name: "Build it with Claude"
  text: "I wrote the manual so you wouldn't have to call me."
  tagline: You'll probably call anyway. That's fine.
  actions:
    - theme: brand
      text: Start here
      link: /start-here
    - theme: alt
      text: Read the guide
      link: /introduction

features:
  - icon: 🧭
    title: Pick your track
    details: Keep it simple and build inside the Claude desktop app, or see everything, terminal included. The site hides the bits you don't need.
    link: /start-here
    linkText: Choose a track

  - icon: 💬
    title: Talk first, build later
    details: Most of the work happens before any code. Chat it through, get mockups, and only build once you'd be happy if it already existed.
    link: /part-2/brainstorming
    linkText: How the talking works

  - icon: 📋
    title: 99% docs
    details: A well-documented repo beats every clever plugin. I'll show you the files that make Claude behave, and how to stop them growing out of control.
    link: /part-2/documentation-architecture
    linkText: The docs that matter

  - icon: 🔄
    title: One task per session
    details: Fresh session, one job, close it, move on. Do that and you'll rarely hit the context wall.
    link: /part-3/execution-workflow
    linkText: The daily loop

  - icon: 💷
    title: What it really costs
    details: What Free, Pro and Max get you, which model to use when, and when paying more is worth it.
    link: /part-0/plans-and-limits
    linkText: Plans and limits
---

## Pick your track

<TrackChooser />

## How I build an app

1. **Talk it through.** I start in Claude Chat and discuss the idea for as long as it takes. Who it's for, what it does, what it won't do.
2. **Get mockups.** Claude Design draws the screens. I keep going until I can say "if this existed, I'd be happy".
3. **Then pick the stack and write the tasks.** Only now do we talk about code, a database and hosting. Claude writes the docs and a list of small tasks.
4. **Build a V1 on my own machine.** One task per session. Claude builds, tests and shows me. I click around and report what's wrong.
5. **Fix, fix, fix.** Lots of short bug-fix rounds. This is normal.
6. **Put it live.** Only when it works locally does it go on a real server with a real domain.

## Who this is for

- **Founders** who want a working version before they spend real money.
- **Non-coders** who are curious and patient. The simple track was written for you.
- **Developers and team leads** who want Claude to speed them up without making a mess.

## A real example

The [VH Conference Toolkit](https://github.com/Visual-Hive/vh-conference-toolkit) was built this way. It's a set of open-source tools for event organisers. Have a look at the repo: the architecture docs, the rules, the task files and the decision records are all there.

---

<div class="db-cta">
  <h3>...or do you?</h3>
  <p>You've got the whole method. What the guide can't do is look at your project. I can, and a short call is often enough to get you moving again.</p>
  <div class="db-cta-actions">
    <a href="https://visualhive.co/contact#book-a-call" target="_blank" rel="noopener" class="db-cta-btn db-cta-btn-primary">Book a call</a>
    <a href="https://visualhive.co" target="_blank" rel="noopener" class="db-cta-btn db-cta-btn-secondary">About Visual Hive</a>
  </div>
</div>
