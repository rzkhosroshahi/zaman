import dayjs from 'dayjs'
import 'dayjs/locale/fa'
import weekday from 'dayjs/plugin/weekday'
import LocalizedFormat from 'dayjs/plugin/LocalizedFormat'
import { getDayOfMonth } from '../dateTimeFormat/dateTimeFormat'
import { sameMonth } from '../dateHelper/dateHelper'
import formatDate from '../format'
import localeCache from '../locale'
import type { DaysInMonth } from './month.types'
import { type DatePickerValue } from '../../types'

dayjs.extend(weekday)
dayjs.extend(LocalizedFormat)

const getDays = (date: DatePickerValue | undefined): DaysInMonth => {
  const { locale } = localeCache
  dayjs.locale(locale)
  const startDate = date === undefined ? new Date() : dayjs(date).toDate()
  const selectedDayOnMonth = getDayOfMonth(new Date(startDate))
  const firstDayOfMonth = dayjs(new Date(startDate)).subtract(
    selectedDayOnMonth - 1,
    'days'
  )
  const dayNumberOfWeek = firstDayOfMonth.weekday()
  const firstDayOfWeek = dayjs(firstDayOfMonth).subtract(
    dayNumberOfWeek,
    'days'
  )
  const middleOfMonth = firstDayOfMonth.add(15, 'days')

  const weeks = []
  let initialDate = dayjs(firstDayOfWeek.format())
  for (let i = 0; i <= 5; i++) {
    const day = []
    for (let j = 0; j < 7; j++) {
      const currentDay = new Date(initialDate.format())
      day.push({
        date: currentDay,
        disabled: !sameMonth(firstDayOfMonth.toDate(), currentDay)
      })
      initialDate = initialDate.add(1, 'day')
    }
    weeks.push(day)
  }

  return {
    id: Date.now(),
    monthName: formatDate(new Date(startDate), 'MMMM YYYY'),
    middleOfMonth: middleOfMonth.toDate(),
    weeks
  }
}

export default getDays
