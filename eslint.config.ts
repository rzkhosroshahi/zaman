import js from '@eslint/js'
import type { Linter } from 'eslint'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

const config: Linter.Config[] = [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.storybook/**',
      '**/storybook-static/**',
      '**/playwright-report/**',
      '**/*.config.{js,ts,mjs,cjs}',
      '**/vite.config.ts',
      '**/cypress.config.ts',
      '**/.cache/**',
      '**/public/**',
      '.vitepress/**'
    ]
  },

  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}']
  })),
  ...tseslint.configs.stylisticTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}']
  })),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        Element: 'readonly',
        Event: 'readonly',
        NodeJS: 'readonly'
      }
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      import: importPlugin,
      'unused-imports': unusedImportsPlugin
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        },
        node: {
          extensions: ['.ts', '.tsx', '.js', '.jsx']
        }
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      }
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],
      'react/self-closing-comp': 'warn',
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' }
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],

      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': 'allow-with-description',
          minimumDescriptionLength: 5
        }
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-empty-interface': 'off',

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false
        }
      ],
      '@typescript-eslint/consistent-type-exports': [
        'error',
        {
          fixMixedExportsWithInlineTypeSpecifier: true
        }
      ],

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/restrict-template-expressions': 'warn',

      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false
        }
      ],

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'type'
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before'
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@components/**',
              group: 'internal',
              position: 'after'
            },
            {
              pattern: '@packages/**',
              group: 'internal',
              position: 'after'
            },
            {
              pattern: '@hooks/**',
              group: 'internal',
              position: 'after'
            },
            {
              pattern: '@utils/**',
              group: 'internal',
              position: 'after'
            },
            {
              pattern: '@style/**',
              group: 'internal',
              position: 'after'
            }
          ],
          pathGroupsExcludedImportTypes: ['react', 'type'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          },
          warnOnUnassignedImports: true
        }
      ],

      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: true
        }
      ],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-absolute-path': 'error',
      'import/no-self-import': 'error',
      'import/no-cycle': ['error', { maxDepth: 10 }],
      'import/no-relative-packages': 'error',
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/default': 'off',
      'import/namespace': 'off',

      'import/no-relative-parent-imports': 'off',

      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'error',
      'no-alert': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'warn',
      'prefer-template': 'warn',
      'prefer-arrow-callback': 'warn',
      'no-nested-ternary': 'warn',
      'no-unneeded-ternary': 'warn',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-duplicate-imports': 'off',
      'sort-imports': 'off',
      curly: ['warn', 'all'],
      'no-multi-spaces': 'warn',
      'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 0 }],
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var']
        }
      ],

      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE']
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase']
        },
        {
          selector: 'typeLike',
          format: ['PascalCase']
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false
          }
        }
      ]
    }
  },

  {
    files: [
      '**/*.test.{ts,tsx}',
      '**/*.spec.{ts,tsx}',
      '**/*.cy.{ts,tsx}',
      '**/__tests__/**/*',
      '**/tests/**/*'
    ],
    ...tseslint.configs.disableTypeChecked,
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-console': 'off',
      'import/no-extraneous-dependencies': 'off'
    }
  },

  {
    files: [
      '**/*.stories.{ts,tsx,js,jsx}',
      'src/stories/**/*',
      '.storybook/**/*'
    ],
    rules: {
      'import/no-default-export': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'react-hooks/rules-of-hooks': 'off'
    }
  },

  {
    files: ['*.config.{js,ts,mjs,cjs}', 'vite.config.ts', 'cypress.config.ts'],
    rules: {
      'import/no-default-export': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off'
    }
  },

  prettierPlugin as Linter.Config
]

export default config
