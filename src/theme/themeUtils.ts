import { defaultTheme, roundPresets } from './defaultTheme'

import type { ThemeConfig, ThemeOverrides, DeepPartial } from './types'

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === '[object Object]'
  )
}

function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: DeepPartial<T>
): T {
  const output = { ...target }

  for (const key in source) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) continue

    const sourceValue = source[key]
    const targetValue = target[key]

    if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
      output[key] = deepMerge(
        targetValue as Record<string, unknown>,
        sourceValue as DeepPartial<Record<string, unknown>>
      ) as T[Extract<keyof T, string>]
    } else if (sourceValue !== undefined) {
      output[key] = sourceValue as T[Extract<keyof T, string>]
    }
  }

  return output
}

export function mergeTheme(overrides?: ThemeOverrides): ThemeConfig {
  if (!overrides) return defaultTheme

  const merged = deepMerge(
    defaultTheme as unknown as Record<string, unknown>,
    overrides as unknown as DeepPartial<Record<string, unknown>>
  ) as unknown as ThemeConfig

  if (overrides.round && !overrides.radius) {
    merged.radius = roundPresets[overrides.round]
  }

  return merged
}

export function themeToCSSVariables(
  theme: ThemeConfig
): Record<string, string> {
  return {
    '--zaman-primary': theme.colors.primary.DEFAULT,
    '--zaman-primary-light': theme.colors.primary.light,
    '--zaman-primary-lighter': theme.colors.primary.lighter,
    '--zaman-primary-dark': theme.colors.primary.dark,
    '--zaman-primary-foreground': theme.colors.primary.foreground,

    '--zaman-gray-0': theme.colors.gray[0],
    '--zaman-gray-50': theme.colors.gray[50],
    '--zaman-gray-100': theme.colors.gray[100],
    '--zaman-gray-200': theme.colors.gray[200],
    '--zaman-gray-300': theme.colors.gray[300],
    '--zaman-gray-400': theme.colors.gray[400],
    '--zaman-gray-500': theme.colors.gray[500],
    '--zaman-gray-600': theme.colors.gray[600],
    '--zaman-gray-700': theme.colors.gray[700],
    '--zaman-gray-800': theme.colors.gray[800],
    '--zaman-gray-900': theme.colors.gray[900],

    '--zaman-weekend': theme.colors.weekend,
    '--zaman-disabled': theme.colors.disabled,
    '--zaman-border': theme.colors.border,
    '--zaman-background': theme.colors.background,
    '--zaman-foreground': theme.colors.foreground,

    '--zaman-item-width': theme.spacing.calendarItemWidth,
    '--zaman-item-height': theme.spacing.calendarItemHeight,
    '--zaman-gap': theme.spacing.calendarGap,
    '--zaman-header-height': theme.spacing.headerHeight,
    '--zaman-modal-padding': theme.spacing.modalPadding,

    '--zaman-radius-item': theme.radius.calendarItem,
    '--zaman-radius-modal': theme.radius.modal,
    '--zaman-radius-button': theme.radius.button,

    '--zaman-text-xs': theme.fontSize.xs,
    '--zaman-text-sm': theme.fontSize.sm,
    '--zaman-text-base': theme.fontSize.base,
    '--zaman-text-lg': theme.fontSize.lg,
    '--zaman-text-xl': theme.fontSize.xl,
    '--zaman-text-2xl': theme.fontSize['2xl'],

    '--zaman-direction': theme.direction
  }
}

export function generateAccentPalette(accentColor: string): {
  DEFAULT: string
  light: string
  lighter: string
  dark: string
  foreground: string
} {
  return {
    DEFAULT: accentColor,
    light: accentColor,
    lighter: `color-mix(in srgb, ${accentColor} 20%, white 80%)`,
    dark: `color-mix(in srgb, ${accentColor} 80%, black 20%)`,
    foreground: '#ffffff'
  }
}

export function applyCSSVariables(
  element: HTMLElement,
  variables: Record<string, string>
): void {
  for (const [key, value] of Object.entries(variables)) {
    element.style.setProperty(key, value)
  }
}
