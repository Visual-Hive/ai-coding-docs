---
title: Commenting Philosophy
description: Why heavy commenting pays off in AI-assisted development
---

# Commenting Philosophy

## TLDR

Aim for 50% comments. Sounds excessive—it's not.

Future you, future developers, and AI in future sessions all need to understand *why* you made decisions, not just *what* the code does.

---

## The Case for Heavy Comments

Traditional wisdom: "Good code is self-documenting. Minimize comments."

That advice assumes:
- The same person maintains the code
- They remember their decisions
- They have full context

AI-assisted development breaks all three:
- AI has no memory between sessions
- You forget decisions after a few weeks
- Context gets lost

Comments are how you preserve context.

---

## What to Comment

**The "why" behind decisions:**

```python
# Skills weighted 2x because professional connections
# matter more than hobby overlap at business events.
# Revisit weighting after user feedback in v1.0.
score = (skills_overlap * 2) + interests_overlap
```

Without that comment, someone later asks "why multiply by 2?" and nobody knows.

**Non-obvious behavior:**

```javascript
// Intentionally delay 100ms before redirect.
// Immediate redirect causes flash of unstyled content
// on slower connections. See LEARNINGS.md 2024-12-10.
await sleep(100);
window.location.href = '/dashboard';
```

**Trade-offs you considered:**

```python
# Using simple tag matching instead of vector similarity.
# Vectors are more accurate but 10x slower for 1000+ users.
# Good enough for MVP. Upgrade path: switch to Qdrant in v1.0.
def match_users(user1, user2):
    ...
```

**Deferred decisions:**

```javascript
// TODO(v1.0): Add rate limiting here.
// For MVP, we trust our small user base.
// Before public launch, add express-rate-limit.
app.post('/api/login', async (req, res) => {
    ...
});
```

---

## What NOT to Comment

**The obvious:**

```python
# Bad: explains what, not why
i = i + 1  # increment i

# Also bad
user = get_user(id)  # get the user
```

**Lies:**

```python
# Connects to production database
def connect():
    return connect_to_staging()  # Comment is wrong!
```

Outdated comments are worse than no comments. When you change code, update comments.

---

## Function Documentation

Every function gets a docstring explaining:
- What it does (one sentence)
- Why it exists (if not obvious)
- Parameters and return value
- Example if helpful

```python
def calculate_match_score(user1, user2):
    """
    Calculate networking match score between two users.
    
    Higher scores = better match for business networking.
    Skills weighted 2x because professional overlap matters more.
    
    Args:
        user1: User dict with 'skills' and 'interests' lists
        user2: User dict with 'skills' and 'interests' lists
    
    Returns:
        int: Score from 0-20 (typical range)
    
    Example:
        >>> calculate_match_score(
        ...     {'skills': ['python'], 'interests': ['hiking']},
        ...     {'skills': ['python', 'js'], 'interests': ['hiking']}
        ... )
        3  # (1 skill * 2) + (1 interest * 1)
    """
    skills_overlap = len(set(user1['skills']) & set(user2['skills']))
    interests_overlap = len(set(user1['interests']) & set(user2['interests']))
    return (skills_overlap * 2) + interests_overlap
```

Takes 60 seconds to write. Saves hours of "what does this do?" later.

---

## The AI Memory Problem

When you start a new task session, AI reads your code. 

**Uncommented code:**
```python
def process(data):
    if len(data) > 1000:
        data = data[:1000]
    result = transform(data)
    time.sleep(0.1)
    return result
```

AI thinks: "Why truncate at 1000? Why sleep? What does transform do?" It guesses, often wrong.

**Commented code:**
```python
def process(data):
    # Limit to 1000 items - API rate limit is 1000/minute
    if len(data) > 1000:
        data = data[:1000]
    
    result = transform(data)
    
    # Brief delay prevents hitting rate limit on rapid successive calls
    time.sleep(0.1)
    
    return result
```

AI knows exactly what's happening and why. It makes better decisions.

---

## The Three-Month Test

When writing comments, ask: "Will I understand this in three months?"

If you're writing something clever or non-obvious, you won't remember why. Comment it now.

```javascript
// This regex looks insane but it handles:
// - International phone formats (+1, +44, etc.)
// - Optional parentheses around area code
// - Spaces, dashes, or dots as separators
// Tested against 500 real phone numbers from user data.
const phoneRegex = /^\+?[\d\s\-().]{10,}$/;
```

Future you will be grateful.

---

## Making the Codebase AI-Navigable

Comments explain "why." But there's a deeper layer: making the codebase a map that AI can navigate to find its own past work and translate the user's understanding of the app into the code itself.

**The problem:** What the user sees ("the pricing section on the homepage") and what exists in code (`src/components/landing/FeatureGrid.svelte`) are completely different languages. When the user says "the pricing cards are misaligned," Cline needs to find the right file, the right component, the right CSS rule. In a large project, this is surprisingly hard.

**The solution:** Build identification into the code from the start.

**Meaningful element IDs and data attributes:**

```html
<!-- Bad: AI can't find this from "the pricing section" -->
<div class="grid grid-cols-3 gap-4">

<!-- Good: AI can grep for this -->
<div id="pricing-cards-section" data-component="PricingCards" class="grid grid-cols-3 gap-4">
```

**Component-level comments that describe what the user sees:**

```svelte
<!--
  COMPONENT: PricingCards
  USER-FACING: The three pricing tier cards on the homepage (/pricing section)
  DISPLAYS: Free, Pro, and Enterprise tiers with feature lists
  DATA SOURCE: static-data/pricing-tiers.json
-->
```

**The control panel reinforces this pattern.** When using the [Project Control Panel](/part-5/control-panel), the conventions around `deployment.json`, `flow-registry.js`, and `USER_JOURNEYS.json` all serve the same purpose — creating a structured, searchable index of the application that both human and AI can navigate.

In advanced projects, you can take this further: baking descriptions into element attributes that an AI assistant can read at runtime, enabling it to understand which part of the application the user is interacting with. This makes the codebase a living, interactive map of the application — and it makes future AI work dramatically more efficient.

---

## Quick Checklist

Before finishing a task:

- [ ] Every function has a docstring
- [ ] Non-obvious code has inline comments explaining "why"
- [ ] Trade-offs are documented
- [ ] TODOs reference when they should be done (v1.0, Phase 2, etc.)
- [ ] No commented-out code (delete it, git has history)

---

## The ROI

Heavy commenting adds maybe 20% to writing time. It saves:

- Hours debugging "why does this work this way?"
- Rework from AI misunderstanding your code
- Onboarding time for new developers
- Your own confusion returning after a break

20% more effort for 10x less pain. Good trade.

---

**Next:** [Context Management](/part-5/context-management) — Keeping AI focused across sessions.