import React, { useEffect, useRef } from 'react'
import type { FloatingElementProps } from './FloatingElement.types'
import { Wrapper } from './FloatingElement.styled'

const FloatingElement: React.FC<FloatingElementProps> = (props) => {
  const { children, destinationRef } = props
  const floatWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const gap = 4
    let top = 0

    if (destinationRef != null && floatWrapperRef !== null) {
      const floatWrapper = floatWrapperRef.current
      const { top: destTop, bottom: destBottom, right: destRight } = destinationRef?.current?.getBoundingClientRect() as DOMRect
      const { height: itemsHeight } = floatWrapper?.getBoundingClientRect() as DOMRect
      const isThereSpaceBelowDest = (window.innerHeight - destBottom) > itemsHeight

      if (isThereSpaceBelowDest) {
        top = (destBottom + window.scrollY)
      } else {
        top = (destTop + window.scrollY) - itemsHeight - (gap * 2)
      }

      if (floatWrapper != null) {
        floatWrapper.style.top = `${top + gap}px`
        floatWrapper.style.right = `${(document.body.clientWidth - destRight) * -1}px`
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
