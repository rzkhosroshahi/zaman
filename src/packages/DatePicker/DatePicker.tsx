import React, { useMemo, useRef, useState } from 'react'
import { ThemeProvider } from '@emotion/react'
import RenderCalendar from '../../components/RenderCalendar'
import DaysPicker from '../../components/DaysPicker'
import useClickOutside from '../../hooks/useClickOutside'
import { makeColorPallet } from '../../style/colorPallete'
import formatDate from '../../utils/format'
import localeCache from '../../utils/locale'
import locales from '../../utils/locales'
import { ACCENT_COLOR } from '../../constants'
import { gray } from '../../style/colors'
import type { DatePickerProps } from './DatePicker.types'

export const DatePicker = (props: DatePickerProps) => {
  const { defaultValue, onChange, round = 'thin', accentColor = ACCENT_COLOR, locale = 'fa' } = props
  // memos
  const prColors = useMemo(() => makeColorPallet(accentColor), [])
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
  const theme = {
    colors: {
      primary: prColors,
      gray
    },
    round
  }
  return (
    <ThemeProvider theme={theme}>
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
          round={round}
          value={value}
          ref={containerRef}
          onChange={handleSelectDay}
        />
      </RenderCalendar>
    </ThemeProvider>
  )
}

export default DatePicker
