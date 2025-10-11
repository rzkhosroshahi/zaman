import { forwardRef } from 'react'

import { cn } from '@utils/cn'

export interface YearPickerWrapperProps {
  children: React.ReactNode
  className?: string
}

export const Wrapper = forwardRef<HTMLDivElement, YearPickerWrapperProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid grid-cols-3 gap-2 p-4',
          'w-full max-h-[400px] overflow-y-auto',
          className
        )}
      >
        {children}
      </div>
    )
  }
)

Wrapper.displayName = 'YearPickerWrapper'

export default Wrapper
