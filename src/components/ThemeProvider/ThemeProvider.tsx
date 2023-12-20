import React from 'react'
import type { ThemeProviderProps } from './ThemeProvider.types'
import { grayColors } from '../../style/colors'
import { makePrimaryColorPallet } from '../../style/colorPallete'
import { InjectCSSVariables } from '../InjectCSSVars/InjectCSSVars'
import { zamanLibWrapper } from '../../style/classNames'
import { getBorderRadius } from '../../style/cssTheme'

export const ThemeProvider = (props: ThemeProviderProps) => {
  const theme = {
    colors: {
      ...grayColors,
      ...makePrimaryColorPallet(props.accentColor)
    },
    classes: {
      'border-radius': {
        ...getBorderRadius()
      }
    }
  }
  return (
    <div className={zamanLibWrapper} data-theme="light">
      <InjectCSSVariables theme={theme} targetElement={zamanLibWrapper} />
      {props.children}
    </div>
  )
}

export default ThemeProvider
