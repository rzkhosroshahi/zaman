import { useCallback } from 'react'

export function useMonthPicker(onMonthSelect?: (month: number) => void) {
  const handleMonthSelect = useCallback(
    (month: number) => {
      onMonthSelect?.(month)
    },
    [onMonthSelect]
  )

  return {
    handleMonthSelect
  }
}
