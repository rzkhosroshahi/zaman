import type { StorybookConfig } from '@storybook/react-vite'
import path from 'node:path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  viteFinal: async (config) => {
    // Ensure path aliases are resolved
    config.resolve = config.resolve || {}
    const aliases = [
      { find: '@', replacement: path.resolve(process.cwd(), './src') },
      {
        find: '@components',
        replacement: path.resolve(process.cwd(), './src/components')
      },
      {
        find: '@packages',
        replacement: path.resolve(process.cwd(), './src/packages')
      },
      {
        find: '@hooks',
        replacement: path.resolve(process.cwd(), './src/hooks')
      },
      {
        find: '@utils',
        replacement: path.resolve(process.cwd(), './src/utils')
      },
      {
        find: '@style',
        replacement: path.resolve(process.cwd(), './src/style')
      },
      {
        find: '@theme',
        replacement: path.resolve(process.cwd(), './src/theme')
      },
      {
        find: '@types',
        replacement: path.resolve(process.cwd(), './src/types.ts')
      },
      {
        find: '@constants',
        replacement: path.resolve(process.cwd(), './src/constants.ts')
      }
    ]

    // Merge with existing aliases
    config.resolve.alias = Array.isArray(config.resolve.alias)
      ? [...config.resolve.alias, ...aliases]
      : aliases

    return config
  }
}
export default config
