import { cn } from '@utils/cn'
import { numberPositionX, numberPositionY } from '@utils/timePicker'

import type { HTMLAttributes } from 'react'

export interface NumbersItemProps extends HTMLAttributes<HTMLSpanElement> {
  idx: number
  clockHalfWidth?: number
  numbersPadd?: number
  top?: string
  children?: React.ReactNode
  className?: string
}

export const NumbersItem = ({
  idx,
  clockHalfWidth = 130,
  numbersPadd = 24,
  top = '2%',
  children,
  className,
  ...props
}: NumbersItemProps) => {
  const translateX = numberPositionX(idx, clockHalfWidth, numbersPadd)
  const translateY = numberPositionY(idx, clockHalfWidth, numbersPadd)

  return (
    <span
      {...props}
      className={cn(
        'w-8 h-8 inline-flex absolute items-center',
        'rounded-[32px] justify-center select-none',
        'pointer-events-none text-black',
        className
      )}
      style={{
        left: 'calc(50% - 16px)',
        top,
        transform: `translate(${translateX}px, ${translateY}px)`
      }}
    >
      {children}
    </span>
  )
}

NumbersItem.displayName = 'NumbersItem'

export default NumbersItem
