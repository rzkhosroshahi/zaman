import { describe, it, expect, beforeEach, vi } from 'vitest'

import { createI18nProvider } from './i18n-provider'

import type { LocaleData } from './i18n-provider.types'

describe('I18nProvider', () => {
  const enLocale: LocaleData = {
    code: 'en',
    name: 'English',
    direction: 'ltr',
    shortWeekDays: [
      { key: 0, name: 'S' },
      { key: 1, name: 'M' },
      { key: 2, name: 'T' },
      { key: 3, name: 'W' },
      { key: 4, name: 'T' },
      { key: 5, name: 'F' },
      { key: 6, name: 'S' }
    ],
    months: [
      { key: 1, name: 'January' },
      { key: 2, name: 'February' },
      { key: 3, name: 'March' },
      { key: 4, name: 'April' },
      { key: 5, name: 'May' },
      { key: 6, name: 'June' },
      { key: 7, name: 'July' },
      { key: 8, name: 'August' },
      { key: 9, name: 'September' },
      { key: 10, name: 'October' },
      { key: 11, name: 'November' },
      { key: 12, name: 'December' }
    ],
    format: 'YYYY-MM-DD',
    labels: {
      today: 'Today',
      yesterday: 'Yesterday',
      tomorrow: 'Tomorrow',
      selectDate: 'Select Date',
      selectTime: 'Select Time',
      selectRange: 'Select Range',
      from: 'From',
      to: 'To',
      am: 'AM',
      pm: 'PM',
      hour: 'Hour',
      minute: 'Minute',
      second: 'Second',
      year: 'Year',
      month: 'Month',
      day: 'Day',
      week: 'Week',
      close: 'Close',
      clear: 'Clear',
      ok: 'OK',
      cancel: 'Cancel',
      nextMonth: 'Next Month',
      previousMonth: 'Previous Month',
      nextYear: 'Next Year',
      previousYear: 'Previous Year'
    }
  }

  const faLocale: LocaleData = {
    code: 'fa',
    name: 'Farsi',
    direction: 'rtl',
    shortWeekDays: [
      { key: 0, name: 'ش' },
      { key: 1, name: 'ی' },
      { key: 2, name: 'د' },
      { key: 3, name: 'س' },
      { key: 4, name: 'چ' },
      { key: 5, name: 'پ' },
      { key: 6, name: 'ج' }
    ],
    months: [
      { key: 1, name: 'فروردین' },
      { key: 2, name: 'اردیبهشت' },
      { key: 3, name: 'خرداد' },
      { key: 4, name: 'تیر' },
      { key: 5, name: 'مرداد' },
      { key: 6, name: 'شهریور' },
      { key: 7, name: 'مهر' },
      { key: 8, name: 'آبان' },
      { key: 9, name: 'آذر' },
      { key: 10, name: 'دی' },
      { key: 11, name: 'بهمن' },
      { key: 12, name: 'اسفند' }
    ],
    format: 'YYYY/MM/DD',
    labels: {
      today: 'امروز',
      yesterday: 'دیروز',
      tomorrow: 'فردا',
      selectDate: 'انتخاب تاریخ',
      selectTime: 'انتخاب زمان',
      selectRange: 'انتخاب بازه',
      from: 'از',
      to: 'تا',
      am: 'ق.ظ',
      pm: 'ب.ظ',
      hour: 'ساعت',
      minute: 'دقیقه',
      second: 'ثانیه',
      year: 'سال',
      month: 'ماه',
      day: 'روز',
      week: 'هفته',
      close: 'بستن',
      clear: 'پاک کردن',
      ok: 'تایید',
      cancel: 'لغو',
      nextMonth: 'ماه بعد',
      previousMonth: 'ماه قبل',
      nextYear: 'سال بعد',
      previousYear: 'سال قبل'
    }
  }

  let i18n: ReturnType<typeof createI18nProvider>

  beforeEach(() => {
    i18n = createI18nProvider({ defaultLocale: 'en' })
    i18n.register('en', enLocale)
    i18n.register('fa', faLocale)
  })

  describe('register', () => {
    it('should register a locale', () => {
      expect(i18n.hasLocale('en')).toBe(true)
      expect(i18n.hasLocale('fa')).toBe(true)
    })
  })

  describe('unregister', () => {
    it('should unregister a locale', () => {
      i18n.unregister('fa')
      expect(i18n.hasLocale('fa')).toBe(false)
    })
  })

  describe('setLocale', () => {
    it('should set current locale', () => {
      i18n.setLocale('fa')
      expect(i18n.getLocale()).toBe('fa')
    })

    it('should warn when setting unregistered locale', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      i18n.setLocale('es')
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('getLocale', () => {
    it('should return current locale', () => {
      expect(i18n.getLocale()).toBe('en')
    })
  })

  describe('getDirection', () => {
    it('should return direction for current locale', () => {
      expect(i18n.getDirection()).toBe('ltr')

      i18n.setLocale('fa')
      expect(i18n.getDirection()).toBe('rtl')
    })
  })

  describe('t', () => {
    it('should translate simple key', () => {
      expect(i18n.t('labels.today')).toBe('Today')
    })

    it('should translate in different locale', () => {
      i18n.setLocale('fa')
      expect(i18n.t('labels.today')).toBe('امروز')
    })

    it('should interpolate parameters', () => {
      // For this test, let's modify the locale temporarily
      const testLocale = {
        ...enLocale,
        labels: {
          ...enLocale.labels,
          greeting: 'Hello {name}!'
        }
      }

      i18n.register('en', testLocale as LocaleData)
      expect(i18n.t('labels.greeting', { name: 'World' })).toBe('Hello World!')
    })

    it('should return key if translation not found', () => {
      expect(i18n.t('labels.nonexistent')).toBe('labels.nonexistent')
    })
  })

  describe('getLocaleData', () => {
    it('should return current locale data', () => {
      const data = i18n.getLocaleData()

      expect(data).toBeDefined()
      expect(data?.code).toBe('en')
    })

    it('should return specific locale data', () => {
      const data = i18n.getLocaleData('fa')

      expect(data).toBeDefined()
      expect(data?.code).toBe('fa')
    })

    it('should return undefined for unregistered locale', () => {
      const data = i18n.getLocaleData('es')

      expect(data).toBeUndefined()
    })
  })

  describe('hasLocale', () => {
    it('should check if locale exists', () => {
      expect(i18n.hasLocale('en')).toBe(true)
      expect(i18n.hasLocale('es')).toBe(false)
    })
  })

  describe('getAvailableLocales', () => {
    it('should return all registered locales', () => {
      const locales = i18n.getAvailableLocales()

      expect(locales).toContain('en')
      expect(locales).toContain('fa')
      expect(locales.length).toBe(2)
    })
  })
})
