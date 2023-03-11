import dayjs from 'dayjs'
import { getMonth } from '../dateTimeFormat/dateTimeFormat'
import formatDate from '../format'

export const sameMonth = (date: Date, date2: Date) => {
  return getMonth(date) === getMonth(date2)
}

export const sameDay = (date: Date, date2: Date) => {
  return formatDate(date, 'YYYY MMMM DD') === formatDate(date2, 'YYYY MMMM DD')
}

export const selectMonth = (date: Date, selectedMonth: number) => {
  const getCurrentMonth = parseInt(getMonth(date, 'latn'), 10)
  const diffMonth = selectedMonth - getCurrentMonth

  if (diffMonth > 0) {
    return dayjs(date).add(diffMonth, 'months').toDate()
  }
  return dayjs(date).subtract(Math.abs(diffMonth), 'months').toDate()
}

export default {
  sameMonth,
  sameDay
}
