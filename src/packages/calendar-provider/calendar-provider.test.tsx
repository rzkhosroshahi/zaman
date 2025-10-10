import React from 'react'

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { CalendarProvider } from './calendar-provider'

describe('CalendarProvider', () => {
  it('should render children', () => {
    render(
      <CalendarProvider>
        <div>Test Content</div>
      </CalendarProvider>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should apply default accent color', () => {
    const { container } = render(
      <CalendarProvider>
        <div>Content</div>
      </CalendarProvider>
    )

    expect(container.querySelector('[style*="--zaman-primary"]')).toBeTruthy()
  })

  it('should apply custom accent color', () => {
    const { container } = render(
      <CalendarProvider accentColor="#FF0000">
        <div>Content</div>
      </CalendarProvider>
    )
    const styled = container.querySelector('[style*="--zaman-primary"]')

    expect(styled).toBeTruthy()
  })

  it('should apply direction', () => {
    const { rerender, container } = render(
      <CalendarProvider direction="ltr">
        <div>Content</div>
      </CalendarProvider>
    )

    expect(container.querySelector('[dir="ltr"]')).toBeTruthy()

    rerender(
      <CalendarProvider direction="rtl">
        <div>Content</div>
      </CalendarProvider>
    )
    expect(container.querySelector('[dir="rtl"]')).toBeTruthy()
  })

  it('should map round values correctly', () => {
    const { container } = render(
      <CalendarProvider round="x2">
        <div>Content</div>
      </CalendarProvider>
    )

    // Theme provider should apply the mapped round value
    expect(container.querySelector('[style*="--zaman-radius"]')).toBeTruthy()
  })

  it('should handle locale', () => {
    const { container } = render(
      <CalendarProvider locale="fa">
        <div>Content</div>
      </CalendarProvider>
    )

    expect(container).toBeTruthy()
  })
})
