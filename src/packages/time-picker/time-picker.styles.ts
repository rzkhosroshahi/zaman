import { cva, type VariantProps } from 'class-variance-authority'

export const timePickerWrapperVariants = cva([
  'flex items-center gap-2',
  'p-4',
  'bg-white',
  'rounded-lg'
])

export const timePickerInputVariants = cva([
  'w-16',
  'px-2 py-1',
  'text-center',
  'border border-gray-300',
  'rounded',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-[var(--zaman-primary)]'
])

export type TimePickerWrapperVariants = VariantProps<
  typeof timePickerWrapperVariants
>
export type TimePickerInputVariants = VariantProps<
  typeof timePickerInputVariants
>
