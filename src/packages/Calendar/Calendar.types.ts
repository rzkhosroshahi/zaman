import type { DaysRange, DatePickerValue } from '../../types'

export interface CalendarProps {
  value: Date
  onChange: (day: Date, to?: Date) => void
  weekends?: DaysRange[]
  rangeValue?: Date[]
  range?: boolean
  from?: DatePickerValue
  to?: DatePickerValue
}
