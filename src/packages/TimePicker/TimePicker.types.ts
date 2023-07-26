import type { InputHTMLAttributes } from 'react'
import type { BaseProps, DatePickerValue } from '../../types'

export interface onChangePayload {
  hour: number
  minute: number
  timeConvention?: 'am' | 'pm'
}

export interface TimePickerProps extends BaseProps {
  defaultValue?: DatePickerValue
  clockTime?: 12 | 24
  onChange?: (payload: onChangePayload) => void
  inputClass?: string
  inputAttributes?: InputHTMLAttributes<HTMLInputElement>
}
