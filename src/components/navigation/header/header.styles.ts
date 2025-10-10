import { cva, type VariantProps } from 'class-variance-authority'

export const headerWrapperVariants = cva(
  ['flex items-center justify-between', 'w-full', 'p-2'],
  {
    variants: {
      size: {
        default: 'h-12',
        compact: 'h-10',
        large: 'h-14'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)

export const headerTitleVariants = cva(
  [
    'flex-1 text-center',
    'cursor-pointer',
    'select-none',
    'outline-none',
    'transition-colors duration-200',
    'text-[var(--zaman-gray-700)]',
    'hover:text-[var(--zaman-primary)]',
    'focus:text-[var(--zaman-primary)]',
    'focus-visible:outline-2',
    'focus-visible:outline-offset-2',
    'focus-visible:outline-[var(--zaman-primary)]',
    'rounded-sm'
  ],
  {
    variants: {
      size: {
        default: 'text-base',
        large: 'text-lg',
        small: 'text-sm'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)

export type HeaderWrapperVariants = VariantProps<typeof headerWrapperVariants>
export type HeaderTitleVariants = VariantProps<typeof headerTitleVariants>
