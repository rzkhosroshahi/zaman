import type React from 'react'
import type { Positions } from '../../types'

export interface RenderCalendarProps {
  showCalendar: boolean
  toggleOpen: () => void
  children: React.ReactNode
  destinationRef: React.RefObject<HTMLInputElement>
  position?: Positions
}
