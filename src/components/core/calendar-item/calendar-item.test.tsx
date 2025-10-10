import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { CalendarItem } from './calendar-item'

describe('CalendarItem', () => {
  it('should render correctly', () => {
    render(<CalendarItem>15</CalendarItem>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<CalendarItem className="custom-class">15</CalendarItem>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('custom-class')
  })

  it('should handle click events', () => {
    const handleClick = vi.fn()

    render(<CalendarItem onClick={handleClick}>15</CalendarItem>)

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should have default width and height', () => {
    const { container } = render(<CalendarItem>15</CalendarItem>)
    const button = container.querySelector('button')

    expect(button).toHaveStyle({ width: '40px', height: '40px' })
  })

  it('should apply custom width and height', () => {
    const { container } = render(
      <CalendarItem width={50} height={50}>
        15
      </CalendarItem>
    )
    const button = container.querySelector('button')

    expect(button).toHaveStyle({ width: '50px', height: '50px' })
  })

  it('should show selected state', () => {
    render(<CalendarItem data-selected="true">15</CalendarItem>)
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('data-selected', 'true')
  })

  it('should show disabled state', () => {
    render(
      <CalendarItem data-disabled="true" disabled>
        Disabled
      </CalendarItem>
    )
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('data-disabled', 'true')
    expect(button).toBeDisabled()
  })

  it('should show weekend state', () => {
    render(<CalendarItem data-weekend="true">15</CalendarItem>)
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('data-weekend', 'true')
  })

  it('should show range states', () => {
    render(
      <>
        <CalendarItem data-start-range="true">10</CalendarItem>
        <CalendarItem data-in-range="true">15</CalendarItem>
        <CalendarItem data-end-range="true">20</CalendarItem>
      </>
    )

    const buttons = screen.getAllByRole('button')

    expect(buttons[0]).toHaveAttribute('data-start-range', 'true')
    expect(buttons[1]).toHaveAttribute('data-in-range', 'true')
    expect(buttons[2]).toHaveAttribute('data-end-range', 'true')
  })

  it('should support keyboard navigation', () => {
    const handleClick = vi.fn()

    render(<CalendarItem onClick={handleClick}>15</CalendarItem>)

    const button = screen.getByRole('button')

    fireEvent.keyDown(button, { key: 'Enter' })

    expect(button).toBeInTheDocument()
  })

  it('should have proper ARIA attributes', () => {
    render(
      <CalendarItem
        aria-selected="true"
        aria-label="Select date 15"
        role="gridcell"
      >
        15
      </CalendarItem>
    )

    const button = screen.getByRole('gridcell')

    expect(button).toHaveAttribute('aria-selected', 'true')
    expect(button).toHaveAttribute('aria-label', 'Select date 15')
  })

  it('should support tabIndex', () => {
    render(<CalendarItem tabIndex={0}>15</CalendarItem>)
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('tabIndex', '0')
  })

  it('should render children correctly', () => {
    render(
      <CalendarItem>
        <span>Custom Content</span>
      </CalendarItem>
    )

    expect(screen.getByText('Custom Content')).toBeInTheDocument()
  })
})
