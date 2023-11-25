import { type SyntheticEvent, useState } from 'react'
import dayjs from 'dayjs'
import type {
  DatePickerValue,
  onDatePickerChangePayload,
  onRangeDatePickerChangePayload
} from '../types'

type Event = SyntheticEvent<HTMLButtonElement>

interface BseUseCalendarHandlersType {
  from?: DatePickerValue
  to?: DatePickerValue
}
interface useCalendarHandlersType1 extends BseUseCalendarHandlersType {
  range?: false | undefined
  onChange?: (args: onDatePickerChangePayload) => void
}
interface useCalendarHandlersType2 extends BseUseCalendarHandlersType {
  range: true
  onChange?: (args: onRangeDatePickerChangePayload) => void
}

type useCalendarHandlersType = useCalendarHandlersType1 | useCalendarHandlersType2

export const guard = (value: useCalendarHandlersType1 | useCalendarHandlersType2): value is useCalendarHandlersType2 => {
  return value.range === true
}

export const useCalendarHandlers = (props: useCalendarHandlersType) => {
  const [selectingRange, setSelectingRange] = useState(false)
  const [from, setFrom] = useState<Date | undefined>(props.from !== undefined ? new Date(props.from) : undefined)
  const [to, setTo] = useState<Date | undefined>(props.to !== undefined ? new Date(props.to) : undefined)

  const onClickCalendar = (e: Event) => {
    const { value, disabled } = e.currentTarget.dataset
    if (value === undefined) {
      return
    }
    if (disabled === 'true') {
      return
    }

    if (!guard(props) && typeof props.onChange === 'function') {
      props.onChange({ value: new Date(value) })
    }

    return value
  }
  const onClickRange = (e: Event) => {
    const { value } = e.currentTarget.dataset
    if (!selectingRange && value !== undefined) {
      setFrom(new Date(value))
      setTo(new Date(value))

      setSelectingRange(true)
      return
    }
    setSelectingRange(false)
    if (from !== undefined && to !== undefined) {
      if (guard(props) && typeof props.onChange === 'function') {
        props.onChange({
          from: new Date(from),
          to: new Date(to)
        })
      }
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

  return {
    handlers: {
      onClick: handleClickEvent,
      ...((props.range === true) && { onMouseMove })
    },
    from,
    to
  }
}

export default useCalendarHandlers
