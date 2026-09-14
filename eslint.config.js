import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    // A config object with only `ignores` sets the global ignore list.
    // ESLint 9 ignores node_modules/ and .git/ on its own but nothing else, so
    // without this `eslint .` walks build output and generated types and fails
    // on code we neither wrote nor control.
    ignores: [
      'dist/**', // astro build output
      '.astro/**', // generated content/types
      '.vercel/**', // vercel local build artifacts
      '.remember/**', // remember plugin session state
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,astro}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  ...eslintPluginAstro.configs.recommended,
];
