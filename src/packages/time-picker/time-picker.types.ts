import type { BaseProps, DatePickerValue } from '@types'
import type { InputHTMLAttributes } from 'react'

export interface OnChangePayload {
  hour: number
  minute: number
  timeConvention?: 'am' | 'pm'
}

export interface TimePickerProps extends BaseProps {
  defaultValue?: DatePickerValue
  clockTime?: 12 | 24
  onChange?: (payload: OnChangePayload) => void
  inputClass?: string
  inputAttributes?: InputHTMLAttributes<HTMLInputElement>
}
