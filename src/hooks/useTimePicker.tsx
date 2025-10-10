import { useState, type MouseEvent, type TouchEvent } from 'react'

import dayjs from 'dayjs'

import { type DatePickerValue } from '@types'

import { type OnChangePayload } from '@packages/time-picker/time-picker.types'

import { getAngelValues } from '@utils/timePicker'

interface UseTimePickerType {
  timeConvention?: 'am' | 'pm'
  clockTime?: 24 | 12
  defaultValue?: DatePickerValue
  onChange?: (payload: OnChangePayload) => void
}
export const useTimePicker = ({
  defaultValue,
  clockTime,
  timeConvention,
  onChange
}: UseTimePickerType) => {
  const time =
    defaultValue !== undefined ? dayjs(defaultValue) : dayjs().startOf('date')
  const [selecting, setSelecting] = useState<boolean>(false)
  const [selectingHour, setSelectingHour] = useState<boolean>(false)
  const [isInsideHour, setInsideHour] = useState<boolean>(false)
  const hourFormat = clockTime === 24 ? 'HH' : 'h'
  const [hour, setHour] = useState<number>(
    parseInt(time.format(hourFormat), 10)
  )
  const [minute, setMinute] = useState<number>(parseInt(time.format('mm'), 10))

  const handleChangeMinute = (e: MouseEvent | TouchEvent) => {
    const { value } = getAngelValues(e, 6)

    setMinute(value)
  }
  const handleChangeHour = (e: MouseEvent | TouchEvent) => {
    const { value, delta } = getAngelValues(e)

    if (clockTime === 24) {
      if (Math.round(delta) < 85) {
        setHour(value)
        setInsideHour(true)
      } else {
        setHour(value + 12)
        setInsideHour(false)
      }

      return
    }
    setHour(value)
  }
  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault()
    if (!selecting) {
      return
    }
    if (selectingHour) {
      return handleChangeHour(e)
    }

    return handleChangeMinute(e)
  }
  const handleSelecting = (e: MouseEvent | TouchEvent) => {
    setSelecting(true)
    if (selectingHour) {
      return handleChangeHour(e)
    } else {
      return handleChangeMinute(e)
    }
  }

  const handleMouseUp = () => {
    if (selectingHour) {
      if (typeof onChange === 'function') {
        onChange({
          hour,
          minute,
          ...(clockTime === 12 && { timeConvention })
        })
      }
      setSelecting(false)
      setSelectingHour(false)
      setInsideHour(false)

      return
    }
    setSelecting(false)
    setSelectingHour(true)
  }

  return {
    hour,
    minute,
    isInsideHour,
    selectingHour,
    handleMouseMove,
    handleMouseUp,
    handleSelecting
  }
}
