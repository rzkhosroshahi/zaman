import type { DatePickerValue, Locales } from '../../types'
import type { Radius } from '../../style/radius'

interface onChangePayload {
  hour: number
  minute: number
}
export interface TimePickerProps {
  defaultValue?: DatePickerValue
  round?: Radius
  accentColor?: string
  locale?: Locales
  onChange?: (payload: onChangePayload) => void
}
