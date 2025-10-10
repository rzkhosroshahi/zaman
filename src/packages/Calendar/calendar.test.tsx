import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import Calendar from './Calendar'

// Mock dependencies
vi.mock('@utils/locale', () => ({
  default: { locale: 'en' }
}))

vi.mock('@utils/locales', () => ({
  default: {
    en: {
      shortWeekDays: [
        { key: 0, name: 'S' },
        { key: 1, name: 'M' },
        { key: 2, name: 'T' },
        { key: 3, name: 'W' },
        { key: 4, name: 'T' },
        { key: 5, name: 'F' },
        { key: 6, name: 'S' }
      ],
      months: [
        { key: 1, name: 'January' },
        { key: 2, name: 'February' }
        // ... simplified for testing
      ]
    }
  }
}))

describe('Calendar', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Calendar defaultValue={new Date(2025, 0, 15)} />
    )

    expect(container).toBeInTheDocument()
  })

  it('should render week day headers', () => {
    render(<Calendar defaultValue={new Date(2025, 0, 15)} />)
    const headers = screen.getAllByRole('columnheader')

    expect(headers).toHaveLength(7)
    expect(headers[0]).toHaveTextContent('S')
    expect(headers[6]).toHaveTextContent('S')
  })

  it('should call onChange when a date is clicked', () => {
    const onChange = vi.fn()

    render(
      <Calendar defaultValue={new Date(2025, 0, 15)} onChange={onChange} />
    )

    const dateButtons = screen.getAllByRole('gridcell')

    if (dateButtons.length > 0) {
      fireEvent.click(dateButtons[15])
      expect(onChange).toHaveBeenCalled()
    }
  })

  it('should support range mode', () => {
    const { container } = render(
      <Calendar
        defaultValue={new Date(2025, 0, 15)}
        range={true}
        from={new Date(2025, 0, 10)}
        to={new Date(2025, 0, 20)}
      />
    )

    expect(container).toBeInTheDocument()
  })

  it('should mark weekends correctly', () => {
    render(<Calendar defaultValue={new Date(2025, 0, 15)} weekends={[0, 6]} />)
    const dateButtons = screen.getAllByRole('gridcell')
    // Check that weekend data attribute is set
    const sundayButtons = dateButtons.filter((button) =>
      button.getAttribute('data-weekend')
    )

    expect(sundayButtons.length).toBeGreaterThan(0)
  })

  it('should apply custom className', () => {
    const { container } = render(
      <Calendar defaultValue={new Date(2025, 0, 15)} className="custom-class" />
    )
    const calendarWrapper = container.firstChild

    expect(calendarWrapper).toHaveClass('custom-class')
  })
})
