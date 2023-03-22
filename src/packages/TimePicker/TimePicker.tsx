import React, { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { Clock, Hand, HandCircle } from './TimePicker.styled'
import { getAngelValues } from '../../utils/timePicker'
import CalendarProvider from '../CalendarProvider/CalendarProvider'
import Hours from './components/Hour/Hour'
import type { TimePickerProps } from './TimePicker.types'
import localeCache from '../../utils/locale'
import CalendarWrapper from '../../components/CalendarWrapper'

export const TimePicker = (props: TimePickerProps) => {
  const { defaultValue, onChange, round = 'roundX2', locale = 'fa' } = props
  useMemo(() => localeCache.setLocale(locale), [locale])
  const time = defaultValue !== undefined ? dayjs(defaultValue).locale(locale) : dayjs().locale(locale).startOf('date')
  const [selecting, setSelecting] = useState<boolean>(false)
  const [selectingHour, setSelectingHour] = useState<boolean>(false)
  const [isInsideHour, setInsideHour] = useState<boolean>(false)
  const [hour, setHour] = useState<number>(parseInt(time.format('HH'), 10))
  const [minute, setMinute] = useState<number>(parseInt(time.format('MM'), 10))

  const handleChangeMinute = (e: React.MouseEvent | React.TouchEvent) => {
    const { value } = getAngelValues(e, 6)
    setMinute(value)
  }
  const handleChangeHour = (e: React.MouseEvent | React.TouchEvent) => {
    const { value, delta } = getAngelValues(e)
    if (Math.round(delta) < 85) {
      setInsideHour(true)
    } else {
      setInsideHour(false)
    }
    setHour(value)
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!selecting) {
      return
    }
    if (selectingHour) {
      return handleChangeHour(e)
    }
    return handleChangeMinute(e)
  }
  const handleSelecting = (e: React.MouseEvent | React.TouchEvent) => {
    setSelecting(true)
    if (selectingHour) {
      return handleChangeHour(e)
    } else {
      return handleChangeMinute(e)
    }
  }
  const handleMouseUp = () => {
    if (selectingHour && typeof onChange === 'function') {
      onChange({
        hour,
        minute
      })
    }
    setSelecting(false)
    setSelectingHour(true)
  }

  return (
    <CalendarProvider
      accentColor={props.accentColor}
      round={round}
    >
      <CalendarWrapper>
        <div>
          {hour}:{minute}
        </div>
        <Clock
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseDown={handleSelecting}
          onTouchMove={handleSelecting}
          onTouchEnd={handleMouseUp}
        >
          <Hand
            value={selectingHour ? hour : minute}
            hour={hour}
            minute={minute}
            isSelectingHour={selectingHour}
            isInsideHour={isInsideHour}
          >
            <HandCircle isSelectingHour={selectingHour} />
          </Hand>
          <Hours
            hour={hour}
            minute={minute}
            insideHour={isInsideHour}
            hourSelecting={selectingHour}
          />
        </Clock>
      </CalendarWrapper>
    </CalendarProvider>
  )
}

export default TimePicker
