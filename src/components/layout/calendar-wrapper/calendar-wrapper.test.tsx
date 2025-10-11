import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { CalendarWrapper } from './calendar-wrapper'

describe('CalendarWrapper', () => {
  it('should render children correctly', () => {
    render(
      <CalendarWrapper>
        <div>Calendar Content</div>
      </CalendarWrapper>
    )
    expect(screen.getByText('Calendar Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <CalendarWrapper className="custom-class">
        <div>Content</div>
      </CalendarWrapper>
    )
    const wrapper = container.firstChild

    expect(wrapper).toHaveClass('custom-class')
  })

  it('should render with default styles', () => {
    const { container } = render(
      <CalendarWrapper>
        <div>Content</div>
      </CalendarWrapper>
    )
    const wrapper = container.firstChild as HTMLElement

    expect(wrapper).toHaveClass('overflow-hidden')
    expect(wrapper).toHaveClass('relative')
  })

  it('should render multiple children', () => {
    render(
      <CalendarWrapper>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </CalendarWrapper>
    )
    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
    expect(screen.getByText('Child 3')).toBeInTheDocument()
  })
})
