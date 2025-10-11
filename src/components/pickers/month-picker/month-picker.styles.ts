import { cva, type VariantProps } from 'class-variance-authority'

export const monthPickerWrapperVariants = cva([
  'grid grid-cols-3 gap-2',
  'p-4',
  'w-full'
])

export const monthPickerButtonVariants = cva(
  [
    'w-full',
    'px-4 py-3',
    'rounded-lg',
    'transition-colors duration-200',
    'cursor-pointer',
    'text-center',
    'font-medium'
  ],
  {
    variants: {
      selected: {
        true: [
          'bg-[var(--zaman-primary)]',
          'text-[var(--zaman-gray-0)]',
          'shadow-md'
        ],
        false: [
          'bg-transparent',
          'text-[var(--zaman-gray-700)]',
          'hover:bg-[var(--zaman-primary-lighter)]'
        ]
      }
    },
    defaultVariants: {
      selected: false
    }
  }
)

export type MonthPickerWrapperVariants = VariantProps<
  typeof monthPickerWrapperVariants
>
export type MonthPickerButtonVariants = VariantProps<
  typeof monthPickerButtonVariants
>
