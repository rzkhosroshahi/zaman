export type DateInput = Date | string | number

export type CalendarSystem = 'gregorian' | 'jalali'

export interface DateEngineConfig {
  calendarSystem: CalendarSystem
}

export interface ParsedDate {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
  millisecond: number
}

export interface DateComparison {
  isBefore: boolean
  isAfter: boolean
  isSame: boolean
  difference: number
}

export interface DateEngine {
  parse(input: DateInput): Date
  format(date: Date, format: string, locale: string): string
  compare(
    date1: Date,
    date2: Date,
    unit?: 'day' | 'month' | 'year'
  ): DateComparison
  isSameDay(date1: Date, date2: Date): boolean
  isSameMonth(date1: Date, date2: Date): boolean
  isSameYear(date1: Date, date2: Date): boolean
  addDays(date: Date, amount: number): Date
  subtractDays(date: Date, amount: number): Date
  addMonths(date: Date, amount: number): Date
  subtractMonths(date: Date, amount: number): Date
  addYears(date: Date, amount: number): Date
  subtractYears(date: Date, amount: number): Date
  startOfMonth(date: Date): Date
  endOfMonth(date: Date): Date
  startOfWeek(date: Date): Date
  endOfWeek(date: Date): Date
  getDaysInMonth(date: Date): number
  getWeekDay(date: Date): number
  getYear(date: Date, numberingSystem?: string): string
  getMonth(date: Date, numberingSystem?: string): string
  getDay(date: Date, numberingSystem?: string): string
}
