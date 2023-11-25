import React, { useMemo, useRef, useState } from 'react'
import RenderCalendar from '../../components/RenderCalendar'
import Calendar from '../Calendar'
import useClickOutside from '../../hooks/useClickOutside'
import formatDate from '../../utils/format'
import locales from '../../utils/locales'
import type { DatePickerProps } from './DatePicker.types'
import CalendarProvider from '../CalendarProvider/CalendarProvider'
import localeCache from '../../utils/locale'
import type { onDatePickerChangePayload, onRangeDatePickerChangePayload, onChangePayload } from '../../types'

export const DatePicker = (props: DatePickerProps) => {
  const { defaultValue, onChange, locale = 'fa', weekends = [], direction = 'rtl' } = props
  useMemo(() => localeCache.setLocale(locale), [locale])
  // refs
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // states
  const [value, setValue] = useState<Date | undefined>(defaultValue !== undefined ? new Date(defaultValue) : undefined)
  const [from, setFrom] = useState<Date | undefined>(props.from !== undefined ? new Date(props.from) : undefined)
  const [to, setTo] = useState<Date | undefined>(props.to !== undefined ? new Date(props.to) : undefined)
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  // hooks
  useClickOutside(containerRef, () => setShowCalendar(false))
  // handlers
  const toggleShowCalendar = () => {
    setShowCalendar(!showCalendar)
  }
  const handleSelectDay = ({ value }: onDatePickerChangePayload) => {
    setValue(value)
    if (typeof onChange === 'function') {
      onChange({
        value
      })
    }
    return {
      value
    }
  }
  const handleSelectRange = ({ from, to }: onRangeDatePickerChangePayload) => {
    if (typeof onChange === 'function') {
      onChange({
        from,
        to
      })
    }
    setFrom(from)
    setTo(to)
  }
  const handleChangeDay = (value: onChangePayload) => {
    if (props.range === true && to !== undefined) {
      return handleSelectRange({
        from: 'from' in value ? value.from : new Date(),
        to: 'to' in value ? value.to : new Date()
      })
    }
    if ('value' in value) {
      handleSelectDay({
        value: value.value
      })
    }
  }

  const getInputValue = useMemo(() => {
    if (value === undefined) {
      return ''
    }
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
        position={props.position}
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
