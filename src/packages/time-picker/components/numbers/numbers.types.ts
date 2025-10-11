export interface NumbersProps {
  insideHour: boolean
  hourSelecting: boolean
  clockTime: 12 | 24
}

export interface NumbersItemProps {
  idx: number
  clockHalfWidth?: number
  numbersPadd?: number
  top?: string
  insideHour?: boolean
  isSelectedNumber?: boolean
}
