import { cn } from '@utils/cn'

export interface DayNameProps {
  children: React.ReactNode
  className?: string
}

export const DayName = ({ children, className }: DayNameProps) => {
  return (
    <div
      role="columnheader"
      className={cn(
        'flex justify-center items-center text-sm w-10',
        'text-[var(--zaman-gray-400)]',
        className
      )}
    >
      {children}
    </div>
  )
}

DayName.displayName = 'DayName'

export default DayName
