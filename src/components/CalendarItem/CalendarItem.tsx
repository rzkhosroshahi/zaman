import React from 'react'
import { type CalendarItemProps } from './CalendarItem.types'
import { cls } from '../../utils/className'
import { calendarItem } from './CalendarItem.style'

const CalendarItem = (props: CalendarItemProps) => {
  const {
    children,
    className,
    range,
    width = '40px',
    height = '40px',
    ...rest
  } = props
  return (
    <button
      className={cls([calendarItem(), className])}
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
