import type { Locale } from '@utils/locale'

export interface CalendarProps {
  defaultValue?: Date

  className?: string

  weekends?: number[]

  range?: boolean

  from?: Date

  to?: Date

  onChange?: (date: Date) => void

  locale?: Locale
}

export interface CalendarDefaultProps {
  range?: false
  defaultValue?: Date
  onChange?: (date: Date) => void
}

export interface CalendarRangeProps {
  range: true
  from?: Date
  to?: Date
  onChange?: (date: Date) => void
}

export interface OnChangePayload {
  hours: number
  minutes: number
  seconds: number
}
