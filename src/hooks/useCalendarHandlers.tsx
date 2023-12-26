import { type SyntheticEvent, useState } from 'react'
import dayjs from 'dayjs'
import type { DatePickerValue } from '../types'
import type {
  CalendarDefaultProps,
  CalendarRangeProps
} from 'src/packages/Calendar/Calendar.types'

type Event = SyntheticEvent<HTMLButtonElement>

interface BaseUseCalendarHandlersType {
  from?: DatePickerValue
  to?: DatePickerValue
}

type useCalendarHandlersType = BaseUseCalendarHandlersType &
  (CalendarRangeProps | CalendarDefaultProps)

export const guardRange = (
  value: useCalendarHandlersType
): value is CalendarRangeProps => {
  return value.range === true
}

export const useCalendarHandlers = (props: useCalendarHandlersType) => {
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
      props.onChange({ value: new Date(value) })
    }

    return value
  }
  const onClickRange = (e: Event) => {
    const { value } = e.currentTarget.dataset
    // start selecting range
    if (!selectingRange) {
      if (value !== undefined) {
        setFrom(new Date(value))
        setTo(null)
      }
      setSelectingRange(true)
    }
    // submit select date in mobile
    if (selectingRange && to === null) {
      if (value !== undefined) {
        setTo(new Date(value))
        handleRangeOnChange(from, new Date(value))
      }
      setSelectingRange(false)
    }
    // finish selecting range in desktop
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
        props.onChange({
          from,
          to
        })
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
