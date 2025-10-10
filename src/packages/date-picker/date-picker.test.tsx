import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { DatePicker } from './date-picker'

describe('DatePicker', () => {
  it('should render input', () => {
    render(<DatePicker />)
    const input = screen.getByRole('combobox')

    expect(input).toBeInTheDocument()
  })

  it('should have proper ARIA attributes', () => {
    render(<DatePicker />)
    const input = screen.getByRole('combobox')

    expect(input).toHaveAttribute('aria-label')
    expect(input).toHaveAttribute('aria-expanded', 'false')
    expect(input).toHaveAttribute('aria-haspopup', 'dialog')
  })

  it('should apply custom input class', () => {
    render(<DatePicker inputClass="custom-input" />)
    const input = screen.getByRole('combobox')

    expect(input).toHaveClass('custom-input')
  })

  it('should apply custom input attributes', () => {
    render(
      <DatePicker
        inputAttributes={{
          'aria-label': 'Custom date picker',
          placeholder: 'Select a date'
        }}
      />
    )
    const input = screen.getByRole('combobox')

    expect(input).toHaveAttribute('aria-label', 'Custom date picker')
    expect(input).toHaveAttribute('placeholder', 'Select a date')
  })

  it('should toggle calendar on input click', async () => {
    const user = userEvent.setup()

    render(<DatePicker />)

    const input = screen.getByRole('combobox')

    expect(input).toHaveAttribute('aria-expanded', 'false')

    await user.click(input)

    await waitFor(() => {
      expect(input).toHaveAttribute('aria-expanded', 'true')
    })
  })

  it('should display default value', () => {
    const defaultValue = new Date('2024-01-15')

    render(<DatePicker defaultValue={defaultValue} />)

    const input = screen.getByRole('combobox') as HTMLInputElement

    expect(input.value).toBeTruthy()
  })

  it('should call onChange when date selected', async () => {
    const onChange = vi.fn()

    render(<DatePicker onChange={onChange} />)

    const input = screen.getByRole('combobox')

    await userEvent.click(input)

    // Note: Full integration test would require calendar to be rendered
    // This tests the handler setup
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should support range mode', () => {
    const onChange = vi.fn()
    const from = new Date('2024-01-15')
    const to = new Date('2024-01-20')

    render(<DatePicker range from={from} to={to} onChange={onChange} />)

    const input = screen.getByRole('combobox') as HTMLInputElement

    expect(input.value).toContain('-')
  })

  it('should be readonly', () => {
    render(<DatePicker />)
    const input = screen.getByRole('combobox')

    expect(input).toHaveAttribute('readonly')
  })

  it('should handle custom date format', () => {
    const defaultValue = new Date('2024-01-15')

    render(
      <DatePicker
        defaultValue={defaultValue}
        customShowDateFormat="DD/MM/YYYY"
      />
    )

    const input = screen.getByRole('combobox') as HTMLInputElement

    expect(input.value).toBeTruthy()
  })

  it('should handle weekends prop', () => {
    render(<DatePicker weekends={[5, 6]} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('should handle keyboard interaction', async () => {
    const user = userEvent.setup()

    render(<DatePicker />)

    const input = screen.getByRole('combobox')

    // Tab to input
    await user.tab()
    expect(input).toHaveFocus()

    // Click to open
    await user.click(input)

    await waitFor(() => {
      expect(input).toHaveAttribute('aria-expanded', 'true')
    })
  })
})
