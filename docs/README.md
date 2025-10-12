# Documentation site

This folder hosts the Docusaurus project that publishes https://am-docs.syncfm.dev.

## Key pieces
- `docusaurus.config.ts` defines site metadata, navbar links, the Pagefind search theme, and the Typedoc plugin settings.
- `src/pages/index.tsx` renders the landing page hero, feature overview, roadmap, and legal notice.
- `src/components/` contains reusable React blocks such as the feature grid, version badge, and test run status widget.
- `docs/` stores guides, API reference output from Typedoc, and about pages that ship with the build.
- `scripts/update-status.ts` pulls the latest package version and test results into `src/data/status.json` before each build.

## Developing the docs
- Run `bun run dev` in this directory for a local preview with live reload.
- Create or edit Markdown under `docs/` and rerun `bun run build` when preparing a release.
- Regenerate the typed API reference by running `bun run build`, which executes the Typedoc powered plugin.

## Learn more
Head to https://am-docs.syncfm.dev for the published guides and reference material.
