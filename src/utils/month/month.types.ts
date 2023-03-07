export interface GetDaysTypes {
  date?: string | Date | number
  startWeek?: number
  locale?: string
}

export interface DaysInMonth {
  id: number
  monthName: string
  firstDayOfMonth: Date
  weeks: Date[][]
}
