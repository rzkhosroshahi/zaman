import type React from 'react'
import { useEffect } from 'react'

function useClickOutside (ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    function handleClickOutside ({ target }: MouseEvent) {
      if ((ref.current != null) && !ref.current.contains(target as Node)) {
        handler()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, handler])
}

export default useClickOutside
