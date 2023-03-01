import React, { useRef, useState } from 'react'
import moment from 'jalali-moment'
import FloatingElement from '../../components/FloatingElement'
import { daysInMonth, getMomentFormatted, type IDaysInMonth } from '../../utils/daysInMonth'
import { useSlideCalendar } from '../../hooks/useSlideCalendar'
import type { DatePickerProps } from './DatePicker.types'
import type { DatePickerValue, IDays } from '../../types'
import { chunk } from '../../utils/chunk'
import { faNumber } from '../../utils'
import { Container, SlideDays, Wrapper, WrapperDays, Days, Header, HeaderTitle, SubHeader } from './DatePicker.styled'
import CalendarItem from '../../components/CalendarItem'

export const DatePicker = (props: DatePickerProps) => {
  const { defaultValue, onChange } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const daysElementRefs = useRef<HTMLDivElement[]>([])

  const [value, setValue] = useState<DatePickerValue>(defaultValue !== undefined ? defaultValue : new Date())
  const [days, setDays] = useState<IDaysInMonth[]>([daysInMonth(value)])
  const [showCalendar, setShowCalendar] = useState<boolean>(false)

  const handlers =
    useSlideCalendar({ daysElementRefs, days, setDays, value })

  const handleSelectDay = (day: IDays) => {
    setValue(day.utc)

    if (typeof onChange === 'function') {
      onChange(day)
    }
    setShowCalendar(false)
    return day
  }
  return (
    <div>
      <button onClick={handlers.slideToPrevMonth}>{'<'}</button>
      <input
        ref={inputRef}
        onClick={() => setShowCalendar(true)}
        type="text"
        value={moment(value).format('jYYYY/jMM/jDD')}
        readOnly
      />
      <button onClick={handlers.slideToTheNextMonth}> {'>'} </button>
      { showCalendar
        ? <FloatingElement destinationRef={inputRef}>
            <Container>
              <Wrapper>
                <Header>
                  <HeaderTitle>
                    {days[0].monthName}
                  </HeaderTitle>
                </Header>
                <SubHeader />
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
            </Container>
        </FloatingElement>
        : null }
    </div>
  )
}

DatePicker.defaultProps = {
  locale: 'fa'
}

export default DatePicker
