import type {
  DaysRange,
  DatePickerValue,
  onRangeDatePickerChangePayload,
  onDatePickerChangePayload
} from '../../types'

export interface CalendarBaseProps {
  defaultValue?: Date
  weekends?: DaysRange[]
  rangeValue?: Date[]
  from?: DatePickerValue
  to?: DatePickerValue
  className?: string
}
export interface CalendarProps1 extends CalendarBaseProps {
  range: true
  onChange?: (args: onRangeDatePickerChangePayload) => void
}

export interface CalendarProps2 extends CalendarBaseProps {
  range?: false | undefined
  onChange?: (args: onDatePickerChangePayload) => void
}

export type CalendarProps = CalendarProps1 | CalendarProps2
