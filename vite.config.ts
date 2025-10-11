import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const isLibraryMode = mode === 'library'

  return {
    root: isLibraryMode ? '.' : './client',
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(dirname, './src') },
        {
          find: '@components',
          replacement: path.resolve(dirname, './src/components')
        },
        {
          find: '@packages',
          replacement: path.resolve(dirname, './src/packages')
        },
        { find: '@hooks', replacement: path.resolve(dirname, './src/hooks') },
        { find: '@utils', replacement: path.resolve(dirname, './src/utils') },
        { find: '@style', replacement: path.resolve(dirname, './src/style') },
        { find: '@theme', replacement: path.resolve(dirname, './src/theme') },
        {
          find: '@types',
          replacement: path.resolve(dirname, './src/types.ts')
        },
        {
          find: '@constants',
          replacement: path.resolve(dirname, './src/constants.ts')
        }
      ]
    },
    plugins: [
      react(),
      tailwindcss(),
      isLibraryMode &&
        dts({
          insertTypesEntry: true,
          include: [
            'src*.test.ts',
            'src*.cy.ts',
            'src__tests__/**',
            'src/stories/**'
          ],
          compilerOptions: {
            declarationMap: false,
            removeComments: true
          }
        })
    ].filter(Boolean),
    build: isLibraryMode
      ? {
          lib: {
            entry: resolve(dirname, 'src/index.tsx'),
            name: 'Zaman',
            formats: ['es'],
            fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`
          },
          rollupOptions: {
            external: [
              'react',
              'react-dom',
              'react/jsx-runtime',
              'dayjs',
              /^react\//,
              /^dayjs\//
            ],
            output: {
              preserveModules: true,
              preserveModulesRoot: 'src',
              exports: 'named',
              entryFileNames: ({ name }) => {
                return `${name}.js`
              },
              chunkFileNames: '[name].js',
              assetFileNames: 'assets/[name][extname]',
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react/jsx-runtime': 'jsxRuntime',
                dayjs: 'dayjs'
              },
              interop: 'auto',
              generatedCode: {
                constBindings: true,
                objectShorthand: true,
                symbols: true
              }
            },
            treeshake: {
              moduleSideEffects: false,
              propertyReadSideEffects: false,
              tryCatchDeoptimization: false,
              preset: 'recommended',
              annotations: true,
              unknownGlobalSideEffects: false
            }
          },
          minify: 'esbuild',
          target: 'es2022',
          sourcemap: false,
          emptyOutDir: true,
          copyPublicDir: false,
          cssCodeSplit: false,
          reportCompressedSize: true,
          chunkSizeWarningLimit: 500
        }
      : undefined,
    test: {
      projects: [
        {
          extends: true,
          plugins: [
            storybookTest({
              configDir: path.join(dirname, '.storybook')
            })
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: 'playwright',
              instances: [
                {
                  browser: 'chromium'
                }
              ]
            },
            setupFiles: ['.storybook/vitest.setup.ts']
          }
        }
      ]
    }
  }
})
