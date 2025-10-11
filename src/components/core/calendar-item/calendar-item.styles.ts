import { cva, type VariantProps } from 'class-variance-authority'

export const calendarItemVariants = cva(
  [
    'relative flex items-center justify-center',
    'outline-none bg-transparent border select-none font-[inherit]',
    'border-transparent text-[var(--zaman-gray-600)]',
    'transition-all duration-100 linear',
    'rounded-[var(--zaman-radius-item)]',
    'hover:border-[var(--zaman-gray-100)]',
    'focus:border-[var(--zaman-gray-100)]',
    'focus-visible:outline-2',
    'focus-visible:outline-offset-2',
    'focus-visible:outline-[var(--zaman-primary)]',
    'active:bg-[var(--zaman-primary-dark)]',
    'active:border-transparent',
    'active:text-[var(--zaman-gray-0)]',
    'data-[selected=true]:bg-[var(--zaman-primary)]',
    'data-[selected=true]:border-transparent',
    'data-[selected=true]:text-[var(--zaman-gray-0)]',
    'data-[disabled=true]:border-transparent',
    'data-[disabled=true]:cursor-not-allowed',
    'data-[disabled=true]:opacity-40',
    'data-[disabled=true]:[&_.cl-text]:opacity-50',
    'data-[weekend=true]:data-[selected=false]:text-[var(--zaman-weekend)]',
    'data-[in-range=true]:bg-[var(--zaman-primary-lighter)]',
    'data-[in-range=true]:border-transparent',
    'data-[start-range=true]:bg-[var(--zaman-primary-dark)]',
    'data-[start-range=true]:text-[var(--zaman-gray-0)]',
    'data-[start-range=true]:border-transparent',
    'data-[end-range=true]:bg-[var(--zaman-primary-dark)]',
    'data-[end-range=true]:text-[var(--zaman-gray-0)]',
    'data-[end-range=true]:border-transparent',
    'data-[disabled=false]:cursor-pointer',
    'calendar-item'
  ],
  {
    variants: {
      size: {
        default: 'w-10 h-10',
        small: 'w-8 h-8',
        large: 'w-12 h-12'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)

export type CalendarItemVariants = VariantProps<typeof calendarItemVariants>
