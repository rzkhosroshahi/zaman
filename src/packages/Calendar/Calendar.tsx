import React, { useMemo, useRef, useState } from 'react'
import { Days, SlideDays, Wrapper, WrapperDays } from './Calendar.styled'
import Header from '../../components/Header'
import { useSlideCalendar } from '../../hooks/useSlideCalendar'
import CalendarItem from '../../components/CalendarItem'
import { sameDay } from '../../utils/dateHelper/dateHelper'
import formatDate from '../../utils/format'
import getDays from '../../utils/month'
import type { DaysInMonth } from '../../utils/month/month.types'
import type { CalendarProps } from './Calendar.types'

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
  const { value, onChange, weekends } = props
  const getAllDays = useMemo(() => getDays({ date: value }), [])
  const [days, setDays] = useState<DaysInMonth[]>([getAllDays])
  const daysElementRefs = useRef<HTMLDivElement[]>([])

  const handlers =
    useSlideCalendar({ daysElementRefs, value, days, setDays })
  return (
    <Wrapper ref={ref}>
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
                      week.map((day, idx) => (
                        <CalendarItem
                          key={day.date.getTime()}
                          data-disabled={day.disabled}
                          data-selected={sameDay(value, day.date)}
                          data-weekend={weekends.some(wDay => wDay === idx)}
                          onClick={() => onChange(day.date, day.disabled)}
                        >
                          {formatDate(day.date, 'DD')}
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
  )
})

Calendar.displayName = 'Calendar'

export default Calendar
