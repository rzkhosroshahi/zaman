import React, { useMemo, useRef, useState } from 'react'
import RenderCalendar from '../../components/RenderCalendar'
import {
  Clock,
  ClockTime,
  ClockTimeWrapper,
  Hand,
  HandCircle,
  Time,
  TimeWrapper
} from './TimePicker.styled'
import CalendarProvider from '../CalendarProvider/CalendarProvider'
import Numbers from './components/Numbers'
import type { TimePickerProps } from './TimePicker.types'
import localeCache from '../../utils/locale'
import CalendarWrapper from '../../components/CalendarWrapper'
import { localizeNumber } from '../../utils'
import locales from '../../utils/locales'
import useClickOutside from '../../hooks/useClickOutside'
import { useTimePicker } from '../../hooks/useTimePicker'

export const TimePicker = (props: TimePickerProps) => {
  const {
    defaultValue,
    onChange,
    round = 'x2',
    locale = 'fa',
    clockTime = 24,
    closeOneTimeChange = false
  } = props
  useMemo(() => localeCache.setLocale(locale), [locale])

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [showTimePicker, setShowTimePicker] = useState<boolean>(false)
  const [timeConvention, setTimeConvention] = useState<'am' | 'pm'>('am')

  useClickOutside(containerRef, () => setShowTimePicker(false))

  const toggleShowTimePicker = () => {
    setShowTimePicker(!showTimePicker)
  }

  const {
    hour,
    minute,
    isInsideHour,
    selectingHour,
    handleMouseMove,
    handleMouseUp,
    handleSelecting
  } = useTimePicker({
    defaultValue,
    clockTime,
    timeConvention,
    onChange,
    closeOneTimeChange,
    closeTimePicker: toggleShowTimePicker
  })

  const getInputValue = useMemo(() => {
    return `${hour}:${minute}`
  }, [hour, minute])

  return (
    <CalendarProvider accentColor={props.accentColor} round={round}>
      <input
        ref={inputRef}
        {...props?.inputAttributes}
        onClick={toggleShowTimePicker}
        type="text"
        value={getInputValue}
        className={props.inputClass !== null ? props.inputClass : ''}
        readOnly
      />
      <RenderCalendar
        handleClose={toggleShowTimePicker}
        showCalendar={showTimePicker}
        destinationRef={inputRef}
      >
        <CalendarWrapper ref={containerRef}>
          <TimeWrapper>
            {clockTime === 12 ? (
              <ClockTimeWrapper>
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
            ) : null}
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
      </RenderCalendar>
    </CalendarProvider>
  )
}

export default TimePicker
