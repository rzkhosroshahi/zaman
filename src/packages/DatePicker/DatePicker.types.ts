import type { DatePickerValue, IDays, Locales } from '../../types'

export interface DatePickerProps {
  defaultValue?: DatePickerValue
  locale?: keyof Locales
  onChange?: (value: IDays) => void
}
