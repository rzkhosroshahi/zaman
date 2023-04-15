import React, { useMemo, useRef, useState } from 'react'
import RenderCalendar from '../../components/RenderCalendar'
import Calendar from '../Calendar'
import useClickOutside from '../../hooks/useClickOutside'
import formatDate from '../../utils/format'
import locales from '../../utils/locales'
import type { DatePickerProps } from './DatePicker.types'
import CalendarProvider from '../CalendarProvider/CalendarProvider'
import localeCache from '../../utils/locale'

export const DatePicker = (props: DatePickerProps) => {
  const { defaultValue, onChange, locale = 'fa', weekends = [], direction = 'rtl' } = props
  useMemo(() => localeCache.setLocale(locale), [locale])
  // refs
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // states
  const [value, setValue] = useState<Date>(defaultValue !== undefined ? new Date(defaultValue) : new Date())
  const [from, setFrom] = useState<Date | undefined>(props.from !== undefined ? new Date(props.from) : undefined)
  const [to, setTo] = useState<Date | undefined>(props.to !== undefined ? new Date(props.to) : undefined)
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  // hooks
  useClickOutside(containerRef, () => setShowCalendar(false))
  // handlers
  const toggleShowCalendar = () => {
    setShowCalendar(!showCalendar)
  }
  const handleSelectDay = (day: Date) => {
    setValue(day)
    if (typeof onChange === 'function') {
      onChange({
        value: day
      })
    }
    return day
  }
  const handleSelectRange = (from: Date, to: Date) => {
    if (typeof onChange === 'function') {
      onChange({
        from,
        to
      })
    }
    setFrom(from)
    setTo(to)
  }
  const handleChangeDay = (start: Date, to?: Date) => {
    if (props.range === true && to !== undefined) {
      return handleSelectRange(start, to)
    }
    handleSelectDay(start)
  }

  const getInputValue = useMemo(() => {
    if (props.range === undefined) {
      return formatDate(value, locales[locale].format)
    }
    if (from !== undefined && to !== undefined) {
      return `
        ${formatDate(from, locales[locale].format)}
        -
        ${formatDate(to, locales[locale].format)}
      `
    }
    return ''
  }, [value, from, to])
  return (
    <CalendarProvider
      accentColor={props.accentColor}
      round={props.round}
      direction={direction}
    >
      <input
        ref={inputRef}
        {...props?.inputAttributes}
        onClick={toggleShowCalendar}
        type="text"
        value={getInputValue}
        className={props.inputClass !== null ? props.inputClass : ''}
        readOnly
      />
      <RenderCalendar
        toggleOpen={toggleShowCalendar}
        showCalendar={showCalendar}
        destinationRef={inputRef}
      >
        <Calendar
          defaultValue={value}
          ref={containerRef}
          className={props.className}
          weekends={weekends}
          onChange={handleChangeDay}
          range={props.range}
          from={props.from}
          to={props.to}
        />
      </RenderCalendar>
    </CalendarProvider>
  )
}

export default DatePicker
