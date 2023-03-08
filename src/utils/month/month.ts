import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import LocalizedFormat from 'dayjs/plugin/LocalizedFormat'
import { getDayOfMonth } from '../dateTimeFormat/dateTimeFormat'
import formatDate from '../format'
import type { DaysInMonth, GetDaysTypes } from './month.types'
import localeCache from '../locale'

dayjs.extend(weekday)
dayjs.extend(LocalizedFormat)

const getDays = ({
  date = new Date()
}: GetDaysTypes): DaysInMonth => {
  const { locale } = localeCache
  dayjs.locale(locale)
  const firstDayOfMonth = dayjs(new Date(date)).subtract(getDayOfMonth(new Date(date)) - 1, 'days')
  const dayNumberOfWeek = firstDayOfMonth.day()
  const firstDayOfWeek = dayjs(firstDayOfMonth).subtract(dayNumberOfWeek, 'days')

  const weeks = []
  let initialDate = dayjs(firstDayOfWeek.format())
  for (let i = 0; i <= 5; i++) {
    const day = []
    for (let j = 0; j < 7; j++) {
      day.push(new Date(initialDate.format()))
      initialDate = initialDate.add(1, 'day')
    }
    weeks.push(day)
  }

  return {
    id: Date.now(),
    monthName: formatDate(new Date(date), 'MMMM YYYY'),
    firstDayOfMonth: firstDayOfMonth.toDate(),
    weeks
  }
}

export default getDays
