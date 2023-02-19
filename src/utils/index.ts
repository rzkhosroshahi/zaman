export const isRtl = (): boolean => {
  if (document.dir !== '') {
    return document.dir === 'rtl'
  }
  const { body } = document
  return getComputedStyle(body).direction === 'rtl'
}
