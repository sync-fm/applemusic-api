import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  // Ignore specific files globally
  {
    ignores: ["dist/**"], // Added ignores for specific file and dist folder
  },
  
  // Base JS configuration
  { 
    files: ["**/*.{js,mjs,cjs,ts}"], 
    plugins: { js }, 
    extends: ["js/recommended"] 
  },

  // Node.js environment globals
  { 
    files: ["**/*.{js,mjs,cjs,ts}"], 
    languageOptions: { 
      globals: {
        ...globals.node
      } 
    } 
  },
  // TypeScript specific configurations
  {
    files: ["**/*.ts"],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
         project: './tsconfig.eslint.json',
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
       '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }]
    },
  },
]);