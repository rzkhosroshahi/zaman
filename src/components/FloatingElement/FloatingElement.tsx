import React, { useEffect, useRef } from 'react'
import type { FloatingElementProps } from './FloatingElement.types'
import { Wrapper } from './FloatingElement.styled'
import { isRtl } from '../../utils'

const FloatingElement: React.FC<FloatingElementProps> = (props) => {
  const { children, destinationRef } = props
  const floatWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const gap = 4
    let top = 0

    if (destinationRef != null && floatWrapperRef !== null) {
      const floatWrapper = floatWrapperRef.current
      if (floatWrapper === null) {
        return
      }
      const { top: destTop, bottom: destBottom, right: destRight, left: destLeft } = destinationRef?.current?.getBoundingClientRect() as DOMRect
      const { height: itemsHeight } = floatWrapper?.getBoundingClientRect()
      const isThereSpaceBelowDest = (window.innerHeight - destBottom) > itemsHeight

      if (isThereSpaceBelowDest) {
        top = (destBottom + window.scrollY)
      } else {
        top = (destTop + window.scrollY) - itemsHeight - (gap * 2)
      }

      floatWrapper.style.top = `${top + gap}px`

      if (isRtl()) {
        floatWrapper.style.right = `${Math.abs(document.body.clientWidth - destRight)}px`
      } else {
        floatWrapper.style.left = `${(destLeft)}px`
      }
    }
  }, [destinationRef])
  return (
    <Wrapper ref={floatWrapperRef}>
      {children}
    </Wrapper>
  )
}

export default FloatingElement
