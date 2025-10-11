import CalendarItem from '@components/core/calendar-item'

import formatDate from '@utils/format'
import localeCache from '@utils/locale'
import locales from '@utils/locales'

import { MonthPickerButton } from '@style/classNames'

import { Wrapper } from './sub-components'

import type { MonthPickerProps } from './month-picker.types'

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
