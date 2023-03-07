import type { DatePickerValue } from '../../types'
import type { Radius } from '../../style/radius'

export interface DatePickerProps {
  defaultValue?: DatePickerValue
  onChange?: (value: Date) => void
  round?: keyof typeof Radius
  accentColor?: string
  locale?: string
}

export interface Theme {
  colors: Record<number, string>
  round: keyof typeof Radius
}
