---
title: Setting Up Cline & Your AI Credits
description: Getting the AI connected, managing costs, and making VS Code comfortable
---

# Setting Up Cline & Your AI Credits

## TLDR

Cline is a VS Code extension that lets you chat with Claude (an AI) inside your editor. Claude reads your code, writes new code, runs terminal commands, and helps you build things — all with your permission at every step. The easiest way to get started is to top up credits **directly in Cline** — no API keys, no separate accounts. This page walks you through the setup, explains how billing works so you don't get surprised, and recommends VS Code settings that keep things smooth.

---

## The Easiest Setup: Cline Credits (Recommended for Beginners)

The fastest way to start is using Cline's built-in credit system. No separate accounts, no API keys, no model IDs to look up.

### Step 1: Install Cline

1. Open VS Code
2. Click the **Extensions** icon in the left sidebar (it looks like four squares, or press Ctrl+Shift+X / Cmd+Shift+X)
3. Search for **"Cline"**
4. Find **"Cline - AI Assistant"** and click **Install**
5. After installing, you'll see a Cline icon in your left sidebar (it may also open automatically)

### Step 2: Top Up Credits in Cline

1. Click the Cline icon in the sidebar to open the panel
2. The API provider should already be set to **Cline** (it's the default)
3. Look for the option to **add credits** — follow the prompts to add a payment method
4. **Start small:** Add $10–$20 to begin. A typical task conversation costs $1–$5 depending on complexity, so $20 gets you through several tasks comfortably

### Step 3: Select Your Model

With the Cline provider, model selection is simple:

- Pick **Sonnet** (recommended for most coding work — fast, capable, cost-effective)
- Pick **Opus** if you want maximum reasoning quality (more expensive, but better for complex architectural decisions)

**You don't need to know model IDs or version numbers.** Cline always gives you the latest available models. When Anthropic releases a new Sonnet or Opus, it just appears in the dropdown — no configuration changes needed.

### Step 4: Set a Spending Limit

Cline has a built-in spending alert. In Cline settings, look for **"Auto-approve spending limit"** or **"Max cost per task."** Set this to a reasonable amount like **$5–$10**. If a single task exceeds this, Cline will pause and ask you before continuing. This prevents runaway costs from a single conversation.

---

## Advanced Setup: Using Your Own Anthropic API Key

If you want more control over billing, rate limits, and model selection, you can use your own Anthropic API key instead of Cline credits. This is the setup for users who are comfortable managing API accounts.

### Step 1: Create an Anthropic Account

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Click **Sign Up**
3. Create an account with your email (or sign in with Google)
4. Verify your email if prompted

### Step 2: Add Credit

1. Once logged in, look for **Billing** or **Plans** in the left sidebar (or go to [console.anthropic.com/settings/billing](https://console.anthropic.com/settings/billing))
2. Click **Add Credit** (or "Buy Credits")
3. Enter a payment method (credit card or debit card)
4. **Start small:** Add $10–$20 to begin

### Step 3: Set Spending Limits

This is the single most important thing to do before you start using the API.

1. In [console.anthropic.com](https://console.anthropic.com), go to **Settings** or **Limits**
2. Set a **monthly spending limit** — start with something you're comfortable with, like $50 or $100
3. **Do NOT enable auto-reload/auto-renewal** unless you're confident about your usage. Auto-reload automatically adds more credit when your balance runs out. For beginners, it's better to manually top up so you stay aware of what you're spending

**If you forget this step** and have auto-reload on, a runaway Cline conversation (e.g., an AI stuck in a loop retrying something) could burn through credit quickly. The spending limit is your safety net.

### Step 4: Create an API Key

1. Go to [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
2. Click **Create Key**
3. Give it a name like "Cline" or "VSCode"
4. **Copy the key immediately** — it starts with `sk-ant-` and you won't be able to see it again after you close this page
5. Save it somewhere safe. A password manager is ideal. Don't put it in a file that gets uploaded to GitHub (more on this later)

### Step 5: Configure Cline with Your API Key

1. Click the Cline icon in the sidebar to open the panel
2. Change the API provider from **Cline** to **Anthropic**
3. Paste your API key
4. Select the latest **Sonnet** model (Anthropic no longer uses version suffixes — just pick whichever Sonnet is listed as the latest)

### Why Use Your Own API Key?

- **Direct billing visibility** at [console.anthropic.com/usage](https://console.anthropic.com/usage)
- **Granular rate limit control**
- **Multiple keys** for different projects or team members
- **Same key** works across Cline, Claude Code CLI, and custom scripts

For most users starting out, the Cline credit system is simpler and gets you building faster. Switch to your own API key later if you need the extra control.

---

## Critical Settings for Beginners

Open Cline's settings (gear icon in the Cline panel). These three settings matter:

**Auto-approve commands: OFF.** This is the most important setting. When it's off, Cline will show you every terminal command before running it and wait for you to click Approve. This means you see exactly what it's doing. Never turn this on until you're very comfortable with what terminal commands look like.

**Sub-agents: OFF.** Sub-agents let Cline spawn additional AI conversations to handle sub-tasks. In practice, this causes more confusion and errors than it saves time. Keep it off.

**Checkpoints: OFF.** Checkpoints save snapshots of your project between Cline actions so you can roll back. Sounds useful, but it significantly slows Cline down and the interface is confusing for beginners. Keep it off — Git is your undo system.

---

## Test It

Open VS Code with any folder (even an empty one). In the Cline panel, type:

```
Hello, can you tell me what files are in this directory?
```

If Cline responds and lists files (or says the directory is empty), your setup works. If you see an error about the API key or credits, double-check your configuration.

---

## Recommended VS Code Extensions

Beyond Cline, a few other extensions will make your experience smoother. Install them the same way: Extensions sidebar > search > Install.

### Essential

**Prettier — Code Formatter.** Automatically formats your code so it looks tidy. Cline sometimes writes code with inconsistent spacing or formatting — Prettier fixes it automatically when you save. After installing, go to VS Code settings (Ctrl+, or Cmd+,), search for "Format on Save," and enable it.

**ESLint.** Highlights problems in JavaScript/TypeScript code with coloured squiggly underlines — like spell-check for code. Helps you spot issues Cline might introduce.

**GitLens.** Supercharges VS Code's built-in Git features. Shows who changed what, when, and why — directly in the editor. Helpful for understanding your project's history after Cline has been making changes.

### Helpful for Beginners

**Error Lens.** Shows error messages inline next to the code that caused them, instead of making you hover over squiggly lines. Makes problems much more obvious at a glance.

**Path Intellisense.** Auto-completes file paths when you type them. Prevents typos in import statements.

**Material Icon Theme.** Gives different file types different icons in the sidebar — `.js` files get one icon, `.css` files get another, folders are colour-coded. Makes it much easier to visually navigate your project.

### For Specific Tech Stacks

These depend on what you're building, but Cline will often suggest installing them:

- **Svelte for VS Code** — if building with SvelteKit
- **Tailwind CSS IntelliSense** — if using Tailwind for styling
- **Docker** — if using Docker (shows container status, lets you manage containers from VS Code)
- **Thunder Client** — a simple API testing tool built into VS Code (like Postman but simpler)

### Extensions to Avoid as a Beginner

**GitHub Copilot.** It's an AI code assistant from a different company that auto-completes code as you type. If you have both Copilot and Cline active, they'll compete with each other and cause confusion. Stick with Cline — it follows the methodology.

**Multiple AI extensions simultaneously.** Same reason — having two AIs suggest different things at the same time is chaotic. Pick one workflow and stick with it.

---

## Managing Your Costs Day-to-Day

### Realistic Cost Expectations

| Task Type | Approx. Cost |
|-----------|-------------|
| Simple task (small fix, minor feature) | $1–$2 |
| Medium task (new feature, moderate complexity) | $2–$5 |
| Complex task (major feature, lots of files) | $5–$10 |
| Brainstorming session | Free (use Claude Chat with your Pro subscription) |

### Tips to Keep Costs Down

**Close VSCode tabs before starting a Cline task.** Cline ships your open tabs as part of its environment context with every single API request — confirmed in [Cline's own documentation](https://docs.cline.bot/). Ten unrelated tabs from yesterday's work add thousands of tokens to every turn. Close them. When Cline finishes editing a file and moves on, close that tab too. This single habit can cut spend by 20-30% on a typical task. See [Token Economics](/part-5/token-economics) for the full picture.

**Start new conversations for new tasks.** Long conversations get expensive because Claude re-reads everything from the start each time. When you finish a task, start a fresh Cline conversation for the next one. The methodology naturally encourages this — one task, one conversation.

**Use Sonnet for execution, Opus for brainstorming.** The brainstorming happens in Claude Projects (claude.ai), where your Claude Pro subscription covers the cost. The Cline work uses Sonnet, which is cheaper. You get the best of both worlds.

**Don't let Cline retry endlessly.** If Cline fails at something three times in a row, stop it. Something is fundamentally wrong that retrying won't fix — usually a missing piece of information, a wrong approach, or an outdated dependency. Stop, think, provide better context, and try again.

**Clean up Cline's conversation history.** Click the history icon at the top of the Cline panel. Old conversations take up disk space (100MB+ over time). Delete completed ones. Star any unfinished ones before bulk-deleting so you don't lose them.

---

## You're Done

At this point you should have:

- ✅ Cline installed in VS Code
- ✅ Credits topped up (either Cline credits or Anthropic API key configured)
- ✅ A spending limit set
- ✅ Auto-approve, sub-agents, and checkpoints all OFF
- ✅ Useful VS Code extensions installed

**Next:** [Browser DevTools for Debugging](/part-0/browser-devtools) — How to read error messages from your browser.
