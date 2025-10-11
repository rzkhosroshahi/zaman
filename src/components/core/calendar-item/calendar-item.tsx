import { cn } from '@utils/cn'

import type {
  CalendarItemProps,
  CalendarTextProps
} from './calendar-item.types'
import type { ButtonHTMLAttributes } from 'react'

export const CalendarText = ({ children, className }: CalendarTextProps) => {
  return <div className={cn('cl-text', className)}>{children}</div>
}

CalendarText.displayName = 'CalendarText'

export interface CalendarItemComponentProps
  extends CalendarItemProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CalendarItemProps> {
  'data-selected'?: 'true' | 'false' | boolean
  'data-disabled'?: 'true' | 'false' | boolean
  'data-weekend'?: 'true' | 'false' | boolean
  'data-in-range'?: 'true' | 'false' | boolean
  'data-start-range'?: 'true' | 'false' | boolean
  'data-end-range'?: 'true' | 'false' | boolean
}

export const CalendarItem = ({
  width = 40,
  height = 40,
  children,
  className,
  ...props
}: CalendarItemComponentProps) => {
  return (
    <button
      {...props}
      className={cn(
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
        'calendar-item',
        className
      )}
      style={{
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      {children}
    </button>
  )
}

CalendarItem.displayName = 'CalendarItem'

export default CalendarItem
