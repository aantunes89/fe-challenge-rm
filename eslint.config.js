import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import jestPlugin from 'eslint-plugin-jest';

const jestGlobals = {
    describe: 'readonly',
    it: 'readonly',
    expect: 'readonly',
    beforeEach: 'readonly',
    afterEach: 'readonly',
    beforeAll: 'readonly',
    afterAll: 'readonly',
    jest: 'readonly',
};

export default [
    js.configs.recommended,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: ['./tsconfig.json', './tsconfig.spec.json'],
            },
        },
        plugins: {
            '@typescript-eslint': typescript,
            '@angular-eslint': angular,
            prettier: prettier,
        },
        rules: {
            ...typescript.configs.recommended.rules,
            ...angular.configs.recommended.rules,
            ...prettier.configs.recommended.rules,
            'prettier/prettier': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'no-undef': 'warn',
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],
        },
    },
    {
        files: ['**/*.html'],
        plugins: {
            '@angular-eslint': angular,
            '@angular-eslint/template': angularTemplate,
        },
        rules: {
            ...angularTemplate.configs.recommended.rules,
        },
    },
    {
        files: ['**/*.spec.ts', '**/*.test.ts'],
        plugins: {
            jest: jestPlugin,
        },
        languageOptions: {
            globals: jestGlobals,
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    {
        files: ['src/main.ts'],
        languageOptions: {
            globals: {
                console: 'readonly',
            },
        },
    },
    {
        files: ['**/*.component.html'],
        plugins: {
            '@angular-eslint': angular,
            '@angular-eslint/template': angularTemplate,
        },
        rules: {
            ...angularTemplate.configs.recommended.rules,
        },
    },
    {
        ignores: [
            // Dependencies
            'node_modules/**',
            'npm-debug.log*',
            'yarn-debug.log*',
            'yarn-error.log*',

            // Build outputs
            'dist/**',
            'build/**',
            'out-tsc/**',

            // Coverage directory
            'coverage/**',
            '*.lcov',
            '.nyc_output/**',

            // Cache and temporary files
            '.eslintcache',
            '.cache/**',
            '.parcel-cache/**',
            'tmp/**',
            'temp/**',

            // Environment files
            '.env*',

            // Package files
            'package-lock.json',
            'yarn.lock',
            'pnpm-lock.yaml',

            // IDE files
            '.vscode/**',
            '.idea/**',
            '*.swp',
            '*.swo',
            '*~',

            // OS generated files
            '.DS_Store',
            '.DS_Store?',
            '._*',
            '.Spotlight-V100',
            '.Trashes',
            'ehthumbs.db',
            'Thumbs.db',

            // Logs
            'logs/**',
            '*.log',

            // Runtime data
            'pids/**',
            '*.pid',
            '*.seed',
            '*.pid.lock',

            // HTML files that are not Angular templates
            'src/index.html',
            'src/app/app.component.html',

            // TypeScript build info
            '*.tsbuildinfo',

            // Optional npm cache
            '.npm/**',

            // Optional stylelint cache
            '.stylelintcache',

            // Microbundle cache
            '.rpt2_cache/**',
            '.rts2_cache_cjs/**',
            '.rts2_cache_es/**',
            '.rts2_cache_umd/**',

            // Optional REPL history
            '.node_repl_history',

            // Output of 'npm pack'
            '*.tgz',

            // Yarn Integrity file
            '.yarn-integrity',

            // dotenv environment variable files
            '.env.development.local',
            '.env.test.local',
            '.env.production.local',
            '.env.local',

            // Next.js build output
            '.next/**',

            // Nuxt.js build / generate output
            '.nuxt/**',

            // Gatsby files
            'public/**',

            // Storybook build outputs
            '.out/**',
            '.storybook-out/**',
        ],
    },
    prettierConfig,
]; 