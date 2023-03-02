import hexToHSL from './hexToHSL'
const getHsl = (h: number, s: number, l: number) => {
  return `hsl(${h}deg ${s}% ${l}%)`
}
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
