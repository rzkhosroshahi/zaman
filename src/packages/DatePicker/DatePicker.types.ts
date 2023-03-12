import type { DatePickerValue, DaysRange, Locales } from '../../types'
import type { Radius } from '../../style/radius'

export interface DatePickerOnChange {
  value?: Date
  from?: Date
  to?: Date
}

export interface DatePickerProps {
  defaultValue?: DatePickerValue
  onChange?: (value: DatePickerOnChange) => void
  round?: Radius
  accentColor?: string
  locale?: Locales
  weekends?: DaysRange[]
  range?: boolean
  from?: DatePickerValue
  to?: DatePickerValue
  show?: boolean
}
