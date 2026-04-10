---
title: How Apps Run — Local vs Cloud
description: Understanding localhost, ports, servers, SSH keys, and what 'deployment' actually means
---

# How Apps Run — Local vs Cloud

## TLDR

When you build an app, it first runs on your own computer ("locally"). To let other people use it, you put it on a server ("deploy to the cloud"). The `:5173` or `:5000` in your browser address is a port number — think of it as a door number on your computer. SSH keys are digital keys that prove to a server that you're allowed to deploy to it. This page explains all of this in plain English, including why port conflicts happen and why you need to keep deploying from the same machine.

---

## Running Locally: What "localhost" Means

When Cline builds your app and runs it, you'll see a message like:

```
Server running at http://localhost:5173
```

**localhost** literally means "this computer." It's a special address that always points back to the machine you're sitting at. When you open `http://localhost:5173` in your browser, you're not going to the internet — you're looking at something running right here on your computer.

Nobody else can see it. If you sent that URL to a friend, it wouldn't work for them — their `localhost` points to their own computer, not yours.

This is **local development.** Your computer is acting as both the builder and the viewer. It's fast, it's private, and it's where all development happens before anything goes live.

---

## What Are Ports? (The :5173 Thing)

Think of your computer as a building with thousands of doors. Each door has a number. When a program wants to communicate over the network (even locally), it picks a door to use. That door number is the **port**.

- `http://localhost:5173` means "talk to the program using door 5173 on this computer"
- `http://localhost:3000` means "door 3000"
- `http://localhost:8080` means "door 8080"

Different tools use different default ports:

| Tool/Framework | Default Port |
|---------------|-------------|
| Vite / SvelteKit | 5173 |
| React (Create React App) | 3000 |
| Next.js | 3000 |
| Express.js | 3000 |
| Python Flask | 5000 |
| Docker services | Varies |
| PostgreSQL | 5432 |

### Why Port Conflicts Happen

A port can only be used by one program at a time. If you start a React app (port 3000) and then also start an Express server (also port 3000), the second one will fail with an error like:

```
Error: listen EADDRINUSE: address already in use :::3000
```

This just means "something else is already using door 3000."

### How to Fix Port Conflicts

**Option 1: Find and stop the other program.** 

On Mac/Linux:
```bash
lsof -i :3000
```
This shows what's using port 3000. Note the PID (process ID) number, then:
```bash
kill -9 12345
```
(Replace 12345 with the actual PID.)

On Windows (PowerShell):
```powershell
netstat -ano | findstr :3000
taskkill /PID 12345 /F
```

**Option 2: Use a different port.** Most tools let you specify a port:
```bash
npm run dev -- --port 5174
```
Or in `vite.config.js`:
```javascript
export default {
  server: {
    port: 5174
  }
}
```

**Option 3: Just close the terminal** that's running the other server. If you started something in a terminal tab and forgot about it, closing that tab usually stops it.

**The common scenario:** You started your app, it's running on port 5173, you close the browser tab, but forget to stop the server in the terminal. You come back later, try to start the app again, and get a port conflict because the old instance is still running. Press Ctrl+C in the terminal to stop the running server before starting it again.

---

## The Cloud: What "Deployment" Means

Deployment means taking the app that works on your computer and putting it on a computer somewhere else (a "server") so other people can access it via a real URL like `https://myapp.com`.

There are two types of deployment:

### Static / Frontend Deployment (Easy)

If your app is just HTML, CSS, and JavaScript with no server-side logic, you can deploy it to services like **Netlify** or **Vercel** for free. These services:

1. Watch your GitHub repository
2. When you push new code, they automatically build and publish your site
3. Give you a URL like `https://myapp.netlify.app`
4. Handle everything else — security certificates, global distribution, caching

This is genuinely push-button deployment. Connect your GitHub repo, configure the build command (Cline can guide you through this), and you're live.

### Backend / Full-Stack Deployment (More Involved)

If your app has a server, a database, or any backend logic, it needs to run on an actual server — a computer that's always on, always connected to the internet, and managed by you (or a hosting provider).

Common options:
- **Hetzner** — affordable European cloud servers, starting at ~€4/month
- **DigitalOcean** — similar, US-based
- **Railway** — more expensive but simpler, handles Docker for you
- **AWS / Google Cloud / Azure** — overkill for most projects at this stage, complex to set up

With these, you're renting a computer in a data centre. You connect to it remotely (via SSH — more on this below), install your app, and it stays running 24/7.

---

## SSH Keys: Your Digital Identity Card

When you deploy to a server, you need a way to prove you're allowed to access it. Passwords work but they're insecure and annoying to type every time. Instead, the industry standard is **SSH keys**.

### How SSH Keys Work (Simplified)

An SSH key is actually a pair of files:

1. **Private key** — lives on your computer, never shared with anyone. Think of it as the actual key
2. **Public key** — goes on the server. Think of it as the lock that only your key can open

When you try to connect to the server, it checks: "Does this person's private key match the public key I have on file?" If yes, you're in. No password needed.

### Creating an SSH Key

Open your terminal and type:

```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

It will ask:
- **Where to save it:** Press Enter to accept the default location (`~/.ssh/id_ed25519`)
- **Passphrase:** You can set a password on the key itself for extra security, or press Enter twice to skip (simpler for beginners, still secure)

This creates two files:
- `~/.ssh/id_ed25519` — your private key (NEVER share this)
- `~/.ssh/id_ed25519.pub` — your public key (this is what you give to servers and GitHub)

### Adding Your SSH Key to GitHub

1. Copy your public key:
   - Mac: `cat ~/.ssh/id_ed25519.pub | pbcopy` (copies it to your clipboard)
   - Windows: `cat ~/.ssh/id_ed25519.pub` then manually select and copy
   - Or just open the `.pub` file in a text editor and copy the contents
2. Go to GitHub > Settings > SSH and GPG Keys > New SSH Key
3. Paste the public key and save

Now you can push and pull code from GitHub without typing your password every time.

### Adding Your SSH Key to a Server

When you set up a cloud server (Hetzner, DigitalOcean, etc.), the setup wizard usually asks for your public key. Paste the same `.pub` contents there.

If the server is already running, Cline can help you add the key via:

```bash
ssh-copy-id user@your-server-ip
```

### Why You Must Deploy from the Same Machine

Here's the crucial thing: **SSH keys are tied to the machine they're on.** Your private key lives in `~/.ssh/` on your specific computer. If you:

- Switch to a different computer
- Reinstall your operating system
- Use a work computer instead of your personal one

...the new machine won't have your private key, and the server will reject you. You'd need to either copy the key to the new machine or add a new key pair.

**Practical implication for Cline:** When Cline deploys your app to a server, it uses the SSH key on your computer. If you want to continue deploying, you need to keep working on that same computer (or transfer your SSH keys carefully). This is also why you should **back up your `.ssh` folder** — losing your private key means losing access to your server.

**Transferring SSH keys to a new machine:** Copy the entire `~/.ssh/` folder to the same location on the new machine. On Mac/Linux, make sure the permissions are correct:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
```

On Windows, the file permissions are handled differently — search for "SSH key permissions Windows" if you need to do this.

---

## Dev vs Production: Two Separate Worlds

Once you have a server, you have two environments:

**Development (dev):** Your local computer. This is where you build and test. Break things freely — nobody else is affected.

**Production (prod):** The live server. This is what real users see. Breaking things here is bad.

The methodology's rule: **Cline pushes to dev. You manually promote to production.** This means Cline can happily deploy to a development server for testing, but the final step of going live is always a conscious human decision.

### The .env Problem

Your app probably has configuration that differs between dev and production — database passwords, API keys, URLs, etc. These live in `.env` files (short for "environment variables").

The danger: Cline might accidentally overwrite your production `.env` with local development values. This is a real and recurring problem. The `.clinerules` template includes a rule to prevent this, but it's worth understanding why it matters:

- Your local database might be `localhost:5432/myapp_dev`
- Your production database is `db.myserver.com:5432/myapp_prod`
- If Cline copies the local `.env` to production, your live app suddenly tries to talk to your laptop's database — which it can't reach

Always keep dev and prod `.env` files separate, and always review what Cline is doing before any deployment step.

---

## Quick Mental Model

Think of it this way:

```
Your Computer (localhost)          The Internet (production)
┌──────────────────────┐          ┌──────────────────────┐
│                      │          │                      │
│  Your app :5173   ───┼── SSH ──▶│  Your app :443    │
│  Database :5432      │  deploy  │  Database :5432      │
│  API server :3000    │          │  API server :3000    │
│                      │          │                      │
│  Only YOU can see    │          │  EVERYONE can see    │
│  this                │          │  this                │
└──────────────────────┘          └──────────────────────┘
```

Port `:443` is the standard port for HTTPS (secure web traffic). When someone visits `https://myapp.com`, they're actually going to port 443 — the browser just hides it because it's the default. On your local machine, you use non-standard ports like 5173 or 3000 because port 443 is usually reserved for system use.

---

**Next:** [Adding Files and Styling Basics](/part-0/files-and-styles) — Images, colours, and making things look right.
