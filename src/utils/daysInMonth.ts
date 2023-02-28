import type { Moment } from 'jalali-moment'
import moment from 'jalali-moment'
import { faNumber } from './index'
import type { IDays } from '../types'

export interface IDaysInMonth {
  id: number
  days: IDays[]
  monthName: string
  month: number
  today?: string
}

const checkDateMonth = (date: moment.Moment, current: moment.Moment) => current.jMonth() < date.jMonth()
const checkCurrentMonth = (date: Moment) =>
  moment().format('jYYYY/jMM') === date.format('jYYYY/jMM')

export const daysInMonth = (date: Moment, locale: string = 'fa'): IDaysInMonth => {
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
  const lastDayOfWeek = date.clone().endOf('jMonth')
  const today = checkCurrentMonth(date) ? { today: date.format('jDD') } : null

  firstDayOfWeek.subtract((firstDayOfWeek.day() + 1) % 7, 'days')

  while (firstDayOfWeek.isBefore(lastDayOfWeek)) {
    days.push({
      day: firstDayOfWeek.clone().format('jDD'),
      utc: new Date(firstDayOfWeek.clone().format('YYYY/M/DD')).toUTCString(),
      faDate: firstDayOfWeek.clone().format('jYYYY/jMM/jDD'),
      disable: checkDateMonth(date, firstDayOfWeek)
    })
    firstDayOfWeek.add(1, 'days')
  }

  return { id: Date.now(), monthName, month, days, ...today }
}

export default {
  daysInMonth
}
