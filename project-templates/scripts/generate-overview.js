/**
 * generate-overview.js
 *
 * Regenerates the `overview/` folder from declarative source-of-truth files.
 * Run with: `pnpm generate:overview` (or `node scripts/generate-overview.js`).
 *
 * Required to be added to your `package.json` scripts:
 *   "generate:overview": "node scripts/generate-overview.js"
 *
 * Sources read (each is optional; missing sources are skipped, not crashed):
 *   - package.json            → stack.md (frameworks + key deps)
 *   - deployment.json         → stack.md (services + hosting)
 *   - domain.config.js        → entities.md   (REQUIRED — exits non-zero if missing)
 *   - src/routes/             → routes.md     (filesystem scan + leading JSDoc)
 *   - src/lib/config/flow-registry.js → automations.md
 *
 * Outputs written:
 *   - overview/README.md
 *   - overview/stack.md
 *   - overview/entities.md
 *   - overview/routes.md
 *   - overview/automations.md
 *
 * No fancy libraries — plain Node fs/path. No AI calls. ~$0.00 to run.
 */

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const OVERVIEW_DIR = path.join(ROOT, 'overview');
const NOW_ISO = new Date().toISOString();

// ---------- helpers ---------------------------------------------------------

function readJsonIfExists(relPath) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return null;
  try {
    return JSON.parse(fs.readFileSync(full, 'utf8'));
  } catch (err) {
    console.warn(`⚠ Could not parse ${relPath}: ${err.message}`);
    return null;
  }
}

async function importIfExists(relPath) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return null;
  try {
    const mod = await import(pathToFileURL(full).href);
    return mod.default ?? mod;
  } catch (err) {
    console.warn(`⚠ Could not import ${relPath}: ${err.message}`);
    return null;
  }
}

function writeFile(relPath, contents) {
  const full = path.join(OVERVIEW_DIR, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents);
}

// ---------- stack.md --------------------------------------------------------

function generateStack() {
  const pkg = readJsonIfExists('package.json') ?? {};
  const deployment = readJsonIfExists('deployment.json') ?? { services: [] };

  const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };
  const depRows = Object.entries(deps)
    .slice(0, 20)
    .map(([name, version]) => `| \`${name}\` | ${version} | |`)
    .join('\n');

  const serviceRows = (deployment.services ?? [])
    .map(
      (s) =>
        `| ${s.name ?? '?'} | ${s.url ?? '?'} | ${s.health ?? '—'} | ${s.deploy ?? '—'} |`
    )
    .join('\n');

  return `# Stack

> Generated ${NOW_ISO} from \`package.json\` and \`deployment.json\`. Do not edit by hand.

## Project

- **Name:** ${pkg.name ?? '[unknown]'}
- **Version:** ${pkg.version ?? '[unknown]'}
- **Node engines:** ${pkg.engines?.node ?? '[unspecified]'}

## Key dependencies

| Package | Version | Notes |
|---|---|---|
${depRows || '| _no dependencies declared_ | | |'}

## Services and hosting

| Service | URL | Health endpoint | Deploy method |
|---|---|---|---|
${serviceRows || '| _no services declared in deployment.json_ | | | |'}
`;
}

// ---------- entities.md -----------------------------------------------------

async function generateEntities() {
  const domain = await importIfExists('domain.config.js');
  if (!domain || !Array.isArray(domain.entities)) {
    console.error(
      '✗ domain.config.js is missing or has no `entities` array. ' +
        'Create it before running this generator. See ' +
        'docs/part-2/live-project-overview for the convention.'
    );
    process.exit(1);
  }

  const summaryRows = domain.entities
    .map((e) => {
      const fields = e.fields.slice(0, 3).map((f) => f.name).join(', ');
      const related = (e.relationships ?? []).join('; ') || '—';
      return `| ${e.name} | ${e.description} | ${fields} | ${related} |`;
    })
    .join('\n');

  const detailBlocks = domain.entities
    .map((e) => {
      const fieldRows = e.fields
        .map((f) => `| ${f.name} | ${f.type} | ${f.notes ?? ''} |`)
        .join('\n');
      const rels = (e.relationships ?? [])
        .map((r) => `- ${r}`)
        .join('\n') || '- _none declared_';
      return `### ${e.name}\n\n${e.description}\n\n**Fields**\n\n| Field | Type | Notes |\n|---|---|---|\n${fieldRows}\n\n**Relationships**\n\n${rels}\n`;
    })
    .join('\n---\n\n');

  return `# Entities

> Generated ${NOW_ISO} from \`domain.config.js\`. Do not edit by hand.

## Summary

| Entity | What it is | Key fields | Related to |
|---|---|---|---|
${summaryRows}

## Detail

${detailBlocks}
`;
}

// ---------- routes.md -------------------------------------------------------

function extractLeadingJsdoc(filePath) {
  try {
    const source = fs.readFileSync(filePath, 'utf8');
    const match = source.match(/\/\*\*([\s\S]*?)\*\//);
    if (!match) return null;
    const inside = match[1];
    const firstLine = inside
      .split('\n')
      .map((l) => l.replace(/^\s*\*\s?/, '').trim())
      .find((l) => l && !l.startsWith('@'));
    return firstLine ?? null;
  } catch {
    return null;
  }
}

function scanRoutes(dir = path.join(ROOT, 'src/routes'), prefix = '') {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...scanRoutes(full, `${prefix}/${entry.name}`));
      continue;
    }
    const isPage = entry.name === '+page.svelte' || entry.name === '+page.server.ts';
    const isApi = entry.name === '+server.ts';
    if (!isPage && !isApi) continue;

    const route = prefix || '/';
    const description =
      extractLeadingJsdoc(full) ?? '[no description — add JSDoc]';
    results.push({
      route,
      kind: isApi ? 'api' : 'page',
      file: path.relative(ROOT, full),
      description,
    });
  }
  return results;
}

function generateRoutes() {
  const all = scanRoutes();
  const pages = all.filter((r) => r.kind === 'page');
  const apis = all.filter((r) => r.kind === 'api');

  const pageRows =
    pages
      .map((r) => `| \`${r.route}\` | ${r.description} | \`${r.file}\` |`)
      .join('\n') || '| _no pages found_ | | |';

  const apiRows =
    apis
      .map((r) => `| \`${r.route}\` | ${r.description} | \`${r.file}\` |`)
      .join('\n') || '| _no API endpoints found_ | | |';

  return `# Routes

> Generated ${NOW_ISO} by scanning \`src/routes/\`. Do not edit by hand.

## Pages

| Route | Description | Source file |
|---|---|---|
${pageRows}

## API endpoints

| Route | Description | Source file |
|---|---|---|
${apiRows}

> Routes without a leading JSDoc show as \`[no description — add JSDoc]\`. Add one to every route file.
`;
}

// ---------- automations.md --------------------------------------------------

async function generateAutomations() {
  const registry = await importIfExists('src/lib/config/flow-registry.js');
  if (!registry) {
    return `# Automations

> Generated ${NOW_ISO}. No \`src/lib/config/flow-registry.js\` found — no automations registered yet.

When you add backend automations (webhooks, crons, pipelines), declare each one in the flow registry. See [The Project Control Panel](/part-5/control-panel) for the full convention.
`;
  }

  const flows = Array.isArray(registry) ? registry : registry.flows ?? [];
  const rows = flows
    .map(
      (f) =>
        `| \`${f.id ?? '?'}\` | ${f.trigger ?? '?'} | ${(f.steps ?? []).length} | \`${f.source ?? '?'}\` |`
    )
    .join('\n');

  return `# Automations

> Generated ${NOW_ISO} from \`src/lib/config/flow-registry.js\`. Do not edit by hand.

## Summary

| Flow ID | Trigger | Steps | Source file |
|---|---|---|---|
${rows || '| _no flows registered_ | | | |'}

> Each flow MUST have a \`@flow\` JSDoc, an entry in this registry, and \`flowLog()\` calls at each step. See [The Project Control Panel](/part-5/control-panel) for the full convention.
`;
}

// ---------- README.md (index) -----------------------------------------------

function generateIndex({ stackHasServices, entityCount, routeCount, flowCount }) {
  const decisionsDir = path.join(OVERVIEW_DIR, 'decisions');
  let recent = [];
  if (fs.existsSync(decisionsDir)) {
    recent = fs
      .readdirSync(decisionsDir)
      .filter((f) => f.endsWith('.md'))
      .sort()
      .reverse()
      .slice(0, 5);
  }
  const recentList =
    recent.length === 0
      ? '_No decisions logged yet._'
      : recent.map((f) => `- \`${f}\``).join('\n');

  return `# Project Overview

> Generated ${NOW_ISO} by \`pnpm generate:overview\`. Do not edit by hand.

## Quick stats

- **Entities:** ${entityCount}
- **Routes:** ${routeCount}
- **Automations:** ${flowCount}
- **Services tracked in deployment.json:** ${stackHasServices ? 'yes' : 'no'}

## Recent decisions

${recentList}

## Files in this folder

- \`stack.md\` — frameworks, services, hosting
- \`entities.md\` — what data lives in the system, in plain English
- \`routes.md\` — every URL the app exposes
- \`automations.md\` — what runs automatically and when
- \`decisions/\` — log of non-obvious choices, dated

## How AI should read this folder

1. Always read this \`README.md\` at task start. It's small.
2. Read sibling files only when the task touches them.
3. If \`DRIFT.md\` is present, READ IT BEFORE ANYTHING ELSE.
`;
}

// ---------- main ------------------------------------------------------------

async function main() {
  fs.mkdirSync(OVERVIEW_DIR, { recursive: true });
  fs.mkdirSync(path.join(OVERVIEW_DIR, 'decisions'), { recursive: true });

  const stack = generateStack();
  writeFile('stack.md', stack);

  const entities = await generateEntities();
  writeFile('entities.md', entities);

  const routes = generateRoutes();
  writeFile('routes.md', routes);

  const automations = await generateAutomations();
  writeFile('automations.md', automations);

  // Quick stats for the index
  const domain = await importIfExists('domain.config.js');
  const entityCount = domain?.entities?.length ?? 0;
  const routeCount = (routes.match(/^\| `\//gm) ?? []).length;
  const flowCount = (automations.match(/^\| `[^_]/gm) ?? []).length;
  const deployment = readJsonIfExists('deployment.json');
  const stackHasServices = !!deployment?.services?.length;

  writeFile(
    'README.md',
    generateIndex({ stackHasServices, entityCount, routeCount, flowCount })
  );

  console.log(
    `✓ Generated overview/ — ${entityCount} entities, ${routeCount} routes, ${flowCount} automations`
  );
}

main().catch((err) => {
  console.error('✗ Generator failed:', err);
  process.exit(1);
});
