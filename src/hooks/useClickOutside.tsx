import { useEffect, type RefObject } from 'react'

function useClickOutside(ref: RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    function handleClickOutside({ target }: MouseEvent) {
      if (ref.current != null && !ref.current.contains(target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, handler])
}

export default useClickOutside
