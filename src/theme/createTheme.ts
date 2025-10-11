import { mergeTheme } from './themeUtils'

import type { ThemeConfig, ThemeOverrides } from './types'

export function createTheme(overrides?: ThemeOverrides): ThemeConfig {
  return mergeTheme(overrides)
}

export function applyTheme(theme: ThemeConfig, element: HTMLElement): void {
  void import('./themeUtils').then(
    ({ themeToCSSVariables, applyCSSVariables }) => {
      const cssVars = themeToCSSVariables(theme)

      applyCSSVariables(element, cssVars)
    }
  )
}

export function removeTheme(element: HTMLElement): void {
  const styles = element.style

  Array.from(styles).forEach((prop) => {
    if (prop.startsWith('--zaman-')) {
      element.style.removeProperty(prop)
    }
  })
}
