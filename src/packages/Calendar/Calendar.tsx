import { type ForwardedRef, forwardRef, useMemo, useRef, useState } from 'react'

import CalendarItem, { CalendarText } from '@components/core/calendar-item'
import Header, { DayName } from '@components/navigation/header'
import MonthPicker from '@components/pickers/month-picker'
import YearPicker from '@components/pickers/year-picker'

import useCalendarHandlers from '@hooks/useCalendarHandlers'
import { useSlideCalendar } from '@hooks/useSlideCalendar'

import {
  isInBetween,
  sameDay,
  selectMonth,
  selectYear
} from '@utils/dateHelper/dateHelper'
import formatDate from '@utils/format'
import localeCache from '@utils/locale'
import locales from '@utils/locales'
import getDays from '@utils/month'

import { DaysButton } from '@style/classNames'

import { type CalendarProps } from './Calendar.types'
import {
  Days,
  SlideDays,
  SubHeader,
  Wrapper,
  WrapperDays
} from './sub-components'

import type { Pickers } from '@types'
import type { DaysInMonth } from '@utils/month/month.types'

const Calendar = (props: CalendarProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { locale } = localeCache
  const { defaultValue, weekends, range = false } = props
  const startDate = defaultValue ?? new Date()

  const getAllDays = useMemo(() => getDays(defaultValue), [defaultValue])

  const [days, setDays] = useState<DaysInMonth[]>([getAllDays])
  const [picker, setPicker] = useState<Pickers>('days')

  const daysElementRefs = useRef<HTMLDivElement[]>([])

  const slideHandlers = useSlideCalendar({
    daysElementRefs,
    days,
    setDays
  })
  const { from, to, handlers } = useCalendarHandlers(props)

  const togglePickers = () => {
    if (picker === 'month' || picker === 'year') {
      setPicker('days')

      return
    }
    setPicker('year')
  }
  const handleNextMonth = () => {
    if (picker === 'days') {
      return slideHandlers.slideToTheNextMonth()
    }
  }
  const handlePrevMonth = () => {
    if (picker === 'days') {
      return slideHandlers.slideToPrevMonth()
    }
  }
  const handleMonthSelect = (month: number) => {
    const date = selectMonth(days[0].middleOfMonth, month)

    setDays([getDays(date)])
    setPicker('days')
  }
  const handleYearSelect = (year: number) => {
    const date = selectYear(startDate, year)

    setDays([getDays(date)])
    setPicker('month')
  }

  return (
    <Wrapper ref={ref} className={props.className ?? ''}>
      <Header
        monthName={days[0].monthName}
        onNextClick={handleNextMonth}
        onPrevClick={handlePrevMonth}
        onClickOnTitle={togglePickers}
      />
      {picker === 'year' ? (
        <YearPicker value={startDate} onYearSelect={handleYearSelect} />
      ) : null}
      {picker === 'month' ? (
        <MonthPicker value={startDate} onMonthSelect={handleMonthSelect} />
      ) : null}
      {picker === 'days' ? (
        <>
          <SubHeader>
            {locales[locale].shortWeekDays.map((day) => (
              <DayName key={day.key}>{day.name}</DayName>
            ))}
          </SubHeader>
          <WrapperDays>
            {days.map((weeks, idx) => (
              <SlideDays
                key={weeks.id}
                className="item"
                ref={(el: HTMLDivElement) => {
                  daysElementRefs.current[idx] = el
                }}
                role="rowgroup"
              >
                {weeks.weeks.map((week, id) => (
                  <Days key={id} role="row" aria-rowindex={id + 1}>
                    {week.map((day, idx) => (
                      <CalendarItem
                        key={day.date.getTime()}
                        className={DaysButton}
                        data-value={day.date}
                        data-disabled={day.disabled}
                        data-range={props.range}
                        data-selected={!range && sameDay(startDate, day.date)}
                        data-start-range={
                          from != null && sameDay(from, day.date)
                        }
                        data-in-range={isInBetween(day.date, from, to)}
                        data-end-range={to != null && sameDay(to, day.date)}
                        data-weekend={weekends?.some((wDay) => wDay === idx)}
                        type="button"
                        role="gridcell"
                        aria-colindex={idx + 1}
                        tabIndex={0}
                        aria-selected={!range && sameDay(startDate, day.date)}
                        {...handlers}
                      >
                        <CalendarText className="cl-text">
                          {formatDate(day.date, 'DD')}
                        </CalendarText>
                      </CalendarItem>
                    ))}
                  </Days>
                ))}
              </SlideDays>
            ))}
          </WrapperDays>
        </>
      ) : null}
    </Wrapper>
  )
}

Calendar.displayName = 'Calendar'

export default forwardRef(Calendar)
