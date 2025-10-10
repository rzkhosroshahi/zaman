export type Direction = 'rtl' | 'ltr'

export interface WeekDay {
  key: number
  name: string
}

export interface Month {
  key: number
  name: string
}

export interface LocaleLabels {
  today: string
  yesterday: string
  tomorrow: string
  selectDate: string
  selectTime: string
  selectRange: string
  from: string
  to: string
  am: string
  pm: string
  hour: string
  minute: string
  second: string
  year: string
  month: string
  day: string
  week: string
  close: string
  clear: string
  ok: string
  cancel: string
  nextMonth: string
  previousMonth: string
  nextYear: string
  previousYear: string
}

export interface LocaleData {
  code: string
  name: string
  direction: Direction
  shortWeekDays: WeekDay[]
  longWeekDays?: WeekDay[]
  narrowWeekDays?: WeekDay[]
  months: Month[]
  shortMonths?: Month[]
  format: string
  dateFormat?: string
  timeFormat?: string
  dateTimeFormat?: string
  labels: LocaleLabels
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

export interface I18nProviderConfig {
  defaultLocale?: string
  fallbackLocale?: string
}

export interface I18nProvider {
  register(locale: string, data: LocaleData): void
  unregister(locale: string): void
  setLocale(locale: string): void
  getLocale(): string
  getDirection(): Direction
  t(key: string, params?: Record<string, string | number>): string
  getLocaleData(locale?: string): LocaleData | undefined
  hasLocale(locale: string): boolean
  getAvailableLocales(): string[]
}
