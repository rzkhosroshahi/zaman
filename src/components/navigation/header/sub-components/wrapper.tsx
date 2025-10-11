import { cn } from '@utils/cn'

export interface WrapperProps {
  children: React.ReactNode
  className?: string
}

export const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <header
      className={cn(
        'flex justify-between items-center h-14 px-2',
        'bg-[var(--zaman-primary-lighter)]',
        'border-b-2 border-[var(--zaman-primary-lighter)]',
        className
      )}
    >
      {children}
    </header>
  )
}

Wrapper.displayName = 'HeaderWrapper'

export default Wrapper
