---
title: Philosophy & Approach
description: The mindset that makes AI-assisted development actually work
---

# Philosophy & Approach

## TLDR

**Start every project with a conversation, not a prompt.** Use Claude Opus in a Project. Brainstorm, debate, scope. The initial conversation quality determines everything.

**Documentation is the product.** Your docs are what make AI effective. Without them, every session starts from zero. With them, AI can execute autonomously.

**Quality rules are iron-clad.** Mandatory testing, plan-before-act, no scope creep. These aren't suggestions — they're the contract that prevents garbage output.

**Fresh conversations beat long ones.** When in doubt, start a new conversation. It's cheaper and more effective than carrying polluted context.

---

## The Real Mental Model

Claude isn't a junior developer you babysit. It's more like a highly capable contractor who needs three things:

1. **Clear spec** — What to build, why, and how it fits with what exists
2. **Quality standards** — What "done" means, what's not acceptable
3. **Continuity** — What was decided, what was learned, what exists

Give it those three things (via your documentation) and it produces excellent work. Skip them and it produces expensive garbage.

**Your job:** Be the architect. Set direction, define standards, review output. Don't write the code — write the spec and the rules.

---

## The Process (Why Each Step Matters)

### 1. Brainstorm with Opus

The initial conversation quality is infinitely better with Opus. Not marginally — fundamentally. The resulting scope, architecture decisions, and foundation documents are 10X better. This is where you invest in quality.

### 2. Generate Thorough Documentation

AI's memory lives in your docs. The ARCHITECTURE.md with real schemas. The .clinerules with strict quality standards. The sprint plan with specific task specs. These documents are what allow AI to "just get started" on any task without needing hand-holding.

### 3. Execute in Focused Tasks

One task per conversation. Plan before acting. Test after completing. Score confidence. Close the conversation. Next task, fresh start.

### 4. Know When to Start Fresh

This is the skill most people lack. A conversation going in circles costs more than starting over. A side-task in the wrong conversation creates confusion. **9 times out of 10, starting a new conversation is the better choice.**

---

## Validate First, Build Second

Most AI coding fails because people try to build everything at once.

**The pattern:**
> "Build me a platform with tools, resources, AI assistant, community..."
>
> *8 weeks and $3000 later: half-built mess*

**Better pattern:**
> "I want to build a community platform for event professionals."
>
> Claude: "That's broad. What's the ONE thing that makes this different?"
>
> "Easy access to open-source event tools with custom branding."
>
> Claude: "Let's build just the tool library and deployment first. If organizers love it, then add community features."

**Result:** $300 and 4 weeks to validate the core concept. If yes, continue. If no, you learned cheap.

---

## Documentation Is the Product

Your docs aren't overhead. They're the mechanism that makes everything work.

**Without docs:**
- Day 1: "Let's use cookie-based auth"
- Day 7: AI suggests JWT
- Day 14: Half the code uses cookies, half uses JWT

**With ARCHITECTURE.md:**
- Day 1: Auth decision documented with rationale
- Day 7: AI reads the doc, stays consistent
- Day 14: Still consistent

**Without .clinerules:**
- AI skips tests "to save time"
- AI starts refactoring code outside the task
- AI adds unasked-for features
- Quality degrades invisibly

**With iron-clad .clinerules:**
- Tests are mandatory. No exceptions.
- Plan mode first. Always.
- Stay in scope. Write a task doc for side issues.
- Update LEARNINGS.md when you discover something.

---

## Confidence Scoring

Every completed task needs a score out of 10.

```markdown
## Confidence: 8/10

**Met:**
- [x] Login endpoint works
- [x] Error handling for invalid credentials
- [x] Unit tests passing (6/6)
- [x] Smoke test verified in browser

**Deferred:**
- [ ] Rate limiting (Sprint 2)
```

**8/10 minimum to proceed.** Below 8 means fix it before moving on.

This prevents cascade failure: broken auth → broken database calls → broken everything. Catch it early, fix it immediately.

---

## The Fresh Conversation Principle

Long conversations accumulate noise:
- Old debugging tangents
- Superseded decisions
- Conflicting context from abandoned approaches

By message 80, AI is working with polluted context and producing worse output than a fresh start would.

**Rules:**
- One task = one conversation
- Going in circles? Write a task doc, start fresh.
- Side issue discovered? Write a task doc, handle it separately.
- Been in the same conversation for 2+ hours? Probably time to start fresh.

The cost of reloading context (AI re-reads your docs) is far less than the cost of confused, context-polluted output.

---

## Quick Reference

| Principle | Action |
|-----------|--------|
| Opus for brainstorming | Best reasoning produces best foundations |
| Documentation is memory | Thorough docs = autonomous AI execution |
| Iron-clad quality rules | Mandatory testing, plan mode, no scope creep |
| Focused tasks | One task per conversation, plan before act |
| Fresh conversations | When in doubt, start over — it's almost always better |
| Confidence scoring | 8/10 minimum, fix before moving on |
| Phase audits | Fresh AI eyes between major milestones |

---

**Next:** [Tool Selection](/part-1/tool-selection) — Choosing the right tools for each phase.
