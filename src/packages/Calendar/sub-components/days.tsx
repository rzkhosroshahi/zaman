import { cn } from '@utils/cn'

import type { HTMLAttributes } from 'react'

export interface DaysProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export const Days = ({ children, className, ...props }: DaysProps) => {
  return (
    <div {...props} className={cn('flex gap-1', className)}>
      {children}
    </div>
  )
}

Days.displayName = 'Days'

export default Days
