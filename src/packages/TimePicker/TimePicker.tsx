import React, { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { Clock, ClockTime, ClockTimeWrapper, Hand, HandCircle, Time, TimeWrapper } from './TimePicker.styled'
import { getAngelValues } from '../../utils/timePicker'
import CalendarProvider from '../CalendarProvider/CalendarProvider'
import Numbers from './components/Numbers'
import type { TimePickerProps } from './TimePicker.types'
import localeCache from '../../utils/locale'
import CalendarWrapper from '../../components/CalendarWrapper'
import { localizeNumber } from '../../utils'
import locales from '../../utils/locales'

export const TimePicker = (props: TimePickerProps) => {
  const { defaultValue, onChange, round = 'roundX2', locale = 'fa', clockTime = 24 } = props
  useMemo(() => localeCache.setLocale(locale), [locale])
  const time = defaultValue !== undefined ? dayjs(defaultValue).locale(locale) : dayjs().locale(locale).startOf('date')
  const [selecting, setSelecting] = useState<boolean>(false)
  const [selectingHour, setSelectingHour] = useState<boolean>(false)
  const [isInsideHour, setInsideHour] = useState<boolean>(false)
  const [hour, setHour] = useState<number>(parseInt(time.format('HH'), 10))
  const [minute, setMinute] = useState<number>(parseInt(time.format('MM'), 10))
  const [timeConvention, setTimeConvention] = useState<'am' | 'pm'>('am')
  const handleChangeMinute = (e: React.MouseEvent | React.TouchEvent) => {
    const { value } = getAngelValues(e, 6)
    setMinute(value)
  }
  const handleChangeHour = (e: React.MouseEvent | React.TouchEvent) => {
    const { value, delta } = getAngelValues(e)
    if (clockTime === 24) {
      if (Math.round(delta) < 85) {
        setInsideHour(true)
      } else {
        setInsideHour(false)
      }
      setHour(value + 12)
      return
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
    if (selectingHour) {
      if (typeof onChange === 'function') {
        onChange({
          hour,
          minute,
          ...(clockTime === 12 && { timeConvention })
        })
      }
      setSelecting(false)
      setSelectingHour(false)
      setInsideHour(false)
      return
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
        <TimeWrapper>
          {
            clockTime === 12
              ? <ClockTimeWrapper>
                <ClockTime
                  className={timeConvention === 'am' ? 'cl_selected' : ''}
                  onClick={() => setTimeConvention('am')}
                >
                  {locales[locale].am}
                </ClockTime>
                <ClockTime
                  className={timeConvention === 'pm' ? 'cl_selected' : ''}
                  onClick={() => setTimeConvention('pm')}
                >
                  {locales[locale].pm}
                </ClockTime>
              </ClockTimeWrapper>
              : null
          }
          <Time>
            {localizeNumber(hour)}:{localizeNumber(minute)}
          </Time>
        </TimeWrapper>
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
          <Numbers
            insideHour={isInsideHour}
            hourSelecting={selectingHour}
            clockTime={clockTime}
          />
        </Clock>
      </CalendarWrapper>
    </CalendarProvider>
  )
}

export default TimePicker
