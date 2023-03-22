import type React from 'react'
import { useState } from 'react'
import dayjs from 'dayjs'
import { getAngelValues } from '../utils/timePicker'
import { type DatePickerValue } from '../types'
import { type onChangePayload } from '../packages/TimePicker/TimePicker.types'

interface useTimePickerType {
  timeConvention?: 'am' | 'pm'
  clockTime?: 24 | 12
  defaultValue?: DatePickerValue
  onChange?: (payload: onChangePayload) => void

}
export const useTimePicker = ({ defaultValue, clockTime, timeConvention, onChange }: useTimePickerType) => {
  const time = defaultValue !== undefined ? dayjs(defaultValue) : dayjs().startOf('date')
  const [selecting, setSelecting] = useState<boolean>(false)
  const [selectingHour, setSelectingHour] = useState<boolean>(false)
  const [isInsideHour, setInsideHour] = useState<boolean>(false)
  const [hour, setHour] = useState<number>(parseInt(time.format('HH'), 10))
  const [minute, setMinute] = useState<number>(parseInt(time.format('MM'), 10))

  const handleChangeMinute = (e: React.MouseEvent | React.TouchEvent) => {
    const { value } = getAngelValues(e, 6)
    setMinute(value)
  }
  const handleChangeHour = (e: React.MouseEvent | React.TouchEvent) => {
    const { value, delta } = getAngelValues(e)
    if (clockTime === 24) {
      if (Math.round(delta) < 85) {
        setInsideHour(true)
      } else {
        setInsideHour(false)
      }
      setHour(value + 12)
      return
    }
    setHour(value)
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!selecting) {
      return
    }
    if (selectingHour) {
      return handleChangeHour(e)
    }
    return handleChangeMinute(e)
  }
  const handleSelecting = (e: React.MouseEvent | React.TouchEvent) => {
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
