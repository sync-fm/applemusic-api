# Library source

This folder contains the TypeScript runtime for `@syncfm/applemusic-api`.

## Contents
- `AppleMusic.ts` starts the client, wires authentication, and lazily instantiates endpoint helpers.
- `endpoints/` mirrors Apple Music REST resources such as Albums, Artists, Songs, Music Videos, Search, Suggestions, and Hints.
- `utils/` manages configuration, token fetching, logger destinations, and the shared Axios client.
- `types/` centralizes reusable enums and response shapes shared across endpoints.
- `example.ts` shows a simple usage flow you can run with Bun.

## Working in this folder
- Run `bun run test` or `bun run dtest` while iterating on endpoint logic.
- Update or add Vitest suites beside the modules they cover to keep type guards and parsers honest.
- Regenerate the published documentation after releasing changes by running `bun run docs:build` from the repo root.

## Learn more
Visit https://docs.syncfm.dev/applemusic-api for full guides and API reference material.
