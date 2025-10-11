import { describe, it, expect, beforeEach } from 'vitest'

import localeCache, { type Locale } from './locale'

describe('localeCache', () => {
  beforeEach(() => {
    // Reset to default before each test
    localeCache.setLocale('en')
  })

  it('should have default locale as en', () => {
    expect(localeCache.locale).toBe('en')
  })

  it('should set locale to fa', () => {
    localeCache.setLocale('fa')

    expect(localeCache.locale).toBe('fa')
  })

  it('should set locale to en', () => {
    localeCache.setLocale('fa')
    localeCache.setLocale('en')

    expect(localeCache.locale).toBe('en')
  })

  it('should not change locale when passed undefined', () => {
    localeCache.setLocale('fa')
    localeCache.setLocale(undefined)

    expect(localeCache.locale).toBe('fa')
  })

  it('should not change locale when passed null', () => {
    localeCache.setLocale('en')
    localeCache.setLocale(null as any)

    expect(localeCache.locale).toBe('en')
  })

  it('should return current locale via getter', () => {
    localeCache.setLocale('fa')

    const currentLocale = localeCache.locale

    expect(currentLocale).toBe('fa')
  })

  it('should maintain locale between multiple gets', () => {
    localeCache.setLocale('fa')

    const locale1 = localeCache.locale
    const locale2 = localeCache.locale

    expect(locale1).toBe('fa')
    expect(locale2).toBe('fa')
    expect(locale1).toBe(locale2)
  })

  it('should handle multiple locale changes', () => {
    localeCache.setLocale('en')

    expect(localeCache.locale).toBe('en')

    localeCache.setLocale('fa')

    expect(localeCache.locale).toBe('fa')

    localeCache.setLocale('en')

    expect(localeCache.locale).toBe('en')
  })

  it('should cast string to Locale type', () => {
    const customLocale = 'fa' as Locale

    localeCache.setLocale(customLocale)

    expect(localeCache.locale).toBe('fa')
  })

  it('should have localeDefault property', () => {
    expect(localeCache).toHaveProperty('localeDefault')
  })
})
