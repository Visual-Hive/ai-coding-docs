---
title: Browser DevTools for Debugging
description: How to read error messages from your browser and give them to Cline
---

# Browser DevTools for Debugging

## TLDR

Every web browser has built-in developer tools ("DevTools") that show you what's happening behind the scenes. The most useful part for you is the **Console** — it shows error messages when something goes wrong. When your app does something unexpected, open the console, copy the error, and paste it into Cline. This gives the AI the exact information it needs to fix the problem, instead of you trying to describe what went wrong in words.

---

## Opening DevTools

### Chrome

Three ways, all do the same thing:

1. **Keyboard shortcut:** Press `F12` (or `Cmd+Option+I` on Mac / `Ctrl+Shift+I` on Windows)
2. **Right-click method:** Right-click anywhere on the page and select **"Inspect"**
3. **Menu method:** Click the three-dot menu (⋮) > More Tools > Developer Tools

### Firefox

Same shortcuts work:

1. **Keyboard shortcut:** `F12` (or `Cmd+Option+I` / `Ctrl+Shift+I`)
2. **Right-click method:** Right-click > **"Inspect"**
3. **Menu method:** Hamburger menu (☰) > More Tools > Web Developer Tools

### Safari (Mac)

Safari hides DevTools by default. Enable them first:

1. Go to Safari > Settings > Advanced
2. Check **"Show features for web developers"** (or "Show Develop menu in menu bar" on older versions)
3. Then press `Cmd+Option+I` or go to Develop > Show Web Inspector

---

## The Console Tab

When DevTools opens, you'll see a panel with several tabs at the top: **Elements**, **Console**, **Sources**, **Network**, etc. Click **Console**.

The Console shows messages from your app. There are different types:

**Red text = errors.** Something broke. This is what you need most often. Errors show what went wrong and often where in the code the problem is.

**Yellow text = warnings.** Something might be wrong but the app still works. Less urgent, but worth noting if things seem off.

**White/grey text = informational.** Normal messages that the app logged on purpose. Usually not a problem.

**Blue text = info messages.** Also normal, similar to white.

### What an Error Looks Like

Here's a typical console error:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'map')
    at UserList.svelte:23:15
    at Array.forEach (<anonymous>)
    at renderUserList (UserList.svelte:20:8)
```

This tells you:
- **What happened:** It tried to use `.map` on something that doesn't exist (`undefined`)
- **Where:** In a file called `UserList.svelte`, around line 23
- **The trail:** It started in `renderUserList` function at line 20

You don't need to understand all of this — **Cline does.** Just copy the whole thing.

### How to Copy Console Errors

1. Click on the error message in the console
2. It may expand to show more detail — that's good, you want all of it
3. Right-click the error text and choose **"Copy message"** or just select the text and Ctrl+C / Cmd+C
4. Paste it directly into the Cline chat panel in VS Code

**Pro tip:** You can also right-click in the console area and choose **"Save as..."** to save the entire console log to a file, or right-click and choose **"Clear console"** to wipe old messages so you can reproduce the bug and see only the new error.

---

## The Network Tab

The Network tab shows every request your app makes — loading files, calling APIs, fetching data. This is useful when something isn't loading or an API call is failing.

### How to Use It

1. Click the **Network** tab in DevTools
2. Reload the page (or trigger the action that's failing)
3. You'll see a list of requests appear, one per row
4. Look for any in **red** — those are failed requests

### What to Copy for Cline

Click on a failed request (red row) to see its details. The useful parts are:

- **Status code:** The number like 404 (not found), 500 (server error), 403 (not allowed)
- **URL:** What it was trying to reach
- **Response tab:** What the server sent back (often an error message)

Copy the status code, URL, and response text into Cline. Example of what you'd paste:

```
The Network tab shows a failed request:
- URL: http://localhost:5173/api/users
- Status: 500 Internal Server Error
- Response: {"error": "Connection refused to database"}
```

That gives Cline everything it needs to diagnose the problem.

---

## The Elements Tab

The Elements tab shows the HTML structure of the page. Think of it like an X-ray of the website. This is useful when something looks wrong visually — misaligned, wrong colour, too big, too small.

### How to Inspect a Specific Element

1. Click the **select element** tool (the arrow icon in the top-left of DevTools, or press `Ctrl+Shift+C` / `Cmd+Shift+C`)
2. Hover over anything on the page — it gets highlighted
3. Click on the element you're interested in
4. The Elements panel jumps to that element's HTML code
5. On the right side, you'll see its CSS styles — the rules that control how it looks

You won't need to edit things here — but you can take a screenshot of the Elements panel and paste it into Cline to show exactly which element has a problem.

---

## The Debugging Workflow

When your app does something wrong, here's the process:

### Step 1: Reproduce the Problem

Do the thing that causes the error. Click the button, submit the form, load the page — whatever triggers it.

### Step 2: Check the Console

Open DevTools (F12), go to Console, look for red error messages.

### Step 3: Take a Screenshot (Optional but Powerful)

If the problem is visual (something looks wrong on the page), take a screenshot of the broken state. On Mac: Cmd+Shift+4 and drag. On Windows: Win+Shift+S.

### Step 4: Give Everything to Cline

In the Cline chat panel, combine what you see:

```
The login button isn't working. When I click it, nothing happens.

Console error:
[paste the console error here]

[attach screenshot if visual]
```

**Screenshot + console error = a fast fix.** Cline can usually diagnose the problem in one turn instead of going back and forth asking questions.

### How to Attach Screenshots to Cline

In the Cline chat panel, look for the **+** icon or paperclip icon. Click it and select your screenshot file. You can also drag and drop an image file directly into the chat. Cline can see images and understand what's visually wrong.

---

## Common Console Errors and What They Mean

These are errors you'll see often. You don't need to memorise them — just know they're normal parts of development, not signs that something is catastrophically broken.

**"Failed to fetch" or "NetworkError"** — Your app tried to call an API but couldn't reach it. Usually means the server isn't running. Check if your backend/Docker containers are up.

**"CORS error" (Cross-Origin Request Blocked)** — Your frontend is trying to talk to a server on a different address, and the server isn't configured to allow it. This is a very common development issue — Cline knows how to fix it.

**"404 Not Found"** — The URL your app requested doesn't exist. Either the route isn't set up or there's a typo in the URL.

**"Cannot read properties of undefined"** — The code is trying to use data that doesn't exist yet. Often happens when data is still loading but the page tries to display it immediately.

**"SyntaxError: Unexpected token"** — There's a typo in the code — a missing bracket, an extra comma, something like that. The error usually points to exactly where.

**"Module not found"** — An import statement is referencing a file or package that doesn't exist. Either it hasn't been installed (`npm install`) or the file path is wrong.

---

## Quick Reference

| I'm seeing... | Open this tab | Copy this |
|---------------|--------------|-----------|
| Something broke / button doesn't work | Console | The red error message |
| Data not loading | Network | The failed request URL, status, and response |
| Something looks wrong visually | Elements + screenshot | Screenshot of the page + screenshot of the element's CSS |
| Page is slow | Network | Look for requests that take a long time (sort by time) |

---

**Next:** [How Apps Run — Local vs Cloud](/part-0/how-apps-run) — Understanding localhost, ports, and deployment.
