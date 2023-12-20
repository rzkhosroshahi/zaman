import hexToHSL from './hexToHSL'
const getHsl = (h: number, s: number, l: number) => {
  return `hsl(${h}deg ${s}% ${l}%)`
}
// ToDo: remove this after remove Emotion
export const makeColorPallet = (accentColor: string) => {
  const { h, s, l } = hexToHSL(accentColor)
  const result: Record<number, string> = {}

  result[40] = getHsl(h, s, l - 10)
  result[50] = getHsl(h, s, l)
  result[85] = getHsl(h, s, 85)
  result[90] = getHsl(h, s, 90)
  result[95] = getHsl(h, s, 95)

  return result
}

export const makePrimaryColorPallet = (accentColor: string) => {
  const { h, s, l } = hexToHSL(accentColor)
  const result: Record<string, string> = {}

  result['primary-40'] = getHsl(h, s, l - 10)
  result['primary-50'] = getHsl(h, s, l)
  result['primary-85'] = getHsl(h, s, 85)
  result['primary-90'] = getHsl(h, s, 90)
  result['primary-95'] = getHsl(h, s, 95)

  return result
}
