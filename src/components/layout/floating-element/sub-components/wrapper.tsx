import { forwardRef } from 'react'

import { cn } from '@utils/cn'

export interface FloatingWrapperProps {
  children: React.ReactNode
  className?: string
}

export const Wrapper = forwardRef<HTMLDivElement, FloatingWrapperProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'absolute z-[999]',
          'bg-white',
          'rounded-[var(--zaman-radius-modal)]',
          'shadow-lg',
          className
        )}
      >
        {children}
      </div>
    )
  }
)

Wrapper.displayName = 'FloatingWrapper'

export default Wrapper
