# Getting Started

This short guide walks you through the quickest way to generate an Apple Music access token and bootstrap the `AppleMusic` client that ships with this SDK.

## Install

```bash
npm install @syncfm/applemusic-api
# or
bun add @syncfm/applemusic-api
```

## Configure the client

```ts
import { AppleMusic, AuthType, Region } from "@syncfm/applemusic-api";

const am = new AppleMusic({
  authType: AuthType.Scraped,
  region: Region.US,
});

await am.init();

const album = await am.Albums.get({ id: "310730204" });

console.log("Album:", album.data[0].attributes);

// Each endpoint is available via a dedicated facade class
const album = await am.Albums.get({ id: "310730204" });
const latest = await am.Artists.getView({
  id: "900032648",
  view: "latest-release",
});
const suggestions = await am.Suggestions.suggestions({
  term: "caroline polachek",
});
```

Create a AppleMusic class, define auth method - and optionally set a region (defaults to `us`). Call `init()` once to authenticate and prepare the endpoint helpers.

## Fetching the first pieces of data

```ts
const album = await am.Albums.get({ id: "1469577723" });
console.log(
  `${album.data[0]?.attributes?.name} by ${
    album.data[0]?.relationships?.artists?.data?.[0]?.attributes?.name ??
    "unknown"
  }`
);
```

You can now fan out to other endpoints—`getArtist`, `getSong`, `getMusicVideo`, `getSuggestions`, and more. Type definitions for every request and response shape are available via the `AppleMusic.*Types` namespace re-exports.

> 💡 The generated TypeDoc reference lives under `/reference/`. Pair it with these guides to quickly navigate between narrative docs and API surface area.
