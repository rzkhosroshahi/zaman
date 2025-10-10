import { cn } from '@utils/cn'

export interface ModalDivProps {
  children: React.ReactNode
  className?: string
}

export const ModalDiv = ({ children, className }: ModalDivProps) => {
  return (
    <div
      className={cn(
        'fixed flex justify-center items-center',
        'top-0 right-0 w-full h-full z-10',
        className
      )}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  )
}

ModalDiv.displayName = 'ModalDiv'

export default ModalDiv
