export const isRtl = (): boolean => {
  if (document.dir !== '') {
    return document.dir === 'rtl'
  }
  const { body } = document
  return getComputedStyle(body).direction === 'rtl'
}

export const faNumber = (n: string) => {
  if (process.env.NODE_ENV === 'test') {
    return n
  }
  return Number(n).toLocaleString('fa', {
    useGrouping: false
  })
}
