export interface CalendarItemProps {
  width?: number
  height?: number
  children?: React.ReactNode
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

export interface CalendarTextProps {
  children: React.ReactNode
  className?: string
}
