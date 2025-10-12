import type {ReactNode} from 'react';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import status from '@site/src/data/status.json';

import styles from './styles.module.css';

const semverHints: Record<'major' | 'minor' | 'patch', string> = {
  major: 'Breaking surface changes',
  minor: 'New backwards-compatible capabilities',
  patch: 'Fixes & polish with no API drift',
};

export default function VersionBadge(): ReactNode {
  const version = status.version;
  const [isOpen, setIsOpen] = useState(false);
  const [canRenderPortal, setCanRenderPortal] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setCanRenderPortal(true);
  }, []);

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const entries = useMemo(
    () => [
      {
        key: 'major' as const,
        value: version.major ?? '-',
      },
      {
        key: 'minor' as const,
        value: version.minor ?? '-',
      },
      {
        key: 'patch' as const,
        value: version.patch ?? '-',
      },
    ],
    [version.major, version.minor, version.patch],
  );

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }).format(new Date(status.generatedAt)),
    [],
  );

  const closeOverlay = useCallback(() => {
    setIsOpen(false);
  }, []);

  const content = (
    <aside className={styles.container} aria-label="Current library version" role="status">
      <header className={styles.header}>
        <span className={styles.pill}>Release channel</span>
        <code className={styles.code}>{version.tag}</code>
      </header>
      <div className={styles.grid}>
        {entries.map(({key, value}) => (
          <div key={key} className={styles.cell}>
            <span className={styles.metricLabel}>{key}</span>
            <span className={styles.metricValue}>{value}</span>
            <span className={styles.metricHint}>{semverHints[key]}</span>
          </div>
        ))}
      </div>
      <footer className={styles.footer}>
        <span className={styles.meta}>
          sourced from <code>{version.source}</code>
        </span>
        {version.preRelease ? (
          <span className={clsx(styles.meta, styles.metaAccent)}>
            prerelease <strong>{version.preRelease}</strong>
          </span>
        ) : null}
        {version.buildMetadata ? (
          <span className={clsx(styles.meta, styles.metaAccent)}>
            build <strong>{version.buildMetadata}</strong>
          </span>
        ) : null}
        <span className={clsx(styles.meta, styles.metaMuted)}>captured {formattedDate}</span>
      </footer>
    </aside>
  );

  const overlay = canRenderPortal && isOpen
    ? createPortal(
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Library version details">
          <button
            type="button"
            className={styles.overlayBackdrop}
            aria-label="Close version details"
            onClick={closeOverlay}
          />
          <div className={styles.overlayContent} role="presentation">
            <button
              type="button"
              className={styles.overlayClose}
              onClick={closeOverlay}
              aria-label="Close">
              ×
            </button>
            {content}
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`Library version ${version.raw}`}
        onClick={() => setIsOpen(true)}>
        <span className={styles.triggerLabel}>Version</span>
        <code className={styles.triggerCode}>{version.raw}</code>
        <span className={styles.triggerCompact} aria-hidden="true">v {version.raw}</span>
      </button>
      {overlay}
    </>
  );
}
