import type { Moment } from 'jalali-moment'

export type DatePickerValue = number | Date | Moment

export interface IDays {
  day: string
  utc: string
  faDate: string
  disable: boolean
}
