#!/usr/bin/env bun

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const decoder = new TextDecoder();
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(SCRIPT_DIR, "..");
const COVERAGE_SUMMARY_PATH = resolve(
  PROJECT_ROOT,
  "coverage/coverage-summary.json"
);
const STATUS_OUTPUT_PATH = resolve(
  PROJECT_ROOT,
  "docs-src/.vitepress/data/status.json"
);

type VitestSummary = {
  files: { passed: number | null; total: number | null };
  tests: { passed: number | null; total: number | null };
  duration: string | null;
};

function parseVitestSummary(stdout: string): VitestSummary {
  const lines = stdout.split(/\r?\n/);
  const summary: VitestSummary = {
    files: { passed: null, total: null },
    tests: { passed: null, total: null },
    duration: null,
  };

  const filesRegex = /Test Files\s+(\d+)\s+passed\s+\((\d+)\)/;
  const testsRegex = /Tests\s+(\d+)\s+passed\s+\((\d+)\)/;
  const durationRegex = /Duration\s+(.+)/;

  for (const line of lines) {
    const filesMatch = line.match(filesRegex);
    if (filesMatch) {
      summary.files.passed = Number.parseInt(filesMatch[1], 10);
      summary.files.total = Number.parseInt(filesMatch[2], 10);
    }

    const testsMatch = line.match(testsRegex);
    if (testsMatch) {
      summary.tests.passed = Number.parseInt(testsMatch[1], 10);
      summary.tests.total = Number.parseInt(testsMatch[2], 10);
    }

    const durationMatch = line.match(durationRegex);
    if (durationMatch) {
      summary.duration = durationMatch[1].trim();
    }
  }

  return summary;
}

function assertSummary(summary: VitestSummary): void {
  if (
    summary.files.passed == null ||
    summary.files.total == null ||
    summary.tests.passed == null ||
    summary.tests.total == null
  ) {
    throw new Error("Failed to parse vitest summary output");
  }
}

async function runTests(): Promise<VitestSummary> {
  console.log("Running test suite (includes coverage)...\n");
  const result = Bun.spawnSync({
    cmd: ["bun", "run", "test"],
    cwd: PROJECT_ROOT,
    stdout: "pipe",
    stderr: "pipe",
    env: {
      ...process.env,
      FORCE_COLOR: "0",
      NO_COLOR: "1",
    },
  });

  const stdout = decoder.decode(result.stdout);
  const stderr = decoder.decode(result.stderr);

  if (stdout) {
    process.stdout.write(stdout);
  }
  if (stderr) {
    process.stderr.write(stderr);
  }

  if (result.exitCode !== 0) {
    throw new Error("Vitest reported failures. See output above.");
  }

  const summary = parseVitestSummary(stdout);
  assertSummary(summary);
  return summary;
}

type CoverageTotals = {
  lines: { total: number; covered: number; pct: number };
  statements: { total: number; covered: number; pct: number };
  functions: { total: number; covered: number; pct: number };
  branches: { total: number; covered: number; pct: number };
};

async function readCoverageSummary(): Promise<CoverageTotals> {
  const json = await readFile(COVERAGE_SUMMARY_PATH, "utf8");
  const summary = JSON.parse(json);
  if (!summary?.total) {
    throw new Error("coverage-summary.json is missing total metrics");
  }
  return summary.total;
}

async function writeStatus(status: unknown): Promise<void> {
  await mkdir(dirname(STATUS_OUTPUT_PATH), { recursive: true });
  await writeFile(STATUS_OUTPUT_PATH, JSON.stringify(status, null, 2) + "\n");
}

(async () => {
  try {
    const tests = await runTests();
    const coverageTotals = await readCoverageSummary();
    const status = {
      generatedAt: new Date().toISOString(),
      tests: {
        passed: true,
        files: tests.files,
        cases: tests.tests,
        duration: tests.duration,
      },
      coverage: {
        lines: coverageTotals.lines,
        statements: coverageTotals.statements,
        functions: coverageTotals.functions,
        branches: coverageTotals.branches,
      },
    };

    await writeStatus(status);
    console.log(`\nSaved status snapshot to ${STATUS_OUTPUT_PATH}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
})();
