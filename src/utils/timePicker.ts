/**
 * numberPosition functions
 * These functions find position X-axis and Y-axis from half of the clock width
 * Its start from 30 deg and each time this degree increase as much as 30 deg
 */
export function numberPositionX(
  idx: number,
  width: number = 130,
  padding: number = 20,
) {
  const circleWith = width - padding;
  const thirtyDegInRad = 0.5235987755982988;

  return Math.round(circleWith * Math.sin(thirtyDegInRad * idx));
}

export function numberPositionY(
  idx: number,
  width: number = 130,
  padding: number = 17,
) {
  const circleWith = width - padding;
  const thirtyDegInRad = 0.5235987755982988;
  const y = Math.round(circleWith * Math.cos(thirtyDegInRad * idx));
  // because the Y-axis in computer starts from the screen corner
  return -y + width - padding;
}
