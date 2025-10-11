import localeCache from './locale'

export { cn } from './cn'
export { createVariants } from './variants'
export { debounce } from './debounce'

export const isRtl = (): boolean => {
  if (document.dir !== '') {
    return document.dir === 'rtl'
  }
  const { body } = document

  return getComputedStyle(body).direction === 'rtl'
}

export const localizeNumber = (n: string | number) => {
  if (process.env.NODE_ENV === 'test') {
    return n
  }
  const { locale } = localeCache

  return Number(n).toLocaleString(locale, {
    useGrouping: false
  })
}

export const weekDayNames = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']
