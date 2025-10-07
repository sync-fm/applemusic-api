<script setup lang="ts">
import rawStatus from "../../data/status.json";

type CoverageKey = "lines" | "statements" | "functions" | "branches";

interface CoverageMetric {
  pct: number;
  covered: number;
  total: number;
  skipped?: number;
}

interface SummaryBucket {
  passed: number;
  total: number;
}

interface StatusSnapshot {
  generatedAt: string | null;
  tests: {
    passed: boolean;
    files: SummaryBucket;
    cases: SummaryBucket;
    duration: string | null;
  };
  coverage: Record<CoverageKey, CoverageMetric>;
}

const status = (rawStatus ?? {}) as Partial<StatusSnapshot>;

const coverageSections = (
  ["lines", "statements", "functions", "branches"] as const
).map((key) => {
  const metric = status.coverage?.[key as CoverageKey];
  const pct = typeof metric?.pct === "number" ? metric.pct : 0;
  return {
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    pct: pct.toFixed(1),
    covered: metric?.covered ?? 0,
    total: metric?.total ?? 0,
  };
});

const testsSummary = {
  files: status.tests?.files ?? { passed: 0, total: 0 },
  cases: status.tests?.cases ?? { passed: 0, total: 0 },
  duration: status.tests?.duration ?? null,
  passed: status.tests?.passed ?? false,
};

const lastGenerated = status.generatedAt ? new Date(status.generatedAt) : null;

const dateFormatter = lastGenerated
  ? new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    })
  : null;

const generatedLabel =
  lastGenerated && dateFormatter
    ? dateFormatter.format(lastGenerated)
    : "Status snapshot not generated yet";
</script>

<template>
  <div class="status-panel">
    <div class="status-block tests" :class="{ failing: !testsSummary.passed }">
      <header>
        <span class="title">Tests</span>
        <span class="state">{{
          testsSummary.passed ? "Passing" : "Needs attention"
        }}</span>
      </header>
      <p>
        Files
        <strong>{{ testsSummary.files.passed }}</strong>
        /
        <strong>{{ testsSummary.files.total }}</strong>
      </p>
      <p>
        Cases
        <strong>{{ testsSummary.cases.passed }}</strong>
        /
        <strong>{{ testsSummary.cases.total }}</strong>
      </p>
      <p v-if="testsSummary.duration">
        Duration
        <strong>{{ testsSummary.duration }}</strong>
      </p>
    </div>

    <div class="status-block coverage">
      <header>
        <span class="title">Coverage</span>
        <span class="state">{{ coverageSections[0].pct }}% lines</span>
      </header>
      <ul>
        <li v-for="section in coverageSections" :key="section.key">
          <span>{{ section.label }}</span>
          <strong>{{ section.pct }}%</strong>
          <small>{{ section.covered }} / {{ section.total }}</small>
        </li>
      </ul>
    </div>

    <footer>
      <span>Last updated</span>
      <strong>{{ generatedLabel }}</strong>
    </footer>
  </div>
</template>

<style scoped>
.status-panel {
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-alt);
  box-shadow: 0 10px 30px -20px rgba(22, 28, 45, 0.35);
}

.status-panel header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.status-block {
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
}

.status-block.tests header .state {
  color: var(--vp-c-green-2);
}

.status-block.tests.failing header .state {
  color: var(--vp-c-red-2);
}

.status-block p {
  margin: 0.25rem 0;
  font-size: 0.95rem;
}

.status-block p strong {
  margin-left: 0.25rem;
  font-variant-numeric: tabular-nums;
}

.status-block.coverage ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.45rem;
}

.status-block.coverage li {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: baseline;
  font-size: 0.95rem;
}

.status-block.coverage li strong {
  font-variant-numeric: tabular-nums;
}

.status-block.coverage li small {
  grid-column: 1 / -1;
  color: var(--vp-c-text-2);
}

footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

@media (min-width: 720px) {
  .status-panel {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
  }

  .status-panel footer {
    grid-column: 1 / -1;
  }
}
</style>
