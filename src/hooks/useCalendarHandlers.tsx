import { type SyntheticEvent, useState } from 'react'

import dayjs from 'dayjs'

import type { DatePickerValue } from '../types'
import type {
  CalendarDefaultProps,
  CalendarRangeProps
} from '@packages/calendar/Calendar.types'

type Event = SyntheticEvent<HTMLButtonElement>

interface BaseUseCalendarHandlersType {
  from?: DatePickerValue
  to?: DatePickerValue
}

type UseCalendarHandlersType = BaseUseCalendarHandlersType &
  (CalendarRangeProps | CalendarDefaultProps)

export const guardRange = (
  value: UseCalendarHandlersType
): value is CalendarRangeProps => {
  return value.range === true
}

export const useCalendarHandlers = (props: UseCalendarHandlersType) => {
  const [selectingRange, setSelectingRange] = useState(false)
  const [from, setFrom] = useState<Date | undefined>(
    props.from !== undefined ? new Date(props.from) : undefined
  )
  const [to, setTo] = useState<Date | undefined | null>(
    props.to !== undefined ? new Date(props.to) : undefined
  )

  const onClickCalendar = (e: Event) => {
    const { value, disabled } = e.currentTarget.dataset

    if (value === undefined) {
      return
    }
    if (disabled === 'true') {
      return
    }

    if (!guardRange(props) && typeof props.onChange === 'function') {
      props.onChange(new Date(value))
    }

    return value
  }
  const onClickRange = (e: Event) => {
    const { value } = e.currentTarget.dataset

    if (!selectingRange) {
      if (value !== undefined) {
        setFrom(new Date(value))
        setTo(null)
      }
      setSelectingRange(true)
    }

    if (selectingRange && to === null) {
      if (value !== undefined) {
        setTo(new Date(value))
        handleRangeOnChange(from, new Date(value))
      }
      setSelectingRange(false)
    }

    if (selectingRange && to !== undefined) {
      handleRangeOnChange(from, to)
      setSelectingRange(false)
    }
  }
  const onMouseMove = (e: Event) => {
    const { value } = e.currentTarget.dataset

    if (!selectingRange) {
      return
    }
    if (value !== undefined) {
      if (dayjs(value).isAfter(dayjs(from))) {
        setTo(new Date(value))
      }
    }
  }
  const handleClickEvent = (e: Event) => {
    if (props.range === true) {
      return onClickRange(e)
    }

    return onClickCalendar(e)
  }
  const handleRangeOnChange = (
    from: Date | undefined,
    to: Date | undefined | null
  ) => {
    if (typeof props.onChange === 'function' && guardRange(props)) {
      if (from != null && to != null) {
        props.onChange(to)
      }
    }
  }

  return {
    handlers: {
      onClick: handleClickEvent,
      ...(props.range === true && { onMouseMove })
    },
    from,
    to
  }
}

export default useCalendarHandlers
