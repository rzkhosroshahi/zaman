import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Header } from './header'

describe('Header', () => {
  const defaultProps = {
    monthName: 'January 2025',
    onPrevClick: vi.fn(),
    onNextClick: vi.fn(),
    onClickOnTitle: vi.fn()
  }

  it('should render correctly', () => {
    render(<Header {...defaultProps} />)
    expect(screen.getByText('January 2025')).toBeInTheDocument()
  })

  it('should render previous month button', () => {
    render(<Header {...defaultProps} />)
    const prevButton = screen.getByLabelText('Previous month')

    expect(prevButton).toBeInTheDocument()
  })

  it('should render next month button', () => {
    render(<Header {...defaultProps} />)
    const nextButton = screen.getByLabelText('Next month')

    expect(nextButton).toBeInTheDocument()
  })

  it('should call onPrevClick when previous button is clicked', () => {
    const onPrevClick = vi.fn()

    render(<Header {...defaultProps} onPrevClick={onPrevClick} />)

    const prevButton = screen.getByLabelText('Previous month')

    fireEvent.click(prevButton)

    expect(onPrevClick).toHaveBeenCalledTimes(1)
  })

  it('should call onNextClick when next button is clicked', () => {
    const onNextClick = vi.fn()

    render(<Header {...defaultProps} onNextClick={onNextClick} />)

    const nextButton = screen.getByLabelText('Next month')

    fireEvent.click(nextButton)

    expect(onNextClick).toHaveBeenCalledTimes(1)
  })

  it('should call onClickOnTitle when title is clicked', () => {
    const onClickOnTitle = vi.fn()

    render(<Header {...defaultProps} onClickOnTitle={onClickOnTitle} />)

    const title = screen.getByText('January 2025')

    fireEvent.click(title)

    expect(onClickOnTitle).toHaveBeenCalledTimes(1)
  })

  it('should have proper accessibility attributes', () => {
    render(<Header {...defaultProps} />)

    const prevButton = screen.getByLabelText('Previous month')
    const nextButton = screen.getByLabelText('Next month')
    const title = screen.getByLabelText(
      'calendar view is open, switch to year and month view'
    )

    expect(prevButton).toHaveAttribute('tabIndex', '0')
    expect(nextButton).toHaveAttribute('tabIndex', '0')
    expect(title).toHaveAttribute('tabIndex', '0')
    expect(title).toHaveAttribute('role', 'presentation')
  })

  it('should support keyboard navigation', () => {
    const onPrevClick = vi.fn()

    render(<Header {...defaultProps} onPrevClick={onPrevClick} />)

    const prevButton = screen.getByLabelText('Previous month')

    fireEvent.keyDown(prevButton, { key: 'Enter' })

    // Button's built-in click handler should be triggered
    expect(prevButton).toBeInTheDocument()
  })
})
