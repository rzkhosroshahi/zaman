import type {
  I18nProvider,
  I18nProviderConfig,
  LocaleData
} from './i18n-provider.types'

function resolveKey(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let result: unknown = obj

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key]
    } else {
      return path
    }
  }

  return typeof result === 'string' ? result : path
}

function interpolate(
  str: string,
  params: Record<string, string | number>
): string {
  return str.replace(/\{(\w+)\}/g, (match, key: string) => {
    return key in params ? String(params[key]) : match
  })
}

export function createI18nProvider(
  config: I18nProviderConfig = {}
): I18nProvider {
  const { defaultLocale = 'en', fallbackLocale = 'en' } = config

  const locales = new Map<string, LocaleData>()
  let currentLocale: string = defaultLocale

  return {
    register(locale: string, data: LocaleData) {
      locales.set(locale, data)
    },

    unregister(locale: string) {
      locales.delete(locale)
    },

    setLocale(locale: string) {
      if (!locales.has(locale)) {
        console.warn(
          `Locale "${locale}" not registered. Falling back to "${fallbackLocale}".`
        )
        if (locales.has(fallbackLocale)) {
          currentLocale = fallbackLocale
        }

        return
      }
      currentLocale = locale
    },

    getLocale() {
      return currentLocale
    },

    getDirection() {
      const data = locales.get(currentLocale)

      return data?.direction ?? 'ltr'
    },

    t(key: string, params?: Record<string, string | number>): string {
      const data = locales.get(currentLocale)

      if (!data) {
        return key
      }

      let translation = resolveKey(
        data as unknown as Record<string, unknown>,
        key
      )

      if (params) {
        translation = interpolate(translation, params)
      }

      return translation
    },

    getLocaleData(locale?: string) {
      return locales.get(locale ?? currentLocale)
    },

    hasLocale(locale: string) {
      return locales.has(locale)
    },

    getAvailableLocales() {
      return Array.from(locales.keys())
    }
  }
}
