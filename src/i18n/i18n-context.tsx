import { createContext, useContext, useMemo, type ReactNode } from 'react'

import { createI18nProvider } from './i18n-provider'

import type { I18nProvider } from './i18n-provider.types'

export const I18nContext = createContext<I18nProvider | null>(null)

I18nContext.displayName = 'I18nContext'

export function useI18n(): I18nProvider {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('useI18n must be used within I18nContextProvider')
  }

  return context
}

export function useTranslation() {
  const i18n = useI18n()

  return {
    t: (key: string, params?: Record<string, string | number>) =>
      i18n.t(key, params),
    locale: i18n.getLocale(),
    direction: i18n.getDirection()
  }
}

export interface I18nContextProviderProps {
  children: ReactNode
  provider?: I18nProvider
  defaultLocale?: string
}

export function I18nContextProvider({
  children,
  defaultLocale = 'en',
  provider
}: I18nContextProviderProps) {
  const i18nProvider = useMemo(() => {
    return provider ?? createI18nProvider({ defaultLocale })
  }, [provider, defaultLocale])

  return (
    <I18nContext.Provider value={i18nProvider}>{children}</I18nContext.Provider>
  )
}
