import type { DaysRange } from '../../types'

export interface CalendarProps {
  value: Date
  onChange: (day: Date, disabled: boolean) => void
  weekends: DaysRange[]
}
