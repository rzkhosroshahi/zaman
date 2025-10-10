import { cn } from '@utils/cn'

import type { HTMLAttributes } from 'react'

export interface ClockTimeProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
}

export const ClockTime = ({
  children,
  className,
  ...props
}: ClockTimeProps) => {
  return (
    <div
      {...props}
      className={cn('cursor-pointer text-xs px-1 py-1 rounded', className)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          props.onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>)
        }
      }}
    >
      {children}
    </div>
  )
}

ClockTime.displayName = 'ClockTime'

export default ClockTime
