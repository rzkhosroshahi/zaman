import { useMemo, useRef, useState } from 'react'

import useClickOutside from '@hooks/useClickOutside'

import formatDate from '@utils/format'
import localeCache from '@utils/locale'
import locales from '@utils/locales'

import type { DatePickerProps } from './date-picker.types'

export function useDatePicker(props: DatePickerProps) {
  const { defaultValue, locale = 'fa', range } = props

  useMemo(() => localeCache.setLocale(locale), [locale])

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [value, setValue] = useState<Date | undefined>(
    defaultValue !== undefined ? new Date(defaultValue) : undefined
  )
  const [from, setFrom] = useState<Date | undefined>(
    range === true && props.from !== undefined
      ? new Date(props.from)
      : undefined
  )
  const [to, setTo] = useState<Date | undefined>(
    range === true && props.to !== undefined ? new Date(props.to) : undefined
  )
  const [showCalendar, setShowCalendar] = useState<boolean>(false)

  useClickOutside(containerRef, () => setShowCalendar(false))

  const toggleShowCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const handleChangeDay = (date: Date) => {
    if (range === true && typeof props.onChange === 'function') {
      if (!from || to) {
        setFrom(date)
        setTo(undefined)
      } else {
        setTo(date)
        props.onChange(date)
      }
    } else if (
      (range === false || range === undefined) &&
      typeof props.onChange === 'function'
    ) {
      setValue(date)
      props.onChange(date)
    }
  }

  const getInputValue = useMemo(() => {
    const format = props.customShowDateFormat ?? locales[locale].format

    if (range === undefined && value !== undefined) {
      return formatDate(value, format)
    }
    if (from !== undefined && to !== undefined) {
      return `${formatDate(from, format)} - ${formatDate(to, format)}`
    }

    return ''
  }, [value, from, to, locale, props.customShowDateFormat, range])

  return {
    inputRef,
    containerRef,
    value,
    from,
    to,
    showCalendar,
    inputValue: getInputValue,
    handlers: {
      toggleShowCalendar,
      handleChangeDay
    }
  }
}
