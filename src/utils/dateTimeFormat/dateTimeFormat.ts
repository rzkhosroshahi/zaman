import localeCache from '../locale'

export const getDateFormat = (date: Date, options: Intl.DateTimeFormatOptions) => {
  const { locale } = localeCache
  return new Intl.DateTimeFormat(locale, options).format(date)
}

export const getDayOfMonth = (date: Date): number => {
  return parseInt(getDateFormat(date, { day: 'numeric', numberingSystem: 'latn' }), 10)
}

export const getDayString = (date: Date): string => {
  return getDateFormat(date, { day: 'numeric' })
}
export const getYear = (date: Date): string => {
  return getDateFormat(date, { year: 'numeric' })
}
export const getYear2Digit = (date: Date): string => {
  return getDateFormat(date, { year: '2-digit' })
}

export const getMonthName = (date: Date): string => {
  return getDateFormat(date, { month: 'short' })
}

export const getMonth = (date: Date): string => {
  return getDateFormat(date, { month: '2-digit' })
}

export default {
  getDayOfMonth,
  getMonth,
  getMonthName
}
