import { type Page, expect } from '@playwright/test'

/**
 * Helper function to navigate to a specific Storybook story
 */
export async function gotoStory(
  page: Page,
  componentId: string,
  storyId: string
) {
  await page.goto(`/iframe.html?id=${componentId}--${storyId}&viewMode=story`, {
    waitUntil: 'load'
  })
  // Wait for React to render - look for root element
  await page.waitForSelector('#storybook-root', {
    state: 'attached',
    timeout: 3000
  })
}

/**
 * Helper to check basic accessibility
 */
export async function checkAccessibility(page: Page) {
  // Check for basic ARIA landmarks
  await expect(page.locator('[role]').first()).toBeVisible()
}

/**
 * Helper for keyboard navigation tests
 */
export async function testKeyboardNavigation(
  page: Page,
  element: string,
  keys: string[],
  assertions: () => Promise<void>
) {
  const target = page.locator(element)

  await target.focus()

  for (const key of keys) {
    await page.keyboard.press(key)
  }

  await assertions()
}

/**
 * Wait for calendar to be rendered
 */
export async function waitForCalendar(page: Page) {
  await page.waitForSelector('[role="application"]', {
    state: 'visible',
    timeout: 5000
  })
}

/**
 * Select a date in the calendar
 */
export async function selectDate(page: Page, date: number) {
  const dateButton = page
    .locator(`[role="gridcell"]`, {
      hasText: String(date)
    })
    .first()

  await dateButton.click()

  return dateButton
}
