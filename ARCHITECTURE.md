# ARCHITECTURE

## System overview

This repository is a pnpm + Turborepo monorepo for a full-stack TypeScript setup:

- `apps/web`: React 19 + Vite frontend
- `apps/api`: NestJS 11 backend
- `packages/ui`: shared UI system (shadcn-style components, hooks, icons, utils, global styles)
- `packages/typescript-config`: shared TypeScript base configs consumed by apps/packages

The root orchestrates all workspaces with Turbo tasks (`dev`, `build`, `lint:format`).

## Workspace layout

- `apps/web`
  - Runtime: browser
  - Build tool: Vite
  - Uses shared package `@repo/ui`
  - UI components are consumed from `@repo/ui/*` aliases configured in `apps/web/components.json`

- `apps/api`
  - Runtime: Node.js
  - Framework: NestJS
  - Entrypoint: `src/main.ts`
  - Includes unit/e2e test setup with Jest

- `packages/ui`
  - Publishes internal exports for components, hooks, icons, utils, and stylesheet
  - Shared dependency surface for frontend UI consistency

- `packages/typescript-config`
  - Central tsconfig presets (`base`, `vite-app`, `vite-node`, `nestjs`, etc.)
  - Keeps TypeScript behavior consistent across workspaces

## Build and task graph

- Root scripts:
  - `pnpm dev` -> `turbo run dev`
  - `pnpm build` -> `turbo run build`
  - `pnpm lint:format` -> `turbo run lint:format`

- Turbo behavior:
  - `build` depends on `^build` and `lint:format`
  - Build inputs include default Turbo inputs and `.env*`
  - Build outputs include `dist/**` and `.next/**` (excluding `.next/cache/**`)
  - `dev` is persistent and uncached

## Dependency flow and boundaries

- Allowed import direction:
  - `apps/*` -> `packages/*`
  - `packages/*` -> external dependencies

- Disallowed patterns:
  - Cross-app imports (`apps/web` importing code from `apps/api` and vice versa)
  - Importing from another package’s private internals (use only exported entry points)

- Current shared dependency:
  - `apps/web` consumes `@repo/ui`

## Frontend architecture (`apps/web`)

- Entry: `src/main.tsx`
- App shell: `src/App.tsx`
- Styling:
  - App-level styles in `src/index.css`
  - Shared design styles from `@repo/ui/styles.css`
- Component sourcing:
  - Prefer `@repo/ui/components/*`, `@repo/ui/hooks/*`, `@repo/ui/lib/*`
  - New reusable UI should be added in `packages/ui`, not duplicated in app

## Backend architecture (`apps/api`)

- Entrypoint: `src/main.ts`
- Root module: `src/app.module.ts`
- Standard Nest layering:
  - Controller in `src/app.controller.ts`
  - Service in `src/app.service.ts`
- Tests:
  - Unit specs under `src/**/*.spec.ts`
  - E2E under `test/`

## Coding and tooling baseline

- Package manager: `pnpm@9`
- Node engine: `>=18`
- Formatter/linter: Biome (`indentStyle: tab`, double quotes, semicolons as needed)
- Language mode: TypeScript-first across all workspaces

## How to extend the system safely

- Add UI primitives to `packages/ui` and export via `packages/ui/package.json`
- Keep app-specific business logic inside each app workspace
- For new shared logic, create a dedicated package under `packages/*`
- Keep Turbo tasks workspace-local and composable from root scripts
