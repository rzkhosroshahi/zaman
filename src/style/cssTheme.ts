import { makeColorPallet } from './colorPallete'
import { gray } from './colors'
import { radius } from './radius'

const cssVariablePrefix = 'zmn'

export const generatePrimaryColors = (accentColor: string) => {
  const colors = makeColorPallet(accentColor)

  return Object.entries(colors).reduce((acc, [key, color]) => {
    acc += `--${cssVariablePrefix}-primary-${key}: ${color};\n`
    return acc
  }, '')
}
export const generateThemeColors = () => {
  return Object.entries(gray).reduce((acc, [key, color]) => {
    acc += `--${cssVariablePrefix}-gray-${key}: ${color};\n`
    return acc
  }, '')
}
export const generateRadiusClasses = () => {
  return Object.entries(radius).reduce((acc, [key, radius]) => {
    acc += `.${cssVariablePrefix}-radius-wrapper-${key} {border-radius: ${radius.wrapper}px;}\n`
    acc += `.${cssVariablePrefix}-radius-calendarItem-${key} {border-radius:${radius.calendarItem}px;}\n`
    return acc
  }, '')
}
