export { defaultTheme } from './defaultTheme'
export { roundPresets } from './defaultTheme'
export {
  mergeTheme,
  themeToCSSVariables,
  applyCSSVariables,
  generateAccentPalette
} from './themeUtils'

export { createTheme, applyTheme, removeTheme } from './createTheme'

export { ThemeProvider, type ThemeProviderProps } from './ThemeProvider'

export type {
  ThemeConfig,
  ThemeColors,
  ThemeSpacing,
  ThemeRadius,
  ThemeFontSizes,
  ThemeDirection,
  ThemeRound,
  ThemeOverrides,
  DeepPartial
} from './types'
