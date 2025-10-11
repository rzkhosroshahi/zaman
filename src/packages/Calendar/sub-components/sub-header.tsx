import { cn } from '@utils/cn'

export interface SubHeaderProps {
  children: React.ReactNode
  className?: string
}

export const SubHeader = ({ children, className }: SubHeaderProps) => {
  return (
    <div
      className={cn(
        'flex justify-center items-center mt-3 mb-2 h-6 gap-1',
        className
      )}
    >
      {children}
    </div>
  )
}

SubHeader.displayName = 'SubHeader'

export default SubHeader
