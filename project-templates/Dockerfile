# Multi-stage Dockerfile for a Node-based app (SvelteKit, Next.js, Express, etc.)
# Build-on-server pattern: this Dockerfile is consumed by the server's docker build,
# not by AI's laptop. See docs/part-5/deployment-platforms (The Non-Polling Deploy Pattern).

# ---- builder ---------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy manifest first to maximise layer caching
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN if [ -f pnpm-lock.yaml ]; then \
      corepack enable && pnpm install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
      npm ci --no-audit --no-fund; \
    else \
      npm install --no-audit --no-fund; \
    fi

# Copy the rest and build
COPY . .

# Clean any local artefacts that might have leaked through .dockerignore
RUN rm -rf .svelte-kit build dist .next .nuxt

# Build with production env
ENV NODE_ENV=production
RUN npm run build

# ---- runtime ---------------------------------------------------------------
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy only what runtime needs (build output + production deps)
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Health endpoint MUST exist at /api/health — see The Project Control Panel
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --quiet --spider http://localhost:3000/api/health || exit 1

# Adjust this command for your framework if needed
CMD ["node", "build"]
