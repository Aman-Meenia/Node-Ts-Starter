import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: {
      js
    },
    extends: ['js/recommended']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.browser
    }
  },
  tseslint.configs.recommended,
  {
    ignores: ['node_modules/', 'logs/', 'dist/'] // Files to ignore
  },
  {
    rules: {
      'no-console': 'error', // Give error on using console
      '@typescript-eslint/no-explicit-any': 'off', // Don't give error on using any
      'no-duplicate-imports': 'error', // Allow multiple imports of same module
      '@typescript-eslint/no-unused-vars': [
        // declare unused variable start with ( _ )
        'warn',
        {
          argsIgnorePattern: '^_'
        }
      ]
    }
  }
]);
