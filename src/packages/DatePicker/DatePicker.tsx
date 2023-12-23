import React, { useMemo, useRef, useState } from 'react'
import RenderCalendar from '../../components/RenderCalendar'
import Calendar from '../Calendar'
import useClickOutside from '../../hooks/useClickOutside'
import formatDate from '../../utils/format'
import locales from '../../utils/locales'
import type { DatePickerProps } from './DatePicker.types'
import CalendarProvider from '../CalendarProvider/CalendarProvider'
import localeCache from '../../utils/locale'
import type { OnChangePayload } from '../Calendar/Calendar.types'

export const DatePicker = (props: DatePickerProps) => {
  const {
    defaultValue,
    locale = 'fa',
    weekends = [],
    direction = 'rtl',
    accentColor
  } = props
  useMemo(() => localeCache.setLocale(locale), [locale])
  // refs
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // states
  const [value, setValue] = useState<Date | undefined>(
    defaultValue !== undefined ? new Date(defaultValue) : undefined
  )
  const [from, setFrom] = useState<Date | undefined>(
    props.range === true && props.from !== undefined
      ? new Date(props.from)
      : undefined
  )
  const [to, setTo] = useState<Date | undefined>(
    props.range === true && props.to !== undefined
      ? new Date(props.to)
      : undefined
  )
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  // hooks
  useClickOutside(containerRef, () => setShowCalendar(false))
  // handlers
  const toggleShowCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const handleChangeDay = (e: OnChangePayload) => {
    if (props.range === true && typeof props.onChange === 'function') {
      const from = 'from' in e ? e.from : new Date()
      const to = 'to' in e ? e.to : new Date()
      setFrom(from)
      setTo(to)

      props.onChange({
        from,
        to
      })
    } else if (
      (props.range === false || props.range === undefined) &&
      typeof props.onChange === 'function'
    ) {
      const value = 'value' in e ? e.value : new Date()
      setValue(value)

      props.onChange({
        value
      })
    }
  }

  const getInputValue = useMemo(() => {
    const format = props?.customShowDateFormat ?? locales[locale].format
    if (props.range === undefined && value !== undefined) {
      return formatDate(value, format)
    }
    console.log('from >>', from)
    if (from !== undefined && to !== undefined) {
      return `
        ${formatDate(from, format)}
        -
        ${formatDate(to, format)}
      `
    }
    return ''
  }, [value, from, to])
  return (
    <CalendarProvider
      accentColor={accentColor}
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
          from={props.range === true ? props.from : undefined}
          to={props.range === true ? props.to : undefined}
        />
      </RenderCalendar>
    </CalendarProvider>
  )
}

export default DatePicker
