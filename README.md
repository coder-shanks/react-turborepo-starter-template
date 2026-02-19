# react-turborepo-starter-template

An opinionated monorepo starter kit for modern web development.

Minimal Turborepo with:
- `apps/web` — React + Vite frontend
- `apps/api` — NestJS backend

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

## Run individual apps

```bash
# frontend
pnpm --filter web dev

# backend
pnpm --filter api dev
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