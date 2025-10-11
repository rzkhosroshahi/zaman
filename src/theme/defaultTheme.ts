import type { ThemeConfig } from './types'

export const defaultTheme: ThemeConfig = {
  colors: {
    primary: {
      DEFAULT: '#3b82f6',
      light: '#60a5fa',
      lighter: '#dbeafe',
      dark: '#2563eb',
      foreground: '#ffffff'
    },
    gray: {
      0: '#ffffff',
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    },
    weekend: '#ef4444',
    disabled: '#9ca3af',
    border: '#e5e7eb',
    background: '#ffffff',
    foreground: '#111827'
  },
  spacing: {
    calendarItemWidth: '40px',
    calendarItemHeight: '40px',
    calendarGap: '0.25rem',
    headerHeight: '48px',
    modalPadding: '1rem'
  },
  radius: {
    calendarItem: '0.375rem',
    modal: '0.75rem',
    button: '0.5rem'
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem'
  },
  direction: 'rtl',
  round: 'thin'
}

export const roundPresets: Record<
  ThemeConfig['round'],
  { calendarItem: string; modal: string; button: string }
> = {
  'x-thin': {
    calendarItem: '0.125rem',
    modal: '0.25rem',
    button: '0.25rem'
  },
  thin: {
    calendarItem: '0.375rem',
    modal: '0.75rem',
    button: '0.5rem'
  },
  medium: {
    calendarItem: '0.5rem',
    modal: '1rem',
    button: '0.75rem'
  },
  thick: {
    calendarItem: '0.75rem',
    modal: '1.5rem',
    button: '1rem'
  }
}
