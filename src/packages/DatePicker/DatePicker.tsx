import React, { type RefObject, useRef, useState } from 'react'
import * as moment from 'jalali-moment'
import FloatingElement from '../../components/FloatingElement'
import { daysInMonth } from '../../utils/daysInMonth'
import { Container, Day, Wrapper, WrapperDays } from './DatePicker.styled'
import { isRtl } from '../../utils'
import { TIME, ITEMS_WIDTH } from '../../constants'

const toRight = () => {
  if (isRtl()) {
    return ITEMS_WIDTH
  }
  return ITEMS_WIDTH * -1
}
export const DatePicker = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const now = useRef(moment())
  const today = useRef(daysInMonth(now.current))
  const [days, setDays] = useState([today.current])
  const slidesRefs = useRef<RefObject<HTMLDivElement> | []>([])
  const isAnimating = useRef(false)


  const handleClickOnNext = () => {
    if (isAnimating.current) {
      return
    }
    const nextMonth = now.current.clone().add(1, 'month')
    const newValue = daysInMonth(nextMonth)
    setDays([
      ...days,
      newValue
    ])

    requestAnimationFrame(() => {
      isAnimating.current = true
      // @ts-expect-error I will check out later
      const [firstItemRef, lastItemRef] = slidesRefs.current
      firstItemRef.style.transition = `transform ${TIME}ms cubic-bezier(0.4, 0, 0.2, 1)`
      firstItemRef.style.transform = `translateX(${toRight()}px)`

      lastItemRef.style.transition = `transform ${TIME}ms cubic-bezier(0.4, 0, 0.2, 1)`
      lastItemRef.style.transform = `translateX(${toRight()}px)`

      setTimeout(() => {
        setDays(oldItems => {
          return oldItems.filter((items) => items.id === newValue.id)
        })
        now.current = nextMonth
        lastItemRef.style.transition = null
        lastItemRef.style.transform = null
        isAnimating.current = false
      }, TIME)
    })
  }

  const handleClickOnPrev = () => {
    if (isAnimating.current) {
      return
    }
    const prevMonth = now.current.clone().subtract(1, 'month')
    const newValue = daysInMonth(prevMonth)

    setDays([
      newValue,
      ...days
    ])

    requestAnimationFrame(() => {
      isAnimating.current = true
      const [firstItemRef, lastItemRef] = slidesRefs.current
      firstItemRef.style.transform = `translateX(${toRight()}px)`
      lastItemRef.style.transform = `translateX(${toRight()}px)`

      requestAnimationFrame(() => {
        lastItemRef.style.transition = `transform ${TIME}ms cubic-bezier(0.4, 0, 0.2, 1)`
        lastItemRef.style.transform = `translateX(${0}px)`

        firstItemRef.style.transition = `transform ${TIME}ms cubic-bezier(0.4, 0, 0.2, 1)`
        firstItemRef.style.transform = `translateX(${0}px)`

        setTimeout(() => {
          setDays(oldItems => {
            return oldItems.filter((items) => items.id === newValue.id)
          })
          firstItemRef.style.transition = null
          firstItemRef.style.transform = null
          now.current = prevMonth
          isAnimating.current = false
        }, TIME)
      })
    })
  }

  return (
    <div>
      <button onClick={handleClickOnPrev}>prev month</button>
      <input ref={inputRef} type="text" onClick={() => { setShowCalendar(true) }} />
      <button onClick={handleClickOnNext}>next month</button>
      { showCalendar
        ? <FloatingElement destinationRef={inputRef}>
            <Container className="ccontainet">
              <Wrapper>
                <WrapperDays>
                  {
                    days.map((day, idx) => (
                      <Day
                        key={day.id}
                        className="item"
                        // @ts-expect-error I will check out later
                        ref={(el: HTMLDivElement) => { slidesRefs.current[idx] = el }}
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
