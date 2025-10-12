import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {Highlight, themes} from 'prism-react-renderer';
import Features from '@site/src/components/Features';
import TestRunStatus from '@site/src/components/TestRunStatus';
import VersionBadge from '@site/src/components/VersionBadge';

import styles from './index.module.css';

const heroSnippet = `import {
  AppleMusic,
  Region,
  AuthType
} from '@syncfm/applemusic-api';

async function main() {
  const appleMusic = new AppleMusic({
    region: Region.US,
    authType: AuthType.Scraped
  });

  await appleMusic.init();

  const album = await appleMusic.Albums.get(
    { id: '310730204' }
  );

  console.log(album.data[0]?.attributes?.name);
}

main();
`;

const pageDescription = 'Typed helpers around Apple Music catalog endpoints with shared configuration, logging, and token management. The client is still in active development, so expect method signatures to move as we close gaps.';

function HeroCodeSnippet(): ReactNode {
  const highlightTheme = themes.vsDark;
  return (
    <div className={styles.heroCodeBlock} role="presentation">
      <Highlight
        code={heroSnippet}
        language="ts"
        theme={highlightTheme}
      >
        {({tokens, getLineProps, getTokenProps}) => (
          <pre
            aria-label="Example TypeScript usage of the AppleMusic client"
            className={styles.heroCodePre}
          >
            <code className={styles.heroCodeContent}>
              {tokens.map((line, index) => {
                const isLastLine = index === tokens.length - 1;
                const lineIsEmpty = line.length === 1 && line[0]?.content === '';
                if (isLastLine && lineIsEmpty) {
                  return null;
                }
                const lineProps = getLineProps({line, key: index});
                return (
                  <span
                    key={`line-${index}`}
                    {...lineProps}
                    className={`${styles.heroCodeLine} ${lineProps.className ?? ''}`.trim()}
                  >
                    {line.map((token, tokenIndex) => {
                      const tokenProps = getTokenProps({token, key: tokenIndex});
                      return (
                        <span
                          key={`token-${index}-${tokenIndex}`}
                          {...tokenProps}
                        />
                      );
                    })}
                  </span>
                );
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}

function HeroSection(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const [scope = siteConfig.title, name] = siteConfig.title.split('/');
  const scopeLabel = scope?.trim().length ? `${scope.trim()}/` : '';
  const packageName = name?.trim().length ? name.trim() : scope.trim();

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <Heading as="h1" className={styles.heroTitle}>
            <div className={styles.heroHeadingTop}>
              <span className={styles.heroPrefix}>{scopeLabel}</span>
              <div className={styles.heroVersion}>
                <VersionBadge />
              </div>
            </div>
            <span className={styles.heroName}>{packageName}</span>
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <p className={styles.heroDescription}>{pageDescription}</p>
          <div className={styles.actionRow}>
            <Link className={styles.primaryAction} to="/docs/intro">
              Get started
            </Link>
            <Link className={styles.secondaryAction} to="/docs/api">
              Browse the API
            </Link>
          </div>
        </div>
        <div className={styles.heroCode}>
          <div className={styles.heroCodeWindow}>
            <header className={styles.heroCodeHeader}>
              <span className={styles.heroCodeControls} aria-hidden="true">
                <span className={styles.heroCodeDot} data-variant="close" />
                <span className={styles.heroCodeDot} data-variant="minimize" />
                <span className={styles.heroCodeDot} data-variant="fullscreen" />
              </span>
              <span className={styles.heroCodeTitle}>examples/albums.ts</span>
            </header>
            <HeroCodeSnippet />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={pageDescription}>
      <main className={styles.page}>
        <HeroSection />
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Heading as="h2">Early build, ready-to-use catalog toolkit</Heading>
            <p>
              The Apple Music client already ships typed modules for Albums, Artists, Songs,
              Music Videos, Search, Suggestions, and Hints - all hanging off a single
              configuration that handles region, auth mode, structured logging, and token
              management. The lists below outline everything that&apos;s available in the current
              npm release.
            </p>
          </div>
          <Features />
        </section>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Heading as="h2">Roadmap</Heading>
            <p>
              Items under active development. Follow progress in the repository issues and
              discussions.
            </p>
          </div>
          <ul className={styles.roadmapList}>
            <li>
              <span className={styles.roadmapLabel}>Playlists and library endpoints</span>
              <span className={styles.roadmapDetail}>
                Extend the client with authenticated library helpers and playlist mutations.
              </span>
            </li>
            <li>
              <span className={styles.roadmapLabel}>Configurable transport options</span>
              <span className={styles.roadmapDetail}>
                Surface retry policies and caching hooks in <code>AppleMusicConfig</code>.
              </span>
            </li>
            <li>
              <span className={styles.roadmapLabel}>User, Developer, and User (scraped) token flows</span>
              <span className={styles.roadmapDetail}>
                Wire up more <code>AuthType</code>s to allow for user and developer token auth & authenticated / user-action requests.
              </span>
            </li>
            <li>
              <span className={styles.roadmapLabel}>More extensive docs</span>
              <span className={styles.roadmapDetail}>
                Publish endpoint response shapes alongside examples in the guides.
              </span>
            </li>
          </ul>
        </section>
        <div className={styles.section}>
          <TestRunStatus />
        </div>
        <section className={styles.legalSection} aria-label="Legal notice">
          <Heading as="h2" className={styles.legalHeading}>
            Legal notice
          </Heading>
          <p className={styles.legalCopy}>
            Apple Music and the Apple logo are trademarks of Apple Inc., registered in the
            U.S. and other countries. This project is an independent community effort and is
            not affiliated with, endorsed by, or sponsored by Apple Inc.
          </p>
          <p className={styles.legalCopy}>
            Any Apple services accessed through this client remain subject to Apple policies
            and terms. Ensure you have appropriate authorization before using the API in your
            applications.
          </p>
        </section>
      </main>
    </Layout>
  );
}
