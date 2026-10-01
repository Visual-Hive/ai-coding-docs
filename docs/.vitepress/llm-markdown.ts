// Plain-Markdown copies of each page, for pasting into Claude (phase 5).
// /part-1/philosophy is also served as /part-1/philosophy.md, and /llms.txt lists them all.
// The build writes the files into dist; the dev server answers the same URLs from source.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import type { Plugin } from 'vite'

export const SITE_URL = 'https://ai-coding.visualhive.co'

type Page = { title: string; description: string; path: string; body: string }

function parse(src: string, relativePath: string): Page | null {
  const fm = src.match(/^---\n([\s\S]*?)\n---\n/)
  const meta = fm?.[1] ?? ''
  if (/^layout:\s*home\b/m.test(meta)) return null
  const field = (k: string) =>
    meta.match(new RegExp(`^${k}:\\s*(.*)$`, 'm'))?.[1].trim().replace(/^(["'])(.*)\1$/, '$2') ?? ''
  return {
    title: field('title'),
    description: field('description'),
    path: '/' + relativePath.replace(/(index)?\.md$/, ''),
    body: fm ? src.slice(fm[0].length) : src,
  }
}

function render(p: Page): string {
  const body = p.body
    // Vue components on their own line (e.g. <TrackChooser />) mean nothing outside the site.
    .replace(/^<[A-Z][A-Za-z]*\s*\/>\s*$\n?/gm, '')
    // Root-relative links and images still work once the text is pasted somewhere else.
    .replace(/\]\(\//g, `](${SITE_URL}/`)
    .trim()
  const header = [`Source: ${SITE_URL}${p.path}`]
  if (p.description) header.push(`Summary: ${p.description}`)
  return `${header.join('\n')}\n\n${body}\n`
}

export function pageMarkdown(srcDir: string, relativePath: string): string | null {
  const file = join(srcDir, relativePath)
  if (!existsSync(file)) return null
  const page = parse(readFileSync(file, 'utf8'), relativePath)
  return page && render(page)
}

// Called from buildEnd with the site's pages (relative .md paths).
export function writeMarkdownCopies(srcDir: string, outDir: string, pages: string[], siteTitle: string, siteDescription: string) {
  const index: string[] = []
  for (const rel of [...pages].sort()) {
    const page = parse(readFileSync(join(srcDir, rel), 'utf8'), rel)
    if (!page) continue
    const out = join(outDir, rel)
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, render(page))
    const desc = page.description ? `: ${page.description}` : ''
    index.push(`- [${page.title || page.path}](${SITE_URL}/${rel})${desc}`)
  }
  writeFileSync(
    join(outDir, 'llms.txt'),
    `# ${siteTitle}\n\n> ${siteDescription}\n\nEvery page is available as plain Markdown at its URL plus \`.md\`.\n\n## Pages\n\n${index.join('\n')}\n`,
  )
}

// Dev server: answer /some/page.md with the same text the build would write.
export function markdownCopiesDevPlugin(srcDir: () => string): Plugin {
  return {
    name: 'db-llm-markdown',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        if (!url.endsWith('.md') || req.url !== url) return next()
        const text = pageMarkdown(srcDir(), decodeURIComponent(url.slice(1)))
        if (text === null) return next()
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
        res.end(text)
      })
    },
  }
}
