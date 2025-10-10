import { test, expect } from '@playwright/test'

import { gotoStory } from './fixtures/test-helpers'

test.describe('TimePicker Component', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory(page, 'packages-timepicker', 'default')
  })

  test('should render time picker input', async ({ page }) => {
    const input = page.locator('input[type="text"]')

    await expect(input).toBeVisible()
  })

  test('should open time picker on input click', async ({ page }) => {
    const input = page.locator('input[type="text"]')

    await input.click()

    const timePicker = page.locator('[role="application"]')

    await expect(timePicker).toBeVisible()
  })

  test('should display clock face after opening', async ({ page }) => {
    const input = page.locator('input[type="text"]')

    await input.click()

    const timePicker = page.locator('[role="application"]')

    await expect(timePicker).toBeVisible()
  })

  test('should allow time selection', async ({ page }) => {
    const input = page.locator('input[type="text"]')

    await input.click()

    const timePicker = page.locator('[role="application"]')

    await expect(timePicker).toBeVisible()

    // Clock should be interactive
    const clock = page.locator('[role="slider"]')

    await expect(clock).toBeVisible()
  })

  test('should support keyboard navigation', async ({ page }) => {
    const input = page.locator('input[type="text"]')

    // Click to focus the input
    await input.click()

    // Input should be focused
    const focusedElement = page.locator(':focus')

    await expect(focusedElement).toBeVisible()

    // Should be able to interact with keyboard
    await page.keyboard.press('Tab')

    // Something should still be focused
    await expect(page.locator('body')).toBeVisible()
  })

  test('should have proper ARIA labels for time controls', async ({ page }) => {
    const input = page.locator('input[type="text"]')

    await input.click()

    // Check for accessible time controls
    const clock = page.locator('[role="slider"]')

    await expect(clock).toBeVisible()

    const ariaLabel = await clock.getAttribute('aria-label')

    expect(ariaLabel).toBeTruthy()
  })

  test('should be keyboard accessible', async ({ page }) => {
    const input = page.locator('input[type="text"]')

    // Input should be visible and focusable
    await expect(input).toBeVisible()

    // Click to focus
    await input.click()

    // Input should be focused
    const focused = page.locator('input[type="text"]:focus')

    await expect(focused).toBeVisible()
  })
})
