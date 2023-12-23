export type Radius = 'thin' | 'x1' | 'x2' | 'x3' | 'x4'

interface radiusObject {
  wrapper: number
  calendarItem: number
}
export const radius: Record<Radius, radiusObject> = {
  thin: {
    wrapper: 0,
    calendarItem: 0
  },
  x1: {
    wrapper: 8,
    calendarItem: 4
  },
  x2: {
    wrapper: 16,
    calendarItem: 8
  },
  x3: {
    wrapper: 24,
    calendarItem: 16
  },
  x4: {
    wrapper: 24,
    calendarItem: 20
  }
}
