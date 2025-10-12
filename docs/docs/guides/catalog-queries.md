---
sidebar_position: 3
---

# Catalog queries and relationships

This guide shows how to query Apple Music catalog resources using the shipped endpoint helpers. All
examples assume the client has already been initialised with `await client.init()`.

## Look up a single album

```ts title="examples/catalog/album.ts"
import { AppleMusic } from "@syncfm/applemusic-api";

const client = new AppleMusic();
await client.init();

const album = await client.Albums.get({ id: "310730204" });
const name = album.data[0]?.attributes?.name;
const artist = album.data[0]?.relationships?.artists?.data?.[0]?.attributes?.name;

console.log({ name, artist });
```

The response mirrors Apple Music's structure, so each resource sits inside the `data` array.

## Fetch album relationships

Use `Albums.getRelationship()` to pull curated collections like tracks or related albums. The helper
accepts strongly-typed include values imported from `AlbumsEndpointTypes`.

```ts title="examples/catalog/tracks.ts"
import { AppleMusic, AlbumsEndpointTypes } from "@syncfm/applemusic-api";

const client = new AppleMusic();
await client.init();

const tracks = await client.Albums.getRelationship({
  id: "310730204",
  relationship: AlbumsEndpointTypes.IncludeOption.Tracks,
  limit: 5,
});

const titles = tracks.data.map((item) => item.attributes?.name);
console.log(titles);
```

## Use catalog views

Specialised views expose curated content such as related albums or videos. `getView()` handles the
underlying query string formation so you only pass the view identifier.

```ts title="examples/catalog/views.ts"
import { AppleMusic } from "@syncfm/applemusic-api";

const client = new AppleMusic();
await client.init();

const related = await client.Albums.getView({
  id: "310730204",
  view: "related-albums",
  limit: 3,
});

console.log(related.data.map((item) => item.attributes?.name));
```

## Search the catalog

`SearchEndpoint` supports the same parameter contract as Apple Music's public API. Provide one or
more resource types and the helper will return typed collections.

```ts title="examples/catalog/search.ts"
import { AppleMusic } from "@syncfm/applemusic-api";

const client = new AppleMusic();
await client.init();

const search = await client.Search.search({
  term: "jonsi",
  types: ["artists", "albums"],
  limit: 3,
});

const artistNames = search.artists?.data.map((artist) => artist.attributes?.name) ?? [];
console.log(artistNames);
```

These primitives cover most catalog workflows. Combine them with configuration options from the
previous guide to run queries against different storefronts or authentication modes.
