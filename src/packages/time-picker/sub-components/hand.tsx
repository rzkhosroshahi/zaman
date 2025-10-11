import { cn } from '@utils/cn'

import type { HTMLAttributes } from 'react'

export interface HandProps extends HTMLAttributes<HTMLDivElement> {
  hour: number
  minute: number
  value: number
  isInsideHour: boolean
  isSelectingHour: boolean
  className?: string
}

export const Hand = ({
  hour,
  minute,
  value,
  isInsideHour,
  isSelectingHour,
  className,
  ...props
}: HandProps) => {
  const height = isInsideHour ? '26%' : '40%'
  const rotation = isSelectingHour ? (value / 12) * 360 : (value / 60) * 360

  return (
    <div
      {...props}
      className={cn(
        'left-1/2 w-[1.5px] bottom-1/2 absolute',
        'bg-[var(--zaman-primary-light)]',
        'origin-[center_bottom_0]',
        'transition-[height] duration-300 cubic-bezier(0.4, 0, 0.2, 1)',
        'pointer-events-none',
        className
      )}
      style={{
        height,
        transform: `rotateZ(${rotation}deg)`
      }}
    />
  )
}

Hand.displayName = 'Hand'

export default Hand
