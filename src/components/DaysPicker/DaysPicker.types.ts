import type { Radius } from '../../style/radius'

export interface DaysPickerProps {
  round: keyof typeof Radius
  value: Date
  onChange: (day: Date) => void
}
