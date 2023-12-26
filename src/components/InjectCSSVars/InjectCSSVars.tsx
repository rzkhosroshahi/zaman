import React from 'react'
import { getColorVariables } from '../../style/cssTheme'
import { createPortal } from 'react-dom'
import type { InjectCSSVariablesProps } from './InjectCSSVars.types'
import { getRadiusCssVariables } from '../../style/radius'

export function InjectCSSVariables(props: InjectCSSVariablesProps) {
  const { targetElement = ':root', theme } = props
  const colorVariables = getColorVariables(theme)
  const roundVariables = getRadiusCssVariables()
  return (
    <>
      {createPortal(
        <style id="zaman-lib-theme">
          {`
            .${targetElement}[data-theme="light"] {
                ${roundVariables}
                ${colorVariables}
            }
          `}
        </style>,
        document.body
      )}
    </>
  )
}
