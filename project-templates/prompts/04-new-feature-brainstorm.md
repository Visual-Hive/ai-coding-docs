# Prompt: New Feature Brainstorm

> **When to use:** When adding a new feature to an existing project. This should be done in Claude with the GitHub repo synced in the Project files, so Claude knows the current state of the codebase.

## Before You Start

1. Make sure Cline or Claude Code has pushed the latest code to GitHub
2. Sync the GitHub repo in your Claude Project so Claude can see the current state
3. Start a new conversation in the Project

## The Prompt

```
I want to add a new feature to [project name]: [describe the feature].

The current state of the project is in the synced repo — please review it to understand what's been built so far, the architecture, and the existing patterns.

Let's discuss:
1. How does this feature fit with what already exists?
2. What's the minimum viable version of this feature?
3. What should be deferred to a later iteration?
4. What existing components/patterns can we reuse?
5. Are there any architectural changes needed, or does this fit within the current structure?
6. Are there any new dependencies needed? If so, please search the web to confirm the latest stable versions.
7. What are the risks or things that could go wrong?

Let's talk through it before committing to a plan. If recommending any new libraries or tools, please verify they're current with a web search.
```

## Follow-Up: Generate Sprint

```
Based on our discussion, please generate:

1. An updated ARCHITECTURE.md section (or additions) for the new feature
2. A new sprint plan with tasks broken down to 30min-half day each
3. Individual task documents for each task
4. Any updates needed to .clinerules or CLAUDE.md for new patterns

Make sure the task docs reference existing code paths and patterns from the codebase so the AI can follow established conventions.
```
