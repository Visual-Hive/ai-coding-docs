---
title: The Brainstorming Session
description: Starting every project with a proper conversation
---

# The Brainstorming Session

## TLDR

Every project starts with a **conversation with Claude Opus inside a Project**. Not a single prompt. A real, multi-turn discussion lasting 30-60 minutes. You describe your vision, Claude pushes back, asks questions, recommends tech, debates scope, maybe prototypes a layout. The quality of this conversation determines everything that follows.

This is the highest-ROI activity in your entire project.

---

## Why Opus, Why a Project

**Why Opus:** The initial conversation quality is dramatically better. Opus thinks deeper about scope, challenges assumptions more effectively, and the resulting foundation documents are 10X better. Don't start with Sonnet or Haiku for this phase — the savings aren't worth the quality loss.

**Why a Project:** Claude Projects give persistent file context. You can:
- Start with an empty Project and just talk
- Add reference files (design mockups, competitor screenshots, API docs)
- Later sync your GitHub repo so Claude sees the actual codebase
- Every new conversation in the Project inherits the same context

---

## The Conversation

This isn't "prompt → response → done." It's a real discussion.

**Turn 1: Describe everything**

Don't hold back. Tell Claude the full vision:

> "I want to build a community platform for event professionals. They can browse open-source tools, configure them with their branding, deploy them. Plus resources, guides, video tutorials. Eventually an AI assistant that knows the platform..."

**Turn 2: Claude analyzes and asks questions**

Claude should:
- Identify the core value proposition
- Ask about your technical level, timeline, budget
- Point out complexity you might be underestimating
- Suggest what's MVP vs what's V2

**Turn 3-5: Back and forth**

This is where the real value is:
- "Is that really minimal enough for MVP?"
- "What if we cut the AI assistant and just do tools + resources?"
- "Do we need user accounts or can we do magic links for MVP?"
- "Show me what the tech stack comparison looks like"
- "Can you sketch out the main page layout so I know we're aligned?"

**Turn 6+: Converge on decisions**

Claude lays out the technology recommendations with alternatives and trade-offs. Depending on your technical level, this is more or less detailed. Topics to cover:
- Frontend framework and why
- Backend approach and why
- Database choice and why
- Auth strategy
- Hosting/deployment
- Data architecture (how the pieces connect)

---

## What Makes a Good Brainstorm

**Claude should be recommending, not just agreeing.** If Claude never pushes back on your ideas, you're not getting the value. Push Claude to challenge you:

> "Be honest — is this scope realistic for 3 weeks? What would you cut?"

**Tech stack discussion should include alternatives.** Not just "use React" but "here are 3 options, here's why I'd recommend this one for your situation."

**Data architecture matters early.** Discuss how entities relate. What are the main database tables? How does auth connect to the rest? This prevents painful refactoring later.

**Prototype if needed.** If you and Claude aren't sure you're imagining the same thing, ask Claude to describe or prototype a page layout. Alignment now prevents rework later.

---

## Example Output

After 30-45 minutes of conversation (using EventHive as an example):

**Core insight:**
> "The unique value is making open-source event tools accessible to non-technical organizers. The community and resources support that mission. The AI assistant is V2."

**MVP scope:**
- Member registration and profiles
- Tool library with browsing and filtering
- Tool configuration with custom branding
- Widget hosting for deployed tools
- Resource library (guides, articles)
- Admin panel for content management

**Deferred to V2:**
- AI assistant (Erleah) → Sprint 3+
- Real-time collaboration → Production
- Third-party integrations → Production

**Tech stack:**
- SvelteKit (full-stack, fast, good DX)
- PostgreSQL with Drizzle ORM
- Tailwind CSS
- Cookie-based auth (simpler than JWT for this use case)
- Docker on Hetzner (cost-effective self-hosting)

**Key decisions documented:**
- Standalone app, not part of existing monorepo
- Three-tier tool hosting model (browser-only, self-hosted, platform-hosted)
- JSONB for flexible tool configuration schemas

---

## Red Flags During Scoping

**"Everything is essential"**
> "We need tools AND resources AND AI assistant AND messaging or it won't work."

Push back: "Can we validate that organizers want the tools first? Everything else supports that core."

**"It's not that complex"**
> "AI assistant is just a chatbot, how hard can it be?"

Reality check: AI assistant = ghost cursor + speech synthesis + HUD overlay + RAG knowledge base + action system = 11 tasks spanning weeks. Defer it.

**"Users won't understand without X"**
> "We need a full onboarding wizard or users will be lost."

Counter: Ship with a simple questionnaire. If users are confused, that tells you what to explain. Don't guess.

---

## What You Walk Away With

By end of brainstorming:

1. **MVP scope** (one clear paragraph)
2. **Success criteria** (2-3 measurable bullets)
3. **Deferred features** (with reasoning for each)
4. **Tech stack** (with rationale, not just names)
5. **Data architecture** (main entities and relationships)
6. **Key technical decisions** (documented with reasoning)

This becomes the foundation for your README, ARCHITECTURE.md, and sprint plan.

**Don't close this conversation yet.** The next step is asking Claude to generate your foundation documents — do that in the same conversation so all the brainstorming context is available.

---

## Common Mistakes

**Using Sonnet/Haiku for brainstorming.** The quality difference is significant. Use Opus for this phase. It's worth the cost.

**One prompt, one response.** Brainstorming needs back-and-forth. If you got a good answer on the first try, you probably didn't explore enough.

**Not using a Project.** Without persistent context, you lose the brainstorming insights when you start a new conversation.

**Skipping this entirely.** Starting with "build me X" instead of "let's discuss X." You'll regret it at $500 in rework.

**Forgetting to document.** The brainstorming insights are valuable. Make sure Claude generates the foundation docs before you move on.

---

**Next:** [Documentation Architecture](/part-2/documentation-architecture) — The documents that make everything work.
