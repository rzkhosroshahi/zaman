import React, { useCallback, useEffect, useRef } from 'react'

import { createPortal } from 'react-dom'

import { debounce } from '@/utils'

import { Wrapper } from './sub-components'

import type { FloatingElementProps } from './floating-element.types'
import type { Positions } from '@/types'

const FloatingElement: React.FC<FloatingElementProps> = (props) => {
  const { children, destinationRef, position } = props
  const floatWrapperRef = useRef<HTMLDivElement>(null)

  const calcPlacement = useCallback(() => {
    const gap = 4
    let top = 0

    if (destinationRef.current && floatWrapperRef.current) {
      const floatWrapper = floatWrapperRef.current

      const {
        top: destTop,
        bottom: destBottom,
        right: destRight,
        left: destLeft,
        width: destWidth
      } = destinationRef.current.getBoundingClientRect()
      const { height: itemsHeight, width: floatWidth } =
        floatWrapper.getBoundingClientRect()
      const isThereSpaceBelowDest =
        window.innerHeight - destBottom > itemsHeight

      if (isThereSpaceBelowDest) {
        top = destBottom + window.scrollY
      } else {
        top = destTop + window.scrollY - itemsHeight - gap * 2
      }
      floatWrapper.style.top = `${top + gap}px`

      const positionsCalc: Record<Positions, () => void> = {
        right: () => {
          floatWrapper.style.right = `${
            Math.abs(document.body.clientWidth - destRight) + 16
          }px`
        },
        left: () => {
          floatWrapper.style.left = `${destLeft}px`
        },
        center: () => {
          const isDestBiggerThanFloatElement = floatWidth > destWidth
          const remainWidth = isDestBiggerThanFloatElement
            ? 0
            : Math.abs(floatWidth - destWidth) / 2 + 16

          floatWrapper.style.right = `${
            Math.abs(document.body.clientWidth - destRight) + remainWidth
          }px`
        }
      }

      positionsCalc[position]()
    }
  }, [destinationRef, position])

  useEffect(() => {
    calcPlacement()
    window.addEventListener('resize', debounce(calcPlacement, 500))

    return () => {
      window.removeEventListener('resize', calcPlacement)
    }
  }, [calcPlacement])

  return (
    <>
      {createPortal(
        <Wrapper ref={floatWrapperRef}>{children}</Wrapper>,
        document.body
      )}
    </>
  )
}

export default FloatingElement
