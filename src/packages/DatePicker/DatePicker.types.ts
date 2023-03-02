import type { DatePickerValue, IDays, Locales } from '../../types'
import type { Radius } from '../../style/radius'

export interface DatePickerProps {
  defaultValue?: DatePickerValue
  locale?: keyof Locales
  onChange?: (value: IDays) => void
  round?: keyof typeof Radius
}
