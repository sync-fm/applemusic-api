import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type CanaryElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, unknown>;

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'canary-root': CanaryElementProps & { framework?: string };
      'canary-provider-pagefind': CanaryElementProps & { options?: string };
      'canary-modal': CanaryElementProps;
      'canary-trigger-searchbar': CanaryElementProps & { slot?: string };
      'canary-content': CanaryElementProps & { slot?: string };
      'canary-filter-tags': CanaryElementProps & { slot?: string; tags?: string; 'local-storage-key'?: string };
      'canary-input': CanaryElementProps & { slot?: string; autofocus?: boolean };
      'canary-search': CanaryElementProps & { slot?: string };
      'canary-filter-tabs-glob': CanaryElementProps & { slot?: string; tabs?: string };
      'canary-search-results': CanaryElementProps & { slot?: string };
    }
  }
}

export {};
