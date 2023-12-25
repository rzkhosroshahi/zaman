import { type Radius } from './radius'

export const MonthYearButton = 'zm-MonthYearButton'
export const IconNextButton = 'zm-IconNextButton'
export const IconPrevButton = 'zm-IconPrevButton'
export const HeaderClass = 'zm-Header'
export const DaysButton = 'zm-DaysButton'

export const MonthPickerButton = 'zm-MonthPickerButton'
export const YearPickerButton = 'zm-YearPickerButton'

export const cssVariablePrefix = 'zmn'
export const getClassName = (className: string) => `${cssVariablePrefix}-${className}`

export const zamanLibWrapper = getClassName('lib-wrapper')

export const getRoundWrapperClassName = (round: Radius) => {
  return `${cssVariablePrefix}-round-wrapper-${round}`
}

export const getCalendarItemClassName = (round: Radius) => {
  return `${cssVariablePrefix}-round-calendarItem-${round}`
}
