import type { Radius } from '../../style/radius'
import type { DaysRange } from '../../types'

export interface DaysPickerProps {
  round: keyof typeof Radius
  value: Date
  onChange: (day: Date, disabled: boolean) => void
  weekends: DaysRange[]
}
