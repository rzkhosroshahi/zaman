import type { DaysRange } from '../../types'

export interface CalendarProps {
  value: Date
  onChange: (day: Date) => void
  weekends: DaysRange[]
}
