# Prompt: Initial Brainstorm

> **When to use:** At the very start of a new project. This MUST be done in Claude (preferably Opus 4.6) inside a Project you've created. Add any relevant files first: mockups, screenshots of apps you want to emulate, spreadsheets, pitch decks, competitor analysis — anything that helps Claude understand what you're building.

> **Before you start:** Set a Project instruction or profile preference telling Claude to **never use the inline chat HTML preview** for mockups — always use artifacts. The inline preview wastes tokens.

## The Prompt

```
I want to build [describe your full vision — don't hold back, include everything you imagine].

My situation:
- Technical level: [beginner / intermediate / advanced]
- Timeline goal: [e.g., MVP in 2-4 weeks]
- Budget: [e.g., $200-500 in AI tokens]
- Existing resources: [any designs, APIs, datasets, or code you already have]
- Platform targets: [web only / mobile app store / PWA / desktop app / undecided]

I'd like us to have a thorough discussion before committing to anything. Let's:

1. Talk through the idea — what excites you about it, what concerns you have, what similar things exist
2. Identify the core value proposition — what makes this worth building?
3. Discuss what should be in V1 (MVP) vs what should be pushed to V2
4. Talk through features I might be missing or features I think I need but don't
5. Discuss technology recommendations with trade-offs and alternatives — please do a web search to verify you're recommending the latest stable versions
6. Talk about data architecture and how the pieces fit together
7. Discuss where this will run (web, mobile, desktop) and what that means for the architecture

Don't just give me a plan. Let's have a real back-and-forth conversation about this. Ask me questions. Challenge my assumptions. Help me think through this properly. If you're recommending specific frameworks or libraries, please search the web to confirm they're current and suitable.
```

## What to Expect

This should be a **multi-turn conversation** lasting 30-60 minutes. Claude should:

- Ask clarifying questions about your use case
- Challenge features you assume are essential
- Suggest alternatives you haven't considered
- Discuss tech stack options with honest trade-offs
- **Verify recommendations with web search** — training data can be months old
- Help you identify the minimum that proves your concept works
- Discuss platform targets and their architectural implications
- Maybe prototype a page layout or component to make sure you're aligned

## Follow-Up Prompts

**If Claude's first suggestion is too big:**
```
That still feels ambitious for an MVP. What's the absolute minimum we could build to test whether [core concept] actually works? What can we cut without losing the ability to validate?
```

**If you want to see options:**
```
Can you lay out 2-3 tech stack options with honest pros/cons for each? Consider my skill level and the timeline. Please search the web to make sure the versions and compatibility info are current.
```

**If you want to align on UI/UX:**
```
Can you sketch out what the main [page/screen/flow] would look like? Please use an artifact, not the inline preview.
```

**If you need to discuss mobile/desktop targets:**
```
I'm thinking about eventually putting this on [the app stores / desktop]. What does that mean for our architecture choices? Should we plan for Capacitor / Tauri / Electron from the start, or can we add it later?
```

**When you're ready to converge:**
```
I think we've got a good picture. Can you summarize:
1. The MVP scope (one paragraph)
2. The full tech stack with rationale
3. What's deferred to V2 and why
4. The key technical decisions we've made
5. Platform target plan (web now, mobile/desktop later?)
6. Any risks or unknowns we should be aware of
```
