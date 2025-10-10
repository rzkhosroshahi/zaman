import { useMemo, useRef, useState } from 'react'

import CalendarWrapper from '@components/layout/calendar-wrapper'
import RenderCalendar from '@components/pickers/render-calendar'

import CalendarProvider from '@packages/calendar-provider'

import useClickOutside from '@hooks/useClickOutside'
import { useTimePicker } from '@hooks/useTimePicker'

import { localizeNumber } from '@utils/index'
import localeCache from '@utils/locale'
import locales from '@utils/locales'

import Numbers from './components/numbers'
import {
  Clock,
  ClockTime,
  ClockTimeWrapper,
  Hand,
  HandCircle,
  Time,
  TimeWrapper
} from './sub-components'

import type { TimePickerProps } from './time-picker.types'

export const TimePicker = (props: TimePickerProps) => {
  const {
    defaultValue,
    onChange,
    round = 'x2',
    locale = 'fa',
    clockTime = 24
  } = props

  useMemo(() => localeCache.setLocale(locale), [locale])

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [timeConvention, setTimeConvention] = useState<'am' | 'pm'>('am')

  useClickOutside(containerRef, () => setShowCalendar(false))
  const toggleShowCalendar = () => {
    setShowCalendar(!showCalendar)
  }
  const {
    hour,
    minute,
    isInsideHour,
    selectingHour,
    handleMouseMove,
    handleMouseUp,
    handleSelecting
  } = useTimePicker({ defaultValue, clockTime, timeConvention, onChange })

  const getInputValue = useMemo(() => {
    return `${hour}:${minute}`
  }, [hour, minute])

  return (
    <CalendarProvider accentColor={props.accentColor} round={round}>
      <input
        ref={inputRef}
        {...props.inputAttributes}
        onClick={toggleShowCalendar}
        type="text"
        value={getInputValue}
        className={props.inputClass ?? ''}
        readOnly
        aria-label={props.inputAttributes?.['aria-label'] ?? 'Select time'}
        aria-expanded={showCalendar}
        aria-haspopup="dialog"
        role="combobox"
      />
      <RenderCalendar
        toggleOpen={toggleShowCalendar}
        showCalendar={showCalendar}
        destinationRef={inputRef}
      >
        <CalendarWrapper ref={containerRef}>
          <TimeWrapper>
            {clockTime === 12 ? (
              <ClockTimeWrapper>
                <ClockTime
                  className={timeConvention === 'am' ? 'cl_selected' : ''}
                  onClick={() => setTimeConvention('am')}
                  aria-label="AM"
                  aria-pressed={timeConvention === 'am'}
                >
                  {locales[locale].am}
                </ClockTime>
                <ClockTime
                  className={timeConvention === 'pm' ? 'cl_selected' : ''}
                  onClick={() => setTimeConvention('pm')}
                  aria-label="PM"
                  aria-pressed={timeConvention === 'pm'}
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
            role="slider"
            aria-label="Time picker clock"
            tabIndex={0}
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
