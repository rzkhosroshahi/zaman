import { cva, type VariantProps } from 'class-variance-authority'

export const calendarProviderVariants = cva(['zaman-calendar'])

export type CalendarProviderVariants = VariantProps<
  typeof calendarProviderVariants
>
