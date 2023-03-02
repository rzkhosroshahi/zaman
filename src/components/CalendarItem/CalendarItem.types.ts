import type { Radius } from '../../style/radius'

export interface CalendarItemProps {
  selected?: boolean
  range?: boolean
  disabled?: boolean
  round: keyof typeof Radius
}
