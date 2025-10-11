import { describe, it, expect } from 'vitest'

import { createCalendarEngine } from './calendar-engine'

describe('CalendarEngine', () => {
  const engine = createCalendarEngine()

  describe('getMonthDays', () => {
    it('should return array of weeks', () => {
      const date = new Date('2024-01-15')
      const weeks = engine.getMonthDays(date)

      expect(Array.isArray(weeks)).toBe(true)
      expect(weeks.length).toBeGreaterThan(0)
    })

    it('should return 7 days per week', () => {
      const date = new Date('2024-01-15')
      const weeks = engine.getMonthDays(date)

      weeks.forEach((week) => {
        expect(week.length).toBe(7)
      })
    })

    it('should mark current month days correctly', () => {
      const date = new Date('2024-01-15')
      const weeks = engine.getMonthDays(date)

      const januaryDays = weeks.flat().filter((day) => day.isCurrentMonth)

      expect(januaryDays.length).toBe(31)
    })

    it('should mark today correctly', () => {
      const today = new Date()
      const weeks = engine.getMonthDays(today)

      const todayDay = weeks.flat().find((day) => day.isToday)

      expect(todayDay).toBeDefined()
      expect(todayDay?.day).toBe(today.getDate())
    })
  })

  describe('getMonthInfo', () => {
    it('should return complete month information', () => {
      const date = new Date('2024-01-15')
      const info = engine.getMonthInfo(date)

      expect(info.month).toBe(0) // January
      expect(info.year).toBe(2024)
      expect(info.weeks).toBeDefined()
      expect(info.firstDay.getDate()).toBe(1)
      expect(info.lastDay.getDate()).toBe(31)
    })
  })

  describe('navigateMonth', () => {
    it('should navigate to next month', () => {
      const date = new Date('2024-01-15')
      const next = engine.navigateMonth(date, 'next')

      expect(next.getMonth()).toBe(1) // February
      expect(next.getFullYear()).toBe(2024)
    })

    it('should navigate to previous month', () => {
      const date = new Date('2024-01-15')
      const prev = engine.navigateMonth(date, 'prev')

      expect(prev.getMonth()).toBe(11) // December
      expect(prev.getFullYear()).toBe(2023)
    })

    it('should handle year boundary when going next', () => {
      const date = new Date('2024-12-15')
      const next = engine.navigateMonth(date, 'next')

      expect(next.getMonth()).toBe(0) // January
      expect(next.getFullYear()).toBe(2025)
    })

    it('should handle year boundary when going prev', () => {
      const date = new Date('2024-01-15')
      const prev = engine.navigateMonth(date, 'prev')

      expect(prev.getMonth()).toBe(11) // December
      expect(prev.getFullYear()).toBe(2023)
    })
  })

  describe('navigateYear', () => {
    it('should navigate to next year', () => {
      const date = new Date('2024-01-15')
      const next = engine.navigateYear(date, 'next')

      expect(next.getFullYear()).toBe(2025)
    })

    it('should navigate to previous year', () => {
      const date = new Date('2024-01-15')
      const prev = engine.navigateYear(date, 'prev')

      expect(prev.getFullYear()).toBe(2023)
    })
  })

  describe('isWeekend', () => {
    it('should detect weekend days', () => {
      const saturday = new Date('2024-01-06') // Saturday

      expect(engine.isWeekend(saturday)).toBe(true)
    })

    it('should detect weekdays', () => {
      const monday = new Date('2024-01-08') // Monday

      expect(engine.isWeekend(monday)).toBe(false)
    })
  })

  describe('isDisabled', () => {
    it('should disable dates before minDate', () => {
      const engineWithMin = createCalendarEngine({
        minDate: new Date('2024-01-15')
      })

      const beforeMin = new Date('2024-01-10')

      expect(engineWithMin.isDisabled(beforeMin)).toBe(true)

      const afterMin = new Date('2024-01-20')

      expect(engineWithMin.isDisabled(afterMin)).toBe(false)
    })

    it('should disable dates after maxDate', () => {
      const engineWithMax = createCalendarEngine({
        maxDate: new Date('2024-01-15')
      })

      const afterMax = new Date('2024-01-20')

      expect(engineWithMax.isDisabled(afterMax)).toBe(true)

      const beforeMax = new Date('2024-01-10')

      expect(engineWithMax.isDisabled(beforeMax)).toBe(false)
    })
  })

  describe('getYearRange', () => {
    it('should return range of years', () => {
      const date = new Date('2024-01-15')
      const years = engine.getYearRange(date, 5, 5)

      expect(years.length).toBe(11) // 5 before + current + 5 after
      expect(years[0]).toBe(2019)
      expect(years[5]).toBe(2024)
      expect(years[10]).toBe(2029)
    })

    it('should use default range', () => {
      const date = new Date('2024-01-15')
      const years = engine.getYearRange(date)

      expect(years.length).toBe(131) // 80 before + current + 50 after
    })
  })

  describe('getMonthsInYear', () => {
    it('should return 12 months', () => {
      const months = engine.getMonthsInYear()

      expect(months.length).toBe(12)
      expect(months[0]).toBe(0)
      expect(months[11]).toBe(11)
    })
  })
})
