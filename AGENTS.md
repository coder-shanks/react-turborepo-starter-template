# AGENTS

This file defines how AI coding agents should operate in this repository.

## Primary objective

Make minimal, correct, and verifiable changes that respect monorepo boundaries and existing tooling.

## Working rules

1. Prefer small, focused edits over broad refactors.
2. Do not change project structure unless the task explicitly requires it.
3. Do not introduce new dependencies unless necessary; justify when added.
4. Do not modify lockfiles by hand.
5. Do not commit or create branches unless explicitly asked.

## Repository boundaries

- `apps/web`: frontend app concerns only
- `apps/api`: backend API concerns only
- `packages/ui`: shared UI building blocks only
- `packages/typescript-config`: TS config presets only

### Import constraints

- Allowed: `apps/*` -> `packages/*`
- Disallowed: `apps/web` <-> `apps/api` direct code imports
- Use exported module entry points only; avoid private path imports

## Change strategy

When implementing a task:

1. Identify target workspace(s).
2. Prefer the narrowest file set.
3. Make edits consistent with current style and architecture.
4. Run relevant validation commands.
5. Report what changed, where, and what was validated.

## Validation checklist

Run the smallest useful checks first, then broaden if needed:

- Formatting/lint:
  - `pnpm lint:format`
- Frontend-only changes:
  - `pnpm --filter web build`
- Backend-only changes:
  - `pnpm --filter api test`
  - `pnpm --filter api build`
- Cross-workspace/shared package changes:
  - `pnpm build`

If full validation is expensive, run the most relevant subset and state what was not run.

## Style and conventions

- Follow Biome formatting (tabs, double quotes, semicolons as needed).
- Keep names descriptive; avoid one-letter identifiers.
- Avoid adding inline comments unless code is non-obvious.
- Prefer explicit types where they improve clarity.

## UI guidance

- Reuse components from `@repo/ui` before creating new ones.
- If a UI element is reusable, implement it in `packages/ui`.
- Keep app-specific composition inside `apps/web`.

## API guidance

- Preserve NestJS module/controller/service structure.
- Keep controller concerns thin and business logic in services.
- Maintain existing test patterns (`*.spec.ts`, `test/*.e2e-spec.ts`).

## Safety constraints

- Never expose secrets in code or docs.
- Do not add destructive scripts.
- Flag ambiguous requirements early with concrete assumptions.

## PR handoff format

Agent output should include:

1. Summary of changes
2. Files touched
3. Validation commands run + result
4. Risks or follow-ups (if any)
