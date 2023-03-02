import type { Moment } from 'jalali-moment'
import moment from 'jalali-moment'
import { faNumber } from './index'
import type { IDays, DatePickerValue, Locales } from '../types'

export interface IDaysInMonth {
  id: number
  days: IDays[]
  monthName: string
  month: number
  today?: string
}

const momentFormats: Record<keyof typeof Locales, string> = {
  fa: 'jYYYY/jMM/jDD',
  en: 'YYYY/MM/DD'
}

export const getMomentFormatted = (date: DatePickerValue, locale: keyof typeof Locales = 'fa') => {
  const format = momentFormats[locale]
  return moment(date).format(format)
}

const checkDateMonth = (date: moment.Moment, current: moment.Moment) => current.jMonth() !== date.jMonth()
const checkCurrentMonth = (date: Moment) =>
  moment().format('jYYYY/jMM') === date.format('jYYYY/jMM')

export const daysInMonth = (value: DatePickerValue, locale: string = 'fa'): IDaysInMonth => {
  const date = moment(value)
  const days: IDays[] = []
  const clonedDate = date.clone()
  const monthName = `${clonedDate.locale(locale).format('jMMMM')} ${faNumber(
    clonedDate.format('jYYYY')
  )}`

  const month = Number(
    date
      .clone()
      .locale(locale)
      .format('jM')
  )

  const firstDayOfWeek = date.clone().startOf('jMonth')
  const lastDayOfWeek = date.clone().add(3, 'week').endOf('jMonth')
  const today = checkCurrentMonth(date) ? { today: date.format('jDD') } : null

  firstDayOfWeek.subtract((firstDayOfWeek.day() + 1) % 7, 'days')

  while (firstDayOfWeek.isBefore(lastDayOfWeek)) {
    days.push({
      day: firstDayOfWeek.clone().format('jDD'),
      utc: new Date(firstDayOfWeek.clone().format('YYYY/M/DD')).toUTCString(),
      faDate: getMomentFormatted(firstDayOfWeek.clone()),
      disable: checkDateMonth(date, firstDayOfWeek)
    })
    firstDayOfWeek.add(1, 'days')
  }

  return { id: Date.now(), monthName, month, days, ...today }
}

export default {
  daysInMonth
}
