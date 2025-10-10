import { describe, it, expect } from 'vitest'

import { createRangeEngine } from './range-engine'

describe('RangeEngine', () => {
  const engine = createRangeEngine()

  describe('createInitialState', () => {
    it('should create empty initial state', () => {
      const state = engine.createInitialState()

      expect(state.start).toBeNull()
      expect(state.end).toBeNull()
      expect(state.isSelecting).toBe(false)
      expect(state.hoverDate).toBeNull()
    })
  })

  describe('startSelection', () => {
    it('should start range selection', () => {
      const date = new Date('2024-01-15')
      const state = engine.startSelection(date)

      expect(state.start).toEqual(date)
      expect(state.end).toBeNull()
      expect(state.isSelecting).toBe(true)
    })
  })

  describe('updateHover', () => {
    it('should update hover date when selecting', () => {
      const start = new Date('2024-01-15')
      const hover = new Date('2024-01-20')

      let state = engine.startSelection(start)

      state = engine.updateHover(state, hover)

      expect(state.hoverDate).toEqual(hover)
    })

    it('should not update hover when not selecting', () => {
      const state = engine.createInitialState()
      const hover = new Date('2024-01-20')

      const newState = engine.updateHover(state, hover)

      expect(newState.hoverDate).toBeNull()
    })

    it('should not update hover for dates before start', () => {
      const start = new Date('2024-01-15')
      const hover = new Date('2024-01-10')

      let state = engine.startSelection(start)

      state = engine.updateHover(state, hover)

      expect(state.hoverDate).toBeNull()
    })
  })

  describe('completeSelection', () => {
    it('should complete range selection', () => {
      const start = new Date('2024-01-15')
      const end = new Date('2024-01-20')

      let state = engine.startSelection(start)

      state = engine.completeSelection(state, end)

      expect(state.start).toEqual(start)
      expect(state.end).toEqual(end)
      expect(state.isSelecting).toBe(false)
    })

    it('should swap dates if end is before start', () => {
      const start = new Date('2024-01-20')
      const end = new Date('2024-01-15')

      let state = engine.startSelection(start)

      state = engine.completeSelection(state, end)

      expect(state.start).toEqual(end)
      expect(state.end).toEqual(start)
    })

    it('should start new selection if no start date', () => {
      const state = engine.createInitialState()
      const date = new Date('2024-01-15')

      const newState = engine.completeSelection(state, date)

      expect(newState.start).toEqual(date)
      expect(newState.isSelecting).toBe(true)
    })
  })

  describe('resetSelection', () => {
    it('should reset to initial state', () => {
      let state = engine.startSelection(new Date('2024-01-15'))

      state = engine.completeSelection(state, new Date('2024-01-20'))
      state = engine.resetSelection()

      expect(state.start).toBeNull()
      expect(state.end).toBeNull()
      expect(state.isSelecting).toBe(false)
    })
  })

  describe('isInRange', () => {
    it('should detect date in range', () => {
      const start = new Date('2024-01-15')
      const end = new Date('2024-01-20')
      const date = new Date('2024-01-17')

      expect(engine.isInRange(date, start, end)).toBe(true)
    })

    it('should include start and end dates', () => {
      const start = new Date('2024-01-15')
      const end = new Date('2024-01-20')

      expect(engine.isInRange(start, start, end)).toBe(true)
      expect(engine.isInRange(end, start, end)).toBe(true)
    })

    it('should detect date outside range', () => {
      const start = new Date('2024-01-15')
      const end = new Date('2024-01-20')
      const before = new Date('2024-01-10')
      const after = new Date('2024-01-25')

      expect(engine.isInRange(before, start, end)).toBe(false)
      expect(engine.isInRange(after, start, end)).toBe(false)
    })

    it('should return false when start or end is null', () => {
      const date = new Date('2024-01-15')

      expect(engine.isInRange(date, null, new Date())).toBe(false)
      expect(engine.isInRange(date, new Date(), null)).toBe(false)
    })
  })

  describe('isRangeStart', () => {
    it('should detect range start', () => {
      const start = new Date('2024-01-15')

      expect(engine.isRangeStart(start, start)).toBe(true)
    })

    it('should return false for different dates', () => {
      const start = new Date('2024-01-15')
      const other = new Date('2024-01-20')

      expect(engine.isRangeStart(other, start)).toBe(false)
    })
  })

  describe('isRangeEnd', () => {
    it('should detect range end', () => {
      const end = new Date('2024-01-20')

      expect(engine.isRangeEnd(end, end)).toBe(true)
    })

    it('should return false for different dates', () => {
      const end = new Date('2024-01-20')
      const other = new Date('2024-01-15')

      expect(engine.isRangeEnd(other, end)).toBe(false)
    })
  })

  describe('getRangeDates', () => {
    it('should return all dates in range', () => {
      const start = new Date('2024-01-15')
      const end = new Date('2024-01-18')

      const dates = engine.getRangeDates(start, end)

      expect(dates.length).toBe(4) // 15, 16, 17, 18
      expect(dates[0].getDate()).toBe(15)
      expect(dates[3].getDate()).toBe(18)
    })

    it('should handle same day range', () => {
      const date = new Date('2024-01-15')

      const dates = engine.getRangeDates(date, date)

      expect(dates.length).toBe(1)
    })
  })

  describe('getRangeDuration', () => {
    it('should calculate range duration', () => {
      const start = new Date('2024-01-15')
      const end = new Date('2024-01-20')

      const duration = engine.getRangeDuration(start, end)

      expect(duration).toBe(6) // Includes both start and end
    })

    it('should return 1 for same day', () => {
      const date = new Date('2024-01-15')

      const duration = engine.getRangeDuration(date, date)

      expect(duration).toBe(1)
    })

    it('should handle reversed dates', () => {
      const start = new Date('2024-01-20')
      const end = new Date('2024-01-15')

      const duration = engine.getRangeDuration(start, end)

      expect(duration).toBe(6)
    })
  })
})
