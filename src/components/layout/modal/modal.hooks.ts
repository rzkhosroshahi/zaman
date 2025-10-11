import { useCallback, useEffect } from 'react'

export function useModal(toggleOpen: () => void, open: boolean) {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        toggleOpen()
      }
    },
    [open, toggleOpen]
  )

  const handleOverlayClick = useCallback(() => {
    toggleOpen()
  }, [toggleOpen])

  const handleOverlayKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter') {
        toggleOpen()
      }
    },
    [toggleOpen]
  )

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape)

      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [open, handleEscape])

  return {
    handleOverlayClick,
    handleOverlayKeyDown
  }
}
