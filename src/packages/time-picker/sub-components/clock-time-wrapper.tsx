import { cn } from '@utils/cn'

export interface ClockTimeWrapperProps {
  children: React.ReactNode
  className?: string
}

export const ClockTimeWrapper = ({
  children,
  className
}: ClockTimeWrapperProps) => {
  return <div className={cn('flex gap-1', className)}>{children}</div>
}

ClockTimeWrapper.displayName = 'ClockTimeWrapper'

export default ClockTimeWrapper
