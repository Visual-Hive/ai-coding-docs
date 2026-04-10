---
title: Concepts Glossary
description: Plain-English explanations of terms you'll hear constantly
---

# Concepts Glossary

A no-jargon reference for things that get thrown around in development. Come back to this whenever you see a term you don't recognise.

---

## Project Files and Folders

**`package.json`** — The ID card for your project. Lists its name, what packages it depends on, and what commands are available (like "start the dev server" or "build for production"). When you see `npm install`, it reads this file to know what to download.

**`package-lock.json`** — A detailed record of the exact version of every package that was installed. You don't edit this manually — npm manages it. It exists so that everyone working on the project gets the exact same package versions.

**`node_modules/`** — The folder where npm puts all the packages your project depends on. It's often enormous (hundreds of MB) and contains thousands of files. This is normal. Never edit files inside it. Never commit it to Git. If something goes wrong, delete it entirely and run `npm install` to regenerate it.

**`.env`** — A file containing secret configuration values: API keys, database passwords, server URLs. The dot prefix means it's a hidden file. This should **never** be committed to Git. Put variable names (without actual values) in `.env.example` so others know what's needed.

**`.gitignore`** — A list of files and folders that Git should not track. Your `.gitignore` should include `node_modules/`, `.env`, and any other files with secrets or generated content. If something sensitive gets into Git, it stays in the history forever, even after you delete it.

**`.clinerules` / `CLAUDE.md`** — Instructions for your AI assistant. Cline (in VS Code) reads `.clinerules`, Claude Code CLI reads `CLAUDE.md`. Both files serve the same purpose — they tell the AI how to behave: what standards to follow, what to read before working, what not to do. Think of it as the AI's employee handbook. Most projects include both files with identical content so the rules apply regardless of which tool is used.

**`README.md`** — The front page of your project. Describes what the project does, how to set it up, and how it's structured. GitHub displays this automatically when someone visits your repo.

**`static/` or `public/`** — Where images, fonts, and other files go that should be served as-is. See [Adding Files and Styling Basics](/part-0/files-and-styles) for details.

---

## Git and GitHub

**Git** — Software that tracks every change to every file in your project. Like "Track Changes" in Word, but for an entire folder. Runs on your computer.

**GitHub** — A website where your Git repository lives online. It's the backup, the collaboration hub, and often the deployment source.

**Repository (repo)** — Your project, tracked by Git. It includes all your files plus the complete history of every change.

**Commit** — A snapshot of your project at a specific moment. When you "commit," you're saying "save this state with a description of what changed." Each commit has a message like "Add login form" or "Fix header alignment."

**Push** — Upload your commits from your computer to GitHub. Until you push, your changes only exist locally.

**Pull** — Download the latest changes from GitHub to your computer. Important when collaborating or when you've made changes from multiple machines.

**Clone** — Download an entire repository from GitHub to your computer for the first time.

**Branch** — A parallel version of your code. The main branch (called `main`) is the primary version. You can create branches to experiment without affecting `main`, then merge them back when you're done. For solo projects following this methodology, you'll mostly work on `main` directly.

---

## Development Concepts

**IDE** (Integrated Development Environment) — A fancy text editor for code. VS Code is an IDE. It's where you write, edit, and manage your project.

**Terminal / Command Line / Console / Shell** — The text-based interface where you type commands. They're all roughly the same thing. See [Setting Up Your Computer](/part-0/setting-up-your-computer) for getting comfortable with it.

**npm** (Node Package Manager) — The tool that installs JavaScript packages. `npm install` downloads packages. `npm run dev` starts your dev server. `npm run build` creates the production version of your app.

**Dependencies** — Packages your project needs to work. Listed in `package.json`. When you see Cline run `npm install some-package`, it's adding a dependency.

**Build** — The process of converting your development code into optimised production code. Development code is easy to read and edit. Built code is compressed, minified, and optimised for speed. You run the dev version locally; the built version goes on the server.

**Dev Server** — A local web server that runs your app during development. It auto-refreshes when you change code (called "hot reload"). It's started with commands like `npm run dev` and runs until you press Ctrl+C to stop it.

**Linter** — A tool that checks your code for common mistakes, like a grammar checker for code. ESLint is the most common for JavaScript. It shows warnings and errors without running the code.

**Formatter** — A tool that makes your code look consistent (indentation, spacing, line breaks). Prettier is the most common. It doesn't change what the code does, just how it looks.

---

## Web Development Concepts

**Frontend** — What the user sees and interacts with. HTML, CSS, JavaScript, the browser. The visual part.

**Backend** — What runs on the server. Handles data, authentication, business logic. The user never sees this directly.

**Full-stack** — Both frontend and backend together.

**API** (Application Programming Interface) — A structured way for your frontend to talk to your backend (or to external services). When your app fetches user data, it makes an API call. It's like a waiter taking orders between the kitchen and the dining room.

**Framework** — A pre-built structure that handles common patterns so you don't start from scratch. SvelteKit, Next.js, and Nuxt are web frameworks. They handle routing, server-side rendering, and build configuration.

**Component** — A reusable piece of UI. A button, a navigation bar, a user card — each can be a component. Components are like Lego bricks that assemble into pages.

**Route** — A URL path in your app. `/about` is a route, `/users/123` is a route. Frameworks map routes to pages or components.

**Database** — Where your app stores data permanently. PostgreSQL, MySQL, and SQLite are common databases. Data stays in the database even when the server restarts.

**Migration** — A script that changes the database structure (adding tables, renaming columns, etc.). Migrations track database changes the same way Git tracks code changes.

**Docker Container** — A lightweight, isolated environment that runs a specific service. Instead of installing PostgreSQL directly on your computer, you run it in a Docker container. It works the same way but doesn't touch the rest of your system.

**Environment Variables** — Configuration values that change between environments (development vs production). Stored in `.env` files. Your development database URL is different from production, but the app code is the same — environment variables handle the difference.

---

## AI and Methodology Terms

**Context Window** — The amount of text an AI can "see" at once. Think of it as the AI's short-term memory. Longer conversations use more of the context window, which is why starting fresh conversations for new tasks is important.

**Tokens** — The units AI uses to measure text. Roughly 1 token = 0.75 words. You pay per token with the API. A 1,000-word conversation uses roughly 1,300 tokens in each direction.

**Plan Mode** — Cline's mode where it reads your project, thinks, and proposes an approach without changing anything. Always start here.

**Act Mode** — Cline's mode where it actually writes code, creates files, and runs commands. Switch to this after reviewing the plan.

**Confidence Score** — After completing a task, the AI rates its own confidence (out of 10) in the quality of what it built. 8/10 is the minimum to move on. Below 8 means fix issues first.

**Sprint** — A batch of related tasks that together complete a feature or phase. Borrowed from Agile software development, but simplified for AI-assisted work.

**MVP** (Minimum Viable Product) — The simplest version of your app that works and provides value. Build this first, then add features in later phases.

**Hot Reload** — When your dev server automatically refreshes the browser after you save a file change. You don't need to manually reload the page.

---

## Things That Sound Scary But Aren't

**"Compile error"** — The code has a syntax mistake. Like a typo in a recipe — the oven doesn't know what "bke at 350°" means. Fix the typo and it works.

**"Dependency conflict"** — Two packages need different versions of a third package. Usually fixed by updating packages or using specific versions.

**"Deprecated"** — A feature or package that still works but is being phased out. The replacement is usually suggested in the warning message.

**"Breaking change"** — An update to a package that changes how it works in a way that could break your existing code. This is why locking dependency versions matters.

**"Runtime error"** — Something that goes wrong while the app is running (as opposed to while it's being built). Usually means a variable is empty that shouldn't be, or a file is missing.

**"404"** — The thing you're looking for doesn't exist at that URL. Not a crash, just a wrong address.

**"500"** — Something went wrong on the server side. The server knows something is broken but can't tell you exactly what in the browser for security reasons. Check the server logs (or terminal output) for details.

---

This glossary will grow as you learn. Whenever Cline or an error message uses a term you don't know, search this page first — and if it's not here, ask Cline: *"What does [term] mean in plain English?"*
