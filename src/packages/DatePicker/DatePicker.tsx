import React, { useMemo, useRef, useState } from 'react'
import RenderCalendar from '../../components/RenderCalendar'
import DaysPicker from '../../components/DaysPicker'
import useClickOutside from '../../hooks/useClickOutside'
import formatDate from '../../utils/format'
import locales from '../../utils/locales'
import type { DatePickerProps } from './DatePicker.types'
import CalendarProvider from '../CalendarProvider/CalendarProvider'
import localeCache from '../../utils/locale'

export const DatePicker = (props: DatePickerProps) => {
  const { defaultValue, onChange, round = 'thin', locale = 'fa', weekends = [6] } = props
  useMemo(() => localeCache.setLocale(locale), [locale])
  // refs
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // states
  const [value, setValue] = useState<Date>(defaultValue !== undefined ? new Date(defaultValue) : new Date())
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  // hooks
  useClickOutside(containerRef, () => setShowCalendar(false))
  // handlers
  const toggleShowCalendar = () => {
    setShowCalendar(!showCalendar)
  }
  const handleSelectDay = (day: Date, disabled: boolean) => {
    if (disabled) {
      return
    }
    setValue(day)
    if (typeof onChange === 'function') {
      onChange(day)
    }
    return day
  }
  return (
    <CalendarProvider
      accentColor={props.accentColor}
      round={props.round}
    >
      <input
        ref={inputRef}
        onClick={toggleShowCalendar}
        type="text"
        value={formatDate(value, locales[locale].format)}
        readOnly
      />
      <RenderCalendar
        toggleOpen={toggleShowCalendar}
        showCalendar={showCalendar}
        destinationRef={inputRef}
      >
        <DaysPicker
          value={value}
          round={round}
          ref={containerRef}
          weekends={weekends}
          onChange={handleSelectDay}
        />
      </RenderCalendar>
    </CalendarProvider>
  )
}

export default DatePicker
