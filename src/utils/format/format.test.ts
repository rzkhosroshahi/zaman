import formatDate from './format'
import localeCache from '../locale'

const date = 'Wed Mar 08 2023'

describe('formatDate test', () => {
  test('simple format date', () => {
    localeCache.setLocale('fa')
    expect(formatDate(new Date(date), 'YYYY/MM/DD')).toBe('۱۴۰۱/۱۲/۱۷')
    expect(formatDate(new Date(date), 'YYYY/MMMM/DD')).toBe('۱۴۰۱/اسفند/۱۷')
  })

  test('format with space date', () => {
    localeCache.setLocale('en')
    expect(formatDate(new Date(date), 'YYYY MM DD')).toBe('2023 03 8')
  })

  test('format with dash date', () => {
    localeCache.setLocale('en')
    expect(formatDate(new Date(date), 'MM-DD-YY')).toBe('03-8-23')
  })

  test('get month', () => {
    localeCache.setLocale('en')
    expect(formatDate(new Date(date), 'MMMM')).toBe('Mar')
  })

  test('get day', () => {
    localeCache.setLocale('en')
    expect(formatDate(new Date(date), 'DD')).toBe('8')
  })

  test('get year', () => {
    localeCache.setLocale('fa')
    expect(formatDate(new Date(date), 'YYYY')).toBe('۱۴۰۱')
  })
})
