import { cva, type VariantProps } from 'class-variance-authority'

export const yearPickerWrapperVariants = cva([
  'grid grid-cols-3 gap-2',
  'p-4',
  'w-full',
  'max-h-[400px]',
  'overflow-y-auto'
])

export const yearPickerButtonVariants = cva(
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

export type YearPickerWrapperVariants = VariantProps<
  typeof yearPickerWrapperVariants
>
export type YearPickerButtonVariants = VariantProps<
  typeof yearPickerButtonVariants
>
