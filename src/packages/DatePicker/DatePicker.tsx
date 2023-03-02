import React, { useMemo, useRef, useState } from 'react'
import moment from 'jalali-moment'
import { ThemeProvider } from '@emotion/react'
import Header from '../../components/Header'
import CalendarItem from '../../components/CalendarItem'
import RenderCalendar from '../../components/RenderCalendar'
import useClickOutside from '../../hooks/useClickOutside'
import { useSlideCalendar } from '../../hooks/useSlideCalendar'
import { daysInMonth, getMomentFormatted, type IDaysInMonth } from '../../utils/daysInMonth'
import { chunk } from '../../utils/chunk'
import { faNumber } from '../../utils'
import { Days, SlideDays, Wrapper, WrapperDays } from './DatePicker.styled'
import { makeColorPallet } from '../../style/colorPallete'
import { ACCENT_COLOR } from '../../constants'
import type { DatePickerProps, Theme } from './DatePicker.types'
import type { DatePickerValue, IDays } from '../../types'

export const DatePicker = (props: DatePickerProps) => {
  const { defaultValue, onChange, round = 'thin', accentColor = ACCENT_COLOR } = props
  const colors = useMemo(() => makeColorPallet(accentColor), [])

  // refs
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const daysElementRefs = useRef<HTMLDivElement[]>([])
  // states
  const [value, setValue] = useState<DatePickerValue>(defaultValue !== undefined ? defaultValue : new Date())
  const [days, setDays] = useState<IDaysInMonth[]>([daysInMonth(value)])
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  // hooks
  const handlers =
    useSlideCalendar({ daysElementRefs, days, setDays, value })
  useClickOutside(containerRef, () => setShowCalendar(false))
  // handlers
  const toggleShowCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const handleSelectDay = (day: IDays) => {
    if (day.disable) {
      return
    }

    setValue(day.utc)
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
        value={moment(value).format('jYYYY/jMM/jDD')}
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
              days.map((day, idx) => (
                <SlideDays
                  key={day.id}
                  className="item"
                  ref={(el: HTMLDivElement) => { daysElementRefs.current[idx] = el }}
                >
                  {
                    chunk(day.days, 7).map((weeks, id) => (
                      <Days key={id}>
                        {
                          (weeks as IDays[]).map((day) => (
                            <CalendarItem
                              key={day.utc}
                              selected={getMomentFormatted(value) === day.faDate}
                              disabled={day.disable}
                              onClick={() => handleSelectDay(day)}
                            >
                              {faNumber(day.day)}
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
