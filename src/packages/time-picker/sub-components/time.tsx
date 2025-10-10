import { cn } from '@utils/cn'

export interface TimeProps {
  children: React.ReactNode
  className?: string
}

export const Time = ({ children, className }: TimeProps) => {
  return (
    <div
      className={cn(
        'px-2 py-1',
        'rounded-[var(--zaman-radius-item)]',
        'bg-[var(--zaman-gray-50)]',
        className
      )}
    >
      {children}
    </div>
  )
}

Time.displayName = 'Time'

export default Time
