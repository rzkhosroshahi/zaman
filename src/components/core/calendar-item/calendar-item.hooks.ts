import { useCallback } from 'react'

import type { CalendarItemProps } from './calendar-item.types'

export function useCalendarItem(props: CalendarItemProps) {
  const { onClick, disabled = false } = props

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        event.preventDefault()

        return
      }
      onClick?.(event)
    },
    [onClick, disabled]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) {
        event.preventDefault()

        return
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>)
      }
    },
    [onClick, disabled]
  )

  return {
    handleClick,
    handleKeyDown
  }
}
