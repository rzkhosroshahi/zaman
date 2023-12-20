import React from 'react'
import { getClasses, getColorVariables } from '../../style/cssTheme'
import { createPortal } from 'react-dom'
import type { InjectCSSVariablesProps } from './InjectCSSVars.types'

export function InjectCSSVariables (props: InjectCSSVariablesProps) {
  const { targetElement = ':root', theme } = props
  const colorVariables = getColorVariables(theme)
  const classNames = getClasses(theme)

  return (
    <>
    {createPortal(<style id="zaman-lib-theme">
      {`
        ${classNames}
        .${targetElement}[data-theme="light"] {
          ${colorVariables}
        }
       `}</style>, document.body)}
    </>
  )
}
