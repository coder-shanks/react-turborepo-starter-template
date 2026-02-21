# Web (`apps/web`)

React + Vite frontend app in this monorepo.

## Development

```bash
pnpm --filter web dev
```

## Build

```bash
pnpm --filter web build
```

## Preview production build

```bash
pnpm --filter web preview
```

## Docker

Build from repo root:

```bash
docker build -f apps/web/Dockerfile -t react-turbo-web:latest .
```

Run:

```bash
docker run --rm -p 8080:80 react-turbo-web:latest
```
