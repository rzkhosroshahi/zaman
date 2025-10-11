import React, { useRef } from 'react'

import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import useClickOutside from './useClickOutside'

describe('useClickOutside', () => {
  it('should call handler when clicking outside', () => {
    const handler = vi.fn()

    function TestComponent() {
      const ref = useRef<HTMLDivElement>(null)

      useClickOutside(ref, handler)

      return (
        <div>
          <div ref={ref} data-testid="inside">
            Inside
          </div>
          <div data-testid="outside">Outside</div>
        </div>
      )
    }

    const { getByTestId } = render(<TestComponent />)

    fireEvent.mouseDown(getByTestId('outside'))

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should not call handler when clicking inside', () => {
    const handler = vi.fn()

    function TestComponent() {
      const ref = useRef<HTMLDivElement>(null)

      useClickOutside(ref, handler)

      return (
        <div>
          <div ref={ref} data-testid="inside">
            Inside
          </div>
          <div data-testid="outside">Outside</div>
        </div>
      )
    }

    const { getByTestId } = render(<TestComponent />)

    fireEvent.mouseDown(getByTestId('inside'))

    expect(handler).not.toHaveBeenCalled()
  })

  it('should not call handler when ref is null', () => {
    const handler = vi.fn()

    function TestComponent() {
      const ref = useRef<HTMLDivElement>(null)

      useClickOutside(ref, handler)

      return (
        <div>
          <div data-testid="outside">Outside</div>
        </div>
      )
    }

    const { getByTestId } = render(<TestComponent />)

    fireEvent.mouseDown(getByTestId('outside'))

    // Handler should not be called when ref.current is null
    expect(handler).not.toHaveBeenCalled()
  })

  it('should handle nested elements correctly', () => {
    const handler = vi.fn()

    function TestComponent() {
      const ref = useRef<HTMLDivElement>(null)

      useClickOutside(ref, handler)

      return (
        <div>
          <div ref={ref} data-testid="parent">
            <div data-testid="child">Child</div>
          </div>
          <div data-testid="outside">Outside</div>
        </div>
      )
    }

    const { getByTestId } = render(<TestComponent />)

    // Click on child element (inside the ref element)
    fireEvent.mouseDown(getByTestId('child'))

    expect(handler).not.toHaveBeenCalled()

    // Click outside
    fireEvent.mouseDown(getByTestId('outside'))

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should cleanup event listener on unmount', () => {
    const handler = vi.fn()
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')

    function TestComponent() {
      const ref = useRef<HTMLDivElement>(null)

      useClickOutside(ref, handler)

      return <div ref={ref}>Content</div>
    }

    const { unmount } = render(<TestComponent />)

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function)
    )

    removeEventListenerSpy.mockRestore()
  })

  it('should update handler when it changes', () => {
    const handler1 = vi.fn()
    const handler2 = vi.fn()

    function TestComponent({ onClickOutside }: { onClickOutside: () => void }) {
      const ref = useRef<HTMLDivElement>(null)

      useClickOutside(ref, onClickOutside)

      return (
        <div>
          <div ref={ref} data-testid="inside">
            Inside
          </div>
          <div data-testid="outside">Outside</div>
        </div>
      )
    }

    const { getByTestId, rerender } = render(
      <TestComponent onClickOutside={handler1} />
    )

    fireEvent.mouseDown(getByTestId('outside'))

    expect(handler1).toHaveBeenCalledTimes(1)
    expect(handler2).not.toHaveBeenCalled()

    // Rerender with new handler
    rerender(<TestComponent onClickOutside={handler2} />)

    fireEvent.mouseDown(getByTestId('outside'))

    expect(handler1).toHaveBeenCalledTimes(1) // Still 1
    expect(handler2).toHaveBeenCalledTimes(1) // Now called
  })
})
