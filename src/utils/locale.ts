export type Locale = 'en' | 'fa'

const localeCache = {
  localeDefault: 'en' as Locale,
  setLocale(locale?: string) {
    if (locale != null) {
      this.localeDefault = locale as Locale
    }
  },
  get locale(): Locale {
    return this.localeDefault
  }
}

export default localeCache
