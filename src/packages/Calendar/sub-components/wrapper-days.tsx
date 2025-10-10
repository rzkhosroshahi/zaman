import { cn } from '@utils/cn'

import type { HTMLAttributes } from 'react'

export interface WrapperDaysProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export const WrapperDays = ({
  children,
  className,
  ...props
}: WrapperDaysProps) => {
  return (
    <div
      {...props}
      role="grid"
      aria-label="Calendar days"
      className={cn('wrapper-days flex absolute overflow-hidden', className)}
    >
      {children}
    </div>
  )
}

WrapperDays.displayName = 'WrapperDays'

export default WrapperDays
