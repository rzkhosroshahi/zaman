import type { InputHTMLAttributes } from 'react'
import type {
  DatePickerValue,
  DaysRange,
  BaseProps,
  Positions,
  onChangeTypeBasedOnRange
} from '../../types'

export interface DatePickerProps extends BaseProps {
  defaultValue?: DatePickerValue
  onChange?: (value: onChangeTypeBasedOnRange<DatePickerProps['range']>) => void
  weekends?: DaysRange[]
  range: boolean
  from?: DatePickerValue
  to?: DatePickerValue
  show?: boolean
  inputClass?: string
  className?: string
  inputAttributes?: InputHTMLAttributes<HTMLInputElement>
  position?: Positions
}
