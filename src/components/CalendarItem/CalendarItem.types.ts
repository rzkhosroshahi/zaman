import type React from 'react'

export interface CalendarItemProps {
  range?: boolean
  width?: string
  height?: string
  className: string
  children: React.ReactNode
  onClick?: () => void
}
