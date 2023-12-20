import type { Theme } from '../components/InjectCSSVars/InjectCSSVars.types'
import { cssVariablePrefix } from './classNames'
import { type Radius, radius } from './radius'

export const getColorVariables = (theme: Pick<Theme, 'colors'>) => {
  return Object.entries(theme.colors).reduce((acc, [key, color]) => {
    acc += `--${cssVariablePrefix}-${key}: ${color};\n`
    return acc
  }, '')
}

function serializeClassNames (classes: Record<string, string>, cssProperty: string) {
  return Object.entries(classes).reduce((acc, [className, value]) => {
    acc += `.${cssVariablePrefix}-${className}: {${cssProperty}: ${value};}\n`
    return acc
  }, '')
}

export const getClasses = (theme: Pick<Theme, 'classes'>) => {
  return Object.keys(theme.classes).reduce((acc, key) => {
    acc += serializeClassNames(theme.classes[key], key)
    return acc
  }, '')
}

export const getBorderRadius = (): Record<string, string> => {
  // @ts-expect-error eslint expect acc and key should be same type
  return Object.keys(radius).reduce<Record<string, string>>((acc, key: Radius) => {
    acc[`round-wrapper-${key}`] = `${radius[key].wrapper}px`
    acc[`round-calendarItem-${key}`] = `${radius[key].calendarItem}px`
    return acc
  }, {})
}
