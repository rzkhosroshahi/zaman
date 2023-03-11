export type Radius = 'thin' | 'roundX1' | 'roundX2' | 'roundX3' | 'roundX4'

interface radiusObject {
  wrapper: number
  calendarItem: number
}
export const radius: Record<Radius, radiusObject > = {
  thin: {
    wrapper: 0,
    calendarItem: 0
  },
  roundX1: {
    wrapper: 8,
    calendarItem: 4
  },
  roundX2: {
    wrapper: 16,
    calendarItem: 8
  },
  roundX3: {
    wrapper: 24,
    calendarItem: 16
  },
  roundX4: {
    wrapper: 24,
    calendarItem: 20
  }
}
