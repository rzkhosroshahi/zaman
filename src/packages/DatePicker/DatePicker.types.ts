import type { DatePickerValue, DaysRange, Locales } from '../../types'
import type { Radius } from '../../style/radius'

export interface DatePickerProps {
  defaultValue?: DatePickerValue
  onChange?: (value: Date) => void
  round?: Radius
  accentColor?: string
  locale?: Locales
  weekends?: DaysRange[]
}
