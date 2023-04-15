import type { DatePickerValue, DaysRange, BaseProps } from '../../types'

export interface DatePickerOnChange {
  value?: Date
  from?: Date
  to?: Date
}

export interface DatePickerProps extends BaseProps {
  defaultValue?: DatePickerValue
  onChange?: (value: DatePickerOnChange) => void
  weekends?: DaysRange[]
  range?: boolean
  from?: DatePickerValue
  to?: DatePickerValue
  show?: boolean
  inputClass?: string
  className?: string
  placeholder?: string
}
