import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { MonthPicker } from './month-picker'

// Mock locale utilities
vi.mock('@utils/locale', () => ({
  default: { locale: 'en' }
}))

vi.mock('@utils/locales', () => ({
  default: {
    en: {
      months: [
        { key: 1, name: 'January' },
        { key: 2, name: 'February' },
        { key: 3, name: 'March' },
        { key: 4, name: 'April' },
        { key: 5, name: 'May' },
        { key: 6, name: 'June' },
        { key: 7, name: 'July' },
        { key: 8, name: 'August' },
        { key: 9, name: 'September' },
        { key: 10, name: 'October' },
        { key: 11, name: 'November' },
        { key: 12, name: 'December' }
      ]
    }
  }
}))

vi.mock('@utils/format', () => ({
  default: () => '01'
}))

describe('MonthPicker', () => {
  const defaultProps = {
    value: new Date(2025, 0, 15),
    onMonthSelect: vi.fn()
  }

  it('should render all 12 months', () => {
    render(<MonthPicker {...defaultProps} />)
    expect(screen.getByText('January')).toBeInTheDocument()
    expect(screen.getByText('December')).toBeInTheDocument()
  })

  it('should call onMonthSelect when a month is clicked', () => {
    const onMonthSelect = vi.fn()

    render(<MonthPicker {...defaultProps} onMonthSelect={onMonthSelect} />)

    const marchButton = screen.getByText('March')

    fireEvent.click(marchButton)

    expect(onMonthSelect).toHaveBeenCalledWith(3)
  })

  it('should mark current month as selected', () => {
    render(<MonthPicker {...defaultProps} />)
    const januaryButton = screen.getByText('January')

    expect(januaryButton).toHaveAttribute('data-selected', 'true')
  })

  it('should have proper accessibility attributes', () => {
    render(<MonthPicker {...defaultProps} />)
    const monthButtons = screen.getAllByRole('button')

    monthButtons.forEach((button) => {
      expect(button).toHaveAttribute('type', 'button')
      expect(button).toHaveAttribute('tabIndex', '0')
      expect(button).toHaveAttribute('aria-current', 'date')
    })
  })
})
