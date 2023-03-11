import type React from 'react'
import type { Radius } from '../../style/radius'
import type { Locales } from '../../types'

export interface CalendarProviderProps {
  round?: Radius
  accentColor?: string
  locale?: Locales
  children: React.ReactNode
}
