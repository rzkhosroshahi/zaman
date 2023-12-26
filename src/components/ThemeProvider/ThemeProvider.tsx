import React, { createContext } from 'react'
import type { ThemeProviderProps, Theme } from './ThemeProvider.types'
import { grayColors } from '../../style/colors'
import { makePrimaryColorPallet } from '../../style/colorPallete'
import { InjectCSSVariables } from '../InjectCSSVars/InjectCSSVars'
import { zamanLibWrapper } from '../../style/classNames'

export const ThemeContext = createContext<Theme>({
  round: 'thin'
})

export const ThemeProvider = (props: ThemeProviderProps) => {
  const theme = {
    colors: {
      ...grayColors,
      ...makePrimaryColorPallet(props.accentColor)
    }
  }
  return (
    <ThemeContext.Provider value={{ round: props.round }}>
      <div>
        <InjectCSSVariables theme={theme} targetElement={zamanLibWrapper} />
        {props.children}
      </div>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
