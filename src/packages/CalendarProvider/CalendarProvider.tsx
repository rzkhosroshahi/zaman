import React, { useMemo } from 'react'
import { ThemeProvider } from '@emotion/react'
import { makeColorPallet } from '../../style/colorPallete'
import { ACCENT_COLOR } from '../../constants'
import localeCache from '../../utils/locale'
import { gray } from '../../style/colors'
import type { CalendarProviderProps } from './CalendarProvider.types'
import { InjectCSSVariables } from '../../components/InjectCSSVars/InjectCSSVars'

export const CalendarProvider = (props: CalendarProviderProps) => {
  const { accentColor = ACCENT_COLOR, locale, round = 'thin', direction = 'rtl' } = props
  useMemo(() => localeCache.setLocale(locale), [locale])
  const primaryColors = useMemo(() => makeColorPallet(accentColor), [])

  const theme = {
    colors: {
      primary: primaryColors,
      gray
    },
    round,
    direction
  }
  return (
      <ThemeProvider theme={theme}>
        <div className="zmn-lib-wrapper" data-theme="light">
          <InjectCSSVariables accentColor={accentColor} />
          {props.children}
        </div>
      </ThemeProvider>
  )
}

export default CalendarProvider
