# API (`apps/api`)

NestJS API app in this monorepo.

## Development

```bash
pnpm --filter api dev
```

## Build

```bash
pnpm --filter api build
```

## Start

```bash
pnpm --filter api start
pnpm --filter api start:prod
```

## Tests

```bash
pnpm --filter api test
pnpm --filter api test:e2e
pnpm --filter api test:cov
```

## Docker

Build from repo root:

```bash
docker build -f apps/api/Dockerfile -t react-turbo-api:latest .
```

Run:

```bash
docker run --rm -p 3000:3000 react-turbo-api:latest
```
