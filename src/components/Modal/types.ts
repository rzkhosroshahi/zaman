import type * as React from 'react'

export interface IModalProps {
  open?: boolean
  children: React.ReactNode
  toggleOpen: () => void
}
