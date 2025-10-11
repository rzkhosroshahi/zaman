import { test, expect } from '@playwright/test'

import { gotoStory, selectDate, waitForCalendar } from './fixtures/test-helpers'

test.describe('Calendar Component', () => {
  test.beforeEach(async ({ page }) => {
    // Updated story path after refactoring
    await gotoStory(page, 'packages-calendar', 'default')
  })

  test('should render calendar', async ({ page }) => {
    await waitForCalendar(page)

    const calendar = page.locator('[role="application"]')

    await expect(calendar).toBeVisible()
  })

  test('should display month name', async ({ page }) => {
    await waitForCalendar(page)

    const header = page.locator('header')

    await expect(header).toBeVisible()
    await expect(header).toContainText(/\w+/)
  })

  test('should display week day names', async ({ page }) => {
    await waitForCalendar(page)

    const weekDays = page.locator('[role="columnheader"]')
    const count = await weekDays.count()

    expect(count).toBe(7)
  })

  test('should select a date on click', async ({ page }) => {
    await waitForCalendar(page)

    const dateButton = await selectDate(page, 15)

    // Check if date is selected
    await expect(dateButton).toHaveAttribute('aria-selected', 'true')
  })

  test('should navigate to next month', async ({ page }) => {
    await waitForCalendar(page)

    const header = page.locator('header')
    const initialMonth = await header.textContent()

    const nextButton = page
      .locator('[aria-label*="next"], [aria-label*="Next"]')
      .first()

    await nextButton.click()

    // Wait for the month to change
    await expect(header).not.toHaveText(initialMonth ?? '')

    const newMonth = await header.textContent()

    expect(newMonth).not.toBe(initialMonth)
  })

  test('should navigate to previous month', async ({ page }) => {
    await waitForCalendar(page)

    const header = page.locator('header')
    const initialMonth = await header.textContent()

    const prevButton = page
      .locator(
        '[aria-label*="prev"], [aria-label*="Prev"], [aria-label*="Previous"]'
      )
      .first()

    await prevButton.click()

    // Wait a bit for animation
    await page.waitForTimeout(400)

    const newMonth = await header.textContent()

    // Month should have changed
    expect(newMonth).not.toBe(initialMonth)
  })

  test('should support keyboard navigation', async ({ page }) => {
    await waitForCalendar(page)

    const firstCell = page.locator('[role="gridcell"]').first()

    await firstCell.focus()

    // Navigate with arrow keys
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowDown')

    // Select with Enter
    await page.keyboard.press('Enter')

    // Verify selection
    const selectedCell = page.locator('[aria-selected="true"]')

    await expect(selectedCell).toBeVisible()
  })

  test('should have proper ARIA labels', async ({ page }) => {
    await waitForCalendar(page)

    // Check for role="application"
    const calendar = page.locator('[role="application"]')

    await expect(calendar).toBeVisible()

    // Check for role="grid"
    const grid = page.locator('[role="grid"]')

    await expect(grid).toBeVisible({ timeout: 8000 })

    // Check for role="row"
    const rows = page.locator('[role="row"]')
    const rowCount = await rows.count()

    expect(rowCount).toBeGreaterThan(0)

    // Check for role="gridcell"
    const cells = page.locator('[role="gridcell"]')
    const cellCount = await cells.count()

    expect(cellCount).toBeGreaterThan(0)
  })

  test('should be keyboard accessible', async ({ page }) => {
    await waitForCalendar(page)

    // Calendar cells should be focusable
    const firstCell = page.locator('[role="gridcell"]').first()

    await firstCell.focus()

    const focusedElement = page.locator(':focus')

    await expect(focusedElement).toBeVisible()

    // Should be able to navigate with keyboard
    await page.keyboard.press('ArrowRight')

    await expect(page.locator(':focus')).toBeVisible()
  })
})
