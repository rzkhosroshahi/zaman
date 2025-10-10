import { cva, type VariantProps } from 'class-variance-authority'

export const calendarWrapperVariants = cva([
  'overflow-hidden relative',
  'border border-[var(--zaman-border)] bg-white',
  'rounded-[var(--zaman-radius-modal)]'
])

export const calendarDaysWrapperVariants = cva([
  'wrapper-days flex absolute overflow-hidden'
])

export const calendarSlideDaysVariants = cva([
  'will-change-transform flex flex-col gap-1'
])

export const calendarDaysRowVariants = cva(['flex gap-1'])

export const calendarSubHeaderVariants = cva([
  'flex justify-center items-center mt-3 mb-2 h-6 gap-1'
])

export type CalendarWrapperVariants = VariantProps<
  typeof calendarWrapperVariants
>
export type CalendarDaysWrapperVariants = VariantProps<
  typeof calendarDaysWrapperVariants
>
export type CalendarSlideDaysVariants = VariantProps<
  typeof calendarSlideDaysVariants
>
export type CalendarDaysRowVariants = VariantProps<
  typeof calendarDaysRowVariants
>
export type CalendarSubHeaderVariants = VariantProps<
  typeof calendarSubHeaderVariants
>
