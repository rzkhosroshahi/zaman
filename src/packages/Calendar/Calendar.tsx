import React, { type ForwardedRef, forwardRef, useMemo, useRef, useState } from 'react'
import { Days, SlideDays, SubHeader, Wrapper, WrapperDays } from './Calendar.styled'
import Header from '../../components/Header'
import { useSlideCalendar } from '../../hooks/useSlideCalendar'
import CalendarItem from '../../components/CalendarItem'
import { isInBetween, sameDay, selectMonth, selectYear } from '../../utils/dateHelper/dateHelper'
import formatDate from '../../utils/format'
import getDays from '../../utils/month'
import MonthPicker from '../../components/MonthPicker'
import YearPicker from '../../components/YearPicker'
import { DayName } from '../../components/Header/Header.styled'
import locales from '../../utils/locales'
import localeCache from '../../utils/locale'
import type { DaysInMonth } from '../../utils/month/month.types'
import type { CalendarProps } from './Calendar.types'
import type { Pickers } from '../../types'
import useCalendarHandlers from '../../hooks/useCalendarHandlers'
import { CalendarText } from '../../components/CalendarItem/CalendarItem.styled'

const Calendar = (props: CalendarProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { locale } = localeCache
  const { value, onChange, weekends, range = false } = props
  // memo
  const getAllDays = useMemo(() => getDays({ date: value }), [])
  // states
  const [days, setDays] = useState<DaysInMonth[]>([getAllDays])
  const [picker, setPicker] = useState<Pickers>('days')
  // refs
  const daysElementRefs = useRef<HTMLDivElement[]>([])
  // handlers
  const slideHandlers = useSlideCalendar({
    daysElementRefs,
    value: days[0].middleOfMonth,
    days,
    setDays
  })
  const { from, to, handlers } = useCalendarHandlers({
    dayValue: value,
    range,
    onChange,
    from: props.from,
    to: props.to
  })

  const togglePickers = () => {
    if (picker === 'month' || picker === 'year') {
      setPicker('days')
      return
    }
    setPicker('year')
  }
  const handleMonthSelect = (month: number) => {
    const date = selectMonth(days[0].middleOfMonth, month)
    onChange(date)
    setDays([getDays({ date })])
    setPicker('days')
  }
  const handleYearSelect = (year: number) => {
    const date = selectYear(value, year)
    onChange(date)
    setDays([getDays({ date })])
    setPicker('month')
  }
  return (
    <Wrapper ref={ref}>
      <Header
        monthName={days[0].monthName}
        onNextClick={slideHandlers.slideToTheNextMonth}
        onPrevClick={slideHandlers.slideToPrevMonth}
        onClickOnTitle={togglePickers}
      />
      {
        picker === 'year'
          ? <YearPicker value={value} onYearSelect={handleYearSelect} />
          : null
      }
      {
        picker === 'month'
          ? <MonthPicker value={value} onMonthSelect={handleMonthSelect} />
          : null
      }
      {
        picker === 'days'
          ? <>
            <SubHeader>
              {locales[locale].shortWeekDays.map((day) => (
                <DayName key={day.key}>{day.name}</DayName>
              ))}
            </SubHeader>
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
                              data-value={day.date}
                              data-disabled={day.disabled}
                              data-range={props.range}
                              data-selected={!range && sameDay(value, day.date)}
                              data-start-range={(from != null) && sameDay(from, day.date)}
                              data-in-range={isInBetween(day.date, from, to)}
                              data-end-range={(to != null) && sameDay(to, day.date)}
                              data-weekend={weekends?.some(wDay => wDay === idx)}
                              {...handlers}
                            >
                              <CalendarText className="cl-text">
                                {formatDate(day.date, 'DD')}
                              </CalendarText>
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
          </>
          : null
      }
    </Wrapper>
  )
}

Calendar.displayName = 'Calendar'

export default forwardRef(Calendar)
