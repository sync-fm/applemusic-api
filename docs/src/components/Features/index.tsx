import type {ReactNode} from 'react';
import Heading from '@theme/Heading';

import styles from './styles.module.css';

type SectionItem = {
  label: string;
  detail: ReactNode;
};

type OverviewColumn = {
  title: string;
  summary: ReactNode;
  items: SectionItem[];
};

const columns: OverviewColumn[] = [
  {
    title: 'Endpoints shipping now',
    summary: (
      <>
        Each endpoint class mirrors the Apple Music REST routes with typed params, responses, and helpers for includes, relationships, and pagination. Callers get compile-time feedback that matches the shapes emitted by the real API.
      </>
    ),
    items: [
      {
        label: 'Albums / Songs / Music Videos',
        detail: (
          <>
            Methods map directly to REST routes and response objects. Use typed calls such as <code>get()</code>,
            <code>getView()</code>, and <code>getRelationshipView()</code> to retrieve resources, related collections, and
            relationship views with structured includes and paging helpers.
          </>
        ),
      },
      {
        label: 'Artists',
        detail: (
          <>
            Typed lookups and relationship helpers expose artist resources, discography, and related entities with
            compile-time checked include and query options.
          </>
        ),
      },
      {
        label: 'Search / Suggestions / Hints',
        detail: (
          <>
            Search helpers offer typed query builders and return normalized result shapes for catalog search,
            suggestions, and hints.
          </>
        ),
      },
    ],
  },
  {
    title: 'Shared utilities',
    summary: (
      <>
        Supporting modules centralize configuration, authentication, and logging so endpoint code stays focused on
        Apple Music payloads.
      </>
    ),
    items: [
      {
        label: 'AppleMusicConfig',
        detail: 'Set region, authentication mode, and logger options at runtime, or swap them after initialization.',
      },
      {
        label: 'Logger',
        detail: 'Structured logger with console and optional file destinations, plus custom sinks via configuration.',
      },
      {
        label: 'Token storage',
        detail: 'TokenStorage persists Apple Music auth tokens, refreshes them transparently, and feeds the shared Axios clients.',
      },
      {
        label: 'getAuthenticatedAxios()',
        detail: 'Exports the same authenticated Axios instance the client uses, for one-off calls or custom tooling.',
      },
    ],
  },
  {
    title: 'Operational checkpoints',
    summary: (
      <>
        Guard rails for verifying connectivity, running CI, and documenting the current surface area while the library evolves.
      </>
    ),
    items: [
      {
        label: 'Client.init()',
        detail: 'Bootstraps shared Axios clients, configures authentication, and warms each endpoint prior to use.',
      },
      {
        label: 'verifyTokenValidity()',
        detail: 'Executes a lightweight probe against Apple Music to confirm the configured token still works.',
      },
      {
        label: 'Typedoc + Vitest',
        detail: 'Docs and tests live in the repo and regenerate during releases; Vitest suites cover endpoints, config, logging, and token helpers.',
      },
    ],
  },
];

function OverviewColumnView({title, summary, items}: OverviewColumn): ReactNode {
  return (
    <div className={styles.column}>
      <Heading as="h3" className={styles.columnTitle}>
        {title}
      </Heading>
      <p className={styles.columnSummary}>{summary}</p>
      <dl className={styles.columnList}>
        {items.map(({label, detail}) => (
          <div key={label} className={styles.listRow}>
            <dt>{label}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Features(): ReactNode {
  return (
    <div className={styles.overview}>
      {columns.map((column) => (
        <OverviewColumnView key={column.title} {...column} />
      ))}
    </div>
  );
}
