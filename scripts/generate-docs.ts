#!/usr/bin/env bun

import { rm } from "node:fs/promises";
import { Application } from "typedoc";
import markdownDocOptions, {
  markdownPluginOptions,
} from "../typedoc.config.js";

// Deep clone function compatible with Node.js < 17
function cloneConfig<T>(config: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(config);
  }
  return JSON.parse(JSON.stringify(config));
}

async function generateMarkdownDocs(): Promise<void> {
  await rm(markdownDocOptions.out, { recursive: true, force: true });

  const preparedConfig = cloneConfig(
    markdownDocOptions
  ) as unknown as import("typedoc").TypeDocOptions;
  const app = await Application.bootstrapWithPlugins(preparedConfig);

  Object.entries(markdownPluginOptions).forEach(([option, value]) => {
    app.options.setValue(option, value);
  });

  const project = await app.convert();
  if (!project) {
    throw new Error(
      "TypeDoc failed to convert the project for markdown output."
    );
  }

  await app.generateOutputs(project);

  console.info(`Markdown documentation generated at ${markdownDocOptions.out}`);
}

async function main(): Promise<void> {
  await generateMarkdownDocs();
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack ?? error.message : error);
  process.exitCode = 1;
});
