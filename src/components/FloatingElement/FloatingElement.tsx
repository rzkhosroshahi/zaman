import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import debounce from 'lodash.debounce'
import type { FloatingElementProps } from './FloatingElement.types'
import type { Positions } from '../../types'
import { Wrapper } from './FloatingElement.styled'

const FloatingElement: React.FC<FloatingElementProps> = (props) => {
  const { children, destinationRef, position } = props
  const floatWrapperRef = useRef<HTMLDivElement>(null)

  const calcPlacement = () => {
    const gap = 4
    let top = 0

    if (destinationRef != null && floatWrapperRef !== null) {
      const floatWrapper = floatWrapperRef.current
      if (floatWrapper === null) {
        return
      }
      const {
        top: destTop, bottom: destBottom, right: destRight, left: destLeft, width: destWidth
      } = destinationRef?.current?.getBoundingClientRect() as DOMRect
      const { height: itemsHeight, width: floatWidth } = floatWrapper?.getBoundingClientRect()
      const isThereSpaceBelowDest = (window.innerHeight - destBottom) > itemsHeight

      if (isThereSpaceBelowDest) {
        top = (destBottom + window.scrollY)
      } else {
        top = (destTop + window.scrollY) - itemsHeight - (gap * 2)
      }
      floatWrapper.style.top = `${top + gap}px`

      const positionsCalc: Record<Positions, () => void> = {
        right: () => {
          floatWrapper.style.right = `${Math.abs(document.body.clientWidth - destRight) + 16}px`
        },
        left: () => {
          floatWrapper.style.left = `${(destLeft)}px`
        },
        center: () => {
          const isDestBiggerThanFloatElement = position === 'center' && floatWidth > destWidth
          const remainWidth = isDestBiggerThanFloatElement ? 0 : Math.abs((floatWidth - destWidth)) / 2 + 16
          floatWrapper.style.right = `${Math.abs(document.body.clientWidth - destRight) + remainWidth}px`
        }
      }

      positionsCalc[position]()
    }
  }

  useEffect(() => {
    calcPlacement()
    window.addEventListener('resize', debounce(calcPlacement, 500))

    return () => {
      window.removeEventListener('resize', calcPlacement)
    }
  }, [destinationRef])

  return (
    <>
      {createPortal(
        <Wrapper ref={floatWrapperRef}>
          {children}
        </Wrapper>
        , document.body
      )}
    </>
  )
}

export default FloatingElement
