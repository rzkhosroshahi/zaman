import { useRef } from 'react'
import type { Dispatch, RefObject, SetStateAction } from 'react'
import moment, { type Moment } from 'jalali-moment'
import { isRtl } from '../utils'
import { daysInMonth, type IDaysInMonth } from '../utils/daysInMonth'
import { ITEMS_WIDTH, TIME, ANIMATE_FUNC } from '../constants'

const toRight = () => {
  if (isRtl()) {
    return ITEMS_WIDTH
  }
  return ITEMS_WIDTH * -1
}

interface UseSliderTypes {
  daysElementRefs: RefObject<HTMLDivElement[]>
  days: IDaysInMonth[]
  setDays: Dispatch<SetStateAction<IDaysInMonth[]>>
}
export const useSlideCalendar = ({ daysElementRefs, days, setDays }: UseSliderTypes) => {
  const isAnimating = useRef(false)
  const now = useRef<Moment>(moment())

  const slideToTheNextMonth = () => {
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
      // @ts-expect-error I will check this out later
      const [firstItemRef, lastItemRef] = daysElementRefs.current
      firstItemRef.style.transition = `transform ${TIME}ms ${ANIMATE_FUNC}`
      firstItemRef.style.transform = `translateX(${toRight()}px)`

      lastItemRef.style.transition = `transform ${TIME}ms ${ANIMATE_FUNC}`
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
  const slideToPrevMonth = () => {
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
      const [firstItemRef, lastItemRef] = daysElementRefs.current
      firstItemRef.style.transform = `translateX(${toRight()}px)`
      lastItemRef.style.transform = `translateX(${toRight()}px)`

      requestAnimationFrame(() => {
        lastItemRef.style.transition = `transform ${TIME}ms ${ANIMATE_FUNC}`
        lastItemRef.style.transform = `translateX(${0}px)`

        firstItemRef.style.transition = `transform ${TIME}ms ${ANIMATE_FUNC}`
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
  return {
    slideToTheNextMonth,
    slideToPrevMonth
  }
}
