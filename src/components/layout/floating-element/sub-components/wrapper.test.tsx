import React from 'react'

import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Wrapper } from './wrapper'

describe('Floating Wrapper', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Wrapper>
        <div>Test Content</div>
      </Wrapper>
    )

    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <Wrapper className="custom-class">
        <div>Content</div>
      </Wrapper>
    )

    const wrapper = container.firstChild

    expect(wrapper).toHaveClass('custom-class')
  })

  it('should have absolute positioning', () => {
    const { container } = render(
      <Wrapper>
        <div>Content</div>
      </Wrapper>
    )

    const wrapper = container.firstChild

    expect(wrapper).toHaveClass('absolute')
  })

  it('should have high z-index for floating', () => {
    const { container } = render(
      <Wrapper>
        <div>Content</div>
      </Wrapper>
    )

    const wrapper = container.firstChild

    expect(wrapper).toHaveClass('z-[999]')
  })

  it('should have background and shadow styling', () => {
    const { container } = render(
      <Wrapper>
        <div>Content</div>
      </Wrapper>
    )

    const wrapper = container.firstChild

    expect(wrapper).toHaveClass('bg-white')
    expect(wrapper).toHaveClass('shadow-lg')
  })

  it('should accept ref', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(
      <Wrapper ref={ref}>
        <div>Content</div>
      </Wrapper>
    )

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('should have displayName', () => {
    expect(Wrapper.displayName).toBe('FloatingWrapper')
  })

  it('should have rounded corners', () => {
    const { container } = render(
      <Wrapper>
        <div>Content</div>
      </Wrapper>
    )

    const wrapper = container.firstChild

    expect(wrapper).toHaveClass('rounded-[var(--zaman-radius-modal)]')
  })
})
