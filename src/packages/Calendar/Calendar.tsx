import React, {
  type ForwardedRef,
  forwardRef,
  useContext,
  useMemo,
  useRef,
  useState
} from 'react'
import Header from '../../components/Header'
import { useSlideCalendar } from '../../hooks/useSlideCalendar'
import CalendarItem from '../../components/CalendarItem'
import {
  isInBetween,
  sameDay,
  selectMonth,
  selectYear
} from '../../utils/dateHelper/dateHelper'
import formatDate from '../../utils/format'
import getDays from '../../utils/month'
import MonthPicker from '../../components/MonthPicker'
import YearPicker from '../../components/YearPicker'
import locales from '../../utils/locales'
import localeCache from '../../utils/locale'
import type { DaysInMonth } from '../../utils/month/month.types'
import type { CalendarProps } from './Calendar.types'
import type { Pickers } from '../../types'
import useCalendarHandlers from '../../hooks/useCalendarHandlers'
import { DaysButton } from '../../style/classNames'
import { cls } from '../../utils/className'
import { ThemeContext } from '../../components/ThemeProvider/ThemeProvider'
import cl from './Calendar.module.css'

const Calendar = (props: CalendarProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { locale } = localeCache
  const { defaultValue, weekends, range = false } = props
  const startDate = defaultValue === undefined ? new Date() : defaultValue
  // memo
  const getAllDays = useMemo(() => getDays(defaultValue), [])
  // states
  const [days, setDays] = useState<DaysInMonth[]>([getAllDays])
  const [picker, setPicker] = useState<Pickers>('days')
  // refs
  const daysElementRefs = useRef<HTMLDivElement[]>([])
  // handlers
  const slideHandlers = useSlideCalendar({
    daysElementRefs,
    days,
    setDays
  })
  const Theme = useContext(ThemeContext)
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
  const roundClassNames = {
    thin: cl.WrapperRoundThin,
    x1: cl.WrapperRoundX1,
    x2: cl.WrapperRoundX2,
    x3: cl.WrapperRoundX3,
    x4: cl.WrapperRoundX4
  }
  const wrapperDaysClassNames = {
    rtl: cl.WrapperDaysRtl,
    ltr: cl.WrapperDaysLtr
  }

  return (
    <div
      ref={ref}
      className={cls([
        props.className !== null ? props.className : '',
        'zmn-lib-wrapper',
        cl.Wrapper
      ])}
      data-round={Theme.round}
      data-theme="light"
    >
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
          <div className={cl.SubHeader}>
            {locales[locale].shortWeekDays.map((day) => (
              <div key={day.key} className={cl.DayName}>
                {day.name}
              </div>
            ))}
          </div>
          <div className={cls([cl.WrapperDays, wrapperDaysClassNames.rtl])}>
            {days.map((weeks, idx) => (
              <div
                key={weeks.id}
                className={cls(['item', cl.SlideDays])}
                ref={(el: HTMLDivElement) => {
                  daysElementRefs.current[idx] = el
                }}
                role="rowgroup"
              >
                {weeks.weeks.map((week, id) => (
                  <div
                    className={cl.Days}
                    key={id}
                    role="row"
                    aria-rowindex={id + 1}
                  >
                    {week.map((day, idx) => (
                      // @ts-expect-error will change
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
                        aria-colindex={idx + 1}
                        aria-selected={!range && sameDay(startDate, day.date)}
                        {...handlers}
                      >
                        <div className="cl-text">
                          {formatDate(day.date, 'DD')}
                        </div>
                      </CalendarItem>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

Calendar.displayName = 'Calendar'

export default forwardRef(Calendar)
