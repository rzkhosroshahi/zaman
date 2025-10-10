import React from 'react'

import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { ChevronRight } from './chevron-right'

describe('ChevronRight Icon', () => {
  it('should render SVG element', () => {
    const { container } = render(<ChevronRight />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
  })

  it('should have correct dimensions', () => {
    const { container } = render(<ChevronRight />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
  })

  it('should have correct viewBox', () => {
    const { container } = render(<ChevronRight />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
  })

  it('should be aria-hidden for screen readers', () => {
    const { container } = render(<ChevronRight />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('should use currentColor for stroke', () => {
    const { container } = render(<ChevronRight />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('stroke', 'currentColor')
  })

  it('should have polyline element', () => {
    const { container } = render(<ChevronRight />)
    const polyline = container.querySelector('polyline')

    expect(polyline).toBeInTheDocument()
  })

  it('should have correct polyline points for right arrow', () => {
    const { container } = render(<ChevronRight />)
    const polyline = container.querySelector('polyline')

    expect(polyline).toHaveAttribute('points', '9 18 15 12 9 6')
  })

  it('should have displayName', () => {
    expect(ChevronRight.displayName).toBe('ChevronRight')
  })
})
