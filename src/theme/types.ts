export type ThemeDirection = 'rtl' | 'ltr'

export type ThemeRound = 'x-thin' | 'thin' | 'medium' | 'thick'

export interface ThemeColors {
  primary: {
    DEFAULT: string
    light: string
    lighter: string
    dark: string
    foreground: string
  }
  gray: {
    0: string
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
  }
  weekend: string
  disabled: string
  border: string
  background: string
  foreground: string
}

export interface ThemeSpacing {
  calendarItemWidth: string
  calendarItemHeight: string
  calendarGap: string
  headerHeight: string
  modalPadding: string
}

export interface ThemeRadius {
  calendarItem: string
  modal: string
  button: string
}

export interface ThemeFontSizes {
  xs: string
  sm: string
  base: string
  lg: string
  xl: string
  '2xl': string
}

export interface ThemeConfig {
  colors: ThemeColors
  spacing: ThemeSpacing
  radius: ThemeRadius
  fontSize: ThemeFontSizes
  direction: ThemeDirection
  round: ThemeRound
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type ThemeOverrides = DeepPartial<ThemeConfig>
