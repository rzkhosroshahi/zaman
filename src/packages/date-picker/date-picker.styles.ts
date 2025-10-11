import { cva, type VariantProps } from 'class-variance-authority'

export const datePickerInputVariants = cva([
  'px-3 py-2',
  'border border-gray-300',
  'rounded-md',
  'cursor-pointer',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-[var(--zaman-primary)]',
  'focus:border-transparent',
  'transition-all duration-200'
])

export const datePickerWrapperVariants = cva(['relative inline-block'])

export type DatePickerInputVariants = VariantProps<
  typeof datePickerInputVariants
>
export type DatePickerWrapperVariants = VariantProps<
  typeof datePickerWrapperVariants
>
