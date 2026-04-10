---
title: Setting Up Your Computer
description: A complete beginner's guide to installing everything you need — no experience required
---

# Setting Up Your Computer

## TLDR

You need four things installed: **VS Code** (a text editor for code), **Cline** (an AI plugin inside VS Code), **Git** (version tracking), and optionally **Docker** (for backend projects). This page walks you through every download, every "Allow" prompt, and every error you might hit — for both Mac and Windows. If you've never opened a terminal before, that's fine. By the end of this page, you'll have done it.

---

## What You're Installing and Why

Before downloading anything, here's what each tool actually does in plain English:

**VS Code** (Visual Studio Code) is a free text editor made by Microsoft. Think of it like Microsoft Word, but for code. It's where you'll see your project files, and where your AI assistant lives. It's not the same as "Visual Studio" (a much bigger, more complex program) — make sure you download the right one.

**Cline** is a plugin that runs inside VS Code. It gives you a chat panel where you talk to an AI (Claude) that can read your project, write code, and run commands — all with your approval. It's your AI development partner.

**Git** is version control software. Think of it like "Track Changes" in Word, but for your entire project. Every change is recorded, and you can undo anything. GitHub is the website where your project lives online — Git is the tool that talks to it.

**Docker Desktop** is only needed if your project has a backend (a server, a database, etc.). It creates isolated "containers" for those services so they don't install random stuff all over your computer. If you're building a simple website or frontend app, you can skip Docker entirely.

**Node.js** is the engine that runs JavaScript outside a browser. Many of the tools in web development (build tools, package managers, frameworks) require Node.js to work. When you install it, you also get **npm** (Node Package Manager), which is how you install JavaScript libraries and tools.

---

## Step 1: Install VS Code

### On Mac

1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Click the big blue **"Download for macOS"** button
3. A `.zip` file downloads. Find it in your Downloads folder and double-click it
4. Drag the **Visual Studio Code** app into your **Applications** folder
5. Open it from Applications (or Spotlight search: Cmd+Space, type "Visual Studio Code")

**First launch:** macOS will say *"Visual Studio Code is an app downloaded from the internet. Are you sure you want to open it?"* — click **Open**. This is normal for any app not installed from the App Store.

### On Windows

1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Click the big blue **"Download for Windows"** button
3. Run the `.exe` installer
4. **Important checkboxes during install:**
   - ✅ "Add to PATH" — check this, it lets you open VS Code from the command line later
   - ✅ "Register as default editor" — optional but handy
   - ✅ "Add 'Open with Code' to context menu" — lets you right-click folders and open them in VS Code
5. Click Install, then Finish

**If Windows Defender pops up:** It may say *"Windows protected your PC"* with a "Don't run" button prominent. Click **"More info"** and then **"Run anyway."** Microsoft flags apps that haven't been downloaded millions of times yet, but VS Code is made by Microsoft themselves — it's safe.

---

## Step 2: Install Node.js and npm

Most web development tools require Node.js. Installing it is straightforward.

### On Mac

1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** version (the one that says "Recommended For Most Users")
3. Open the `.pkg` file and follow the installer — just click Continue/Agree/Install through each screen
4. It will ask for your Mac password — this is your computer login password, not an online account. This is normal; it needs to install files in system directories

### On Windows

1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** version
3. Run the `.msi` installer
4. Click through the wizard — the defaults are fine
5. **Important:** When it asks about "Tools for Native Modules" with a checkbox about Chocolatey, you can **leave it unchecked** unless you know you need it. It's not required for this workflow.

### Verify It Worked

After installing, open a terminal (we'll cover how in a moment — for now, on Mac open "Terminal" from Applications > Utilities, on Windows search for "Command Prompt" or "PowerShell") and type:

```bash
node --version
```

You should see something like `v22.x.x`. Then type:

```bash
npm --version
```

You should see a number like `10.x.x`. If both show version numbers, you're good.

---

## Step 3: Install Git

### On Mac

Open Terminal (Applications > Utilities > Terminal) and type:

```bash
xcode-select --install
```

A popup appears asking to install developer tools. Click **Install** and wait (it can take 5–15 minutes). This installs Git along with other basic development tools.

If you get a message saying "command line tools are already installed," you already have Git — move on.

### On Windows

1. Go to [git-scm.com/download/win](https://git-scm.com/download/win)
2. The download should start automatically. If not, click the link for the latest version
3. Run the installer. **The defaults are fine for every screen** — there are a lot of options and they look intimidating, but the defaults work. Just keep clicking Next
4. The one thing worth noting: when it asks about the default editor, you can change it to "Use Visual Studio Code as Git's default editor" if VS Code is already installed. Otherwise, the default is fine

### Verify It Worked

In your terminal:

```bash
git --version
```

Should show something like `git version 2.x.x`.

### Create a GitHub Account

Go to [github.com](https://github.com) and create a free account if you don't have one. You'll need this for storing your code online and for deployment. Pick a username you're comfortable with — it'll be visible on your projects.

---

## Step 4: Install Docker Desktop (Optional — Backend Projects Only)

Skip this if you're building a frontend-only project (a website, a landing page, a web app with no server). Come back to it when your project needs a database or backend API.

### On Mac

1. Go to [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)
2. Click **"Download for Mac"** — choose **Apple Silicon** if you have an M1/M2/M3/M4 Mac, or **Intel** if you have an older Mac. (Not sure? Click the Apple menu > About This Mac — if it says "Apple M1" or similar, choose Apple Silicon)
3. Open the `.dmg` file, drag Docker to Applications
4. Open Docker Desktop from Applications

**It will ask for permissions:** Docker needs quite a lot of access — networking, file system, running background services. This is because it's literally creating virtual computers inside your computer. Click **Allow** or **OK** for each prompt. This is expected and safe.

**It will ask you to create an account:** You can sign up for a free Docker account, or click "Continue without signing in" if that option is available. The free tier is all you need.

### On Windows

1. Go to [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)
2. Click **"Download for Windows"**
3. Run the installer
4. **It may require WSL 2:** Docker on Windows uses WSL (Windows Subsystem for Linux). If it says you need to enable WSL 2, follow the link it gives you — it's a one-command install in PowerShell (run as Administrator):
   ```
   wsl --install
   ```
   Then restart your computer and run Docker Desktop again
5. It may also need "Hyper-V" or "Virtualization" enabled in your BIOS — Docker will tell you if this is the case, and usually links to instructions for your specific machine

### Why Docker Asks for So Much Access

Docker is doing something genuinely unusual: it's running tiny virtual computers (containers) inside your actual computer. These containers need to access your network, your files, and your CPU. That's why it asks for administrator access and why antivirus software sometimes flags it. This is normal and expected behaviour for containerisation software.

---

## Step 5: Your First Time in the Terminal

The terminal (also called command line, command prompt, console, or shell — all the same thing) is a text-based way to tell your computer what to do. Instead of clicking icons, you type commands. It looks old-fashioned, but it's how developers work because it's faster and more precise than clicking through menus.

### Opening the Terminal

**On Mac:**
- Open Spotlight (Cmd + Space), type **Terminal**, press Enter
- Or find it in Applications > Utilities > Terminal
- You'll see a window with a line ending in `$` or `%` — that's the prompt, waiting for you to type

**On Windows:**
- Press the Windows key, type **PowerShell**, press Enter
- Or type **Command Prompt** if you prefer the older style
- You'll see a window with a line ending in `>` — that's the prompt

**VS Code has a built-in terminal too:** Once VS Code is open, press `` Ctrl+` `` (that's the backtick key, usually above Tab) or go to View > Terminal. This opens a terminal panel at the bottom of VS Code. This is the terminal you'll use most — it's already pointed at your project folder.

### Basic Terminal Commands

You only need a handful to get started:

| Command | What it does | Mac/Linux | Windows (PowerShell) |
|---------|-------------|-----------|---------------------|
| See where you are | Shows your current folder | `pwd` | `pwd` |
| List files | Shows what's in the current folder | `ls` | `ls` or `dir` |
| Move into a folder | Changes directory | `cd folder-name` | `cd folder-name` |
| Go up one folder | Back to the parent directory | `cd ..` | `cd ..` |
| Clear the screen | Removes old output clutter | `clear` | `cls` |

**The most important thing:** you can't break your computer by typing wrong commands in the terminal. The worst that usually happens is an error message. If you see red text or the word "error," just read the message — it's usually telling you what went wrong.

### Installing Things with npm

Once Node.js is installed, you have access to `npm` — the tool that downloads JavaScript packages (libraries, frameworks, tools). You'll see Cline running commands like:

```bash
npm install some-package
```

This downloads `some-package` and adds it to your project. Cline will ask your permission before running any command, and you can always say no if something looks wrong.

**Where do these packages go?** Into a folder called `node_modules` inside your project. This folder can get very large (hundreds of megabytes) but it's normal. It's also excluded from Git (your version control) by default, so it doesn't get uploaded to GitHub.

---

## Troubleshooting: When Things Go Wrong

### "command not found" or "'X' is not recognized"

This means your terminal can't find the program you're trying to run. Common causes:

**You haven't installed it yet.** Go back and install the missing tool.

**You need to restart your terminal.** After installing Node, Git, or other tools, your terminal doesn't automatically know they exist. Close the terminal window completely and open a new one. On VS Code, close and reopen VS Code itself.

**PATH issues (Windows).** If you installed something but the terminal still can't find it, the installer may not have added it to your PATH (the list of places your computer looks for programs). Fix: search for "Environment Variables" in Windows settings, find the PATH variable, and add the folder where the program was installed. For Node.js this is usually `C:\Program Files\nodejs\`. For Git it's usually `C:\Program Files\Git\cmd\`.

### "Permission denied" or "EACCES"

**On Mac:** You're trying to install something in a protected folder. Never use `sudo npm install -g` if you can avoid it. Instead, configure npm to use a different global directory:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
```

Then add this line to your `~/.zshrc` file (or `~/.bash_profile` on older Macs):

```bash
export PATH=~/.npm-global/bin:$PATH
```

Restart your terminal after making this change.

**On Windows:** Right-click PowerShell and choose "Run as Administrator" if a command needs elevated privileges. But try without admin first — most things shouldn't need it.

### Antivirus or Firewall Blocking Something

This is extremely common on Windows. Your antivirus (Windows Defender, Norton, McAfee, Kaspersky, etc.) may block:

- **Node.js** from making network requests (it needs to download packages)
- **Docker** from accessing the network
- **Git** from connecting to GitHub
- **VS Code extensions** from downloading

**How to fix it:**

1. Check your antivirus notifications — it often silently quarantines things
2. Add exceptions for: VS Code folder, Node.js folder, Git folder, Docker folder, and your project folder
3. If you're on a work or school computer with managed security, you may need to talk to IT — some corporate firewalls block developer tools by default

**For Windows Defender specifically:**
- Open Windows Security > Virus & Threat Protection > Manage Settings
- Scroll down to Exclusions > Add or remove exclusions
- Add your project folder, and the install locations of Node.js and Git

### "ENOENT: no such file or directory"

You're trying to access a file or folder that doesn't exist. Usually means you're in the wrong directory. Use `pwd` to check where you are, and `ls` to see what's in the current folder. Navigate to the right place with `cd`.

### "ECONNREFUSED" or Network Errors

Something is trying to connect to a server that isn't running. This is common when:
- Docker containers aren't started yet (run `docker compose up`)
- You're trying to access a local server that hasn't been launched
- Your internet connection is down (for npm install or git operations)

### "Port already in use" (EADDRINUSE)

Another program is already using the network port your app wants. See the [How Apps Run](/part-0/how-apps-run) page for how ports work and how to fix conflicts.

### npm Install Seems to Hang

Large dependency installations can take minutes. If `npm install` seems frozen:
- Wait at least 2-3 minutes before assuming it's stuck
- Check your internet connection
- Try running `npm install --verbose` to see detailed progress
- If it's genuinely stuck, press Ctrl+C to cancel, delete the `node_modules` folder and the `package-lock.json` file, and try again

### "xcrun: error: invalid active developer path" (Mac Only)

This means the Xcode command line tools need to be reinstalled. Run:

```bash
xcode-select --install
```

This often happens after a macOS update.

---

## Understanding Security Prompts

Throughout this setup, your computer will ask for various permissions. Here's a quick reference for what's normal and what to be cautious about:

**Always safe to allow:**
- VS Code asking to access folders you open
- Terminal commands you've typed yourself or approved from Cline
- Docker asking for network and system access
- macOS "downloaded from the internet" warnings for the apps listed above
- Git asking for your GitHub username and password (or prompting you to set up SSH keys)

**Think before allowing:**
- Any program asking to install a browser extension you didn't expect
- Anything asking for your computer password when you didn't initiate an install
- A program you don't recognise asking for network access

**General rule:** If you initiated the action (you clicked install, you ran the command, you approved it in Cline), the permission request is expected. If a permission popup appears out of nowhere, read it carefully.

---

## You're Done

At this point you should have:

- ✅ VS Code installed and opening
- ✅ Node.js and npm working (verified with `node --version` and `npm --version`)
- ✅ Git installed (verified with `git --version`)
- ✅ A GitHub account
- ✅ Docker Desktop installed (if needed for your project)
- ✅ Confidence that terminal commands won't break your computer

**Next:** [Setting Up Cline and Your AI Credits](/part-0/cline-and-credits) — Get the AI connected.
