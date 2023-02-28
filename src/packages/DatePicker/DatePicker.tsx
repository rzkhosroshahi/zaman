import React, { useRef, useState } from 'react'
import moment from 'jalali-moment'
import FloatingElement from '../../components/FloatingElement'
import { daysInMonth, type IDaysInMonth } from '../../utils/daysInMonth'
import { Container, SlideDays, Wrapper, WrapperDays, Days, Day } from './DatePicker.styled'
import { useSlideCalendar } from '../../hooks/useSlideCalendar'
import type { DatePickerProps } from './DatePicker.types'
import { type DatePickerValue, type IDays } from '../../types'
import { chunk } from '../../utils/chunk'

export const DatePicker = (props: DatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [value, setValue] = useState<DatePickerValue>(props.value !== undefined ? props.value : new Date())
  const today = useRef(daysInMonth(moment(value)))
  const [days, setDays] = useState<IDaysInMonth[]>([today.current])
  const daysElementRefs = useRef<HTMLDivElement[]>([])
  const handlers =
    useSlideCalendar({ daysElementRefs, days, setDays, value })

  return (
    <div>
      <button onClick={handlers.slideToPrevMonth}>{'<'}</button>
      <input ref={inputRef} onClick={() => { setShowCalendar(true) }} type="text" value={moment(value).format('jYYYY/jMM/jDD')} />
      <button onClick={handlers.slideToTheNextMonth}> {'>'} </button>
      { showCalendar
        ? <FloatingElement destinationRef={inputRef}>
            <Container>
              <Wrapper>
                {days[0].monthName}
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
                                (weeks as IDays[]).map((day) => (<Day key={day.utc}>{day.day}</Day>))
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

export default DatePicker
