import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : '75%',

  timeout: 15000,

  expect: {
    timeout: 5000
  },

  reporter: process.env.CI ? [['html'], ['list'], ['github']] : [['list']],

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:6006',

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    navigationTimeout: 10000,

    actionTimeout: 5000
  },

  projects: process.env.CI
    ? [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] }
        },
        {
          name: 'firefox',
          use: { ...devices['Desktop Firefox'] }
        },
        {
          name: 'webkit',
          use: { ...devices['Desktop Safari'] }
        },
        {
          name: 'Mobile Chrome',
          use: { ...devices['Pixel 5'] }
        },
        {
          name: 'Mobile Safari',
          use: { ...devices['iPhone 12'] }
        }
      ]
    : [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] }
        }
      ],

  webServer: {
    command: 'pnpm storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  }
})
