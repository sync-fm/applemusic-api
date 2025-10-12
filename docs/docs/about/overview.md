---
sidebar_position: 1
---

# Project overview

`@syncfm/applemusic-api` is an actively developed TypeScript client for the Apple Music web API. It
wraps Apple Music endpoints with typed helpers, automated token handling, and configuration objects
that can be reused across environments.

Key characteristics:

- **Runtime support**: targets Bun and Node.js with the same surface area
- **Endpoints implemented**: search, suggestions, hints, artists, albums, songs, and music videos
- **Configuration**: shared `AppleMusicConfig` instance backs every endpoint and logger
- **Status**: in early development! - expect changes while the remaining API coverage and auth flows are
  brought online

If you plan to depend on the client in production, pin releases and follow the roadmap to track
upcoming changes.
