import React, { useMemo, useRef, useState } from 'react'
import { ThemeProvider } from '@emotion/react'
import Header from '../../components/Header'
import CalendarItem from '../../components/CalendarItem'
import RenderCalendar from '../../components/RenderCalendar'
import useClickOutside from '../../hooks/useClickOutside'
import { useSlideCalendar } from '../../hooks/useSlideCalendar'
import { Days, SlideDays, Wrapper, WrapperDays } from './DatePicker.styled'
import { makeColorPallet } from '../../style/colorPallete'
import { ACCENT_COLOR } from '../../constants'
import type { DatePickerProps, Theme } from './DatePicker.types'
import type { DatePickerValue } from '../../types'
import getDays from '../../utils/month'
import formatDate from '../../utils/format'
import { type DaysInMonth } from '../../utils/month/month.types'
import { sameDay, sameMonth } from '../../utils/dateHelper/dateHelper'
import localeCache from '../../utils/locale'

export const DatePicker = (props: DatePickerProps) => {
  const { defaultValue, onChange, round = 'thin', accentColor = ACCENT_COLOR, locale = 'fa' } = props
  const colors = useMemo(() => makeColorPallet(accentColor), [])
  useMemo(() => localeCache.setLocale(locale), [locale])
  // refs
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const daysElementRefs = useRef<HTMLDivElement[]>([])
  // states
  const [value, setValue] = useState<DatePickerValue>(defaultValue !== undefined ? defaultValue : new Date())
  const [days, setDays] = useState<DaysInMonth[]>([getDays({ date: value })])
  const [showCalendar, setShowCalendar] = useState<boolean>(false)

  // hooks
  const handlers =
    useSlideCalendar({ daysElementRefs, value, days, setDays })
  useClickOutside(containerRef, () => setShowCalendar(false))
  // handlers
  const toggleShowCalendar = () => {
    setShowCalendar(!showCalendar)
  }
  const handleSelectDay = (day: Date) => {
    setValue(day)
    console.log('day >>', day)
    if (typeof onChange === 'function') {
      onChange(day)
    }
    return day
  }
  const theme: Theme = { colors, round }
  return (
    <ThemeProvider theme={theme}>
      <input
        ref={inputRef}
        onClick={toggleShowCalendar}
        type="text"
        value={formatDate(value as Date, 'YYYY/MM/DD')}
        readOnly
      />
      <RenderCalendar
        toggleOpen={toggleShowCalendar}
        showCalendar={showCalendar}
        destinationRef={inputRef}
      >
        <Wrapper round={round} ref={containerRef}>
          <Header
            monthName={days[0].monthName}
            onNextClick={handlers.slideToTheNextMonth}
            onPrevClick={handlers.slideToPrevMonth}
          />
          <WrapperDays>
            {
              days.map((weeks, idx) => (
                <SlideDays
                  key={weeks.id}
                  className="item"
                  ref={(el: HTMLDivElement) => { daysElementRefs.current[idx] = el }}
                >
                  {
                    weeks.weeks.map((week, id) => (
                      <Days key={id}>
                        {
                          week.map((day) => (
                            <CalendarItem
                              key={day.getTime()}
                              selected={sameDay(value as Date, day)}
                              disabled={!sameMonth(weeks.firstDayOfMonth, day)}
                              onClick={() => handleSelectDay(day)}
                            >
                              {formatDate(day, 'DD')}
                            </CalendarItem>
                          ))
                        }
                      </Days>
                    ))
                  }
                </SlideDays>
              ))
            }
          </WrapperDays>
        </Wrapper>
      </RenderCalendar>
    </ThemeProvider>
  )
}

export default DatePicker
