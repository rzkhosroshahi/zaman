const localeCache = {
  localeDefault: 'en',
  setLocale (locale?: string) {
    if (locale != null) {
      this.localeDefault = locale
    }
  },
  get locale (): string {
    return this.localeDefault
  }
}

export default localeCache
