import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'docs',
  // For GitHub Pages deployment under rzkhosroshahi/zaman
  // If deploying to a custom domain, remove this `base`.
  base: '/zaman/',

  title: 'Zaman',
  description:
    '(Zaman) - Persian for "Time". Because naming a date picker library is the easy part. Making dates less confusing? That\'s the real challenge. 🎯',
  head: [
    ['meta', { name: 'theme-color', content: '#3B82F6' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'icon', href: '/zaman/favicon.svg' }]
  ],

  sitemap: {
    hostname: 'https://rzkhosroshahi.github.io/zaman'
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Components', link: '/components' },
      { text: 'Theming', link: '/theming' },
      { text: 'i18n', link: '/internationalization' },
      { text: 'API', link: '/api' },
      { text: 'Examples', link: '/examples' },
      { text: 'Architecture', link: '/architecture' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Components', link: '/components' },
          { text: 'Theming', link: '/theming' },
          { text: 'Internationalization', link: '/internationalization' },
          { text: 'API Reference', link: '/api' },
          { text: 'Examples', link: '/examples' },
          { text: 'Architecture', link: '/architecture' },
          { text: 'Contributing', link: '/contributing' },
          { text: 'Release Process', link: '/release-process' },
          { text: 'Troubleshooting', link: '/troubleshooting' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rzkhosroshahi/zaman' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/zaman' }
    ]
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 1200
    }
  },

  buildEnd: async () => {
    // Copy Storybook static build into the VitePress dist to enable embedded demos
    try {
      const source = path.resolve(__dirname, '../storybook-static')
      const dest = path.resolve(__dirname, './dist/storybook')
      if (fs.existsSync(source)) {
        fs.mkdirSync(dest, { recursive: true })
        // @ts-ignore recursive may not be typed in older Node types
        fs.cpSync(source, dest, { recursive: true })
        // eslint-disable-next-line no-console
        console.log('[docs] Copied storybook-static to dist/storybook')
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[docs] Failed to copy storybook-static:', err)
    }
  }
})
