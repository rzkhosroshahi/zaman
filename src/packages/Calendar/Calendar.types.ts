import type {
  DaysRange,
  DatePickerValue,
  onRangeDatePickerChangePayload,
  onDatePickerChangePayload,
  DefaultShow
} from '../../types'

export interface CalendarBaseProps {
  defaultValue?: Date
  weekends?: DaysRange[]
  className?: string
  defaultShow?: DefaultShow
  setShowCalendar?: (args: boolean) => void
}
export interface CalendarRangeProps {
  range: true
  from?: DatePickerValue
  to?: DatePickerValue
  rangeValue?: Date[]
  onChange?: (args: onRangeDatePickerChangePayload) => void
}

export interface CalendarDefaultProps {
  range?: false | undefined
  onChange?: (args: onDatePickerChangePayload) => void
}

export type OnChangePayload =
  | onRangeDatePickerChangePayload
  | onDatePickerChangePayload

export type CalendarProps = CalendarBaseProps &
  (CalendarRangeProps | CalendarDefaultProps)
