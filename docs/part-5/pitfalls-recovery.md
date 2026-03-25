---
title: Common Pitfalls
description: What goes wrong and how to recover
---

# Common Pitfalls

## TLDR

Even with solid methodology, things go wrong. The difference between a successful project and a failed one is recognizing problems early and knowing the recovery pattern — which is usually: stop, write a task doc, start fresh.

---

## Pitfall 1: The Side-Task Spiral

**What happens:**
You're working on auth. You notice the header component has a bug. "Quick fix while I'm here." The quick fix reveals a state management issue. Now you're refactoring stores while your auth task sits half-done.

**Signs:**
- Current task paused for "just one more thing"
- Conversation context includes 3+ unrelated topics
- You've lost track of what the original task was
- Token costs are climbing but progress isn't

**Recovery:**
Stop. Ask AI to write a task doc for the side issue. Get back to the original task. Handle the side issue in a fresh conversation.

**Prevention:**
When AI mentions something outside the current task: "Good catch. Write a task doc for it. Let's stay on [current task]."

**The rule:** You cannot be too strict about starting fresh conversations. It's 9/10 the better choice.

---

## Pitfall 2: Overloading Conversations

**What happens:**
You pile multiple unrelated tasks into one conversation. "While we're here, also fix X and add Y and refactor Z." The conversation balloons to 100+ messages. AI is confused. Every response costs a fortune in input tokens because it's processing the entire bloated history.

**Signs:**
- Conversation has been going for hours
- You're paying for context that's only 20% relevant
- AI is mixing up details from different tasks
- Quality of output is declining

**Recovery:**
Close the conversation. For each remaining task, start a fresh conversation with just the relevant context.

**Prevention:**
One task = one conversation. Always. The cost of reloading docs in a fresh conversation is trivial compared to carrying 80 messages of irrelevant context.

---

## Pitfall 3: Going in Circles on Bugs

**What happens:**
You hit a bug. AI suggests a fix. Doesn't work. Another fix. Still broken. New error. AI suggests reverting. You've been at this for an hour.

**Signs:**
- Same error keeps appearing or morphing
- Fixes create new bugs
- AI is guessing rather than reasoning
- You're frustrated and throwing tokens at it

**Recovery:**
1. Stop immediately
2. Ask AI to write a task doc: what was the problem, what was tried, what's the current state, what should be tried next
3. Start a completely fresh conversation with the task doc
4. The fresh conversation often solves it in minutes because it doesn't have failed attempts polluting its reasoning

**Prevention:**
Set a 30-minute rule. If a bug isn't solved in 30 minutes, the approach is wrong, not just the code. Stop, document, restart.

---

## Pitfall 4: Skipping Plan Mode for Fixes

**What happens:**
"It's just a small fix, I'll skip plan mode." AI dives in, makes changes, breaks something else, tries to fix that, cascade of changes.

**Signs:**
- "Quick fix" turned into 20 minutes of changes
- Files modified that weren't related to the original fix
- Tests that were passing now fail
- Scope of changes far exceeds what you expected

**Recovery:**
Revert the changes. Start fresh. Use plan mode.

**Prevention:**
Plan mode for fixes is MORE important than plan mode for new features. New features have a task spec guiding them. Fixes don't — plan mode is the only checkpoint.

---

## Pitfall 5: Scope Creep

**What happens:**
You're building login. AI suggests "while we're here, let's add password reset, OAuth, 2FA..." Three days later you're still on "authentication."

**Signs:**
- Tasks keep expanding
- "Quick additions" pile up
- Original timeline is blown
- MVP features keep growing

**Recovery:**
Return to your sprint plan. Is this task done as originally scoped? Yes → close it. New ideas → new tasks for later.

**Prevention:**
"Good idea. Add it to the backlog. For now, let's finish the original scope."

---

## Pitfall 6: Weak Documentation Leading to Bad Output

**What happens:**
Your .clinerules says "try to write tests." Your ARCHITECTURE.md has vague descriptions instead of schemas. AI takes the path of least resistance: skips tests, guesses at schemas, produces mediocre code.

**Signs:**
- AI output quality feels inconsistent
- Schema mismatches between what AI writes and what exists
- Tests are superficial or missing
- Different parts of the code use different patterns

**Recovery:**
Invest a session in strengthening your docs. Add real schemas to ARCHITECTURE.md. Make .clinerules iron-clad ("tests are mandatory" not "try to test"). Add patterns and conventions.

**Prevention:**
Invest in documentation quality upfront. The time spent writing thorough ARCHITECTURE.md and strict .clinerules pays back 50x in consistent AI output.

---

## Pitfall 7: Not Using Claude Projects for New Features

**What happens:**
You want to add a feature. Instead of going back to Claude with the repo synced in a Project, you just tell Cline "add feature X." Without the strategic brainstorming, the implementation is narrow, misses edge cases, and doesn't fit well with the existing architecture.

**Signs:**
- New feature feels bolted-on rather than integrated
- Architectural inconsistencies
- Missing pieces discovered during testing
- Rework needed to fit with existing code

**Recovery:**
Stop. Go to Claude (Opus, Project with repo synced). Have the brainstorming conversation. Generate proper task specs. Then execute.

**Prevention:**
New features always start with a conversation in Claude. Fixes and tweaks can go straight to Cline/Claude Code. Know the difference.

---

## Pitfall 8: Confidence Inflation

**What happens:**
AI rates everything 8/10. You don't verify. Later, bugs emerge in production.

**Signs:**
- Every task is 8/10+ with thin justification
- You're not manually testing
- "Tests pass" but tests are superficial
- Bugs appear during integration

**Recovery:**
For the next few tasks, verify everything yourself. Run the code. Try edge cases. Read the tests — do they test real behavior?

**Prevention:**
Trust but verify. AI's confidence score is a starting point. Your manual testing confirms it.

---

## Quick Recovery Checklist

When a project feels off-track:

1. [ ] Am I in a conversation that's too long? → Start fresh
2. [ ] Am I working on a side task? → Write task doc, refocus
3. [ ] Am I going in circles? → Write task doc, start fresh
4. [ ] Are my docs up to date? → Quick review and update
5. [ ] Am I actually testing? → Be honest
6. [ ] Did I skip plan mode? → Go back to plan mode
7. [ ] Is scope still reasonable? → Check sprint plan

Most problems resolve with: **stop, write a task doc, start a fresh conversation.**

---

**Next:** [Team Workflows](/part-5/team-workflows) — Adapting this for multiple people.
