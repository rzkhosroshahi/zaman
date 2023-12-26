import type { Theme } from '../components/InjectCSSVars/InjectCSSVars.types'
import { cssVariablePrefix } from './classNames'

export const getColorVariables = (theme: Pick<Theme, 'colors'>) => {
  return Object.entries(theme.colors).reduce((acc, [key, color]) => {
    acc += `--${cssVariablePrefix}-${key}: ${color};\n`
    return acc
  }, '')
}
