import { useCallback, useMemo, useRef, useState } from 'react'

import { selectMonth, selectYear } from '@utils/dateHelper/dateHelper'
import getDays from '@utils/month'

import type { CalendarProps } from './Calendar.types'
import type { Pickers } from '@types'
import type { DaysInMonth } from '@utils/month/month.types'

export function useCalendar(props: CalendarProps) {
  const { defaultValue, range = false } = props
  const startDate = useMemo(() => defaultValue ?? new Date(), [defaultValue])

  const getAllDays = useMemo(() => getDays(defaultValue), [defaultValue])

  const [days, setDays] = useState<DaysInMonth[]>([getAllDays])
  const [picker, setPicker] = useState<Pickers>('days')

  const daysElementRefs = useRef<HTMLDivElement[]>([])

  const togglePickers = useCallback(() => {
    if (picker === 'month' || picker === 'year') {
      setPicker('days')

      return
    }
    setPicker('year')
  }, [picker])

  const handleMonthSelect = useCallback(
    (month: number) => {
      const date = selectMonth(days[0].middleOfMonth, month)

      setDays([getDays(date)])
      setPicker('days')
    },
    [days]
  )

  const handleYearSelect = useCallback(
    (year: number) => {
      const date = selectYear(startDate, year)

      setDays([getDays(date)])
      setPicker('month')
    },
    [startDate]
  )

  return {
    startDate,
    days,
    setDays,
    picker,
    setPicker,
    daysElementRefs,
    togglePickers,
    handleMonthSelect,
    handleYearSelect,
    range
  }
}
