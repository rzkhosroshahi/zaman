import { useMemo } from 'react'

import { ACCENT_COLOR } from '@constants'
import { ThemeProvider, type ThemeRound } from '@theme'

import localeCache from '@utils/locale'

import type { CalendarProviderProps } from './calendar-provider.types'

const roundMap: Record<string, ThemeRound> = {
  thin: 'x-thin',
  x1: 'thin',
  x2: 'medium',
  x3: 'thick',
  x4: 'thick'
}

export const CalendarProvider = (props: CalendarProviderProps) => {
  const {
    accentColor = ACCENT_COLOR,
    locale,
    round = 'thin',
    direction = 'rtl'
  } = props

  useMemo(() => localeCache.setLocale(locale), [locale])

  const mappedRound = roundMap[round] ?? 'thin'

  return (
    <ThemeProvider
      accentColor={accentColor}
      direction={direction}
      round={mappedRound}
      locale={locale}
    >
      {props.children}
    </ThemeProvider>
  )
}

export default CalendarProvider
