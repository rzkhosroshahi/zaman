import { cn } from '@utils/cn'

export interface MinuteWithAnimationProps {
  children: React.ReactNode
  className?: string
}

export const MinuteWithAnimation = ({
  children,
  className
}: MinuteWithAnimationProps) => {
  return <div className={cn('zaman-fade', className)}>{children}</div>
}

MinuteWithAnimation.displayName = 'MinuteWithAnimation'

export default MinuteWithAnimation
