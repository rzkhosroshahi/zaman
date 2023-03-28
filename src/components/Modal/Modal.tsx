import React from 'react'
import type { IModalProps } from './types'
import { ModalDiv } from './Modal.styled'
import { createPortal } from 'react-dom'

export const Modal = (props: IModalProps) => {
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
          />
        </ModalDiv>,
        document.body
      )}
    </>
  )
}

export default Modal
