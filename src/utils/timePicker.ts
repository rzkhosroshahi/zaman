import type React from 'react'
/**
 * numberPosition functions
 * These functions find position X-axis and Y-axis from half of the clock width
 * Its start from 30 deg and each time this degree increase as much as 30 deg
 */
export function numberPositionX(
  idx: number,
  width: number = 130,
  padding: number = 20
) {
  const circleWith = width - padding
  const thirtyDegInRad = 0.5235987755982988

  return Math.round(circleWith * Math.sin(thirtyDegInRad * idx))
}

export function numberPositionY(
  idx: number,
  width: number = 130,
  padding: number = 17
) {
  const circleWith = width - padding
  const thirtyDegInRad = 0.5235987755982988
  const y = Math.round(circleWith * Math.cos(thirtyDegInRad * idx))
  // because the Y-axis in computer starts from the screen corner
  return -y + width - padding
}
// clock center
export const center = {
  x: 260 / 2,
  y: 260 / 2
}

// change radian to deg
export const radianToDeg = (rad: number) => rad * 57.29577951308232

// calculate offsetX and offsetY
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
  // minutes selecting
  if (steps === 6) {
    return valueBySteps
  }
  // hour selecting
  if (Math.round(delta) > 85) {
    return valueBySteps === 0 ? -12 : valueBySteps
  }
  // inside hour selecting
  return valueBySteps === 0 ? 12 : valueBySteps
}

/**
 * calculate the value from where the mouse clicked or tapped
 * step1: calculate deg from the center of the circle not (0, 0)
 * step1-1: calculate deg with atan2 but instead of using atan2 in this way (y, x) -
 * I used atan2(x, y) because atan2(y, x) get an angel from (0, 0) not the center of the circle
 * step-2: decrease atan2 by Math.PI because- * this function returns two degrees that one of them is valid and another isn't. like 90 deg and -90deg and -90deg should be 270
 * step3: delta: determine the distance of each place that is clicked by the user. calculating the distance between the center of the circle
 * step4: make value by division deg into the hour or minutes angles. in the hour is 30 deg and in minutes is 6 deg
 */
interface IGetAngelValues {
  value: number
  delta: number
}
export const getAngelValues = (
  e: React.MouseEvent | React.TouchEvent,
  steps: number = 30
): IGetAngelValues => {
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

// numbers
export const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
export const hours24 = [0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
export const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
