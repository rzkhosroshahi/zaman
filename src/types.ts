import type { Radius } from './style/radius'

export type DatePickerValue = number | Date | string

export type Locales = 'fa' | 'en'

export type Directions = 'rtl' | 'ltr'

export type DaysRange = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type Pickers = 'days' | 'year' | 'month'

export type Positions = 'right' | 'left' | 'center'

export interface BaseProps {
  round?: Radius
  accentColor?: string
  locale?: Locales
  direction?: Directions
}

export interface OnDatePickerChangePayload {
  value: Date
}

export interface OnRangeDatePickerChangePayload {
  from: Date
  to: Date
}

interface MyProps1 {
  range: true
  myMethod: (arg: OnRangeDatePickerChangePayload) => void
}

interface MyProps2 {
  range: false
  myMethod: (arg: OnDatePickerChangePayload) => void
}

export type CalendarTypeProps = MyProps1 | MyProps2
