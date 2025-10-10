import React from 'react'

import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { ThemeProvider } from './ThemeProvider'

describe('ThemeProvider', () => {
  it('should render children', () => {
    const { getByText } = render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    )

    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('should apply default direction (rtl)', () => {
    const { container } = render(
      <ThemeProvider>
        <div>Content</div>
      </ThemeProvider>
    )

    const wrapper = container.querySelector('.zaman-calendar')

    expect(wrapper).toHaveAttribute('dir', 'rtl')
  })

  it('should apply custom direction (ltr)', () => {
    const { container } = render(
      <ThemeProvider direction="ltr">
        <div>Content</div>
      </ThemeProvider>
    )

    const wrapper = container.querySelector('.zaman-calendar')

    expect(wrapper).toHaveAttribute('dir', 'ltr')
  })

  it('should apply accent color', () => {
    const { container } = render(
      <ThemeProvider accentColor="#FF0000">
        <div>Content</div>
      </ThemeProvider>
    )

    const wrapper = container.querySelector('.zaman-calendar') as HTMLElement

    expect(wrapper).toBeInTheDocument()
  })

  it('should apply round preset', () => {
    const { container } = render(
      <ThemeProvider round="thick">
        <div>Content</div>
      </ThemeProvider>
    )

    const wrapper = container.querySelector('.zaman-calendar')

    expect(wrapper).toBeInTheDocument()
  })

  it('should apply custom theme overrides', () => {
    const { container } = render(
      <ThemeProvider
        theme={{
          colors: {
            primary: {
              DEFAULT: '#FF0000'
            }
          }
        }}
      >
        <div>Content</div>
      </ThemeProvider>
    )

    const wrapper = container.querySelector('.zaman-calendar')

    expect(wrapper).toBeInTheDocument()
  })

  it('should apply multiple props simultaneously', () => {
    const { container } = render(
      <ThemeProvider
        accentColor="#FF0000"
        direction="ltr"
        round="medium"
        locale="en"
      >
        <div>Content</div>
      </ThemeProvider>
    )

    const wrapper = container.querySelector('.zaman-calendar')

    expect(wrapper).toHaveAttribute('dir', 'ltr')
  })

  it('should update theme when props change', () => {
    const { container, rerender } = render(
      <ThemeProvider direction="rtl">
        <div>Content</div>
      </ThemeProvider>
    )

    let wrapper = container.querySelector('.zaman-calendar')

    expect(wrapper).toHaveAttribute('dir', 'rtl')

    rerender(
      <ThemeProvider direction="ltr">
        <div>Content</div>
      </ThemeProvider>
    )

    wrapper = container.querySelector('.zaman-calendar')

    expect(wrapper).toHaveAttribute('dir', 'ltr')
  })

  it('should add zaman-calendar class', () => {
    const { container } = render(
      <ThemeProvider>
        <div>Content</div>
      </ThemeProvider>
    )

    const wrapper = container.querySelector('.zaman-calendar')

    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('zaman-calendar')
  })

  it('should handle locale prop', () => {
    const { container } = render(
      <ThemeProvider locale="fa">
        <div>Content</div>
      </ThemeProvider>
    )

    const wrapper = container.querySelector('.zaman-calendar')

    expect(wrapper).toBeInTheDocument()
  })

  it('should merge accent color with theme overrides', () => {
    const { container } = render(
      <ThemeProvider
        accentColor="#FF0000"
        theme={{
          colors: {
            background: '#FFFFFF'
          }
        }}
      >
        <div>Content</div>
      </ThemeProvider>
    )

    const wrapper = container.querySelector('.zaman-calendar')

    expect(wrapper).toBeInTheDocument()
  })

  it('should handle all props at once', () => {
    const { container } = render(
      <ThemeProvider
        theme={{
          colors: {
            primary: {
              DEFAULT: '#FF0000'
            }
          }
        }}
        accentColor="#00FF00"
        direction="ltr"
        round="thick"
        locale="en"
      >
        <div>Content</div>
      </ThemeProvider>
    )

    const wrapper = container.querySelector('.zaman-calendar')

    expect(wrapper).toHaveAttribute('dir', 'ltr')
    expect(wrapper).toHaveClass('zaman-calendar')
  })
})
