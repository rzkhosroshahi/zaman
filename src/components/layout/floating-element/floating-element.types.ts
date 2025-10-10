import type { Positions } from '@types'
import type React from 'react'

export interface FloatingElementProps {
  children: React.ReactNode
  destinationRef: React.RefObject<HTMLElement>
  position: Positions
}
