import type { Moment } from 'jalali-moment'

export type DatePickerValue = number | Date | Moment | string

export interface IDays {
  day: string
  utc: string
  faDate: string
  disable: boolean
}

export enum Locales {
  fa,
  en,
}
