import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Button } from './button'

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<Button className="custom-class">Button</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('custom-class')
  })

  it('should handle click events', () => {
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should render icon variant by default', () => {
    const { container } = render(<Button>Icon</Button>)
    const button = container.querySelector('button')

    expect(button).toBeInTheDocument()
  })

  it('should render text variant when specified', () => {
    render(<Button variant="text">Text</Button>)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Text')
  })

  it('should be disabled when disabled prop is passed', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
  })

  it('should have correct aria attributes', () => {
    render(<Button aria-label="Close modal">×</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('aria-label', 'Close modal')
  })

  it('should support tabIndex', () => {
    render(<Button tabIndex={0}>Button</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('tabIndex', '0')
  })

  it('should handle keyboard events', () => {
    const handleKeyDown = vi.fn()

    render(<Button onKeyDown={handleKeyDown}>Button</Button>)

    const button = screen.getByRole('button')

    fireEvent.keyDown(button, { key: 'Enter' })

    expect(handleKeyDown).toHaveBeenCalled()
  })
})
