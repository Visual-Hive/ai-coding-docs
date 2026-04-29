import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI-Assisted Software Engineering Guide',
  description: 'Build production-ready apps with AI — systematically, not randomly',

  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#f8fa30' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'AI-Assisted Software Engineering Guide' }],
    ['meta', { property: 'og:description', content: 'Build production-ready apps with AI — systematically, not randomly' }],
  ],

  themeConfig: {
    siteTitle: 'AI-Assisted SE Guide',
    logo: {
      light: '/assets/logo_black.png',
      dark: '/assets/logo_white.png'
    },

    nav: [
      { text: 'Guide', link: '/introduction' },
      { text: 'Templates', link: '/part-6/templates' },
      {
        text: 'Resources',
        items: [
          { text: 'Prompt Library', link: '/part-6/prompts' },
          { text: 'Case Studies', link: '/part-6/case-studies' },
          { text: 'Setup Guide', link: '/part-6/setup-guide' },
        ]
      },
      { text: 'About', link: '/about' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/introduction' },
        ]
      },
      {
        text: 'Part 0: Before You Start',
        collapsed: false,
        items: [
          { text: 'Setting Up Your Computer', link: '/part-0/setting-up-your-computer' },
          { text: 'Cline & AI Credits', link: '/part-0/cline-and-credits' },
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
          { text: 'Tool Selection', link: '/part-1/tool-selection' },
        ]
      },
      {
        text: 'Part II: Pre-Development',
        collapsed: false,
        items: [
          { text: 'The Brainstorming Session', link: '/part-2/brainstorming' },
          { text: 'Documentation Architecture', link: '/part-2/documentation-architecture' },
          { text: 'The Live Project Overview', link: '/part-2/live-project-overview' },
        ]
      },
      {
        text: 'Part III: Execution',
        collapsed: false,
        items: [
          { text: 'The Execution Workflow', link: '/part-3/cline-workflow' },
          { text: 'Task Documentation', link: '/part-3/task-patterns' },
          { text: 'Confidence Scoring', link: '/part-3/confidence-scoring' },
        ]
      },
      {
        text: 'Part IV: Quality Assurance',
        collapsed: false,
        items: [
          { text: 'Phase Audits', link: '/part-4/phase-audits' },
          { text: 'Commenting Philosophy', link: '/part-4/commenting-philosophy' },
        ]
      },
      {
        text: 'Part V: Advanced Topics',
        collapsed: true,
        items: [
          { text: 'Context Management', link: '/part-5/context-management' },
          { text: 'Common Pitfalls', link: '/part-5/pitfalls-recovery' },
          { text: 'Team Workflows', link: '/part-5/team-workflows' },
          { text: 'The Project Control Panel', link: '/part-5/control-panel' },
          { text: 'The Frontend Tweaker', link: '/part-5/frontend-tweaker' },
          { text: 'Token Economics', link: '/part-5/token-economics' },
          { text: 'Deployment & Platform Targets', link: '/part-5/deployment-platforms' },
        ]
      },
      {
        text: 'Part VI: Resources',
        collapsed: false,
        items: [
          { text: 'Project Templates', link: '/part-6/templates' },
          { text: 'Prompt Library', link: '/part-6/prompts' },
          { text: 'Case Studies', link: '/part-6/case-studies' },
          { text: 'Setup Guide', link: '/part-6/setup-guide' },
        ]
      },
      {
        text: 'Appendices',
        collapsed: true,
        items: [
          { text: 'Beyond Coding', link: '/appendix-e-beyond-coding' },
          { text: 'About', link: '/about' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Visual-Hive/ai-coding-docs' }
    ],

    footer: {
      message: 'A collaboration between <a href="https://thelowcodefoundation.com">The Low Code Foundation</a> and <a href="https://visualhive.co">Visual Hive</a>',
      copyright: '© 2026 | Author: Richard Osborne, CTO of Visual Hive'
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
    lineNumbers: false,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
