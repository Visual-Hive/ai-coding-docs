# Vibe Coding Guide - Complete Chapter Outline

This document provides detailed outlines for all remaining chapters. Each can be completed as a separate "task" using Cline with the methodology itself.

---

## Part II: Pre-Development Phase

### Chapter 3: The Brainstorming Session ✅ (STARTED - needs completion)

**Status:** Partially complete, needs full content

**TLDR Section:** ✅ Done

**Sections to Add:**
1. Step-by-step guide for the conversation
   - Preparation checklist
   - Opening prompt template
   - Questions to ask AI
   - How to iterate
   - When you know you're done
2. Real example walkthroughs (2-3)
   - Conference networking app (full conversation)
   - RISE development (what was discussed)
   - Simple dashboard example
3. Common patterns and how AI responds
   - "Everything is essential" pattern
   - "I don't know what's core" pattern  
   - "Too technical, not enough product" pattern
   - "Unrealistic timeline" pattern
4. Templates for common project types
   - SaaS application
   - Mobile app
   - Internal tool
   - API service
5. Red flags that scope needs adjustment
6. Outputs from successful session (document templates)

**Key Examples:**
- Full conversation transcript (sanitized)
- Before/after scope comparison
- Cost estimates given by AI
- Technical decision rationale examples

---

### Chapter 4: Documentation Architecture

**TLDR:**
- What: Create project "DNA" before any coding
- Why: Gives AI and humans consistent reference
- Output: 5-7 key documents that guide all development
- Time: 2-4 hours after brainstorming session
- Tool: Claude web or Cline in Plan Mode

**Main Sections:**

1. **The Five Core Documents**
   - README.md (project overview + current phase)
   - ROADMAP.md (Phases → Tasks → Subtasks)
   - CLAUDE_RULES.md (development standards)
   - TASK_TEMPLATE.md (format for all tasks)
   - LEARNINGS.md (project-specific insights)

2. **README.md Structure**
   - Project vision (full scope)
   - Current phase (MVP v0.1)
   - Setup instructions
   - Architecture overview
   - Success criteria
   - Template with examples

3. **ROADMAP.md Structure**
   - How to break into phases
   - How to break phases into tasks
   - How to size subtasks (context window aware)
   - Dependency mapping
   - Template with RISE example

4. **CLAUDE_RULES.md Structure**
   - Development standards (commenting, testing)
   - Confidence scoring requirements
   - When to ask for human help
   - Technology-specific rules (if applicable)
   - Quality gates
   - Template with comprehensive example

5. **TASK_TEMPLATE.md Structure**
   - Task overview section
   - Implementation checklist
   - Confidence scoring format
   - Unit testing requirements
   - Documentation requirements
   - Complete template

6. **LEARNINGS.md Structure**
   - How to use it (one-shot notepad)
   - What to document (solutions, decisions, gotchas)
   - Format for entries
   - How it helps later tasks
   - Example entries from real project

7. **Optional Documents**
   - TECHNICAL_DECISIONS.md (from brainstorming)
   - DEFERRED_FEATURES.md (from brainstorming)
   - ARCHITECTURE.md (for complex projects)
   - API_SPEC.md (for API projects)

8. **Prompts to Generate Documents**
   - Exact prompts to use with Claude
   - How to iterate on generated docs
   - Verification checklist

**Key Examples:**
- Complete document set from RISE
- Document set from simple project
- Document set from complex refactor

**Templates to Provide:**
- All 5 core documents as copy-paste templates
- Technology-specific variations (React, Node, Python, etc.)

---

### Chapter 4b: The Live Project Overview ✅ COMPLETE

**Status:** Shipped at `docs/part-2/live-project-overview.md`. Templates at `project-templates/overview/`, `project-templates/domain.config.js`, `project-templates/scripts/generate-overview.js`. `.clinerules` and `CLAUDE.md` updated with Live Project Overview Conventions.

**Premise:** Static foundation docs (`README`, `ARCHITECTURE`) drift from reality the moment coding starts. The Live Project Overview is a small, regenerated, AI-readable snapshot of the actual current state of the project — read on every task, kept fresh by a generator + lightweight conventions, with drift detection wired in.

---

## Part III: Execution Methodology

### Chapter 5: The Cline Workflow

**TLDR:**
- What: Plan → Act cycle with new chat per task
- Why: Prevents context pollution, maintains quality
- Pattern: "Can we please plan task X?" → Review → "Act Mode" → Execute
- Key: Minimal prompting, AI references docs
- Result: Consistent quality, autonomous execution

**Main Sections:**

1. **The Core Cycle**
   - Open new Cline chat for each task
   - Plan Mode: "Can we please plan task X?"
   - Review plan, ask questions
   - Act Mode: Let Cline execute
   - Terminal approval workflow
   - Task completion verification

2. **Why New Chat Per Task**
   - Context pollution explained
   - Token efficiency
   - Focus maintenance
   - Real examples of when it helps

3. **The Minimal Prompting Technique**
   - Why "Can we please plan task X?" works
   - What AI references automatically
   - When to provide more context
   - When less is more

4. **Plan Mode Workflow**
   - What AI does in Plan Mode
   - Questions it asks
   - How to review plans
   - Adjusting before execution

5. **Act Mode Workflow**
   - Switching to Act Mode
   - What to expect
   - Terminal command approval
   - When to intervene

6. **Terminal Approval Best Practices**
   - What to approve automatically
   - What to review carefully
   - When to modify commands
   - Red flags to watch for

7. **Visual Verification**
   - When automated tests aren't enough
   - How to prompt for visual checks
   - What to look for
   - Screenshot documentation

8. **Task Completion**
   - Confidence score review
   - Verification checklist
   - Documentation update
   - Moving to next task

9. **Complete Walkthrough**
   - Task 1 start to finish
   - Task 2 building on Task 1
   - Task 3 with learnings reference
   - Full example from RISE

**Key Examples:**
- Actual Cline conversation transcripts
- Before/after code examples
- Confidence score examples
- Terminal approval decision examples

---

### Chapter 6: Task Documentation Patterns

**TLDR:**
- Simple projects: One doc per subtask
- Complex projects: Three docs per subtask (README, CHANGELOG, Implementation)
- AI adapts documentation complexity automatically
- All tasks include confidence scoring
- Documentation becomes knowledge base

**Main Sections:**

1. **Single Document Pattern** (Simple Projects)
   - When to use
   - Document structure
   - Example from simple dashboard
   - Template

2. **Triple Document Pattern** (Complex Projects)
   - When to use (Electron apps, refactors, etc.)
   - README per subtask
   - CHANGELOG per subtask (live updates)
   - IMPLEMENTATION per subtask
   - Example from RISE or Electron refactor
   - Templates for each

3. **Confidence Scoring in Practice**
   - How AI evaluates itself
   - Criteria definition
   - Must-have vs nice-to-have
   - Evidence documentation
   - Real examples with commentary

4. **Live Changelogs**
   - What AI writes here
   - Why it's valuable
   - Example entries
   - How it helps debugging

5. **Adaptive Documentation**
   - How AI decides which pattern to use
   - Can you guide it?
   - When to use which
   - Override prompts

**Key Examples:**
- Complete task doc from simple project
- Complete 3-doc set from complex project
- Confidence score examples (7/10, 8/10, 9/10)
- Changelog entries showing evolution

---

### Chapter 7: Confidence Scoring System

**TLDR:**
- AI scores every subtask out of 10
- Must define criteria for score
- Cannot proceed if < 8/10
- Must show evidence criteria are met
- Human final approval

**Main Sections:**

1. **How Confidence Scoring Works**
   - The 8/10 threshold and why
   - Score scale interpretation
   - When to adjust threshold

2. **Defining Success Criteria**
   - Must-have criteria (required for score)
   - Nice-to-have criteria (bonus points)
   - How AI generates these
   - How to review/adjust

3. **Evidence Requirements**
   - Test results
   - Manual verification
   - Code review checklist
   - Documentation completion

4. **What to Do When Score is Low**
   - 6/10 or 7/10 - must fix
   - AI identifies gaps
   - Fixing workflow
   - Re-scoring

5. **Human Override**
   - When to accept 7/10
   - When to demand 9/10
   - How to communicate standards

6. **Confidence Scores Across Project**
   - Tracking over time
   - Patterns to watch
   - Phase readiness indicator

**Key Examples:**
- 5 real confidence score examples with full criteria
- Low score → fix → re-score workflow
- Human override discussion
- Phase completion with all scores

---

## Part IV: Quality Assurance

### Chapter 8: The Phase Audit Process

**TLDR:**
- Between phases, push to GitHub
- Use separate Claude web instance as "senior developer"
- Independent audit catches accumulated issues
- Creates "annex tasks" for fixes
- Must reach 9/10 before next phase

**Main Sections:**

1. **When to Audit**
   - After each major phase
   - Before starting v1.0 features
   - Before production deployment
   - Red flags that trigger audit

2. **Setup Process**
   - Push to GitHub
   - Create Claude web Project
   - Sync repository
   - Why separate instance matters

3. **The Audit Prompt**
   - Exact template to use
   - Context to provide
   - Questions to ask
   - Full example

4. **Reviewing Audit Results**
   - Critical vs important vs minor issues
   - How to prioritize fixes
   - When to push back on AI findings
   - Real audit example with issues

5. **Creating Annex Tasks**
   - Format for annex tasks
   - Priority assignment
   - Time estimation
   - Executing with Cline

6. **Re-Audit After Fixes**
   - Verification process
   - Final score
   - When to proceed
   - When to iterate more

7. **Audit as Documentation**
   - Saving audit results
   - Future reference value
   - Quality progression tracking

**Key Examples:**
- Complete audit report from RISE phase 1
- Annex task list example
- Before/after audit scores
- Fixed code examples

---

### Chapter 9: The Commenting Philosophy

**TLDR:**
- 50% comments, 50% code (intentionally "excessive")
- Why: Knowledge transfer to future developers/AI
- Every function documented
- Every decision explained
- Code tells a story

**Main Sections:**

1. **Why "Overkill" Commenting Works**
   - Future developer handoff
   - Future AI context
   - Debugging clarity
   - Maintenance ease
   - Real ROI calculation

2. **What to Comment**
   - Function purpose and rationale
   - Algorithm choices and why
   - Trade-offs considered
   - Edge cases handled
   - Future enhancement notes

3. **Comment Structure**
   - Docstrings for functions
   - Inline comments for logic
   - Block comments for sections
   - TODOs for deferred items
   - Examples in comments

4. **AI-Generated Comments**
   - Quality of AI comments
   - How to prompt for better comments
   - Reviewing AI comments
   - When to edit

5. **Comments vs Documentation**
   - Code comments (how/why)
   - External docs (what/when)
   - Balance between both

6. **Real Examples**
   - Under-commented code
   - Well-commented code
   - "Overkill" commented code
   - Which is better for maintenance?

**Key Examples:**
- Same function with different comment levels
- Complex algorithm with full reasoning
- Refactored code with change rationale
- Bug fix with explanation

---

## Part V: Advanced Topics

### Chapter 10: Context Window Management

**TLDR:**
- Context windows are ~200k tokens
- Subtasks must fit within limits
- New chat per task prevents pollution
- Document references instead of history
- Compaction vs clearing strategies

**Main Sections:**

1. **Understanding Context Windows**
   - What they are
   - Token counting
   - Why they matter
   - Limits of current models

2. **Sizing Subtasks**
   - How to estimate token size
   - Rule of thumb for subtask scope
   - When to split further
   - Dependency management

3. **New Chat Strategy**
   - Why it works
   - What's lost
   - What's gained
   - When to make exception

4. **Document vs Chat History**
   - Loading context from docs
   - Why better than chat history
   - What to document
   - Update frequency

5. **When Context Fills Up**
   - Warning signs
   - Compaction techniques
   - Clearing strategies
   - Starting fresh

6. **Large Codebase Strategies**
   - Working with 10k+ line projects
   - File organization
   - Module isolation
   - Selective context loading

**Key Examples:**
- Token count calculations
- Task that's too big → split example
- Context pollution example
- Recovery strategies

---

### Chapter 11: Common Pitfalls & Recovery

**TLDR:**
- Even with methodology, things go wrong
- Recognize patterns early
- Recovery strategies exist
- Learn from mistakes
- Iterate on process

**Main Sections:**

1. **Scope Creep During Development**
   - Warning signs
   - How it happens
   - Prevention
   - Recovery (re-scope)

2. **Confidence Score Inflation**
   - AI over-confident
   - Catching it early
   - Stricter criteria
   - Human verification

3. **Context Pollution Despite New Chats**
   - How it still happens
   - Detection
   - Clearing documents
   - Fresh start protocol

4. **Technical Debt Accumulation**
   - MVP vs production code
   - When to refactor
   - Debt documentation
   - v1.0 cleanup phase

5. **Integration Issues**
   - Subtasks work individually, not together
   - Testing integration early
   - Integration task structure
   - Recovery process

6. **Deadlocks and Circular Issues**
   - AI going in circles
   - Breaking the loop
   - Human intervention triggers
   - When to escalate

7. **Budget Overruns**
   - Tracking token usage
   - Red flags
   - Cutting scope mid-project
   - Cost control strategies

**Key Examples:**
- Real problem scenarios
- Decision trees for recovery
- Before/after fixes
- Cost overrun recovery

---

### Chapter 12: Scaling to Teams

**TLDR:**
- Methodology works for teams
- Shared documentation critical
- Git workflow matters
- Task ownership
- Code review process

**Main Sections:**

1. **Team Documentation Standards**
   - Shared CLAUDE_RULES
   - Contribution guidelines
   - Review process
   - Knowledge sharing

2. **Git Workflow**
   - Branch strategy
   - PR structure
   - AI-assisted reviews
   - Merge process

3. **Task Ownership**
   - Assigning tasks
   - Parallel work
   - Dependencies
   - Communication

4. **Code Review with AI**
   - Human + AI review
   - What each checks
   - Review checklist
   - Feedback loops

5. **Onboarding New Team Members**
   - Documentation as onboarding
   - First task structure
   - Mentorship + AI
   - Ramp-up timeline

6. **Team Audits**
   - Peer reviews
   - AI audits
   - Combined approach
   - Frequency

**Key Examples:**
- Team CLAUDE_RULES
- PR template
- Review checklist
- Multi-developer project structure

---

### Chapter 12b: The Project Control Panel ✅ COMPLETE

### Chapter 12c: The Frontend Tweaker ✅ COMPLETE

**File:** `docs/part-5/control-panel.md`
**Status:** Written and published

A chapter documenting the control panel pattern — a localhost admin dashboard that gives visibility into deployment health, data state, automation flows, and security in AI-coded projects. Based on real experience from OpsNest Sprint 3.

**Covers:**
- The Problem (black box backends)
- The Four Tabs: Deployment Centre, Data Browser, Automation Visualiser, Security & Testing
- Convention files and `.clinerules` rules
- When to build it (minimum viable vs full)
- OpsNest learnings

---

### Chapter 12d: Token Economics ✅ COMPLETE

**File:** `docs/part-5/token-economics.md`
**Status:** Written and published. `.clineignore` template + Cost Hygiene Rules added to `.clinerules` / `CLAUDE.md` / `docs/part-6/templates.md`.

The cost-control chapter for AI-assisted development. Documents where token spend actually comes from (re-sent context per turn, not "AI thinking"), the four canonical leaks (open tabs, missing `.clineignore`, polling loops, sub-agent fan-out), and concrete patterns to keep cost predictable: `.clineignore`, hard stop after 3 failures, Plan-mode default, `new_task` for long sessions, max-requests-per-task circuit breaker, auto-approve OFF.

---

### Chapter 12e: Deployment & Platform Targets ✅ COMPLETE

**File:** `docs/part-5/deployment-platforms.md`
**Status:** Written and published. Includes "The Non-Polling Deploy Pattern" section + build-on-server template (`project-templates/scripts/deploy.sh`, `Dockerfile`, `.dockerignore`) + Deploy Rules added to `.clinerules` / `CLAUDE.md` / `docs/part-6/templates.md`.

Covers Docker for local dev, Netlify/Vercel for static frontends, Hetzner for VPS production with strict dev/prod separation, Capacitor/PWA for mobile, Tauri/Electron for desktop, the SvelteKit cache-staleness trap, and — most importantly — the Non-Polling Deploy Pattern that prevented the OpsNest $30 polling-loop disaster from being repeatable.

---

## Part VI: Practical Resources

### Chapter 13: Complete Template Library

**TLDR:**
- Copy-paste ready templates
- All core documents
- Technology-specific variations
- Project type variations
- Customization guide

**Templates to Provide:**

1. **Core Templates**
   - README.md template
   - ROADMAP.md template
   - CLAUDE_RULES.md template
   - TASK_TEMPLATE.md template
   - LEARNINGS.md template

2. **Tech Stack Variations**
   - React + Node
   - Python + FastAPI
   - Ruby on Rails
   - Mobile (React Native)
   - Desktop (Electron)

3. **Project Type Templates**
   - SaaS application
   - API service
   - Internal tool
   - Mobile app
   - Data pipeline

4. **Phase Templates**
   - MVP phase structure
   - v1.0 phase structure
   - Production phase structure

5. **Task Templates**
   - Simple CRUD task
   - Authentication task
   - Complex algorithm task
   - Refactor task
   - Integration task

**Format:**
- Each template as separate file
- Inline comments explaining sections
- Customization instructions
- Examples filled in

---

### Chapter 14: Prompt Library

**TLDR:**
- Proven prompts for each phase
- Brainstorming prompts
- Planning prompts
- Execution prompts
- Audit prompts
- Debugging prompts

**Prompt Categories:**

1. **Brainstorming Prompts**
   - Initial vision discussion
   - MVP scoping
   - Technical decisions
   - Timeline estimation

2. **Planning Prompts**
   - Task breakdown
   - Subtask definition
   - Dependency identification
   - Risk assessment

3. **Execution Prompts**
   - "Can we please plan task X"
   - "Switch to Act Mode"
   - Debugging prompts
   - Testing prompts

4. **Audit Prompts**
   - Phase audit request
   - Code review request
   - Security audit
   - Performance review

5. **Recovery Prompts**
   - Re-scoping conversation
   - Debugging circular issues
   - Integration problem solving
   - Optimization requests

**Format:**
- Template with [PLACEHOLDERS]
- Explanation of each section
- When to use
- Expected output

---

### Chapter 15: Case Studies

**TLDR:**
- Real projects with full details
- Different complexity levels
- Lessons learned from each
- Timeline and cost breakdowns
- What worked, what didn't

**Case Studies to Include:**

1. **RISE (Complex Desktop App)**
   - Full project details
   - Brainstorming outputs
   - Task structure
   - Challenges faced
   - Final results
   - GitHub link

2. **Simple Dashboard (Postgres + Qdrant)**
   - Project scope
   - Timeline: 2-3 weeks
   - Cost: ~$250
   - Task breakdown
   - Code samples

3. **Electron App Refactor (Complex)**
   - Refactoring existing code
   - Triple-document pattern
   - Learnings captured
   - Results

4. **Failed Project (Learning)**
   - What went wrong
   - Why it failed
   - How methodology could have helped
   - Lessons learned

**Format for Each:**
- Project overview
- Brainstorming session summary
- Documentation structure
- Task breakdown (selected examples)
- Confidence scores
- Audit results
- Final outcome
- Metrics (time, cost, LOC)
- Lessons learned

---

### Chapter 16: Tool Configuration & Setup

**TLDR:**
- Step-by-step setup guides
- Configuration files
- VS Code settings
- CLI tools installation
- VitePress/Docusaurus setup for docs
- Troubleshooting

**Sections:**

1. **Cline Setup**
   - Installation
   - Configuration
   - API key setup
   - Testing

2. **Claude Code Setup**
   - Installation
   - Configuration
   - Usage basics

3. **Claude Web Setup**
   - Account setup
   - Project creation
   - GitHub integration

4. **Git Configuration**
   - Best practices
   - .gitignore templates
   - Commit message format

5. **Project Structure Generator**
   - Script to create structure
   - All template files
   - One-command setup

6. **Documentation Site Setup**
   - VitePress installation
   - Docusaurus installation
   - Configuration for this guide format
   - Deployment options

**Deliverable:**
- Setup script that creates full project structure
- Config files for tools
- Documentation site template

---

### Chapter 17: VitePress/Docusaurus Site Setup

**TLDR:**
- How to publish this guide
- VitePress vs Docusaurus choice
- Configuration files
- Theme customization
- Deployment to subdomain

**Main Sections:**

1. **Tool Selection: VitePress vs Docusaurus**
   - Comparison table
   - Recommendation based on needs
   - Migration between them

2. **VitePress Setup**
   - Installation
   - Directory structure
   - config.ts setup
   - Sidebar navigation
   - Theme customization
   - Building and deployment

3. **Docusaurus Setup**
   - Installation
   - Directory structure
   - docusaurus.config.js
   - Sidebar navigation  
   - Theme customization
   - Building and deployment

4. **Converting Existing Markdown**
   - Frontmatter requirements
   - File structure
   - Internal linking
   - Assets handling

5. **Deployment**
   - Subdomain setup
   - Build process
   - GitHub Pages
   - Vercel deployment
   - Netlify deployment
   - Custom domain

6. **Maintenance**
   - Updating content
   - Version management
   - Search integration
   - Analytics

**Deliverables:**
- Complete config files for both platforms
- Deployment scripts
- Theme customization examples
- This exact guide as working example

---

## Appendices

### Appendix A: Glossary

Terms and definitions:
- Vibe Coding
- Extended Thinking
- Confidence Scoring
- Context Window
- MVP-First
- Phase Audit
- Annex Task
- Documentation Architecture
- etc.

### Appendix B: FAQ

Common questions:
- "Can I use other AI models?"
- "What if I don't know how to code?"
- "How do I handle sensitive data?"
- "Can this work for non-web projects?"
- "What about testing?"
- etc.

### Appendix C: Troubleshooting Guide

Common issues and solutions:
- Context window errors
- API rate limits
- Cline not responding
- Bad code generation
- Confidence score disagreements
- etc.

### Appendix D: Resources & Links

- Official Claude documentation
- Community Discord/Forums
- Example repositories
- Video tutorials
- Blog posts
- Related methodologies

---

## Meta: Completing This Documentation

**Suggested Approach:**

1. Create new Cline chat
2. Load this outline
3. For each chapter:
   ```
   You: "Can we please write Chapter X based on the outline?
        Reference the completed chapters for style/format.
        Include TLDR, all sections, examples, and templates."
   ```
4. Review output
5. Move to outputs directory
6. Repeat for next chapter

**Estimated Effort:**
- Each chapter: 30-60 minutes
- Total: 15-20 hours over 1-2 weeks
- Perfectly manageable with methodology

**The beautiful irony:** 
You're using the exact methodology documented in the guide to complete the guide itself. Documentation-first, task-based, confidence scoring, the whole thing.

**Final deliverable:**
Complete VitePress or Docusaurus site at vibecoding.yourdomain.com with this full methodology documented and proven with RISE as the example.
