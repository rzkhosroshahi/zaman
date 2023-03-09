import type { DatePickerValue, Locales } from '../../types'
import type { Radius } from '../../style/radius'

export interface DatePickerProps {
  defaultValue?: DatePickerValue
  onChange?: (value: Date) => void
  round?: keyof typeof Radius
  accentColor?: string
  locale?: keyof typeof Locales
}
