import React from 'react'
import localeCache from '../../utils/locale'
import locales from '../../utils/locales'
import CalendarItem from '../CalendarItem'
import { Wrapper } from './Month.styled'
import formatDate from '../../utils/format'
import type { MonthPickerProps } from './MonthPicker.types'
import { MonthPickerButton } from '../../style/classNames'

export const MonthPicker = (props: MonthPickerProps) => {
  const { locale } = localeCache
  const currentMonth = formatDate(props.value, 'MM', 'latn')

  return (
    <Wrapper>
      {locales[locale].months.map((month) => (
        <CalendarItem
          key={month.key}
          className={MonthPickerButton}
          width={90}
          height={48}
          data-selected={month.key === parseInt(currentMonth, 10)}
          onClick={() => props.onMonthSelect(month.key)}
          aria-current="date"
          type="button"
          tabIndex={0}
        >
          {month.name}
        </CalendarItem>
      ))}
    </Wrapper>
  )
}

export default MonthPicker
