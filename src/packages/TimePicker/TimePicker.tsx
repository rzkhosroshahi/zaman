import React, { useState } from 'react'
import { Clock, Hand, HandCircle } from './TimePicker.styled'
import { getAngelValues } from '../../utils/timePicker'
import Hours from './components/Hour/Hour'

export const TimePicker = () => {
  const [selecting, setSelecting] = useState<boolean>(false)
  const [selectingHour, setSelectingHour] = useState<boolean>(false)
  const [isInsideHour, setInsideHour] = useState<boolean>(false)
  const [hour, setHour] = useState<number>(0)
  const [minute, setMinute] = useState<number>(0)

  const handleChangeMinute = (e: React.MouseEvent | React.TouchEvent) => {
    const { value } = getAngelValues(e, 6)
    setMinute(value)
  }
  const handleChangeHour = (e: React.MouseEvent | React.TouchEvent) => {
    const { value, delta } = getAngelValues(e)
    if (Math.round(delta) < 85) {
      setInsideHour(true)
    } else {
      setInsideHour(false)
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
    setSelecting(false)
    setSelectingHour(false)
  }

  return (
    <Clock
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseDown={handleSelecting}
      onTouchMove={handleSelecting}
      onTouchEnd={handleMouseUp}
    >
      <Hand
        value={selectingHour ? hour : minute}
        hour={hour}
        minute={minute}
        isSelectingHour={selectingHour}
        isInsideHour={isInsideHour}
      >
        <HandCircle isSelectingHour={selectingHour} />
      </Hand>
      <Hours
        hour={hour}
        minute={minute}
        insideHour={isInsideHour}
        hourSelecting={selectingHour}
      />
    </Clock>
  )
}

export default TimePicker
