export const getConditionalClasses = (objClass: Record<string, boolean>): string => {
  return Object.entries(objClass).reduce<string>((acc, [key, value]) => {
    if (value) {
      acc += key
    }
    return acc
  }, '')
}

export const cls = (classes: string[] | Record<string, boolean>) => {
  if (Array.isArray(classes)) {
    return classes.join(' ')
  }
  return getConditionalClasses(classes)
}
