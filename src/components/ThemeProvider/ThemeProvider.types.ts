import type React from 'react'
import { type Radius } from '../../style/radius'

export interface ThemeProviderProps {
  accentColor: string
  children: React.ReactNode
  round: Radius
}

export interface Theme {
  round: Radius
}
