import { describe, it, expect, beforeEach } from 'vitest'

import localeCache from '../locale'

import {
  getDateFormat,
  getDayOfMonth,
  getDayString,
  getYear,
  getYear2Digit,
  getMonthName,
  getMonth
} from './dateTimeFormat'

describe('dateTimeFormat', () => {
  beforeEach(() => {
    localeCache.setLocale('en')
  })

  describe('getDateFormat', () => {
    it('should format date with given options', () => {
      const date = new Date('2024-01-15')
      const result = getDateFormat(date, { year: 'numeric' })

      expect(result).toContain('2024')
    })

    it('should use locale from localeCache', () => {
      const date = new Date('2024-01-15')

      localeCache.setLocale('en')
      const resultEn = getDateFormat(date, { month: 'long' })

      expect(resultEn).toBeTruthy()
    })

    it('should accept custom numbering system', () => {
      const date = new Date('2024-01-15')
      const result = getDateFormat(date, { year: 'numeric' }, 'latn')

      expect(result).toContain('2024')
    })

    it('should format with multiple options', () => {
      const date = new Date('2024-01-15')
      const result = getDateFormat(date, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })

      expect(result).toBeTruthy()
    })
  })

  describe('getDayOfMonth', () => {
    it('should return day as number', () => {
      const date = new Date('2024-01-15')
      const result = getDayOfMonth(date)

      expect(result).toBe(15)
      expect(typeof result).toBe('number')
    })

    it('should return single digit day correctly', () => {
      const date = new Date('2024-01-05')
      const result = getDayOfMonth(date)

      expect(result).toBe(5)
    })

    it('should return last day of month correctly', () => {
      const date = new Date('2024-01-31')
      const result = getDayOfMonth(date)

      expect(result).toBe(31)
    })

    it('should return first day of month correctly', () => {
      const date = new Date('2024-01-01')
      const result = getDayOfMonth(date)

      expect(result).toBe(1)
    })
  })

  describe('getDayString', () => {
    it('should return day as string', () => {
      const date = new Date('2024-01-15')
      const result = getDayString(date)

      expect(typeof result).toBe('string')
      expect(result).toContain('15')
    })

    it('should accept custom numbering system', () => {
      const date = new Date('2024-01-15')
      const result = getDayString(date, 'latn')

      expect(result).toContain('15')
    })

    it('should format single digit days', () => {
      const date = new Date('2024-01-05')
      const result = getDayString(date, 'latn')

      expect(result).toContain('5')
    })
  })

  describe('getYear', () => {
    it('should return year as string', () => {
      const date = new Date('2024-01-15')
      const result = getYear(date)

      expect(typeof result).toBe('string')
      expect(result).toContain('2024')
    })

    it('should accept custom numbering system', () => {
      const date = new Date('2024-01-15')
      const result = getYear(date, 'latn')

      expect(result).toContain('2024')
    })

    it('should handle different years', () => {
      const date1 = new Date('2023-01-15')
      const date2 = new Date('2025-01-15')

      expect(getYear(date1, 'latn')).toContain('2023')
      expect(getYear(date2, 'latn')).toContain('2025')
    })
  })

  describe('getYear2Digit', () => {
    it('should return 2-digit year', () => {
      const date = new Date('2024-01-15')
      const result = getYear2Digit(date, 'latn')

      expect(typeof result).toBe('string')
      expect(result).toContain('24')
    })

    it('should handle different years', () => {
      const date1 = new Date('2023-01-15')
      const date2 = new Date('2025-01-15')

      expect(getYear2Digit(date1, 'latn')).toContain('23')
      expect(getYear2Digit(date2, 'latn')).toContain('25')
    })

    it('should accept custom numbering system', () => {
      const date = new Date('2024-01-15')
      const result = getYear2Digit(date, 'latn')

      expect(result.length).toBeLessThanOrEqual(2)
    })
  })

  describe('getMonthName', () => {
    it('should return month name', () => {
      const date = new Date('2024-01-15')
      const result = getMonthName(date)

      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })

    it('should accept custom numbering system', () => {
      const date = new Date('2024-01-15')
      const result = getMonthName(date, 'latn')

      expect(typeof result).toBe('string')
    })

    it('should return different names for different months', () => {
      const date1 = new Date('2024-01-15')
      const date2 = new Date('2024-02-15')

      const name1 = getMonthName(date1)
      const name2 = getMonthName(date2)

      expect(name1).not.toBe(name2)
    })
  })

  describe('getMonth', () => {
    it('should return month as 2-digit string', () => {
      const date = new Date('2024-01-15')
      const result = getMonth(date)

      expect(typeof result).toBe('string')
      expect(result).toContain('01')
    })

    it('should accept custom numbering system', () => {
      const date = new Date('2024-01-15')
      const result = getMonth(date, 'latn')

      expect(result).toContain('01')
    })

    it('should handle different months', () => {
      const date1 = new Date('2024-01-15')
      const date2 = new Date('2024-12-15')

      expect(getMonth(date1, 'latn')).toContain('01')
      expect(getMonth(date2, 'latn')).toContain('12')
    })

    it('should return double-digit for all months', () => {
      const date = new Date('2024-05-15')
      const result = getMonth(date, 'latn')

      expect(result).toContain('05')
    })
  })

  describe('default export', () => {
    it('should export getDayOfMonth', async () => {
      const defaultExport = await import('./dateTimeFormat')

      expect(defaultExport.default.getDayOfMonth).toBeDefined()
    })

    it('should export getMonth', async () => {
      const defaultExport = await import('./dateTimeFormat')

      expect(defaultExport.default.getMonth).toBeDefined()
    })

    it('should export getMonthName', async () => {
      const defaultExport = await import('./dateTimeFormat')

      expect(defaultExport.default.getMonthName).toBeDefined()
    })
  })
})
