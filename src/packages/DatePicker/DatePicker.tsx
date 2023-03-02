import React, { useRef, useState } from 'react'
import moment from 'jalali-moment'
import FloatingElement from '../../components/FloatingElement'
import { daysInMonth, getMomentFormatted, type IDaysInMonth } from '../../utils/daysInMonth'
import { useSlideCalendar } from '../../hooks/useSlideCalendar'
import type { DatePickerProps } from './DatePicker.types'
import type { DatePickerValue, IDays } from '../../types'
import { chunk } from '../../utils/chunk'
import { faNumber, weekDayNames } from '../../utils'
import { Container, SlideDays, Wrapper, WrapperDays, Days, Header, HeaderTitle, SubHeader, DayName } from './DatePicker.styled'
import CalendarItem from '../../components/CalendarItem'
import ChevronRight from '../../components/Icons/ChevronRight'
import ChevronLeft from '../../components/Icons/ChevronLeft'
import IconButton from '../../components/IconButton'
import { ITEMS_WIDTH } from '../../constants'
import useClickOutside from '../../hooks/useClickOutside'

export const DatePicker = (props: DatePickerProps) => {
  const { defaultValue, onChange } = props
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
  return (
    <div ref={containerRef}>
      <input
        ref={inputRef}
        onClick={toggleShowCalendar}
        type="text"
        style={{ width: ITEMS_WIDTH, fontFamily: 'inherit' }}
        value={moment(value).format('jYYYY/jMM/jDD')}
        readOnly
      />
      { showCalendar
        ? <FloatingElement destinationRef={inputRef}>
            <Container>
              <Wrapper>
                <Header>
                  <IconButton onClick={handlers.slideToPrevMonth}>
                    <ChevronRight />
                  </IconButton>
                  <HeaderTitle>
                    {days[0].monthName}
                  </HeaderTitle>
                  <IconButton onClick={handlers.slideToTheNextMonth}>
                    <ChevronLeft />
                  </IconButton>
                </Header>
                <SubHeader>
                  {weekDayNames.map((name) => (
                    <DayName key={name}>{name}</DayName>
                  ))}
                </SubHeader>
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
