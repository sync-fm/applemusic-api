import React from 'react';

import ErrorBoundary from '@docusaurus/ErrorBoundary';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';

import Canary from './Canary';

type CanaryOptions = Parameters<typeof Canary>[0]['options'];

export default function SearchBar(): React.ReactElement | null {
  const pagefindPath = useBaseUrl('pagefind/pagefind.js',
    {
      forcePrependBaseUrl: true,
      absolute: true,
    }
  );
  const { options } = usePluginData('docusaurus-theme-search-pagefind') as {
    options: CanaryOptions & {
      styles?: Record<string, string>;
    };
  };

  const { styles, ...rest } = options;
  const canaryOptions = React.useMemo(() => ({
    ...rest,
    path: pagefindPath,
  }), [rest, pagefindPath]);

  React.useEffect(() => {
    if (styles) {
      Object.entries(styles).forEach(([key, value]) => {
        document.body.style.setProperty(key, value as string);
      });
    }
  }, [styles]);

  if (!pagefindPath) {
    return null;
  }

  return (
    <ErrorBoundary
      fallback={({ error, tryAgain }) => (
        <div>
          <p>Canary crashed because: "{error.message}".</p>
          <p>
            Most likely, your production build will be fine.{' '}
            <pre>(docusaurus build && docusaurus serve)</pre>
          </p>
          <p>Here's what you can do:</p>
          <ul>
            <li>
              Try to <button onClick={tryAgain}>reload</button> the page.
            </li>
            <li>
              Run production build at least once: <pre>docusaurus build</pre>
            </li>
            <li>
              If the problem persists, please{' '}
              <a href="https://github.com/fastrepl/canary/issues/new">open an issue.</a>
            </li>
          </ul>
        </div>
      )}
    >
      <Canary options={canaryOptions} />
    </ErrorBoundary>
  );
}
