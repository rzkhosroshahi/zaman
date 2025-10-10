import {
  useRef,
  type Dispatch,
  type RefObject,
  type SetStateAction
} from 'react'

import dayjs from 'dayjs'

import { ANIMATE_FUNC, CALENDAR_WIDTH, TIME } from '@constants'

import { isRtl } from '@utils/index'
import getDays from '@utils/month'

import type { DaysInMonth } from '@utils/month/month.types'

const toRight = () => {
  if (isRtl()) {
    return CALENDAR_WIDTH
  }

  return CALENDAR_WIDTH * -1
}

interface UseSliderTypes {
  daysElementRefs: RefObject<HTMLDivElement[]>
  days: DaysInMonth[]
  setDays: Dispatch<SetStateAction<DaysInMonth[]>>
}
export const useSlideCalendar = ({
  daysElementRefs,
  days,
  setDays
}: UseSliderTypes) => {
  const isAnimating = useRef(false)
  const currentMonth = days[0].middleOfMonth

  const slideToTheNextMonth = () => {
    if (isAnimating.current) {
      return
    }
    const nextMonth = dayjs(currentMonth).add(1, 'month')
    const newValue = getDays(nextMonth.toDate())

    setDays([...days, newValue])

    requestAnimationFrame(() => {
      isAnimating.current = true
      const refs = daysElementRefs.current

      if (!refs || refs.length < 2) return

      const firstItemRef = refs[0]
      const lastItemRef = refs[1]

      firstItemRef.style.transition = `transform ${TIME}ms ${ANIMATE_FUNC}`
      firstItemRef.style.transform = `translateX(${toRight()}px)`

      lastItemRef.style.transition = `transform ${TIME}ms ${ANIMATE_FUNC}`
      lastItemRef.style.transform = `translateX(${toRight()}px)`

      setTimeout(() => {
        setDays((oldItems) => {
          return oldItems.filter((items) => items.id === newValue.id)
        })
        lastItemRef.style.transition = ''
        lastItemRef.style.transform = ''
        isAnimating.current = false
      }, TIME + 50)
    })
  }
  const slideToPrevMonth = () => {
    if (isAnimating.current) {
      return
    }
    const prevMonth = dayjs(currentMonth).subtract(1, 'month')
    const newValue = getDays(prevMonth.toDate())

    setDays([newValue, ...days])

    requestAnimationFrame(() => {
      isAnimating.current = true
      const refs = daysElementRefs.current

      if (!refs || refs.length < 2) return

      const firstItemRef = refs[0]
      const lastItemRef = refs[1]

      firstItemRef.style.transform = `translateX(${toRight()}px)`
      lastItemRef.style.transform = `translateX(${toRight()}px)`

      requestAnimationFrame(() => {
        lastItemRef.style.transition = `transform ${TIME}ms ${ANIMATE_FUNC}`
        lastItemRef.style.transform = `translateX(${0}px)`

        firstItemRef.style.transition = `transform ${TIME}ms ${ANIMATE_FUNC}`
        firstItemRef.style.transform = `translateX(${0}px)`

        setTimeout(() => {
          setDays((oldItems) => {
            return oldItems.filter((items) => items.id === newValue.id)
          })
          firstItemRef.style.transition = ''
          firstItemRef.style.transform = ''
          isAnimating.current = false
        }, TIME + 50)
      })
    })
  }

  return {
    slideToTheNextMonth,
    slideToPrevMonth
  }
}
