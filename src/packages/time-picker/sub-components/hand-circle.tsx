import { cn } from '@utils/cn'

import type { HTMLAttributes } from 'react'

export interface HandCircleProps extends HTMLAttributes<HTMLDivElement> {
  isSelectingHour: boolean
  className?: string
}

export const HandCircle = ({
  isSelectingHour,
  className,
  ...props
}: HandCircleProps) => {
  return (
    <div
      {...props}
      className={cn(
        'absolute top-[-22px] right-[-16px]',
        'border-[16px] border-[var(--zaman-primary-light)]',
        'box-content rounded-full',
        'bg-[var(--zaman-primary-light)]',
        'pointer-events-none',
        className
      )}
    />
  )
}

HandCircle.displayName = 'HandCircle'

export default HandCircle
