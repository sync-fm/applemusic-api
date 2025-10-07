import pluginJs from "@eslint/js";
import securityPlugin from "eslint-plugin-security";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";
import tsPlugin from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "coverage/**",
      "scripts/**",
    ],
  },
  // Security
  securityPlugin.configs.recommended,
  {
    files: ["**/*.ts"],
  },
  {
    languageOptions: { globals: globals.node },
  },
  {
    rules: {
      "func-style": ["error", "expression"],
      "no-restricted-syntax": ["off", "ForOfStatement"],
      "prefer-template": "error",
    },
  },
  // TypeScript Eslint
  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/consistent-type-definitions": ["off"],
    },
  },
  // Unicorn
  {
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      "unicorn/empty-brace-spaces": "off",
      "unicorn/no-null": "off",
    },
  },
  pluginJs.configs.recommended,
  ...tsPlugin.configs.recommended,
];
