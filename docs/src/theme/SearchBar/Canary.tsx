import React from 'react';
import './style.css';

type CanaryTag = {
  name: string;
};

type CanaryOptions = {
  path?: string;
  tags?: CanaryTag[];
  tabs?: unknown;
  [key: string]: unknown;
};

type CanaryProps = {
  options: CanaryOptions;
};

type CustomElement = HTMLElement & {
  options?: CanaryOptions;
};

declare global {
  interface Window {
    pagefind?: unknown;
  }
}

export default function Canary({ options }: CanaryProps): React.ReactElement | null {
  const [ready, setReady] = React.useState(false);
  const tags = options?.tags ?? [];
  const tabs = React.useMemo(() => (Array.isArray(options?.tabs) ? options.tabs : undefined), [options?.tabs]);
  const hasTags = tags.length > 0;
  const hasTabs = Array.isArray(tabs) && tabs.length > 0;

  const providerRef = React.useCallback((node: CustomElement | null) => {
    if (!node) {
      return;
    }

    const mergedOptions = {
      ...(node.options ?? {}),
      ...options,
    };

    node.options = mergedOptions;
    node.setAttribute('options', JSON.stringify(mergedOptions));
  }, [options]);

  React.useEffect(() => {
    let cancelled = false;

    async function loadDependencies() {
      try {
        await Promise.all(
          [
            import('@getcanary/web/components/canary-root'),
            import('@getcanary/web/components/canary-provider-pagefind'),
            import('@getcanary/web/components/canary-modal'),
            import('@getcanary/web/components/canary-trigger-searchbar'),
            import('@getcanary/web/components/canary-input'),
            import('@getcanary/web/components/canary-content'),
            import('@getcanary/web/components/canary-search'),
            import('@getcanary/web/components/canary-search-results'),
            hasTags
              ? import('@getcanary/web/components/canary-filter-tags')
              : null,
            hasTabs
              ? import('@getcanary/web/components/canary-filter-tabs-glob')
              : null,
          ].filter(Boolean) as Array<Promise<unknown>>,
        );

        if (typeof window !== 'undefined' && options?.path && !window.pagefind) {
          const pagefindModule = await import(
            /* webpackIgnore: true */
            /* @vite-ignore */
            options.path
          );

          window.pagefind = (pagefindModule as Record<string, unknown>).default ?? pagefindModule;
        }

        if (!cancelled) {
          setReady(true);
        }
      } catch (error) {
        console.error("Maybe you forgot to install '@getcanary/web' or pagefind failed to load?", error);
      }
    }

    void loadDependencies();

    return () => {
      cancelled = true;
    };
  }, [hasTags, hasTabs, options?.path]);

  if (!ready) {
    return null;
  }

  return (
    <canary-root framework="docusaurus">
      <canary-provider-pagefind ref={providerRef}>
        <canary-modal>
          <canary-trigger-searchbar slot="trigger"></canary-trigger-searchbar>
          <canary-content slot="content">
            {hasTags ? (
              <canary-filter-tags
                slot="head"
                tags={tags.map(({ name }) => name).join(',')}
                local-storage-key="canary-filter-tags"
              ></canary-filter-tags>
            ) : null}
            <canary-input slot="input" autofocus></canary-input>
            <canary-search slot="mode">
              {hasTabs ? (
                <canary-filter-tabs-glob
                  slot="head"
                  tabs={JSON.stringify(tabs)}
                ></canary-filter-tabs-glob>
              ) : null}
              <canary-search-results slot="body"></canary-search-results>
            </canary-search>
          </canary-content>
        </canary-modal>
      </canary-provider-pagefind>
    </canary-root>
  );
}
