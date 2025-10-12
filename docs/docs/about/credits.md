---
sidebar_position: 3
---

# Credits

:::info Contributors
- **syncfm** - [github.com/sync-fm](https://github.com/sync-fm) · [syncfm.dev](https://syncfm.dev)
- **xwxfox** - [github.com/xwxfox](https://github.com/xwxfox)
- **oxmc** - [github.com/oxmc](https://github.com/oxmc)
:::

## Core library foundations

- [Apple Music API documentation](https://developer.apple.com/documentation/applemusicapi) from Apple provided the authoritative reference for every endpoint, parameter, and response shape we implement.
- [axios](https://axios-http.com/) powers our resilient HTTP client layer.
- [tough-cookie](https://github.com/salesforce/tough-cookie) maintains a persistent cookie jar for the token scraping workflow.
- Token yoinking strategies build on open research from the Apple Music and MusicKit community.

## Tooling and build pipeline

- [Bun](https://bun.sh/) drives our local workflows, from running scripts to bundling builds.
- [Vitest](https://vitest.dev/) handles our fast test suite with coverage.
- [Biome](https://biomejs.dev/) keeps the codebase formatted and linted.
- [tsc-alias](https://github.com/justkey007/tsc-alias) and [Knip](https://knip.dev/) streamline our build outputs and dependency hygiene.

## Documentation and community resources

- [Docusaurus](https://docusaurus.io/) powers the documentation site, with search powered by [Pagefind](https://pagefind.app/).
- API reference pages are generated with [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://github.com/tgreyuk/typedoc-plugin-markdown).