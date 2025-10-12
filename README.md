# @syncfm/applemusic-api

Typed helpers around Apple Music catalog endpoints with shared configuration, logging, and token management. The client is still in active development, so expect method signatures to move as we close gaps.

## Features

- Zero configuration authentication with automatic scraping and validation of session tokens
- Strong typing across endpoints for albums, artists, songs, music videos, search, hints, suggestions, and relationships
- Consistent logging hooks so you can forward diagnostics to your own observability stack
- Built with Bun and Vitest for fast builds and test feedback

## Requirements

- Node.js 18 or newer, or Bun 1.1 or newer
- Optional developer or user tokens if you want to override the default scraped authentication flow


Guides, endpoint details, and configuration notes live at https://am-docs.syncfm.dev .

## Installation

```bash
npm install @syncfm/applemusic-api
# or
pnpm add @syncfm/applemusic-api
# or
yarn add @syncfm/applemusic-api
# or
bun add @syncfm/applemusic-api
```

## Quick start

```ts
import { AppleMusic, AuthType, Region } from "@syncfm/applemusic-api";

const music = new AppleMusic({
	region: Region.US,
	authType: AuthType.Scraped,
});

await music.init();

const results = await music.Search.search({
	term: "bad omens",
	types: ["songs", "albums"],
	limit: 5,
});

console.log(results.songs?.data?.map((song) => song.attributes?.name));
```

### Endpoint usage examples

Every top level namespace mirrors an Apple Music resource. Each method enforces the correct parameter and response types.

```ts
await music.Albums.get({
	ids: ["1644355784"],
});

await music.Albums.getRelationship({
	id: "1644355784",
	relationship: "tracks",
});

await music.Suggestions.suggestions({
	term: "blind cha",
	limit: 10,
});
```

## Configuration

`AppleMusic` accepts either an `AppleMusicConfig` instance or plain `AppleMusicConfigParams`.

- `region`: defaults to `Region.US` but can be set to any supported storefront
- `authType`: choose between `Scraped`, `DeveloperToken`, `UserTokenViaDevToken`, or `UserTokenUnofficial`
- `logger`: pass a custom logger implementing the client logger interface, or configure the built in logger through `loggerOptions`


## Tooling

- Build: `bun run build`
- Type check: `bun run type-check`
- Tests with coverage: `bun run test`
- Lint and format: `bun run check`
- Generate reference docs: `bun run docs:build`

## Documentation

Guides, endpoint details, and configuration notes live at https://am-docs.syncfm.dev .

## Contributing

1. Fork the repository and create a feature branch
2. Install dependencies and run the test suite
3. Open a pull request with a clear description and examples

Please include tests or docs when you add new features.

## Legal

Apple Music and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries. This project is an independent community effort and is not affiliated with, endorsed by, or sponsored by Apple Inc. Any interaction with Apple services remains subject to Apple policies, terms, and applicable laws. Ensure you have the necessary authorization before using this client in your applications.

## License

MIT License. See `LICENSE.md` for details.
