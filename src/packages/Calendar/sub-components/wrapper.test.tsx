import React from 'react'

import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Wrapper } from './wrapper'

describe('Calendar Wrapper', () => {
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

  it('should have overflow-hidden class', () => {
    const { container } = render(
      <Wrapper>
        <div>Content</div>
      </Wrapper>
    )

    const wrapper = container.firstChild

    expect(wrapper).toHaveClass('overflow-hidden')
  })

  it('should have relative positioning', () => {
    const { container } = render(
      <Wrapper>
        <div>Content</div>
      </Wrapper>
    )

    const wrapper = container.firstChild

    expect(wrapper).toHaveClass('relative')
  })

  it('should have border styling', () => {
    const { container } = render(
      <Wrapper>
        <div>Content</div>
      </Wrapper>
    )

    const wrapper = container.firstChild

    expect(wrapper).toHaveClass('border')
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
    expect(Wrapper.displayName).toBe('CalendarWrapper')
  })

  it('should have fixed dimensions via inline styles', () => {
    const { container } = render(
      <Wrapper>
        <div>Content</div>
      </Wrapper>
    )

    const wrapper = container.firstChild as HTMLElement

    expect(wrapper.style.width).toBeTruthy()
    expect(wrapper.style.height).toBeTruthy()
  })
})
