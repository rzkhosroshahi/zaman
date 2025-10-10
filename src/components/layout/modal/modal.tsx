import { createPortal } from 'react-dom'

import { ModalDiv } from './sub-components'

import type { ModalProps } from './modal.types'

export const Modal = (props: ModalProps) => {
  const { open, toggleOpen, children } = props

  if (open === false) {
    return null
  }

  return (
    <>
      {createPortal(
        <ModalDiv className="rdp__modal">
          {children}
          <div
            data-testid="overlay"
            className="rdp__overlay"
            onClick={toggleOpen}
            role="button"
            tabIndex={0}
            aria-label="Close modal"
            onKeyDown={(e) => {
              if (e.key === 'Escape' || e.key === 'Enter') {
                toggleOpen()
              }
            }}
          />
        </ModalDiv>,
        document.body
      )}
    </>
  )
}

export default Modal
