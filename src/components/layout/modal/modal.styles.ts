import { cva, type VariantProps } from 'class-variance-authority'

export const modalVariants = cva(
  [
    'fixed inset-0 z-[9999]',
    'flex items-center justify-center',
    'bg-black/50',
    'backdrop-blur-sm'
  ],
  {
    variants: {
      animation: {
        fade: 'animate-in fade-in duration-200',
        scale: 'animate-in fade-in zoom-in-95 duration-200',
        slide: 'animate-in fade-in slide-in-from-bottom-4 duration-300'
      }
    },
    defaultVariants: {
      animation: 'fade'
    }
  }
)

export const modalOverlayVariants = cva([
  'fixed inset-0',
  'cursor-pointer',
  'outline-none',
  '-z-10'
])

export type ModalVariants = VariantProps<typeof modalVariants>
export type ModalOverlayVariants = VariantProps<typeof modalOverlayVariants>
