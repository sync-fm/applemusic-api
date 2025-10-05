
/** @type {import('typedoc').TypeDocOptionMap} */
export const typeDocOptions = {
    // Your regular TypeDoc options here
    entryPoints: ['./src/AppleMusic.ts'],
    out: 'docs',
    name: '@syncfm/applemusic-api',
};

/** @type {import('typedoc').TypeDocOptionMap & PluginOptions} */
const typedocConfig = {
    ...typeDocOptions,
    plugin: ['typedoc-plugin-markdown'], // Load the markdown plugin
    parametersFormat: 'table', // Example: Format parameters as a table
    propertyMembersFormat: 'table', // Example: Format property members as a table
};

export default typedocConfig;
