import { cn } from '@utils/cn'

export interface TimeWrapperProps {
  children: React.ReactNode
  className?: string
}

export const TimeWrapper = ({ children, className }: TimeWrapperProps) => {
  return (
    <div
      className={cn('absolute top-4 left-4 flex items-center gap-2', className)}
    >
      {children}
    </div>
  )
}

TimeWrapper.displayName = 'TimeWrapper'

export default TimeWrapper
