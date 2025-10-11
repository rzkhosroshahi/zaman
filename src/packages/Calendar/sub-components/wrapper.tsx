import { forwardRef } from 'react'

import { CALENDAR_HEIGHT, CALENDAR_WIDTH } from '@constants'

import { cn } from '@utils/cn'

export interface CalendarWrapperProps {
  children: React.ReactNode
  className?: string
}

export const Wrapper = forwardRef<HTMLDivElement, CalendarWrapperProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        role="application"
        aria-label="Calendar"
        className={cn(
          'overflow-hidden relative',
          'border border-[var(--zaman-border)] bg-white',
          'rounded-[var(--zaman-radius-modal)]',
          className
        )}
        style={{
          width: `${CALENDAR_WIDTH}px`,
          height: `${CALENDAR_HEIGHT}px`
        }}
      >
        {children}
      </div>
    )
  }
)

Wrapper.displayName = 'CalendarWrapper'

export default Wrapper
