import { renderHook, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { useCalendarHandlers } from './useCalendarHandlers'

describe('useCalendarHandlers', () => {
  describe('default mode (non-range)', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() =>
        useCalendarHandlers({
          range: false,
          onChange: vi.fn()
        })
      )

      expect(result.current.from).toBeUndefined()
      expect(result.current.to).toBeUndefined()
    })

    it('should initialize with from and to dates', () => {
      const from = new Date('2024-01-15')
      const to = new Date('2024-01-20')

      const { result } = renderHook(() =>
        useCalendarHandlers({
          range: false,
          from,
          to,
          onChange: vi.fn()
        })
      )

      expect(result.current.from).toEqual(from)
      expect(result.current.to).toEqual(to)
    })

    it('should call onChange when clicking a date', () => {
      const onChange = vi.fn()
      const { result } = renderHook(() =>
        useCalendarHandlers({
          range: false,
          onChange
        })
      )

      const mockEvent = {
        currentTarget: {
          dataset: {
            value: '2024-01-15'
          }
        }
      } as any

      act(() => {
        result.current.handlers.onClick(mockEvent)
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(new Date('2024-01-15'))
    })

    it('should not call onChange when value is undefined', () => {
      const onChange = vi.fn()
      const { result } = renderHook(() =>
        useCalendarHandlers({
          range: false,
          onChange
        })
      )

      const mockEvent = {
        currentTarget: {
          dataset: {}
        }
      } as any

      act(() => {
        result.current.handlers.onClick(mockEvent)
      })

      expect(onChange).not.toHaveBeenCalled()
    })

    it('should not call onChange when date is disabled', () => {
      const onChange = vi.fn()
      const { result } = renderHook(() =>
        useCalendarHandlers({
          range: false,
          onChange
        })
      )

      const mockEvent = {
        currentTarget: {
          dataset: {
            value: '2024-01-15',
            disabled: 'true'
          }
        }
      } as any

      act(() => {
        result.current.handlers.onClick(mockEvent)
      })

      expect(onChange).not.toHaveBeenCalled()
    })

    it('should not have onMouseMove handler in default mode', () => {
      const { result } = renderHook(() =>
        useCalendarHandlers({
          range: false,
          onChange: vi.fn()
        })
      )

      expect(result.current.handlers.onMouseMove).toBeUndefined()
    })
  })

  describe('range mode', () => {
    it('should initialize range selection', () => {
      const { result } = renderHook(() =>
        useCalendarHandlers({
          range: true,
          onChange: vi.fn()
        })
      )

      expect(result.current.from).toBeUndefined()
      expect(result.current.to).toBeUndefined()
    })

    it('should set from date on first click', async () => {
      const onChange = vi.fn()
      const { result } = renderHook(() =>
        useCalendarHandlers({
          range: true,
          onChange
        })
      )

      const mockEvent = {
        currentTarget: {
          dataset: {
            value: '2024-01-15'
          }
        }
      } as any

      act(() => {
        result.current.handlers.onClick(mockEvent)
      })

      await waitFor(() => {
        expect(result.current.from).toEqual(new Date('2024-01-15'))
        expect(result.current.to).toBeNull()
      })
    })

    it('should set to date on second click', async () => {
      const onChange = vi.fn()
      const { result } = renderHook(() =>
        useCalendarHandlers({
          range: true,
          onChange
        })
      )

      const mockEvent1 = {
        currentTarget: {
          dataset: {
            value: '2024-01-15'
          }
        }
      } as any

      const mockEvent2 = {
        currentTarget: {
          dataset: {
            value: '2024-01-20'
          }
        }
      } as any

      // First click
      act(() => {
        result.current.handlers.onClick(mockEvent1)
      })

      await waitFor(() => {
        expect(result.current.from).toEqual(new Date('2024-01-15'))
      })

      // Second click
      act(() => {
        result.current.handlers.onClick(mockEvent2)
      })

      await waitFor(() => {
        expect(result.current.to).toEqual(new Date('2024-01-20'))
      })

      expect(onChange).toHaveBeenCalledWith(new Date('2024-01-20'))
    })

    it('should have onMouseMove handler in range mode', () => {
      const { result } = renderHook(() =>
        useCalendarHandlers({
          range: true,
          onChange: vi.fn()
        })
      )

      expect(result.current.handlers.onMouseMove).toBeDefined()
    })

    it('should update to date on mouse move during selection', async () => {
      const { result } = renderHook(() =>
        useCalendarHandlers({
          range: true,
          onChange: vi.fn()
        })
      )

      // Start range selection
      const clickEvent = {
        currentTarget: {
          dataset: {
            value: '2024-01-15'
          }
        }
      } as any

      act(() => {
        result.current.handlers.onClick(clickEvent)
      })

      await waitFor(() => {
        expect(result.current.from).toEqual(new Date('2024-01-15'))
      })

      // Mouse move to different date
      const moveEvent = {
        currentTarget: {
          dataset: {
            value: '2024-01-20'
          }
        }
      } as any

      act(() => {
        result.current.handlers.onMouseMove?.(moveEvent)
      })

      await waitFor(() => {
        expect(result.current.to).toEqual(new Date('2024-01-20'))
      })
    })

    it('should not update to date on mouse move when not selecting', () => {
      const { result } = renderHook(() =>
        useCalendarHandlers({
          range: true,
          onChange: vi.fn()
        })
      )

      const moveEvent = {
        currentTarget: {
          dataset: {
            value: '2024-01-20'
          }
        }
      } as any

      act(() => {
        result.current.handlers.onMouseMove?.(moveEvent)
      })

      expect(result.current.to).toBeUndefined()
    })
  })
})
