import { describe, it, expect } from 'vitest'

import {
  sameMonth,
  sameDay,
  getYears,
  selectMonth,
  selectYear,
  isInBetween
} from './dateHelper'

describe('dateHelper', () => {
  describe('sameMonth', () => {
    it('should return true for dates in the same month', () => {
      const date1 = new Date('2024-01-15')
      const date2 = new Date('2024-01-20')

      expect(sameMonth(date1, date2)).toBe(true)
    })

    it('should return false for dates in different months', () => {
      const date1 = new Date('2024-01-15')
      const date2 = new Date('2024-02-15')

      expect(sameMonth(date1, date2)).toBe(false)
    })

    it('should return true for dates in same month and year', () => {
      const date1 = new Date('2024-01-15')
      const date2 = new Date('2024-01-20')

      expect(sameMonth(date1, date2)).toBe(true)
    })
  })

  describe('sameDay', () => {
    it('should return true for the same date', () => {
      const date1 = new Date('2024-01-15T10:00:00')
      const date2 = new Date('2024-01-15T15:00:00')

      expect(sameDay(date1, date2)).toBe(true)
    })

    it('should return false for different dates', () => {
      const date1 = new Date('2024-01-15')
      const date2 = new Date('2024-01-16')

      expect(sameDay(date1, date2)).toBe(false)
    })

    it('should return false when first date is undefined', () => {
      const date2 = new Date('2024-01-15')

      expect(sameDay(undefined, date2)).toBe(false)
    })

    it('should return false when second date is undefined', () => {
      const date1 = new Date('2024-01-15')

      expect(sameDay(date1, undefined)).toBe(false)
    })
  })

  describe('getYears', () => {
    it('should return array of years with default range', () => {
      const date = new Date('2024-01-15')
      const years = getYears(date)

      expect(years).toContain(1944) // 2024 - 80
      expect(years).toContain(2024)
      expect(years).toContain(2074) // 2024 + 50
      expect(years.length).toBe(131) // 80 + 50 + 1
    })

    it('should return array of years with custom range', () => {
      const date = new Date('2024-01-15')
      const years = getYears(date, 10, 10)

      expect(years).toContain(2014) // 2024 - 10
      expect(years).toContain(2024)
      expect(years).toContain(2034) // 2024 + 10
      expect(years.length).toBe(21) // 10 + 10 + 1
    })

    it('should return sorted array of years', () => {
      const date = new Date('2024-01-15')
      const years = getYears(date, 5, 5)

      for (let i = 0; i < years.length - 1; i++) {
        expect(years[i]).toBeLessThan(years[i + 1])
      }
    })
  })

  describe('selectMonth', () => {
    it('should add months when selected month is later', () => {
      const date = new Date('2024-01-15')
      const result = selectMonth(date, 3) // March

      expect(result.getMonth()).toBe(2) // March is index 2
    })

    it('should subtract months when selected month is earlier', () => {
      const date = new Date('2024-05-15')
      const result = selectMonth(date, 2) // February

      expect(result.getMonth()).toBe(1) // February is index 1
    })

    it('should handle same month', () => {
      const date = new Date('2024-05-15')
      const result = selectMonth(date, 5) // May

      expect(result.getMonth()).toBe(4) // May is index 4
      expect(result.getDate()).toBe(15)
    })

    it('should handle year overflow', () => {
      const date = new Date('2024-11-15')
      const result = selectMonth(date, 13) // Next year January

      expect(result.getFullYear()).toBe(2025)
    })
  })

  describe('selectYear', () => {
    it('should add years when selected year is later', () => {
      const date = new Date('2024-01-15')
      const result = selectYear(date, 2026)

      expect(result.getFullYear()).toBe(2026)
      expect(result.getMonth()).toBe(0) // January
    })

    it('should subtract years when selected year is earlier', () => {
      const date = new Date('2024-01-15')
      const result = selectYear(date, 2020)

      expect(result.getFullYear()).toBe(2020)
      expect(result.getMonth()).toBe(0) // January
    })

    it('should handle same year', () => {
      const date = new Date('2024-01-15')
      const result = selectYear(date, 2024)

      expect(result.getFullYear()).toBe(2024)
      expect(result.getMonth()).toBe(0) // January
    })
  })

  describe('isInBetween', () => {
    it('should return true for date between from and to', () => {
      const day = new Date('2024-01-15')
      const from = new Date('2024-01-10')
      const to = new Date('2024-01-20')

      expect(isInBetween(day, from, to)).toBe(true)
    })

    it('should return false for date before range', () => {
      const day = new Date('2024-01-05')
      const from = new Date('2024-01-10')
      const to = new Date('2024-01-20')

      expect(isInBetween(day, from, to)).toBe(false)
    })

    it('should return false for date after range', () => {
      const day = new Date('2024-01-25')
      const from = new Date('2024-01-10')
      const to = new Date('2024-01-20')

      expect(isInBetween(day, from, to)).toBe(false)
    })

    it('should return false when from is null', () => {
      const day = new Date('2024-01-15')
      const to = new Date('2024-01-20')

      expect(isInBetween(day, null, to)).toBe(false)
    })

    it('should return false when to is null', () => {
      const day = new Date('2024-01-15')
      const from = new Date('2024-01-10')

      expect(isInBetween(day, from, null)).toBe(false)
    })

    it('should return false when both from and to are null', () => {
      const day = new Date('2024-01-15')

      expect(isInBetween(day, null, null)).toBe(false)
    })

    it('should return false when from and to are undefined', () => {
      const day = new Date('2024-01-15')

      expect(isInBetween(day, undefined, undefined)).toBe(false)
    })
  })
})
