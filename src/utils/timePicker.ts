import type React from 'react'

export function numberPositionX(idx: number, width = 130, padding = 20) {
  const circleWith = width - padding
  const thirtyDegInRad = 0.5235987755982988

  return Math.round(circleWith * Math.sin(thirtyDegInRad * idx))
}

export function numberPositionY(idx: number, width = 130, padding = 17) {
  const circleWith = width - padding
  const thirtyDegInRad = 0.5235987755982988
  const y = Math.round(circleWith * Math.cos(thirtyDegInRad * idx))

  return -y + width - padding
}

export const center = {
  x: 260 / 2,
  y: 260 / 2
}

export const radianToDeg = (rad: number) => rad * 57.29577951308232

export const calculateOffset = (elem: unknown) => {
  const el = elem as React.MouseEvent<HTMLElement>
  const touchElement = elem as React.TouchEvent<HTMLElement>
  let { offsetX, offsetY } = el.nativeEvent

  if (typeof offsetX === 'undefined') {
    const rect = touchElement.currentTarget.getBoundingClientRect()

    if (touchElement.changedTouches.length !== 0) {
      offsetX = touchElement.changedTouches[0].clientX - rect.left
      offsetY = touchElement.changedTouches[0].clientY - rect.top
    } else {
      offsetX = el.clientX - rect.left
      offsetY = el.clientY - rect.top
    }
  }

  return {
    offsetX,
    offsetY
  }
}

export const getValue = (deg: number, delta: number, steps: number) => {
  const valueBySteps = Math.floor(deg * (1 / steps))

  if (steps === 6) {
    return valueBySteps
  }

  if (Math.round(delta) > 85) {
    return valueBySteps === 0 ? -12 : valueBySteps
  }

  return valueBySteps === 0 ? 12 : valueBySteps
}

interface GetAngelValues {
  value: number
  delta: number
}
export const getAngelValues = (
  e: React.MouseEvent | React.TouchEvent,
  steps = 30
): GetAngelValues => {
  const { offsetX, offsetY } = calculateOffset(e)
  const x = offsetX - center.x
  const y = offsetY - center.y
  const atan = Math.PI - Math.atan2(x, y)
  const delta = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  const deg = radianToDeg(atan)
  const value = getValue(deg, delta, steps)

  return {
    value,
    delta
  }
}

export const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
export const hours24 = [0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
export const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
