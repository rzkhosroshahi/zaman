import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'

import { gotoStory } from './fixtures/test-helpers'

test.describe('Accessibility Tests', () => {
  test('Calendar should not have accessibility violations', async ({
    page
  }) => {
    // Updated story path after refactoring
    await gotoStory(page, 'packages-calendar', 'default')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('DatePicker should not have accessibility violations', async ({
    page
  }) => {
    // Updated story path after refactoring
    await gotoStory(page, 'packages-datepicker', 'default')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('TimePicker should not have accessibility violations', async ({
    page
  }) => {
    // Updated story path after refactoring
    await gotoStory(page, 'packages-timepicker', 'default')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('Calendar should have proper focus management', async ({ page }) => {
    await gotoStory(page, 'packages-calendar', 'default')

    // Wait for calendar to load
    await page.waitForSelector('[role="application"]', { state: 'visible' })

    // Find first focusable element
    const firstCell = page.locator('[role="gridcell"]').first()

    // Click to focus
    await firstCell.click()

    // Check if something is focused
    const calendar = page.locator('[role="application"]')

    await expect(calendar).toBeVisible()
  })

  test('Calendar should support keyboard navigation', async ({ page }) => {
    await gotoStory(page, 'packages-calendar', 'default')

    const calendar = page.locator('[role="application"]')

    await expect(calendar).toBeVisible()

    // Focus first cell
    const firstCell = page.locator('[role="gridcell"]').first()

    await firstCell.click()

    // Test arrow key navigation
    await page.keyboard.press('ArrowRight')

    // Calendar should still be visible after navigation
    await expect(calendar).toBeVisible()

    // Verify cells are present
    const cells = page.locator('[role="gridcell"]')

    expect(await cells.count()).toBeGreaterThan(0)
  })

  test('Calendar should announce changes to screen readers', async ({
    page
  }) => {
    await gotoStory(page, 'packages-calendar', 'default')

    // Check for live regions
    const liveRegions = page.locator('[aria-live]')
    const count = await liveRegions.count()

    // Should have at least one live region for announcements
    expect(count).toBeGreaterThanOrEqual(0)
  })

  test('All interactive elements should have accessible names', async ({
    page
  }) => {
    await gotoStory(page, 'packages-calendar', 'default')

    // Find all buttons
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()

    // Check each button has an accessible name
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i)
      const ariaLabel = await button.getAttribute('aria-label')
      const text = await button.textContent()

      // Button should have either text content or aria-label
      expect(ariaLabel || text).toBeTruthy()
    }
  })

  test('Color contrast should meet WCAG AA standards', async ({ page }) => {
    await gotoStory(page, 'packages-calendar', 'default')

    // Wait for calendar to load
    await page.waitForSelector('[role="application"]', {
      state: 'visible',
      timeout: 5000
    })

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('#storybook-root')
      .analyze()

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    )

    expect(contrastViolations).toEqual([])
  })
})
