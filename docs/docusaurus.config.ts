import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const SITE_DESCRIPTION = 'Unofficial Apple Music API client with typed helpers around their endpoints with shared configuration, logging, and token management.';
const SITE_SCOPE = '@syncfm/applemusic-api';
const SITE_TITLE = `Developer Documentation`;
const URL = 'https://am-docs.syncfm.dev';
const BASE_URL = '/';
const OG_IMAGE_WIDE = `${URL}${BASE_URL}img/og-wide.png`;
// const OG_IMAGE_SQUARE = `${BASE_URL}img/og-square.png`;
const OG_IMAGE_ALT = '@syncfm/applemusic-api image asset';

const config: Config = {
  title: SITE_TITLE,
  tagline: 'A lil unofficial Type-Safe Apple Music client',
  favicon: 'img/logo.png',
  headTags: [
    {
      tagName: 'meta',
      attributes: {property: 'og:type', content: 'website'},
    },
    {
      tagName: 'meta',
      attributes: {property: 'og:locale', content: 'en_US'},
    },
    {
      tagName: 'meta',
      attributes: {property: 'og:site_name', content: SITE_SCOPE},
    },
    {
      tagName: 'meta',
      attributes: {property: 'og:title', content: SITE_TITLE},
    },
    {
      tagName: 'meta',
      attributes: {property: 'og:description', content: SITE_DESCRIPTION},
    },
    {
      tagName: 'meta',
      attributes: {property: 'og:url', content: 'https://am-docs.syncfm.dev/'},
    },
    {
      tagName: 'meta',
      attributes: {property: 'og:image', content: OG_IMAGE_WIDE},
    },
    {
      tagName: 'meta',
      attributes: {property: 'og:image:alt', content: OG_IMAGE_ALT},
    },
    {
      tagName: 'meta',
      attributes: {property: 'og:image:width', content: '1200'},
    },
    {
      tagName: 'meta',
      attributes: {property: 'og:image:height', content: '630'},
    }
  ],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: URL,
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: BASE_URL,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'sync-fm', // Usually your GitHub org/user name.
  projectName: 'applemusic-api', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/sync-fm/applemusic-api/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
    '@getcanary/docusaurus-theme-search-pagefind',
          { 
        // https://getcanary.dev/docs/common/customization/styling#css-variables
        styles: { 
          "--canary-color-primary-c": 0.1, 
          "--canary-color-primary-h": 270, 
        }, 
        // https://pagefind.app/docs/ranking
        pagefind: { 
          ranking: { 
            pageLength: 0.9, 
            termFrequency: 1.0, 
            termSimilarity: 1.0, 
            termSaturation: 1.5, 
          } 
        },
        indexOnly: false, 
        includeRoutes: ["**/*"], 
        excludeRoutes: ['/api/**'], 
        // https://getcanary.dev/docs/local/demo
        // https://getcanary.dev/docs/common/guides/filtering
        // e.g. [{"name":"All","pattern":"**/*"}]
        tabs: [], 
      },
  ]
  ],

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../src/index.ts'],
        entryPointStrategy: 'expand',
        lang: "en",
        watch: process.env.TYPEDOC_WATCH,
        router: "member",
        docsPath: './docs',
        tsconfig: '../tsconfig.json',
        out: './docs/api',
        excludePrivate: true,
        excludeProtected: true,
        excludeInternal: true,
        exclude: ['../src/**/parser.ts'],
        parametersFormat: 'table',
        expandObjects: true,
        interfacePropertiesFormat: 'table',
        propertyMembersFormat: 'table',
        indexFormat: 'table',
        typeDeclarationFormat: 'table',
        expandParameters: true,
        useCodeBlocks: true,
        categoryOrder: [
          'Apple Music Client',
          'Configuration',
          'Endpoints',
          'Endpoint Types',
          'Utilities',
          'Shared Types',
          '*',
        ],
        groupOrder: [
          'Overview',
          'Classes',
          'Functions',
          'Interfaces',
          'Type Aliases',
          'Enumerations',
          'Variables',
          '*',
        ],
        sort: ['source-order'],
        readme: 'none',
        sidebar: {
          autoConfiguration: true,
          typescript: true,
          pretty: true,
        },
      },
    ],
  ],

  themeConfig: {
    metadata: [
      {name: 'description', content: SITE_DESCRIPTION},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: SITE_TITLE},
      {name: 'twitter:description', content: SITE_DESCRIPTION},
      {name: 'twitter:image', content: OG_IMAGE_WIDE},
      {name: 'twitter:image:alt', content: OG_IMAGE_ALT},
    ],
    // Replace with your project's social card
    image: OG_IMAGE_WIDE,
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: '@syncfm/applemusic-api',
      logo: {
        alt: 'syncfm logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: '/',
          label: 'Home',
          position: 'left',
          exact: true,
        },
        {
          to: '/docs/intro',
          label: 'Guides',
          position: 'left',
          activeBaseRegex: '^/docs/(?!api/|about/).*',
        },
        {
          to: '/docs/api',
          label: 'API Reference',
          position: 'left',
          activeBaseRegex: '^/docs/api',
        },
        {
          to: '/docs/about/overview',
          label: 'About',
          position: 'left',
          activeBaseRegex: '^/docs/about',
        },
        {
          href: 'https://github.com/sync-fm/applemusic-api',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'API Reference',
              to: '/docs/api',
            },
            {
              label: 'About',
              to: '/docs/about/overview',
            },
            {
              label: 'Credits',
              to: '/docs/about/credits',
            },
            {
              label: 'syncfm.dev',
              to: 'https://syncfm.dev',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'npm Package',
              href: 'https://www.npmjs.com/package/@syncfm/applemusic-api',
            },
            {
              label: 'Apple Music API',
              href: 'https://developer.apple.com/documentation/applemusicapi',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/sync-fm/applemusic-api',
            },
            {
              label: 'Issues',
              href: 'https://github.com/sync-fm/applemusic-api/issues',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} syncfm. MIT License.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
