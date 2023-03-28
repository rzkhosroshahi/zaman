import type React from 'react'

export interface RenderCalendarProps {
  showCalendar: boolean
  toggleOpen: () => void
  children: React.ReactNode
  destinationRef: React.RefObject<HTMLInputElement>
}
