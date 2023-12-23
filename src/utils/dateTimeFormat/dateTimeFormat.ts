import localeCache from '../locale'

export const getDateFormat = (
  date: Date,
  options: Intl.DateTimeFormatOptions,
  numberingSystem?: string
) => {
  const { locale } = localeCache
  const defaultOptions = {
    ...options,
    ...(numberingSystem != null && { numberingSystem })
  }
  const intl = new Date(date).toLocaleString(locale, defaultOptions)
  return intl
}

export const getDayOfMonth = (date: Date): number => {
  return parseInt(getDateFormat(date, { day: 'numeric' }, 'latn'), 10)
}

export const getDayString = (date: Date, numberingSystem?: string): string => {
  return getDateFormat(date, { day: 'numeric' }, numberingSystem)
}
export const getYear = (date: Date, numberingSystem?: string): string => {
  return getDateFormat(date, { year: 'numeric' }, numberingSystem)
}
export const getYear2Digit = (date: Date, numberingSystem?: string): string => {
  return getDateFormat(date, { year: '2-digit' }, numberingSystem)
}

export const getMonthName = (date: Date, numberingSystem?: string): string => {
  return getDateFormat(date, { month: 'short' }, numberingSystem)
}

export const getMonth = (date: Date, numberingSystem?: string): string => {
  return getDateFormat(date, { month: '2-digit' }, numberingSystem)
}

export default {
  getDayOfMonth,
  getMonth,
  getMonthName
}
