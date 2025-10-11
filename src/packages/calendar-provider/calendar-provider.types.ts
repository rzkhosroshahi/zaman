import type * as React from 'react'

export interface CalendarProviderProps {
  locale?: 'fa' | 'en'

  accentColor?: string

  round?: 'thin' | 'x1' | 'x2' | 'x3' | 'x4'

  direction?: 'rtl' | 'ltr'
  children: React.ReactNode
}
