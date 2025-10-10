import { describe, it, expect, beforeEach } from 'vitest'

import localeCache from '../locale'

import getDays from './month'

describe('getDays (month utility)', () => {
  beforeEach(() => {
    localeCache.setLocale('en')
  })

  it('should generate days for a given date', () => {
    const date = new Date('2024-01-15')
    const result = getDays(date)

    expect(result).toBeDefined()
    expect(result.weeks).toBeDefined()
    expect(result.monthName).toBeDefined()
    expect(result.middleOfMonth).toBeDefined()
    expect(result.id).toBeDefined()
  })

  it('should generate 6 weeks of days', () => {
    const date = new Date('2024-01-15')
    const result = getDays(date)

    expect(result.weeks).toHaveLength(6)
  })

  it('should have 7 days per week', () => {
    const date = new Date('2024-01-15')
    const result = getDays(date)

    result.weeks.forEach((week) => {
      expect(week).toHaveLength(7)
    })
  })

  it('should use current date when date is undefined', () => {
    const result = getDays(undefined)

    expect(result).toBeDefined()
    expect(result.weeks).toBeDefined()
    expect(result.weeks).toHaveLength(6)
  })

  it('should have unique id', () => {
    const date = new Date('2024-01-15')
    const result1 = getDays(date)
    const result2 = getDays(date)

    expect(result1.id).not.toBe(result2.id)
  })

  it('should have monthName property', () => {
    const date = new Date('2024-01-15')
    const result = getDays(date)

    expect(result.monthName).toBeTruthy()
    expect(typeof result.monthName).toBe('string')
  })

  it('should have middleOfMonth as Date', () => {
    const date = new Date('2024-01-15')
    const result = getDays(date)

    expect(result.middleOfMonth).toBeInstanceOf(Date)
  })

  it('should mark days outside current month as disabled', () => {
    const date = new Date('2024-01-15')
    const result = getDays(date)

    let hasDisabled = false

    result.weeks.forEach((week) => {
      week.forEach((day) => {
        if (day.disabled) {
          hasDisabled = true
        }
      })
    })

    // Should have some disabled days (from previous/next month)
    expect(hasDisabled).toBe(true)
  })

  it('should mark days in current month as enabled', () => {
    const date = new Date('2024-01-15')
    const result = getDays(date)

    let hasEnabled = false

    result.weeks.forEach((week) => {
      week.forEach((day) => {
        if (!day.disabled) {
          hasEnabled = true
        }
      })
    })

    expect(hasEnabled).toBe(true)
  })

  it('should have date property for each day', () => {
    const date = new Date('2024-01-15')
    const result = getDays(date)

    result.weeks.forEach((week) => {
      week.forEach((day) => {
        expect(day.date).toBeInstanceOf(Date)
      })
    })
  })

  it('should generate consecutive dates', () => {
    const date = new Date('2024-01-15')
    const result = getDays(date)

    let prevDate: Date | null = null

    result.weeks.forEach((week) => {
      week.forEach((day) => {
        if (prevDate !== null) {
          const diff = day.date.getTime() - prevDate.getTime()
          const oneDayMs = 24 * 60 * 60 * 1000

          expect(diff).toBe(oneDayMs)
        }
        prevDate = day.date
      })
    })
  })

  it('should work with different months', () => {
    const date1 = new Date('2024-01-15')
    const date2 = new Date('2024-02-15')

    const result1 = getDays(date1)
    const result2 = getDays(date2)

    expect(result1.monthName).not.toBe(result2.monthName)
  })

  it('should work with different years', () => {
    const date1 = new Date('2024-01-15')
    const date2 = new Date('2023-01-15')

    const result1 = getDays(date1)
    const result2 = getDays(date2)

    expect(result1.monthName).not.toBe(result2.monthName)
  })

  it('should use locale from localeCache', () => {
    localeCache.setLocale('en')
    const dateEn = new Date('2024-01-15')
    const resultEn = getDays(dateEn)

    expect(resultEn.monthName).toBeTruthy()

    localeCache.setLocale('fa')
    const dateFa = new Date('2024-01-15')
    const resultFa = getDays(dateFa)

    expect(resultFa.monthName).toBeTruthy()
  })

  it('should handle edge case: first day of month', () => {
    const date = new Date('2024-01-01')
    const result = getDays(date)

    expect(result.weeks).toHaveLength(6)
  })

  it('should handle edge case: last day of month', () => {
    const date = new Date('2024-01-31')
    const result = getDays(date)

    expect(result.weeks).toHaveLength(6)
  })

  it('should handle leap year February', () => {
    const date = new Date('2024-02-15') // 2024 is a leap year
    const result = getDays(date)

    expect(result.weeks).toHaveLength(6)
  })

  it('should handle non-leap year February', () => {
    const date = new Date('2023-02-15') // 2023 is not a leap year
    const result = getDays(date)

    expect(result.weeks).toHaveLength(6)
  })
})
