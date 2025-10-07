
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = dirname(fileURLToPath(import.meta.url));

const SRC_ENTRY = resolve(ROOT_DIR, './src/AppleMusic.ts');
const PROJECT_README = resolve(ROOT_DIR, './README.md');
const MARKDOWN_OUTPUT = resolve(ROOT_DIR, './docs-src/reference');

/** @type {import('typedoc').TypeDocOptionMap} */
export const typeDocOptions = {
    entryPoints: [SRC_ENTRY],
    entryPointStrategy: 'resolve',
    tsconfig: resolve(ROOT_DIR, './tsconfig.docs.json'),
    out: MARKDOWN_OUTPUT,
    name: '@syncfm/applemusic-api',
    readme: PROJECT_README,
    includeVersion: true,
    categorizeByGroup: true,
    categoryOrder: [
        'Lifecycle',
        'Configuration',
        'Search',
        'Suggestions',
        'Hints',
        'Albums',
        'Artists',
        'Music Videos',
        'Songs',
        '*',
    ],
    sort: ['source-order', 'alphabetical'],
    excludePrivate: true,
    excludeProtected: true,
    excludeInternal: true,
    excludeExternals: true,
    excludeNotDocumented: false,
    navigationLinks: {
        GitHub: 'https://github.com/sync-fm/applemusic-api',
        npm: 'https://www.npmjs.com/package/@syncfm/applemusic-api',
        'API Spec': 'https://developer.apple.com/documentation/applemusicapi',
    },
};

export const markdownPluginOptions = {
    entryFileName: 'index',
    hideBreadcrumbs: false,
    hidePageHeader: true,
    indexFormat: 'table',
    parametersFormat: 'table',
    interfacePropertiesFormat: 'table',
    classPropertiesFormat: 'table',
    typeAliasPropertiesFormat: 'table',
};

const markdownDocOptions = {
    ...typeDocOptions,
    plugin: ['typedoc-plugin-markdown'],
};

export default markdownDocOptions;
