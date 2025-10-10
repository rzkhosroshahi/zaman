import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  [
    'cursor-pointer outline-none border-none',
    'flex justify-center items-center',
    'transition-colors duration-200 ease-in',
    'rounded-[var(--zaman-radius-item)]',
    'focus-visible:outline-2',
    'focus-visible:outline-offset-2',
    'focus-visible:outline-[var(--zaman-primary)]'
  ],
  {
    variants: {
      variant: {
        icon: [
          'w-10 h-10',
          'text-[var(--zaman-primary)]',
          'bg-transparent',
          'hover:bg-[var(--zaman-primary-lighter)]',
          'focus:bg-[var(--zaman-primary-lighter)]'
        ],
        text: [
          'px-4 py-2',
          'text-[var(--zaman-primary)]',
          'bg-transparent',
          'hover:bg-[var(--zaman-primary-lighter)]'
        ]
      }
    },
    defaultVariants: {
      variant: 'icon'
    }
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
