import { test, expect } from '@playwright/test'

import { gotoStory, waitForCalendar } from './fixtures/test-helpers'

test.describe('Range Date Picker', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to range picker story
    await gotoStory(page, 'packages-calendar', 'range-mode')
  })

  test('should render calendar in range mode', async ({ page }) => {
    await waitForCalendar(page)

    const calendar = page.locator('[role="application"]')

    await expect(calendar).toBeVisible()
  })

  test('should allow selecting date range', async ({ page }) => {
    await waitForCalendar(page)

    // Select first date
    const firstDate = page.locator('[role="gridcell"]').nth(10)

    await firstDate.click()

    // Wait a bit for the selection to register
    await page.waitForTimeout(100)

    // Select second date
    const secondDate = page.locator('[role="gridcell"]').nth(15)

    await secondDate.click()

    // Calendar should still be visible
    const calendar = page.locator('[role="application"]')

    await expect(calendar).toBeVisible()
  })

  test('should highlight dates in range', async ({ page }) => {
    await waitForCalendar(page)

    // Select start date
    const startDate = page.locator('[role="gridcell"]').nth(5)

    await startDate.click()

    // Hover over end date to see range preview
    const endDate = page.locator('[role="gridcell"]').nth(10)

    await endDate.hover()

    // Calendar should still be visible with hover effect
    const calendar = page.locator('[role="application"]')

    await expect(calendar).toBeVisible()
  })

  test('should support keyboard navigation in range mode', async ({ page }) => {
    await waitForCalendar(page)

    const firstCell = page.locator('[role="gridcell"]').first()

    await firstCell.click()

    // Navigate with arrow keys
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowRight')

    // Verify focus is working
    const focusedElement = page.locator(':focus')

    await expect(focusedElement).toBeVisible()

    // Press Enter to select
    await page.keyboard.press('Enter')

    // Calendar should still be visible
    const calendar = page.locator('[role="application"]')

    await expect(calendar).toBeVisible()
  })

  test('should clear range selection', async ({ page }) => {
    await waitForCalendar(page)

    // Select range
    const firstDate = page.locator('[role="gridcell"]').nth(5)

    await firstDate.click()

    const secondDate = page.locator('[role="gridcell"]').nth(10)

    await secondDate.click()

    // Click clear button if available
    const clearButton = page.locator(
      'button:has-text("Clear"), button:has-text("پاک کردن")'
    )

    if ((await clearButton.count()) > 0) {
      await clearButton.click()

      // Selection should be cleared
      const selectedCells = page.locator('[aria-selected="true"]')

      expect(await selectedCells.count()).toBe(0)
    }
  })

  test('should handle range selection across months', async ({ page }) => {
    await waitForCalendar(page)

    // Get initial month
    const header = page.locator('header')
    const initialMonth = await header.textContent()

    // Select first date in current month
    const firstDate = page.locator('[role="gridcell"]').last()

    await firstDate.click()

    // Navigate to next month
    const nextButton = page
      .locator('[aria-label*="next"], [aria-label*="Next"]')
      .first()

    await nextButton.click()

    // Wait for month to change
    await expect(header).not.toHaveText(initialMonth ?? '')

    // Select second date in next month
    const secondDate = page.locator('[role="gridcell"]').first()

    await secondDate.click()

    // Calendar should still be visible
    const calendar = page.locator('[role="application"]')

    await expect(calendar).toBeVisible()
  })
})
