import React from 'react'

import { CALENDAR_HEIGHT, CALENDAR_WIDTH } from '@constants'

import { cn } from '@utils/cn'

export const CalendarWrapper = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      role="application"
      aria-label="Time picker"
      className={cn(
        'overflow-hidden relative flex flex-col justify-center items-center',
        'border border-[var(--zaman-border)] bg-white',
        'rounded-[var(--zaman-radius-modal)]',
        className
      )}
      style={{
        width: `${CALENDAR_WIDTH}px`,
        minHeight: `${CALENDAR_HEIGHT}px`
      }}
    >
      {children}
    </div>
  )
})

CalendarWrapper.displayName = 'CalendarWrapper'

export default CalendarWrapper
