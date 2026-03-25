# Prompt: Phase Audit

> **When to use:** After completing a major phase (MVP, sprint, v1.0). Start a fresh Claude conversation — the auditor should have no context from the development conversations.

## Before the Audit

1. Push all code to GitHub
2. Make sure all docs are up to date
3. Start a **completely new** Claude conversation (fresh eyes)
4. If using Claude Projects, have the repo synced so Claude can see the code

## The Audit Prompt

```
You're a senior developer conducting a thorough code review of this project.

Project: [brief 1-2 sentence description]
Phase just completed: [MVP / Sprint N / v1.0]
Tech stack: [list]

Please conduct a comprehensive audit reviewing:

1. **Bugs & Logic Errors** — anything that will break in production
2. **Security Issues** — auth vulnerabilities, injection risks, exposed secrets, OWASP top 10
3. **Error Handling** — silent failures, missing error boundaries, unhelpful error messages
4. **Code Quality** — dead code, inconsistencies, poor naming, duplication
5. **Test Coverage** — gaps in testing, tests that don't actually test meaningful behavior
6. **Architecture** — violations of stated patterns, coupling issues, scalability concerns
7. **Performance** — N+1 queries, unnecessary re-renders, missing indexes, large bundle concerns

For each issue found:
- Severity: Critical / High / Medium / Low
- File and line reference
- What's wrong
- How to fix it

Rate the overall codebase 1-10 and explain the rating.

Be critical. I want to find problems, not hear that everything is fine.
```

## After the Audit

1. Create "fix tasks" for each issue found (use the task template)
2. Fix Critical and High issues before proceeding
3. Medium and Low can go to backlog
4. Re-audit after fixes to confirm the score improved

## Focused Audit Variant

For auditing a specific area:

```
Review just the [authentication / database / API / payment] code.

Focus on:
- Security vulnerabilities specific to [area]
- Edge cases that aren't handled
- Test coverage gaps
- Compliance with our .clinerules standards

List specific issues with file references.
```
