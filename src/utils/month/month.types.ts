import type { Locales } from '../../types'

export interface GetDaysTypes {
  date?: string | Date | number
  startWeek?: number
  locale?: keyof typeof Locales
}

export interface WeekDays {
  date: Date
  disabled: boolean
}

export interface DaysInMonth {
  id: number
  monthName: string
  firstDayOfMonth: Date
  weeks: WeekDays[][]
}
