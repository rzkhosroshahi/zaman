import FloatingElement from '@components/layout/floating-element'
import Modal from '@components/layout/modal'

import { type RenderCalendarProps } from './render-calendar.types'

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
