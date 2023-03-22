import React from 'react'
import { hours, hours24, minutes } from '../../../../utils/timePicker'
import { MinuteWithAnimation, Numbers } from './Hour.styled'
import { localizeNumber } from '../../../../utils'

const convertNumberValue = (n: number) => {
  if (n === 24 || n === 0) {
    return '۰۰'
  }

  return localizeNumber(n)
}

export const Hours: React.FunctionComponent<{
  insideHour: boolean
  hourSelecting: boolean
  hour: number
  minute: number
}> = ({ insideHour, hourSelecting, minute, hour }) => {
  if (!hourSelecting) {
    return (
      <MinuteWithAnimation>
        {minutes.map((m, i) => (
          <Numbers key={m} idx={i}>
            {convertNumberValue(m)}
          </Numbers>
        ))}
      </MinuteWithAnimation>
    )
  }
  return (
    <React.Fragment>
      {hours.map((h, i) => (
        <Numbers
          key={h}
          idx={i}
          top="15%"
          clockHalfWidth={85}
          numbersPadd={10}
          style={{ opacity: insideHour ? 1 : 0.3 }}
        >
          {convertNumberValue(h)}
        </Numbers>
      ))}
      {hours24.map((h, i) => (
        <Numbers key={h} idx={i} style={{ opacity: !insideHour ? 1 : 0.3 }}>
          {convertNumberValue(h)}
        </Numbers>
      ))}
    </React.Fragment>
  )
}

export default Hours
