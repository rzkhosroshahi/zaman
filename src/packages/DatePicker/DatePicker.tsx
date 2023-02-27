import React, { useRef, useState } from 'react'
import moment from 'jalali-moment'
import FloatingElement from '../../components/FloatingElement'
import { daysInMonth, type IDaysInMonth } from '../../utils/daysInMonth'
import { Container, Day, Wrapper, WrapperDays } from './DatePicker.styled'
import { useSlideCalendar } from '../../hooks/useSlideCalendar'

export const DatePicker = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const today = useRef(daysInMonth(moment()))
  const [days, setDays] = useState<IDaysInMonth[]>([today.current])
  const daysElementRefs = useRef<HTMLDivElement[]>([])
  const handlers =
    useSlideCalendar({ daysElementRefs, days, setDays })

  return (
    <div>
      <button onClick={handlers.slideToPrevMonth}>{'<'}</button>
      <input ref={inputRef} type="text" onClick={() => { setShowCalendar(true) }} />
      <button onClick={handlers.slideToTheNextMonth}> {'>'} </button>
      { showCalendar
        ? <FloatingElement destinationRef={inputRef}>
            <Container>
              <Wrapper>
                <WrapperDays>
                  {
                    days.map((day, idx) => (
                      <Day
                        key={day.id}
                        className="item"
                        ref={(el: HTMLDivElement) => { daysElementRefs.current[idx] = el }}
                      >
                        {day.monthName}
                      </Day>
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
