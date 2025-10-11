import { describe, it, expect } from 'vitest'

import { createDateEngine } from './date-engine'

describe('DateEngine', () => {
  const engine = createDateEngine()

  describe('parse', () => {
    it('should parse Date object', () => {
      const input = new Date('2024-01-15')
      const result = engine.parse(input)

      expect(result).toBeInstanceOf(Date)
      expect(result.getFullYear()).toBe(2024)
    })

    it('should parse timestamp', () => {
      const timestamp = new Date('2024-01-15').getTime()
      const result = engine.parse(timestamp)

      expect(result).toBeInstanceOf(Date)
    })

    it('should parse string', () => {
      const result = engine.parse('2024-01-15')

      expect(result).toBeInstanceOf(Date)
    })
  })

  describe('format', () => {
    it('should format date with given format', () => {
      const date = new Date('2024-01-15')
      const result = engine.format(date, 'YYYY-MM-DD', 'en')

      expect(result).toBe('2024-01-15')
    })

    it('should format date with different locale', () => {
      const date = new Date('2024-01-15')
      const result = engine.format(date, 'YYYY/MM/DD', 'fa')

      expect(result).toContain('/')
    })
  })

  describe('compare', () => {
    it('should detect date is before another', () => {
      const date1 = new Date('2024-01-15')
      const date2 = new Date('2024-01-20')
      const result = engine.compare(date1, date2)

      expect(result.isBefore).toBe(true)
      expect(result.isAfter).toBe(false)
    })

    it('should detect date is after another', () => {
      const date1 = new Date('2024-01-20')
      const date2 = new Date('2024-01-15')
      const result = engine.compare(date1, date2)

      expect(result.isAfter).toBe(true)
      expect(result.isBefore).toBe(false)
    })

    it('should detect same dates', () => {
      const date1 = new Date('2024-01-15')
      const date2 = new Date('2024-01-15')
      const result = engine.compare(date1, date2)

      expect(result.isSame).toBe(true)
    })

    it('should calculate difference', () => {
      const date1 = new Date('2024-01-20')
      const date2 = new Date('2024-01-15')
      const result = engine.compare(date1, date2, 'day')

      expect(result.difference).toBe(5)
    })
  })

  describe('isSameDay', () => {
    it('should return true for same day', () => {
      const date1 = new Date('2024-01-15T10:00:00')
      const date2 = new Date('2024-01-15T15:00:00')

      expect(engine.isSameDay(date1, date2)).toBe(true)
    })

    it('should return false for different days', () => {
      const date1 = new Date('2024-01-15')
      const date2 = new Date('2024-01-16')

      expect(engine.isSameDay(date1, date2)).toBe(false)
    })
  })

  describe('isSameMonth', () => {
    it('should return true for same month', () => {
      const date1 = new Date('2024-01-15')
      const date2 = new Date('2024-01-20')

      expect(engine.isSameMonth(date1, date2)).toBe(true)
    })

    it('should return false for different months', () => {
      const date1 = new Date('2024-01-15')
      const date2 = new Date('2024-02-15')

      expect(engine.isSameMonth(date1, date2)).toBe(false)
    })
  })

  describe('addDays', () => {
    it('should add days correctly', () => {
      const date = new Date('2024-01-15')
      const result = engine.addDays(date, 5)

      expect(result.getDate()).toBe(20)
    })

    it('should handle month overflow', () => {
      const date = new Date('2024-01-30')
      const result = engine.addDays(date, 5)

      expect(result.getMonth()).toBe(1) // February
      expect(result.getDate()).toBe(4)
    })
  })

  describe('addMonths', () => {
    it('should add months correctly', () => {
      const date = new Date('2024-01-15')
      const result = engine.addMonths(date, 2)

      expect(result.getMonth()).toBe(2) // March
    })

    it('should handle year overflow', () => {
      const date = new Date('2024-11-15')
      const result = engine.addMonths(date, 3)

      expect(result.getFullYear()).toBe(2025)
      expect(result.getMonth()).toBe(1) // February
    })
  })

  describe('getDaysInMonth', () => {
    it('should return correct days for January', () => {
      const date = new Date('2024-01-15')

      expect(engine.getDaysInMonth(date)).toBe(31)
    })

    it('should return correct days for February (leap year)', () => {
      const date = new Date('2024-02-15')

      expect(engine.getDaysInMonth(date)).toBe(29)
    })

    it('should return correct days for February (non-leap year)', () => {
      const date = new Date('2023-02-15')

      expect(engine.getDaysInMonth(date)).toBe(28)
    })
  })

  describe('startOfMonth', () => {
    it('should return first day of month', () => {
      const date = new Date('2024-01-15')
      const result = engine.startOfMonth(date)

      expect(result.getDate()).toBe(1)
      expect(result.getHours()).toBe(0)
      expect(result.getMinutes()).toBe(0)
    })
  })

  describe('endOfMonth', () => {
    it('should return last day of month', () => {
      const date = new Date('2024-01-15')
      const result = engine.endOfMonth(date)

      expect(result.getDate()).toBe(31)
    })
  })
})
