import type * as React from 'react'

export interface ModalProps {
  open?: boolean
  children: React.ReactNode
  toggleOpen: () => void
}
