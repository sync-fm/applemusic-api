---
sidebar_position: 4
---

# Testing and CI usage

The repository ships with Vitest-based suites covering each endpoint. You can mirror the same
patterns when integrating the client into your own test harness.

## Bootstrapping once per suite

Create the client in a `beforeAll` hook so token scraping and endpoint initialisation only happen
once per test file.

```ts title="tests/albums.test.ts"
import { beforeAll, describe, expect, it } from "vitest";
import { AppleMusic } from "@syncfm/applemusic-api";

let client: AppleMusic;

beforeAll(async () => {
  client = new AppleMusic();
  await client.init();
});

describe("Albums", () => {
  it("fetches track listings", async () => {
    const tracks = await client.Albums.getRelationship({
      id: "310730204",
      relationship: "tracks",
      limit: 2,
    });

    expect(tracks.data.length).toBeGreaterThan(0);
  });
});
```

`relationship` accepts string values defined by `AlbumsEndpointTypes.IncludeOption`. You can inline
the string when you only need a single value, or import the enum for stronger typing.

## Asserting token validity

When running in CI, fail fast if the shared token becomes invalid.

```ts title="tests/token.test.ts"
import { beforeAll, describe, expect, it } from "vitest";
import { AppleMusic } from "@syncfm/applemusic-api";

let client: AppleMusic;

beforeAll(async () => {
  client = new AppleMusic();
  await client.init();
});

describe("token", () => {
  it("remains valid", async () => {
    const valid = await client.verifyTokenValidity();
    expect(valid).toBe(true);
  });
});
```

## Recording logs

Swap in a custom logger during tests to capture additional information when requests fail.

```ts
import { AppleMusic, DestinationName, LogLevel, Logger } from "@syncfm/applemusic-api";

const logger = new Logger({
  destinations: [DestinationName.Console],
  level: LogLevel.Debug,
});

const client = new AppleMusic({ logger });
await client.init();
```

Run these tests in CI the same way the repository does (`bun test` or `npm test`). Keep response
sizes small by setting `limit` on endpoint helpers whenever possible.
