import { renderHook, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { useTimePicker } from './useTimePicker'

describe('useTimePicker', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useTimePicker({}))

    expect(result.current.hour).toBeGreaterThanOrEqual(0)
    expect(result.current.minute).toBeGreaterThanOrEqual(0)
    expect(result.current.isInsideHour).toBe(false)
    expect(result.current.selectingHour).toBe(false)
  })

  it('should initialize with provided default value', () => {
    const defaultValue = new Date('2024-01-15T14:30:00')

    const { result } = renderHook(() =>
      useTimePicker({
        defaultValue,
        clockTime: 24
      })
    )

    expect(result.current.hour).toBe(14)
    expect(result.current.minute).toBe(30)
  })

  it('should initialize with 12-hour format', () => {
    const defaultValue = new Date('2024-01-15T14:30:00')

    const { result } = renderHook(() =>
      useTimePicker({
        defaultValue,
        clockTime: 12
      })
    )

    expect(result.current.hour).toBe(2) // 14:00 in 12-hour format is 2
    expect(result.current.minute).toBe(30)
  })

  it('should provide mouse event handlers', () => {
    const { result } = renderHook(() => useTimePicker({}))

    expect(result.current.handleMouseMove).toBeDefined()
    expect(result.current.handleMouseUp).toBeDefined()
    expect(result.current.handleSelecting).toBeDefined()
  })

  it('should call onChange when selecting hour in 12-hour mode', async () => {
    const onChange = vi.fn()

    const { result } = renderHook(() =>
      useTimePicker({
        clockTime: 12,
        timeConvention: 'am',
        onChange
      })
    )

    // Mock event for selecting minute
    const mockEvent = {
      nativeEvent: {
        offsetX: 130,
        offsetY: 20
      },
      currentTarget: {
        getBoundingClientRect: () => ({
          left: 0,
          top: 0
        })
      }
    } as any

    // First selection (minute) - starts with selectingHour = false
    act(() => {
      result.current.handleSelecting(mockEvent)
    })

    // Mouse up should switch to hour selection
    act(() => {
      result.current.handleMouseUp()
    })

    await waitFor(() => {
      expect(result.current.selectingHour).toBe(true)
    })

    // Second selection (hour)
    act(() => {
      result.current.handleSelecting(mockEvent)
    })

    // Mouse up to confirm
    act(() => {
      result.current.handleMouseUp()
    })

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
    })
  })

  it('should call onChange when selecting hour in 24-hour mode', async () => {
    const onChange = vi.fn()

    const { result } = renderHook(() =>
      useTimePicker({
        clockTime: 24,
        onChange
      })
    )

    // Mock event
    const mockEvent = {
      nativeEvent: {
        offsetX: 130,
        offsetY: 20
      },
      currentTarget: {
        getBoundingClientRect: () => ({
          left: 0,
          top: 0
        })
      }
    } as any

    // First selection (minute)
    act(() => {
      result.current.handleSelecting(mockEvent)
    })

    // Mouse up should switch to hour selection
    act(() => {
      result.current.handleMouseUp()
    })

    await waitFor(() => {
      expect(result.current.selectingHour).toBe(true)
    })

    // Second selection (hour)
    act(() => {
      result.current.handleSelecting(mockEvent)
    })

    // Mouse up to confirm
    act(() => {
      result.current.handleMouseUp()
    })

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
    })
  })

  it('should not call onChange when onChange is not provided', async () => {
    const { result } = renderHook(() =>
      useTimePicker({
        clockTime: 12
      })
    )

    const mockEvent = {
      nativeEvent: {
        offsetX: 130,
        offsetY: 20
      },
      currentTarget: {
        getBoundingClientRect: () => ({
          left: 0,
          top: 0
        })
      }
    } as any

    act(() => {
      result.current.handleSelecting(mockEvent)
    })

    await waitFor(() => {
      expect(result.current.selectingHour).toBe(false)
    })

    // Should not throw when onChange is undefined
    act(() => {
      result.current.handleMouseUp()
    })
  })

  it('should handle mouse move during selection', async () => {
    const { result } = renderHook(() =>
      useTimePicker({
        clockTime: 24
      })
    )

    const mockEvent = {
      preventDefault: vi.fn(),
      nativeEvent: {
        offsetX: 130,
        offsetY: 100
      },
      currentTarget: {
        getBoundingClientRect: () => ({
          left: 0,
          top: 0
        })
      }
    } as any

    // Start selecting
    act(() => {
      result.current.handleSelecting(mockEvent)
    })

    await waitFor(() => {
      expect(result.current.selectingHour).toBe(false)
    })

    // Mouse move should update value
    act(() => {
      result.current.handleMouseMove(mockEvent)
    })

    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })

  it('should not handle mouse move when not selecting', () => {
    const { result } = renderHook(() =>
      useTimePicker({
        clockTime: 24
      })
    )

    const mockEvent = {
      preventDefault: vi.fn(),
      nativeEvent: {
        offsetX: 130,
        offsetY: 100
      },
      currentTarget: {
        getBoundingClientRect: () => ({
          left: 0,
          top: 0
        })
      }
    } as any

    // Without starting selection
    act(() => {
      result.current.handleMouseMove(mockEvent)
    })

    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })

  it('should toggle from minute to hour selection', async () => {
    const onChange = vi.fn()

    const { result } = renderHook(() =>
      useTimePicker({
        clockTime: 12,
        onChange
      })
    )

    const mockEvent = {
      nativeEvent: {
        offsetX: 130,
        offsetY: 100
      },
      currentTarget: {
        getBoundingClientRect: () => ({
          left: 0,
          top: 0
        })
      }
    } as any

    // First selection (minute)
    act(() => {
      result.current.handleSelecting(mockEvent)
    })

    // Mouse up should switch to hour selection
    act(() => {
      result.current.handleMouseUp()
    })

    await waitFor(() => {
      expect(result.current.selectingHour).toBe(true)
    })

    // Second selection (hour)
    act(() => {
      result.current.handleSelecting(mockEvent)
    })

    // Mouse up should complete and call onChange
    act(() => {
      result.current.handleMouseUp()
    })

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
      expect(result.current.selectingHour).toBe(false)
    })
  })
})
