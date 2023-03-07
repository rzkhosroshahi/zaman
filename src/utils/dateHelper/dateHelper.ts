import { getMonth } from '../dateTimeFormat/dateTimeFormat'
import formatDate from '../format'

export const sameMonth = (date: Date, date2: Date, locale = 'fa-ir') => {
  return getMonth(date, locale) === getMonth(date2, locale)
}

export const sameDay = (date: Date, date2: Date) => {
  return formatDate(date, 'YYYY MMMM DD') === formatDate(date2, 'YYYY MMMM DD')
}
export default {
  sameMonth,
  sameDay
}
