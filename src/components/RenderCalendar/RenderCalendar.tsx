import React from 'react'
import { type RenderCalendarProps } from './RenderCalendar.types'
import FloatingElement from '../../components/FloatingElement'
import Modal from '../Modal'

export const RenderCalendar = (props: RenderCalendarProps) => {
  const { position = 'right' } = props
  if (!props.showCalendar) {
    return null
  }
  const { matches: isDesktop } = window.matchMedia('(min-width: 640px)')

  if (isDesktop) {
    return (
      <FloatingElement
        destinationRef={props.destinationRef}
        position={position}
      >
        {props.children}
      </FloatingElement>
    )
  }

  return (
    <Modal toggleOpen={props.toggleOpen} open={props.showCalendar}>
      {props.children}
    </Modal>
  )
}

export default RenderCalendar
