import React, { useMemo, useRef, useState } from 'react'
import { Days, SlideDays, Wrapper, WrapperDays } from './DaysPicker.styled'
import Header from '../Header'
import { useSlideCalendar } from '../../hooks/useSlideCalendar'
import CalendarItem from '../CalendarItem'
import { sameDay } from '../../utils/dateHelper/dateHelper'
import formatDate from '../../utils/format'
import getDays from '../../utils/month'
import type { DaysInMonth } from '../../utils/month/month.types'
import type { DaysPickerProps } from './DaysPicker.types'

const DaysPicker = React.forwardRef<HTMLDivElement, DaysPickerProps>((props, ref) => {
  const { value, round, onChange } = props
  const getAllDays = useMemo(() => getDays({ date: value }), [])
  const [days, setDays] = useState<DaysInMonth[]>([getAllDays])
  const daysElementRefs = useRef<HTMLDivElement[]>([])

  const handlers =
    useSlideCalendar({ daysElementRefs, value, days, setDays })
  return (
    <Wrapper round={round} ref={ref}>
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
                          key={day.date.getTime()}
                          data-disabled={day.disabled}
                          data-selected={sameDay(value, day.date)}
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

DaysPicker.displayName = 'DaysPicker'

export default DaysPicker
