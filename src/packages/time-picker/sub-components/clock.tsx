import { cn } from '@utils/cn'

import type { HTMLAttributes } from 'react'

export interface ClockProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
}

export const Clock = ({ children, className, ...props }: ClockProps) => {
  return (
    <div
      {...props}
      className={cn(
        'w-[260px] h-[260px] relative z-[1] rounded-full',
        'bg-[var(--zaman-primary-lighter)]',
        className
      )}
    >
      {children}
    </div>
  )
}

Clock.displayName = 'Clock'

export default Clock
