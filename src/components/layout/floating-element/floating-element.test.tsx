import { useRef } from 'react'

import { render } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import FloatingElement from './floating-element'

// Mock debounce
vi.mock('@/utils', async () => {
  const actual = await vi.importActual('@/utils')

  return {
    ...actual,
    debounce: (fn: any) => fn
  }
})

describe('FloatingElement', () => {
  beforeEach(() => {
    // Create portal root
    const portalRoot = document.createElement('div')

    document.body.appendChild(portalRoot)
  })

  it('should render children correctly', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)

      return (
        <>
          <div ref={ref}>Destination</div>
          <FloatingElement destinationRef={ref} position="center">
            <div data-testid="floating-content">Floating Content</div>
          </FloatingElement>
        </>
      )
    }

    const { getByTestId } = render(<TestComponent />)

    expect(getByTestId('floating-content')).toBeInTheDocument()
  })

  it('should portal to document.body', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)

      return (
        <>
          <div ref={ref}>Destination</div>
          <FloatingElement destinationRef={ref} position="center">
            <div className="floating-wrapper">Content</div>
          </FloatingElement>
        </>
      )
    }

    render(<TestComponent />)
    const floatingWrapper = document.querySelector('.floating-wrapper')

    expect(floatingWrapper?.parentElement?.parentElement).toBe(document.body)
  })

  it('should handle different positions', () => {
    const positions = ['left', 'right', 'center'] as const

    positions.forEach((position) => {
      const TestComponent = () => {
        const ref = useRef<HTMLDivElement>(null)

        return (
          <>
            <div ref={ref}>Destination</div>
            <FloatingElement destinationRef={ref} position={position}>
              <div data-testid={`floating-${position}`}>Content</div>
            </FloatingElement>
          </>
        )
      }

      const { getByTestId } = render(<TestComponent />)

      expect(getByTestId(`floating-${position}`)).toBeInTheDocument()
    })
  })
})
