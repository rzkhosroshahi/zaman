import { useCallback, useEffect, useRef } from 'react'

import { debounce } from '@/utils'

import type { Positions } from '@/types'

export function useFloatingElement(
  destinationRef: React.RefObject<HTMLElement>,
  position: Positions
) {
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
    const debouncedCalcPlacement = debounce(calcPlacement, 500)

    window.addEventListener('resize', debouncedCalcPlacement)

    return () => {
      window.removeEventListener('resize', debouncedCalcPlacement)
    }
  }, [calcPlacement])

  return { floatWrapperRef, calcPlacement }
}
