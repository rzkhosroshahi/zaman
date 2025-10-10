import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { YearPicker } from './year-picker'

// Mock utilities
vi.mock('@utils/dateHelper/dateHelper', () => ({
  getYears: (date: Date) => {
    const currentYear = date.getFullYear()
    const years = []

    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i)
    }

    return years
  }
}))

vi.mock('@utils/format', () => ({
  default: (date: Date, format: string) => {
    if (format === 'YYYY') return date.getFullYear().toString()

    return date.toString()
  }
}))

vi.mock('@utils/index', () => ({
  localizeNumber: (num: number) => num.toString()
}))

describe('YearPicker', () => {
  const defaultProps = {
    value: new Date(2025, 0, 15),
    onYearSelect: vi.fn()
  }

  it('should render a list of years', () => {
    render(<YearPicker {...defaultProps} />)
    expect(screen.getByText('2025')).toBeInTheDocument()
    expect(screen.getByText('2015')).toBeInTheDocument()
    expect(screen.getByText('2035')).toBeInTheDocument()
  })

  it('should call onYearSelect when a year is clicked', () => {
    const onYearSelect = vi.fn()

    render(<YearPicker {...defaultProps} onYearSelect={onYearSelect} />)

    const year2030Button = screen.getByText('2030')

    fireEvent.click(year2030Button)

    expect(onYearSelect).toHaveBeenCalledWith(2030)
  })

  it('should mark current year as selected', () => {
    render(<YearPicker {...defaultProps} />)
    const currentYearButton = screen.getByText('2025')

    expect(currentYearButton).toHaveAttribute('data-selected', 'true')
    expect(currentYearButton).toHaveAttribute('aria-selected', 'true')
  })

  it('should have proper accessibility attributes', () => {
    render(<YearPicker {...defaultProps} />)
    const yearButtons = screen.getAllByRole('button')

    yearButtons.forEach((button) => {
      expect(button).toHaveAttribute('type', 'button')
      expect(button).toHaveAttribute('tabIndex', '0')
      expect(button).toHaveAttribute('aria-current', 'date')
    })
  })
})
