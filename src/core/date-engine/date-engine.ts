import dayjs, { type Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import weekday from 'dayjs/plugin/weekday'

import type { DateEngine, DateInput, DateComparison } from './date-engine.types'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(weekday)
dayjs.extend(customParseFormat)

export function createDateEngine(): DateEngine {
  const normalizeDate = (input: DateInput): Dayjs => {
    if (input instanceof Date) {
      return dayjs(input)
    }
    if (typeof input === 'number') {
      return dayjs(input)
    }

    return dayjs(input)
  }

  return {
    parse(input: DateInput): Date {
      return normalizeDate(input).toDate()
    },

    format(date: Date, format: string, locale: string): string {
      return dayjs(date).locale(locale).format(format)
    },

    compare(date1: Date, date2: Date, unit = 'day' as const): DateComparison {
      const d1 = dayjs(date1)
      const d2 = dayjs(date2)

      return {
        isBefore: d1.isBefore(d2, unit),
        isAfter: d1.isAfter(d2, unit),
        isSame: d1.isSame(d2, unit),
        difference: d1.diff(d2, unit)
      }
    },

    isSameDay(date1: Date, date2: Date): boolean {
      return dayjs(date1).isSame(date2, 'day')
    },

    isSameMonth(date1: Date, date2: Date): boolean {
      return dayjs(date1).isSame(date2, 'month')
    },

    isSameYear(date1: Date, date2: Date): boolean {
      return dayjs(date1).isSame(date2, 'year')
    },

    addDays(date: Date, amount: number): Date {
      return dayjs(date).add(amount, 'days').toDate()
    },

    subtractDays(date: Date, amount: number): Date {
      return dayjs(date).subtract(amount, 'days').toDate()
    },

    addMonths(date: Date, amount: number): Date {
      return dayjs(date).add(amount, 'months').toDate()
    },

    subtractMonths(date: Date, amount: number): Date {
      return dayjs(date).subtract(amount, 'months').toDate()
    },

    addYears(date: Date, amount: number): Date {
      return dayjs(date).add(amount, 'years').toDate()
    },

    subtractYears(date: Date, amount: number): Date {
      return dayjs(date).subtract(amount, 'years').toDate()
    },

    startOfMonth(date: Date): Date {
      return dayjs(date).startOf('month').toDate()
    },

    endOfMonth(date: Date): Date {
      return dayjs(date).endOf('month').toDate()
    },

    startOfWeek(date: Date): Date {
      return dayjs(date).startOf('week').toDate()
    },

    endOfWeek(date: Date): Date {
      return dayjs(date).endOf('week').toDate()
    },

    getDaysInMonth(date: Date): number {
      return dayjs(date).daysInMonth()
    },

    getWeekDay(date: Date): number {
      return dayjs(date).day()
    },

    getYear(date: Date, numberingSystem = 'latn'): string {
      return dayjs(date).toDate().toLocaleDateString('en-US', {
        year: 'numeric',
        numberingSystem
      })
    },

    getMonth(date: Date, numberingSystem = 'latn'): string {
      return dayjs(date).toDate().toLocaleDateString('en-US', {
        month: '2-digit',
        numberingSystem
      })
    },

    getDay(date: Date, numberingSystem = 'latn'): string {
      return dayjs(date).toDate().toLocaleDateString('en-US', {
        day: '2-digit',
        numberingSystem
      })
    }
  }
}
