---
sidebar_position: 2
---

# Configuration and Authentication

`AppleMusic` shares a single configuration instance across every endpoint. This guide covers the
options you can tune when bootstrapping the client and how to work with authentication flows.

## Configure the client

The constructor accepts either raw configuration parameters or an existing `AppleMusicConfig`
instance. All fields are optional, so you can layer in the pieces you need.

```ts title="src/config-example.ts"
import { AppleMusic, AppleMusicConfig, AuthType, LogLevel, Region } from "@syncfm/applemusic-api";

const config = new AppleMusicConfig({
  region: Region.SE,
  authType: AuthType.Scraped,
});

config.setLoggerOptions({ level: LogLevel.Debug });

const client = new AppleMusic(config);
await client.init();
```

### Regions

`AppleMusicConfig` defaults to `Region.US`. Switch regions when you need localized catalog data.

```ts
config.setRegion(Region.JP);
```

### Authentication modes

Available modes are defined by `AuthType`. Today the client wires up `AuthType.Scraped`, which
scrapes and refreshes tokens automatically. Other modes (developer and user tokens) exist in the
type system and are being implemented incrementally. When you switch to one of those modes you are
responsible for providing the relevant tokens to Apple Music ahead of calling `init()`.

```ts
config.setAuthType(AuthType.Scraped);
```

## Verifying tokens

After initialization you can sanity check a token with `verifyTokenValidity()`. The helper issues a
lightweight request against the Apple Music API.

```ts
const isValid = await appleMusic.verifyTokenValidity();
if (!isValid) {
  throw new Error("Developer token was rejected by Apple Music");
}
```

## Logging destinations

The client exposes a structured logger. Replace it with your own or adjust destinations at runtime.

```ts
import { DestinationName, LogLevel, Logger } from "@syncfm/applemusic-api";

const logger = new Logger({
  destinations: [DestinationName.Console],
  level: LogLevel.Debug,
});

const client = new AppleMusic({
  region: Region.US,
  authType: AuthType.Scraped,
});

client.log = logger;
await client.init();
```

You can enable the built-in file destination when running in Node.js or Bun:

```ts
logger.enableDestination(DestinationName.File);
```

Use these knobs to align the client with your runtime and observability tooling while keeping type
safety across every endpoint.
