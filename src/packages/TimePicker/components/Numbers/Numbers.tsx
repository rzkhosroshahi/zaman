import React from 'react'
import { hours, hours24, minutes } from '../../../../utils/timePicker'
import { MinuteWithAnimation, NumbersItem } from './Numbers.styled'
import { localizeNumber } from '../../../../utils'
import type { NumbersProps } from './Numbers.types'

export const Hours = (props: NumbersProps) => {
  const { insideHour, hourSelecting, clockTime } = props
  if (!hourSelecting) {
    return (
      <MinuteWithAnimation>
        {minutes.map((m, i) => (
          <NumbersItem key={m} idx={i}>
            {localizeNumber(m)}
          </NumbersItem>
        ))}
      </MinuteWithAnimation>
    )
  }
  if (clockTime === 12) {
    return (
      <>
        {hours.map((h, i) => (
          <NumbersItem
            key={h}
            idx={i}
            style={{ opacity: !insideHour ? 1 : 0.3 }}
          >
            {localizeNumber(h)}
          </NumbersItem>
        ))}
      </>
    )
  }
  return (
    <>
      {hours.map((h, i) => (
        <NumbersItem
          key={h}
          idx={i}
          top="15%"
          clockHalfWidth={85}
          numbersPadd={10}
          style={{ opacity: insideHour ? 1 : 0.3 }}
        >
          {localizeNumber(h)}
        </NumbersItem>
      ))}
      {hours24.map((h, i) => (
        <NumbersItem key={h} idx={i} style={{ opacity: !insideHour ? 1 : 0.3 }}>
          {localizeNumber(h)}
        </NumbersItem>
      ))}
    </>
  )
}

export default Hours
