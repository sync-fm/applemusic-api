---
sidebar_position: 1
---

# Getting Started

This guide walks through the fundamentals of using `@syncfm/applemusic-api` in your project.

## Prerequisites

- Bun 1.1+ or Node.js 18+
- An Apple Music storefront region (defaults to `US` if unspecified)
- Optional developer or user tokens if you do not want to rely on the default token scraper

## Installation

```bash
bun add @syncfm/applemusic-api
# or
npm install @syncfm/applemusic-api
```

## Initialize the client

```ts title="src/example.ts"
import { AppleMusic, AuthType, Region } from "@syncfm/applemusic-api";

const client = new AppleMusic({
  region: Region.US,
  authType: AuthType.Scraped,
});

await client.init();

const results = await client.Search.search({
  term: "Tyla",
  types: ["songs", "albums"],
  limit: 5,
});

console.log(results.songs?.data?.map((song) => song.attributes?.name));
```

## Next steps

- Explore other endpoint helpers in the **API Reference**.
- Call `verifyTokenValidity()` to quickly check a developer token.
- Customize logging by assigning a compatible logger to `client.log`.
