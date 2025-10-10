import { useCallback } from 'react'

import type { HeaderProps } from './header.types'

export function useHeader(props: HeaderProps) {
  const { onPrevClick, onNextClick, onClickOnTitle } = props

  const handlePrevClick = useCallback(() => {
    onPrevClick?.()
  }, [onPrevClick])

  const handleNextClick = useCallback(() => {
    onNextClick?.()
  }, [onNextClick])

  const handleTitleClick = useCallback(() => {
    onClickOnTitle?.()
  }, [onClickOnTitle])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, action: () => void) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        action()
      }
    },
    []
  )

  return {
    handlePrevClick,
    handleNextClick,
    handleTitleClick,
    handleKeyDown
  }
}
