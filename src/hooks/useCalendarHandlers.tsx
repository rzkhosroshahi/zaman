import { type SyntheticEvent, useState } from 'react'
import dayjs from 'dayjs'
import { sameMonth } from '../utils/dateHelper/dateHelper'
import type { DatePickerValue } from '../types'

type Event = SyntheticEvent<HTMLButtonElement>
interface useCalendarHandlersType {
  dayValue: Date
  range?: boolean
  onChange: (d: Date, to?: Date) => void
  from?: DatePickerValue
  to?: DatePickerValue
}

export const useCalendarHandlers = (props: useCalendarHandlersType) => {
  const { dayValue, range = false, onChange } = props
  const [selectingRange, setSelectingRange] = useState(false)
  const [from, setFrom] = useState<Date | undefined>(props.from !== undefined ? new Date(props.from) : undefined)
  const [to, setTo] = useState<Date | undefined>(props.to !== undefined ? new Date(props.to) : undefined)

  const onClickCalendar = (e: Event) => {
    const { value } = e.currentTarget.dataset
    if (value === undefined) {
      return
    }
    if (!sameMonth(new Date(value), dayValue)) {
      return
    }
    onChange(new Date(value))
    return value
  }
  const onClickRange = (e: Event) => {
    const { value } = e.currentTarget.dataset
    if (!selectingRange && value !== undefined) {
      setFrom(new Date(value))
      setSelectingRange(true)
      return
    }
    setSelectingRange(false)
    if (from !== undefined && to !== undefined) {
      onChange(new Date(from), new Date(to))
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
    if (range) {
      return onClickRange(e)
    }
    return onClickCalendar(e)
  }

  return {
    handlers: {
      onClick: handleClickEvent,
      ...(range && { onMouseMove })
    },
    from,
    to
  }
}

export default useCalendarHandlers
