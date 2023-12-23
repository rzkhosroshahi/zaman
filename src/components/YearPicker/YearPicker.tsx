import React, { useMemo } from 'react'
import CalendarItem from '../CalendarItem'
import { Wrapper } from './YearPicker.styled'
import { getYears } from '../../utils/dateHelper/dateHelper'
import formatDate from '../../utils/format'
import type { YearPickerProps } from './YearPicker.types'
import { localizeNumber } from '../../utils'
import { YearPickerButton } from '../../style/classNames'

export const YearPicker = (props: YearPickerProps) => {
  const currentYear = parseInt(formatDate(props.value, 'YYYY', 'latn'), 10)
  const years: number[] = useMemo(() => getYears(props.value), [])

  const wrapperRef = React.useCallback((wrapper: HTMLDivElement) => {
    if (wrapper === null) {
      return
    }
    const qu = wrapper.querySelector('button[data-selected=true]')
    if (qu != null) {
      const { height: wrapperHeight, top: wrapperTop } =
        wrapper.getBoundingClientRect()
      const { top } = qu.getBoundingClientRect()
      wrapper.scrollTop = Math.abs(wrapperTop - top) - wrapperHeight / 2
    }
  }, [])

  return (
    <Wrapper ref={wrapperRef}>
      {years.map((year) => (
        <CalendarItem
          className={YearPickerButton}
          key={year}
          width={90}
          height={48}
          data-selected={currentYear === year}
          aria-selected={currentYear === year}
          aria-current="date"
          type="button"
          tabIndex={0}
          onClick={() => props.onYearSelect(year)}
        >
          {localizeNumber(year)}
        </CalendarItem>
      ))}
    </Wrapper>
  )
}

export default YearPicker
