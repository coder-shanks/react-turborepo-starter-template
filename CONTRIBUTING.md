# CONTRIBUTING

Thanks for contributing.

## Prerequisites

- Node.js `>=18`
- pnpm `9`

Install dependencies from repo root:

```bash
pnpm install
```

## Monorepo structure

- `apps/web` - React + Vite frontend
- `apps/api` - NestJS backend
- `packages/ui` - shared UI package
- `packages/typescript-config` - shared tsconfig presets

## Development commands

From repo root:

```bash
pnpm dev
pnpm build
pnpm lint:format
```

Workspace-specific examples:

```bash
pnpm --filter web dev
pnpm --filter web build
pnpm --filter api dev
pnpm --filter api test
pnpm --filter api test:e2e
```

## Code standards

- Use TypeScript.
- Follow Biome formatting/linting output.
- Keep changes focused and minimal.
- Do not mix unrelated refactors into feature/fix PRs.

## Architecture expectations

- Keep app logic in its app workspace.
- Put reusable UI in `packages/ui`.
- Do not create direct imports between `apps/web` and `apps/api`.
- Import shared code through package exports only.

## Testing expectations

- For frontend changes, ensure `apps/web` builds.
- For backend changes, run at least unit tests in `apps/api`.
- For shared package changes, run root build to verify dependents.

## Pull request checklist

Before opening a PR:

1. Run `pnpm lint:format`.
2. Run relevant build/tests for changed workspace(s).
3. Verify no unrelated files changed.
4. Write a clear PR description with scope and rationale.

## Commit guidance

- Use clear, imperative commit messages.
- Prefer small commits grouped by logical change.
- Reference issue/task IDs when available.

## Dependency changes

- Add dependencies only in the workspace that needs them.
- Prefer workspace-local dependencies over root-level additions.
- Explain why new dependency is needed in PR description.

## Documentation

Update docs when behavior or architecture changes:

- Update `ARCHITECTURE.md` for structural changes.
- Update `AGENTS.md` when automation workflow expectations change.
