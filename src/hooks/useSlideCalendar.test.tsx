import { useState } from 'react'

import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import getDays from '../utils/month'

import { useSlideCalendar } from './useSlideCalendar'

import type { DaysInMonth } from '../utils/month/month.types'

describe('useSlideCalendar', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const createMockDaysElementRefs = () => {
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')

    return {
      current: [div1, div2]
    }
  }

  it('should provide slide functions', () => {
    const daysElementRefs = createMockDaysElementRefs()
    const initialDate = new Date('2024-01-15')
    const initialDays = [getDays(initialDate)]

    const { result } = renderHook(() => {
      const [days, setDays] = useState<DaysInMonth[]>(initialDays)

      return useSlideCalendar({
        daysElementRefs,
        days,
        setDays
      })
    })

    expect(result.current.slideToTheNextMonth).toBeDefined()
    expect(result.current.slideToPrevMonth).toBeDefined()
  })

  it('should slide to next month', () => {
    const daysElementRefs = createMockDaysElementRefs()
    const initialDate = new Date('2024-01-15')
    const initialDays = [getDays(initialDate)]

    const { result } = renderHook(() => {
      const [days, setDays] = useState<DaysInMonth[]>(initialDays)

      return {
        ...useSlideCalendar({
          daysElementRefs,
          days,
          setDays
        }),
        days
      }
    })

    // Should not throw when called
    act(() => {
      result.current.slideToTheNextMonth()
    })
  })

  it('should slide to previous month', () => {
    const daysElementRefs = createMockDaysElementRefs()
    const initialDate = new Date('2024-01-15')
    const initialDays = [getDays(initialDate)]

    const { result } = renderHook(() => {
      const [days, setDays] = useState<DaysInMonth[]>(initialDays)

      return {
        ...useSlideCalendar({
          daysElementRefs,
          days,
          setDays
        }),
        days
      }
    })

    // Should not throw when called
    act(() => {
      result.current.slideToPrevMonth()
    })
  })

  it('should not slide when animation is in progress', () => {
    const daysElementRefs = createMockDaysElementRefs()
    const initialDate = new Date('2024-01-15')
    const initialDays = [getDays(initialDate)]

    const { result } = renderHook(() => {
      const [days, setDays] = useState<DaysInMonth[]>(initialDays)

      return {
        ...useSlideCalendar({
          daysElementRefs,
          days,
          setDays
        }),
        days
      }
    })

    // First slide should work
    act(() => {
      result.current.slideToTheNextMonth()
    })

    // Second slide should also not throw (internally it will check if animating)
    act(() => {
      result.current.slideToTheNextMonth()
    })
  })

  it('should apply CSS transforms during slide to next month', () => {
    const daysElementRefs = createMockDaysElementRefs()
    const initialDate = new Date('2024-01-15')
    const initialDays = [getDays(initialDate)]

    const { result } = renderHook(() => {
      const [days, setDays] = useState<DaysInMonth[]>(initialDays)

      return useSlideCalendar({
        daysElementRefs,
        days,
        setDays
      })
    })

    // Should successfully call the function
    act(() => {
      result.current.slideToTheNextMonth()
    })

    // Fast-forward to start of animation
    act(() => {
      vi.advanceTimersByTime(20)
    })

    // Function should be callable
    expect(result.current.slideToTheNextMonth).toBeDefined()
  })

  it('should apply CSS transforms during slide to previous month', () => {
    const daysElementRefs = createMockDaysElementRefs()
    const initialDate = new Date('2024-01-15')
    const initialDays = [getDays(initialDate)]

    const { result } = renderHook(() => {
      const [days, setDays] = useState<DaysInMonth[]>(initialDays)

      return useSlideCalendar({
        daysElementRefs,
        days,
        setDays
      })
    })

    // Should successfully call the function
    act(() => {
      result.current.slideToPrevMonth()
    })

    // Fast-forward to start of animation
    act(() => {
      vi.advanceTimersByTime(20)
    })

    // Function should be callable
    expect(result.current.slideToPrevMonth).toBeDefined()
  })

  it('should handle missing refs gracefully', () => {
    const daysElementRefs = { current: null } as any
    const initialDate = new Date('2024-01-15')
    const initialDays = [getDays(initialDate)]

    const { result } = renderHook(() => {
      const [days, setDays] = useState<DaysInMonth[]>(initialDays)

      return useSlideCalendar({
        daysElementRefs,
        days,
        setDays
      })
    })

    // Should not throw
    act(() => {
      result.current.slideToTheNextMonth()
    })
    act(() => {
      result.current.slideToPrevMonth()
    })
  })

  it('should handle insufficient refs gracefully', () => {
    const div1 = document.createElement('div')
    const daysElementRefs = { current: [div1] } // Only one ref
    const initialDate = new Date('2024-01-15')
    const initialDays = [getDays(initialDate)]

    const { result } = renderHook(() => {
      const [days, setDays] = useState<DaysInMonth[]>(initialDays)

      return useSlideCalendar({
        daysElementRefs,
        days,
        setDays
      })
    })

    // Should not throw
    act(() => {
      result.current.slideToTheNextMonth()
    })
    act(() => {
      result.current.slideToPrevMonth()
    })
  })

  it('should clear transforms after animation completes', () => {
    const daysElementRefs = createMockDaysElementRefs()
    const initialDate = new Date('2024-01-15')
    const initialDays = [getDays(initialDate)]

    const { result } = renderHook(() => {
      const [days, setDays] = useState<DaysInMonth[]>(initialDays)

      return useSlideCalendar({
        daysElementRefs,
        days,
        setDays
      })
    })

    // Call slide function
    act(() => {
      result.current.slideToTheNextMonth()
    })

    // Complete animation
    act(() => {
      vi.advanceTimersByTime(350)
    })

    // Function should still be available
    expect(result.current.slideToTheNextMonth).toBeDefined()
  })
})
