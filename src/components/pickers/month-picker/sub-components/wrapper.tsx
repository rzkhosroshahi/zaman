import { cn } from '@utils/cn'

export interface MonthPickerWrapperProps {
  children: React.ReactNode
  className?: string
}

export const Wrapper = ({ children, className }: MonthPickerWrapperProps) => {
  return (
    <div className={cn('grid grid-cols-3 gap-2 p-4', 'w-full', className)}>
      {children}
    </div>
  )
}

Wrapper.displayName = 'MonthPickerWrapper'

export default Wrapper
