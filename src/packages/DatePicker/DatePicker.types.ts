import type { InputHTMLAttributes } from 'react'
import type { DatePickerValue, DaysRange, BaseProps } from '../../types'

export interface DatePickerOnChange {
  value?: Date
  from?: Date
  to?: Date
}

export interface DatePickerProps extends BaseProps {
  defaultValue?: DatePickerValue
  onChange?: (value: DatePickerOnChange) => void
  onMonthChanged?: (middleOfNextMonth: Date) => void
  weekends?: DaysRange[]
  range?: boolean
  from?: DatePickerValue
  to?: DatePickerValue
  show?: boolean
  inputClass?: string
  className?: string
  inputAttributes?: InputHTMLAttributes<HTMLInputElement>
}
