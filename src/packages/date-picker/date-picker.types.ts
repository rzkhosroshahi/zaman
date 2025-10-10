import type {
  CalendarDefaultProps,
  CalendarRangeProps
} from '../calendar/Calendar.types'
import type { BaseProps, DatePickerValue, DaysRange, Positions } from '@types'
import type { InputHTMLAttributes } from 'react'

export interface DatePickerBaseProps extends BaseProps {
  defaultValue?: DatePickerValue
  weekends?: DaysRange[]
  show?: boolean
  inputClass?: string
  className?: string
  inputAttributes?: InputHTMLAttributes<HTMLInputElement>
  position?: Positions
  customShowDateFormat?: string
}

export type DatePickerProps = DatePickerBaseProps &
  (CalendarRangeProps | CalendarDefaultProps)
