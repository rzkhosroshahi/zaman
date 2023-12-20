import React from 'react'
import { generatePrimaryColors, generateRadiusClasses, generateThemeColors } from '../../style/cssTheme'
import { createPortal } from 'react-dom'

interface InjectCSSVariablesProps {
  accentColor: string
}
export function InjectCSSVariables (props: InjectCSSVariablesProps) {
  const primaryColors: string = generatePrimaryColors(props.accentColor)
  const themeColors: string = generateThemeColors()
  const radiusClasses: string = generateRadiusClasses()
  return (
    <>
    {createPortal(<style id="zaman-lib-theme">
      {`
        ${radiusClasses}
        .zmn-lib-wrapper[data-theme="light"] {
          ${primaryColors}
          ${themeColors}
        }
       `}</style>, document.body)}
    </>
  )
}
