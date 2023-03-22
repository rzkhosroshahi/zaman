import type { DatePickerValue, Locales } from '../../types'
import type { Radius } from '../../style/radius'

interface onChangePayload {
  hour: number
  minute: number
  timeConvention?: 'am' | 'pm'
}
export interface TimePickerProps {
  defaultValue?: DatePickerValue
  round?: Radius
  accentColor?: string
  locale?: Locales
  clockTime?: 12 | 24
  onChange?: (payload: onChangePayload) => void
}
