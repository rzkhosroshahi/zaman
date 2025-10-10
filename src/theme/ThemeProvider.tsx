import { useEffect, useRef } from 'react'

import './global.css'
import {
  mergeTheme,
  themeToCSSVariables,
  applyCSSVariables
} from './themeUtils'

import type { ThemeOverrides } from './types'

export interface ThemeProviderProps {
  children: React.ReactNode
  theme?: ThemeOverrides
  accentColor?: string
  direction?: 'rtl' | 'ltr'
  round?: 'x-thin' | 'thin' | 'medium' | 'thick'
  locale?: 'fa' | 'en'
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme: themeOverrides,
  accentColor,
  direction,
  round,
  locale
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const overrides: ThemeOverrides = {
      ...themeOverrides
    }

    if (accentColor) {
      overrides.colors = {
        ...overrides.colors,
        primary: {
          ...overrides.colors?.primary,
          DEFAULT: accentColor
        }
      }
    }

    if (direction) {
      overrides.direction = direction
    }

    if (round) {
      overrides.round = round
    }

    const theme = mergeTheme(overrides)
    const cssVars = themeToCSSVariables(theme)

    applyCSSVariables(containerRef.current, cssVars)
  }, [themeOverrides, accentColor, direction, round, locale])

  return (
    <div ref={containerRef} className="zaman-calendar" dir={direction ?? 'rtl'}>
      {children}
    </div>
  )
}

export default ThemeProvider
