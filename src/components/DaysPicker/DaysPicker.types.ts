import type { DaysInMonth } from '../../utils/month/month.types'
import type { Radius } from '../../style/radius'
import { type DatePickerValue } from '../../types'

export interface DaysPickerProps {
  round: keyof typeof Radius
  value: DatePickerValue
  onChange: (day: Date) => void
}
