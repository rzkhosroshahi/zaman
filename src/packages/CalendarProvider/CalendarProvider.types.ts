import type React from 'react'
import { type Radius } from '../../style/radius'
import { type Locales } from '../../types'

export interface CalendarProviderProps {
  round?: keyof typeof Radius
  accentColor?: string
  locale?: keyof typeof Locales
  children: React.ReactNode
}
