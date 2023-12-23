import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { getMonth, getYear } from '../dateTimeFormat/dateTimeFormat'
dayjs.extend(isBetween)

export const sameMonth = (date: Date, date2: Date) => {
  return getMonth(date) === getMonth(date2)
}

export const sameDay = (date?: Date, date2?: Date): boolean => {
  if (date === undefined) {
    return false
  }
  return dayjs(date).isSame(date2, 'day')
}

export const getYears = (date: Date, from: number = 80, to: number = 50) => {
  const getCurrentYear = parseInt(getYear(date, 'latn'), 10)
  const startFrom = getCurrentYear - from
  const till = getCurrentYear + to
  const result: number[] = []

  for (let i = startFrom; i <= till; i++) {
    result.push(i)
  }
  return result
}

export const selectMonth = (date: Date, selectedMonth: number) => {
  const currentMonth = parseInt(getMonth(date, 'latn'), 10)
  const diffMonth = selectedMonth - currentMonth

  if (diffMonth > 0) {
    return dayjs(date).add(diffMonth, 'months').toDate()
  }
  return dayjs(date).subtract(Math.abs(diffMonth), 'months').toDate()
}

export const selectYear = (date: Date, selectedYear: number) => {
  const currentYear = parseInt(getYear(date, 'latn'), 10)
  const diffYear = selectedYear - currentYear

  if (diffYear > 0) {
    return dayjs(date).add(diffYear, 'years').toDate()
  }
  return dayjs(date).subtract(Math.abs(diffYear), 'years').toDate()
}

export const isInBetween = (
  day: Date,
  from?: Date | null,
  to?: Date | null
): boolean => {
  if (from !== null && to !== null) {
    return dayjs(day).isBetween(dayjs(from), dayjs(to))
  }
  return false
}

export default {
  sameMonth,
  sameDay,
  getYears,
  selectMonth,
  selectYear,
  isInBetween
}
