import type { DaysRange, DatePickerValue } from '../../types'

export interface CalendarProps {
  defaultValue?: Date
  onChange: (day: Date, to?: Date) => void
  onMonthChanged?: (middleOfNextMonth: Date) => void
  weekends?: DaysRange[]
  rangeValue?: Date[]
  range?: boolean
  from?: DatePickerValue
  to?: DatePickerValue
  className?: string
}
