import React from 'react'
import localeCache from '../../utils/locale'
import locales from '../../utils/locales'
import CalendarItem from '../CalendarItem'
import { Wrapper } from './Month.styled'
import type { MonthPickerProps } from './MonthPicker.types'
import formatDate from '../../utils/format'

export const MonthPicker = (props: MonthPickerProps) => {
  const { locale } = localeCache
  const currentMonth = formatDate(props.value, 'MM', 'latn')

  const handleClickOnMonth = (month: number) => {
    if (month === parseInt(currentMonth, 10)) {
      return
    }
    props.onMonthSelect(month)
  }
  return (
    <Wrapper>
      {locales[locale].months.map((month) => (
        <CalendarItem
          key={month.key}
          width={90}
          height={59}
          data-selected={month.key === parseInt(currentMonth, 10)}
          onClick={() => handleClickOnMonth(month.key)}
        >
          {month.name}
        </CalendarItem>
      ))}
    </Wrapper>
  )
}

export default MonthPicker
