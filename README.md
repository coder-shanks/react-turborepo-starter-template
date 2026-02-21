# react-turborepo-starter-template

An opinionated monorepo starter kit for modern web development.

Minimal Turborepo with:
- `apps/web` — React + Vite frontend
- `apps/api` — NestJS backend

## Project docs

For repository context and working rules:

- `ARCHITECTURE.md` — What the system is (workspaces, boundaries, task graph)
- `AGENTS.md` — How AI coding agents should work in this repo
- `CONTRIBUTING.md` — What human contributors are expected to follow

## Requirements

- Node.js `>=18`
- pnpm `9`

## Setup

```bash
pnpm install
```

## Run (all apps)

```bash
pnpm dev
```

## Build (all apps)

```bash
pnpm build
```

## Format/Lint (Biome)

```bash
pnpm lint:format
```

### Pre-commit hook

Husky is configured to automatically run linting/formatting in both apps before each commit via `.husky/pre-commit`. This ensures:
- Code is formatted automatically (`--write`)
- Commits are blocked if there are unfixable lint errors (`--error-on-warnings`)

If a commit is blocked due to lint errors, fix the issues and try again.

## Run individual apps

```bash
# frontend
pnpm --filter web dev

# backend
pnpm --filter api dev
```

## Docker deployment with `turbo prune`

This repository includes optimized multi-stage Dockerfiles for both apps:

- `apps/api/Dockerfile`
- `apps/web/Dockerfile`

### 1) Create a pruned monorepo (inside Docker build)

Each Dockerfile runs:

```bash
pnpm dlx turbo@^2 prune <app> --docker
```

This produces a minimal `out/` directory that contains only the selected app and required workspace dependencies.

### 2) Build with the pruned output

The Dockerfile then:

1. Copies `out/json` + lockfile
2. Installs only required dependencies
3. Copies `out/full`
4. Builds only the target app via Turbo filter

### Build images

```bash
pnpm docker:build:api
pnpm docker:build:web
```

### Run containers locally

```bash
docker run --rm -p 3000:3000 react-turbo-api:latest
docker run --rm -p 8080:80 react-turbo-web:latest
```


## How shadcn/ui component placement and import works

shadcn/ui uses a config file (`components.json`) in each workspace to control:
- **Where new components are generated** (physical file placement)
- **How you import those components** (import path alias)

### Example: packages/ui/components.json
```json
"aliases": {
  "components": "src/components", // Where new files are created
  "ui": "src/components"          // How you import from other packages/apps
}
```

### Example: apps/web/components.json
```json
"aliases": {
  "components": "@repo/ui/components", // Where new files are created in the app
  "ui": "@repo/ui/components"          // How you import from the shared UI package
}
```

**Why repeat the path?**
- The `components` alias tells the CLI where to place files.
- The `ui` (or `components`) alias tells your code how to import them.
- Both are needed for correct monorepo operation and clean imports.

**Adding a new component to the shared UI package:**
```bash
# From repo root (recommended)
pnpm dlx shadcn@latest add button -c packages/ui -y

# Or if you are already inside packages/ui
dlx shadcn@latest add button -y
```

This will generate files in `packages/ui/src/components` and let you import them in your app as:
```ts
import { Button } from "@repo/ui/components/button"
```