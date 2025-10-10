import { cn } from '@utils/cn'

import type { ButtonHTMLAttributes } from 'react'

export interface HeaderTitleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export const HeaderTitle = ({
  children,
  className,
  ...props
}: HeaderTitleProps) => {
  return (
    <button
      {...props}
      className={cn(
        'will-change-auto min-w-[100px] outline-none border-0',
        'font-[inherit] bg-transparent cursor-pointer',
        'text-[var(--zaman-primary)] px-4 py-2 font-medium',
        'transition-colors duration-200 ease-in',
        'rounded-[var(--zaman-radius-item)]',
        'hover:bg-[var(--zaman-primary-lighter)]',
        'focus:bg-[var(--zaman-primary-lighter)]',
        'focus-visible:outline-2',
        'focus-visible:outline-offset-2',
        'focus-visible:outline-[var(--zaman-primary)]',
        className
      )}
    >
      {children}
    </button>
  )
}

HeaderTitle.displayName = 'HeaderTitle'

export default HeaderTitle
