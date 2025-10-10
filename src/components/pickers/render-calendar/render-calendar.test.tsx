import React from 'react'

import '@testing-library/jest-dom/vitest'
import { render } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll } from 'vitest'

import RenderCalendar from './render-calendar'

// Mock window.matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 640px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  })
})

describe('RenderCalendar', () => {
  const mockRef = { current: document.createElement('div') }

  it('should not render when showCalendar is false', () => {
    const { container } = render(
      <RenderCalendar
        showCalendar={false}
        toggleOpen={vi.fn()}
        destinationRef={mockRef as any}
      >
        <div>Calendar</div>
      </RenderCalendar>
    )

    expect(container.textContent).toBe('')
  })

  it('should render when showCalendar is true on desktop', () => {
    // Set matchMedia to return true for desktop
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 640px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))

    const { getByText } = render(
      <RenderCalendar
        showCalendar={true}
        toggleOpen={vi.fn()}
        destinationRef={mockRef as any}
      >
        <div>Calendar Content</div>
      </RenderCalendar>
    )

    expect(getByText('Calendar Content')).toBeInTheDocument()
  })

  it('should render when showCalendar is true on mobile', () => {
    // Set matchMedia to return false for mobile
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))

    const { getByText } = render(
      <RenderCalendar
        showCalendar={true}
        toggleOpen={vi.fn()}
        destinationRef={{ current: null }}
      >
        <div>Calendar Content</div>
      </RenderCalendar>
    )

    expect(getByText('Calendar Content')).toBeInTheDocument()
  })
})
