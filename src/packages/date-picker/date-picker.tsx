import RenderCalendar from '@components/pickers/render-calendar'

import Calendar from '@packages/calendar'
import CalendarProvider from '@packages/calendar-provider'

import { useDatePicker } from './date-picker.hooks'

import type { DatePickerProps } from './date-picker.types'

export const DatePicker = (props: DatePickerProps) => {
  const { weekends = [], direction = 'rtl', accentColor } = props

  const { inputRef, containerRef, value, showCalendar, inputValue, handlers } =
    useDatePicker(props)

  return (
    <CalendarProvider
      accentColor={accentColor}
      round={props.round}
      direction={direction}
    >
      <input
        ref={inputRef}
        {...props.inputAttributes}
        onClick={handlers.toggleShowCalendar}
        type="text"
        value={inputValue}
        className={props.inputClass ?? ''}
        readOnly
        aria-label={props.inputAttributes?.['aria-label'] ?? 'Select date'}
        aria-expanded={showCalendar}
        aria-haspopup="dialog"
        role="combobox"
      />
      <RenderCalendar
        toggleOpen={handlers.toggleShowCalendar}
        showCalendar={showCalendar}
        destinationRef={inputRef}
        position={props.position}
      >
        <Calendar
          defaultValue={value}
          ref={containerRef}
          className={props.className}
          weekends={weekends}
          onChange={handlers.handleChangeDay}
          range={props.range}
          from={props.range === true ? props.from : undefined}
          to={props.range === true ? props.to : undefined}
        />
      </RenderCalendar>
    </CalendarProvider>
  )
}

export default DatePicker
