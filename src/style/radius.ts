export type Radius = 'thin' | 'x1' | 'x2' | 'x3' | 'x4'

export interface radiusObject {
  wrapper: `${number}px`
  calendarItem: `${number}px`
}
export const radius: Record<Radius, radiusObject> = {
  thin: {
    wrapper: '0px',
    calendarItem: '0px'
  },
  x1: {
    wrapper: '8px',
    calendarItem: '4px'
  },
  x2: {
    wrapper: '16px',
    calendarItem: '8px'
  },
  x3: {
    wrapper: '24px',
    calendarItem: '16px'
  },
  x4: {
    wrapper: '24px',
    calendarItem: '20px'
  }
}

export const getRadiusCssVariables = (round: Radius) => {
  return `
    --radii-calendar-item: ${radius[round].calendarItem};
    --radii-wrapper: ${radius[round].wrapper};
  `
}
