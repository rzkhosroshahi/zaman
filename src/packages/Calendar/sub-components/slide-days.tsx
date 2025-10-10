import { forwardRef, type HTMLAttributes } from 'react'

import { CALENDAR_WIDTH } from '@constants'

import { cn } from '@utils/cn'

export interface SlideDaysProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export const SlideDays = forwardRef<HTMLDivElement, SlideDaysProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn('will-change-transform flex flex-col gap-1', className)}
        style={{ width: `${CALENDAR_WIDTH}px` }}
      >
        {children}
      </div>
    )
  }
)

SlideDays.displayName = 'SlideDays'

export default SlideDays
