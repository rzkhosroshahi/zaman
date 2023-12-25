import React, { useContext } from 'react'
import { type CalendarItemProps } from './CalendarItem.types'
import cl from './CalendarItem.module.css'
import { cls } from '../../utils/className'
import { ThemeContext } from '../ThemeProvider/ThemeProvider'

const CalendarItem = (props: CalendarItemProps) => {
  const {
    children,
    className,
    range,
    width = '40px',
    height = '40px',
    ...rest
  } = props
  const theme = useContext(ThemeContext)
  const roundClassNames = {
    thin: cl.CalendarItemClass__roundThin,
    x1: cl.CalendarItemClassRoundX1,
    x2: cl.CalendarItemClassRoundX2,
    x3: cl.CalendarItemClassRoundX3,
    x4: cl.CalendarItemClassRoundX4
  }
  return (
    <button
      className={cls([
        cl.CalendarItemClass,
        className,
        roundClassNames[theme.round],
        cl.CalendarItemClassRtl
      ])}
      style={{ width, height }}
      type="button"
      role="gridcell"
      tabIndex={0}
      {...rest}
    >
      {children}
    </button>
  )
}

export default CalendarItem
