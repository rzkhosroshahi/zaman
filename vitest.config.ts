import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components')
      },
      {
        find: '@packages',
        replacement: path.resolve(__dirname, './src/packages')
      },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
      { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
      { find: '@style', replacement: path.resolve(__dirname, './src/style') },
      { find: '@theme', replacement: path.resolve(__dirname, './src/theme') },
      {
        find: '@types',
        replacement: path.resolve(__dirname, './src/types.ts')
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, './src/constants.ts')
      }
    ]
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup/vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'build', 'coverage', '.storybook'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.stories.{ts,tsx}',
        'src/**/*.types.ts',
        'src/stories/**',
        'src/**/*.d.ts'
      ],
      all: true,
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    },
    testTimeout: 10000,
    hookTimeout: 10000
  }
})
