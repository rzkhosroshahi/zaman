const localeCache = {
  localeDefault: 'en',
  setLocale (locale: string) {
    this.localeDefault = locale
  },
  get locale (): string {
    return this.localeDefault
  }
}

export default localeCache
