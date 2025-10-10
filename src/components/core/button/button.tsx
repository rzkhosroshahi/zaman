import { cn } from '@utils/cn'

import type { ButtonProps } from './button.types'
import type { ButtonHTMLAttributes } from 'react'

export const Button = ({
  children,
  className,
  variant = 'icon',
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={cn(
        'cursor-pointer outline-none border-none',
        'flex justify-center items-center',
        'transition-colors duration-200 ease-in',
        'rounded-[var(--zaman-radius-item)]',
        'focus-visible:outline-2',
        'focus-visible:outline-offset-2',
        'focus-visible:outline-[var(--zaman-primary)]',
        variant === 'icon' && [
          'w-10 h-10',
          'text-[var(--zaman-primary)]',
          'bg-transparent',
          'hover:bg-[var(--zaman-primary-lighter)]',
          'focus:bg-[var(--zaman-primary-lighter)]'
        ],
        className
      )}
    >
      {children}
    </button>
  )
}

Button.displayName = 'Button'

export default Button
