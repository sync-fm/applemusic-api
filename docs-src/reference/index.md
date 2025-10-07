# @syncfm/applemusic-api

> A lot of work here is based off the work of https://github.com/oxmc

More coming soon :D

## Usage

```ts
import { AppleMusic } from "@syncfm/applemusic-api";

const music = new AppleMusic({
  developerToken: "YOUR_TOKEN",
  region: "us",
});

await music.init();

// Each endpoint is available via a dedicated facade class
const album = await music.Albums.get({ id: "310730204" });
const latest = await music.Artists.getView({
  id: "900032648",
  view: "latest-release",
});
const suggestions = await music.Suggestions.suggestions({
  term: "caroline polachek",
});
```
