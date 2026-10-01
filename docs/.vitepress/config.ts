import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'
import container from 'markdown-it-container'
import { writeMarkdownCopies, markdownCopiesDevPlugin } from './llm-markdown'

const TITLE = 'Build it with Claude'
const DESCRIPTION = 'How I build real apps with Claude, from first chat to live site. Free, practical, and honest about what it costs.'

// ---- Two tracks (phase 5, R3) -------------------------------------------------
// "Keep it simple" = everything in the Claude desktop app (Chat, Design, Code tab).
// "Show me everything" = the full kit, and hides nothing.
// A page tagged `everything` is hidden from the simple track's sidebar and pager.
// Pages whose .md file doesn't exist yet are left out, so R4 can add a page by
// writing the file: its sidebar slot is already here.

type Track = 'both' | 'everything'
type Page = { text: string; link: string; track?: Track }
type Section = { text: string; collapsed?: boolean; items: Page[] }

const IA: Section[] = [
  {
    text: 'Start Here',
    items: [
      { text: 'Start Here', link: '/start-here' },
      { text: 'Introduction', link: '/introduction' },
    ]
  },
  {
    text: 'Part 0: Before You Start',
    collapsed: false,
    items: [
      { text: 'Setting Up Your Computer', link: '/part-0/setting-up-your-computer' },
      { text: 'Plans & Limits', link: '/part-0/plans-and-limits' },
      { text: 'Claude Code: Setup & Customisation', link: '/part-0/claude-code-setup' },
      { text: 'Browser DevTools', link: '/part-0/browser-devtools' },
      { text: 'How Apps Run', link: '/part-0/how-apps-run' },
      { text: 'Files & Styling Basics', link: '/part-0/files-and-styles' },
      { text: 'Concepts Glossary', link: '/part-0/glossary' },
    ]
  },
  {
    text: 'Part I: Foundation',
    collapsed: false,
    items: [
      { text: 'Philosophy & Approach', link: '/part-1/philosophy' },
      { text: 'Which Claude, Where', link: '/part-1/tool-selection' },
    ]
  },
  {
    text: 'Part II: Before You Build',
    collapsed: false,
    items: [
      { text: 'The Brainstorming Session', link: '/part-2/brainstorming' },
      { text: 'Mockups First', link: '/part-2/mockups-first' },
      { text: 'Documentation Architecture', link: '/part-2/documentation-architecture' },
      { text: 'The Live Project Overview', link: '/part-2/live-project-overview', track: 'everything' },
    ]
  },
  {
    text: 'Part III: Execution',
    collapsed: false,
    items: [
      { text: 'The Execution Workflow', link: '/part-3/execution-workflow' },
      { text: 'Task Patterns', link: '/part-3/task-patterns' },
      { text: 'Confidence Scoring', link: '/part-3/confidence-scoring' },
    ]
  },
  {
    text: 'Part IV: Quality Assurance',
    collapsed: false,
    items: [
      { text: 'Phase Audits', link: '/part-4/phase-audits' },
      { text: 'Testing', link: '/part-4/testing' },
      { text: 'Commenting Philosophy', link: '/part-4/commenting-philosophy', track: 'everything' },
    ]
  },
  {
    text: 'Part V: Advanced Topics',
    collapsed: true,
    items: [
      { text: 'Context Management', link: '/part-5/context-management' },
      { text: 'Skills', link: '/part-5/skills' },
      { text: 'Common Pitfalls', link: '/part-5/pitfalls-recovery' },
      { text: 'Project Memory & Self-Improvement', link: '/part-5/project-memory' },
      { text: 'The Project Brain', link: '/part-5/project-brain', track: 'everything' },
      { text: 'Team Workflows', link: '/part-5/team-workflows', track: 'everything' },
      { text: 'The Project Control Panel', link: '/part-5/control-panel', track: 'everything' },
      { text: 'Observability & Error Tracking', link: '/part-5/observability', track: 'everything' },
      { text: 'The In-App Feedback Loop', link: '/part-5/feedback-loop', track: 'everything' },
      { text: 'Accessibility by Default', link: '/part-5/accessibility', track: 'everything' },
      { text: 'The Frontend Tweaker', link: '/part-5/frontend-tweaker', track: 'everything' },
      { text: 'Deployment & Platform Targets', link: '/part-5/deployment-platforms', track: 'everything' },
      { text: 'Deploy Verification', link: '/part-5/deploy-verification', track: 'everything' },
    ]
  },
  {
    text: 'Part VI: Resources',
    collapsed: false,
    items: [
      { text: 'Project Templates', link: '/part-6/templates' },
      { text: 'Prompt Library', link: '/part-6/prompts' },
      { text: 'Case Studies', link: '/part-6/case-studies' },
      { text: 'Case Study: NodeGX', link: '/part-6/nodegx' },
    ]
  },
  {
    text: 'Appendices',
    collapsed: true,
    items: [
      { text: 'Beyond Coding', link: '/appendix-e-beyond-coding' },
      { text: 'Other AI Coding Tools', link: '/appendix-other-tools', track: 'everything' },
      { text: 'About', link: '/about' },
    ]
  },
]

// Cut in R4 and deleted. Their old URLs 301 to the pages that absorbed them
// (see deploy/learn-ai.caddy).

const docsDir = fileURLToPath(new URL('..', import.meta.url))
const written = (p: Page) => existsSync(`${docsDir}${p.link.slice(1)}.md`)

// The marker span is how CSS finds builder-only entries (sidebar and prev/next pager).
const MARK = '<span class="track-mark" aria-hidden="true"></span>'
const label = (p: Page) => (p.track === 'everything' ? p.text + MARK : p.text)

const sidebar: DefaultTheme.SidebarItem[] = IA
  .map(s => {
    const items = s.items.filter(written)
    const allBuilder = items.every(p => p.track === 'everything')
    return {
      text: allBuilder ? s.text + MARK : s.text,
      collapsed: s.collapsed,
      items: items.map(p => ({ text: label(p), link: p.link })),
    }
  })
  .filter(s => s.items.length > 0)

const builderOnlyPages = IA.flatMap(s => s.items)
  .filter(p => p.track === 'everything')
  .map(p => p.link)

// Runs before first paint so the sidebar doesn't flash builder pages on reload.
const trackBootScript = `try{if(localStorage.getItem('db-learn-track')==='simple')document.documentElement.dataset.track='simple'}catch(e){}`

// ::: everything  -> hidden on the simple track
// ::: simple      -> always shown, labelled so full-track readers know who it's for
function trackContainer(name: 'simple' | 'everything', defaultLabel: string) {
  return [container, name, {
    render(tokens: any[], idx: number) {
      const t = tokens[idx]
      if (t.nesting !== 1) return '</div>\n'
      const custom = t.info.trim().slice(name.length).trim()
      const title = custom || defaultLabel
      return `<div class="track-block track-${name}"><p class="track-block-label">${title}</p>\n`
    },
  }] as const
}

export default defineConfig<DefaultTheme.Config & { builderOnlyPages: string[] }>({
  title: TITLE,
  description: DESCRIPTION,

  sitemap: { hostname: 'https://ai-coding.visualhive.co' },
  cleanUrls: true,
  lastUpdated: true,

  // Each page also ships as .md for pasting into Claude, plus /llms.txt (see llm-markdown.ts).
  buildEnd(site) {
    writeMarkdownCopies(site.srcDir, site.outDir, site.pages, TITLE, DESCRIPTION)
  },
  vite: {
    plugins: [markdownCopiesDevPlugin(() => docsDir)],
  },

  head: [
    ['script', {}, trackBootScript],
    ['meta', { name: 'author', content: 'Richard Osborne, Visual Hive' }],
    ['meta', { name: 'theme-color', content: '#f8fa30' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: TITLE }],
    ['meta', { property: 'og:description', content: DESCRIPTION }],
  ],

  themeConfig: {
    siteTitle: TITLE,
    logo: {
      light: '/assets/logo_black.png',
      dark: '/assets/logo_white.png',
      alt: 'Visual Hive'
    },

    nav: [
      { text: 'Start Here', link: '/start-here' },
      { text: 'Guide', link: '/introduction' },
      { text: 'Templates', link: '/part-6/templates' },
      {
        text: 'Resources',
        items: [
          { text: 'Prompt Library', link: '/part-6/prompts' },
          { text: 'Case Studies', link: '/part-6/case-studies' },
        ]
      },
      { text: 'About', link: '/about' }
    ],

    sidebar,

    builderOnlyPages,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Visual-Hive/ai-coding-docs' }
    ],

    footer: {
      message: 'Written by Richard Osborne · <a href="https://visualhive.co">Visual Hive</a>',
      copyright: '© 2026 Visual Hive'
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium'
      }
    }
  },

  markdown: {
    config(md) {
      md.use(...trackContainer('simple', 'Keep it simple'))
      md.use(...trackContainer('everything', 'Show me everything'))
    },
    lineNumbers: false,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
