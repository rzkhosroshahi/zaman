import { createDateEngine } from '../date-engine'

import type {
  CalendarEngine,
  CalendarEngineConfig,
  DayInfo,
  MonthWeeks,
  CalendarState,
  MonthInfo
} from './calendar-engine.types'

export function createCalendarEngine(
  config: CalendarEngineConfig = {}
): CalendarEngine {
  const { weekends = [6], minDate, maxDate } = config

  const dateEngine = createDateEngine()

  return {
    getMonthDays(date: Date): MonthWeeks {
      const startOfMonth = dateEngine.startOfMonth(date)
      const endOfMonth = dateEngine.endOfMonth(date)
      const startDate = dateEngine.startOfWeek(startOfMonth)
      const endDate = dateEngine.endOfWeek(endOfMonth)

      const weeks: MonthWeeks = []
      let currentWeek: DayInfo[] = []
      let currentDate = startDate

      const today = new Date()
      const currentMonth = startOfMonth.getMonth()

      while (currentDate <= endDate) {
        const dayInfo: DayInfo = {
          date: new Date(currentDate),
          day: currentDate.getDate(),
          month: currentDate.getMonth(),
          year: currentDate.getFullYear(),
          isCurrentMonth: currentDate.getMonth() === currentMonth,
          isToday: dateEngine.isSameDay(currentDate, today),
          isWeekend: weekends.includes(dateEngine.getWeekDay(currentDate)),
          isDisabled: this.isDisabled(currentDate),
          isSelected: false
        }

        currentWeek.push(dayInfo)

        if (currentWeek.length === 7) {
          weeks.push(currentWeek)
          currentWeek = []
        }

        currentDate = dateEngine.addDays(currentDate, 1)
      }

      if (currentWeek.length > 0) {
        weeks.push(currentWeek)
      }

      return weeks
    },

    getMonthInfo(date: Date): MonthInfo {
      const weeks = this.getMonthDays(date)
      const firstDay = dateEngine.startOfMonth(date)
      const lastDay = dateEngine.endOfMonth(date)

      return {
        month: date.getMonth(),
        year: date.getFullYear(),
        name: dateEngine.format(date, 'MMMM YYYY', config.locale ?? 'en'),
        weeks,
        firstDay,
        lastDay
      }
    },

    navigateMonth(date: Date, direction: 'next' | 'prev'): Date {
      if (direction === 'next') {
        return dateEngine.addMonths(date, 1)
      }

      return dateEngine.subtractMonths(date, 1)
    },

    navigateYear(date: Date, direction: 'next' | 'prev'): Date {
      if (direction === 'next') {
        return dateEngine.addYears(date, 1)
      }

      return dateEngine.subtractYears(date, 1)
    },

    selectDate(state: CalendarState, date: Date): CalendarState {
      return {
        ...state,
        selectedDate: date,
        currentDate: date
      }
    },

    isWeekend(date: Date): boolean {
      return weekends.includes(dateEngine.getWeekDay(date))
    },

    isDisabled(date: Date): boolean {
      if (minDate && dateEngine.compare(date, minDate, 'day').isBefore) {
        return true
      }
      if (maxDate && dateEngine.compare(date, maxDate, 'day').isAfter) {
        return true
      }

      return false
    },

    isToday(date: Date): boolean {
      return dateEngine.isSameDay(date, new Date())
    },

    getYearRange(date: Date, from = 80, to = 50): number[] {
      const currentYear = date.getFullYear()
      const startYear = currentYear - from
      const endYear = currentYear + to
      const years: number[] = []

      for (let year = startYear; year <= endYear; year++) {
        years.push(year)
      }

      return years
    },

    getMonthsInYear(): number[] {
      return Array.from({ length: 12 }, (_, i) => i)
    }
  }
}
