export interface DayInfo {
  date: Date
  day: number
  month: number
  year: number
  isCurrentMonth: boolean
  isToday: boolean
  isWeekend: boolean
  isDisabled: boolean
  isSelected: boolean
}

export type WeekDays = DayInfo[]
export type MonthWeeks = WeekDays[]

export interface CalendarState {
  currentDate: Date
  selectedDate: Date | null
  viewDate: Date
  locale: string
}

export interface CalendarEngineConfig {
  locale?: string
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  weekends?: number[]
  minDate?: Date
  maxDate?: Date
}

export interface MonthInfo {
  month: number
  year: number
  name: string
  weeks: MonthWeeks
  firstDay: Date
  lastDay: Date
}

export interface CalendarEngine {
  getMonthDays(date: Date): MonthWeeks
  getMonthInfo(date: Date): MonthInfo
  navigateMonth(date: Date, direction: 'next' | 'prev'): Date
  navigateYear(date: Date, direction: 'next' | 'prev'): Date
  selectDate(state: CalendarState, date: Date): CalendarState
  isWeekend(date: Date): boolean
  isDisabled(date: Date): boolean
  isToday(date: Date): boolean
  getYearRange(date: Date, from?: number, to?: number): number[]
  getMonthsInYear(year: number): number[]
}
