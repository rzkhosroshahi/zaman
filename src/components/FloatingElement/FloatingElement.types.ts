import type React from 'react'
import type { Positions } from '../../types'

export interface FloatingElementProps {
  children: React.ReactNode
  destinationRef: React.RefObject<HTMLInputElement>
  position: Positions
}
