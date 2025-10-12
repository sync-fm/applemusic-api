import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import status from '@site/src/data/status.json';

import styles from './styles.module.css';

function formatUTCDate(dateIso: string): string {
  const date = new Date(dateIso);
  if (Number.isNaN(date.getTime())) {
    return 'unknown';
  }

  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
    timeZoneName: 'short',
  }).format(date);
}

function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

function formatInteger(value: number): string {
  return value.toLocaleString();
}

export default function TestRunStatus(): ReactNode {
  const lastUpdated = formatUTCDate(status.generatedAt);
  const testsPassed = status.tests.passed;

  const metrics = [
    {
      label: 'Spec files',
      value: formatInteger(status.tests.files.passed),
      footnote: `of ${formatInteger(status.tests.files.total)}`,
    },
    {
      label: 'Assertions',
      value: formatInteger(status.tests.cases.passed),
      footnote: `of ${formatInteger(status.tests.cases.total)}`,
    },
    {
      label: 'Line coverage',
      value: formatPercentage(status.coverage.lines.pct),
    },
    {
      label: 'Branch coverage',
      value: formatPercentage(status.coverage.branches.pct),
    },
    {
      label: 'Function coverage',
      value: formatPercentage(status.coverage.functions.pct),
    },
  ];

  return (
    <section className={styles.panel} aria-labelledby="recent-test-run">
      <header className={styles.header}>
        <div className={styles.headingGroup}>
          <Heading as="h2" id="recent-test-run">
            Recent test run
          </Heading>
          <p className={styles.meta}>Updated {lastUpdated}</p>
        </div>
        <span
          className={clsx(styles.badge, testsPassed ? styles.badgePassing : styles.badgeFailing)}
          role="status">
          {testsPassed ? 'passing' : 'failing'}
        </span>
      </header>
      <div className={styles.metricsGrid}>
        {metrics.map(({label, value, footnote}) => (
          <div key={label} className={styles.metricCard}>
            <span className={styles.metricLabel}>{label}</span>
            <div className={styles.metricValueRow}>
              <span className={styles.metricValue}>{value}</span>
              {footnote ? <span className={styles.metricFootnote}>{footnote}</span> : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
