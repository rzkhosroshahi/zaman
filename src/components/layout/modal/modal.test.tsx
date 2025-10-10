import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { Modal } from './modal'

describe('Modal', () => {
  beforeEach(() => {
    // Create root element for portal
    const portalRoot = document.createElement('div')

    portalRoot.setAttribute('id', 'portal-root')
    document.body.appendChild(portalRoot)
  })

  afterEach(() => {
    // Clean up portal root
    const portalRoot = document.getElementById('portal-root')

    if (portalRoot) {
      document.body.removeChild(portalRoot)
    }
  })

  it('should not render when open is false', () => {
    const { container } = render(
      <Modal open={false} toggleOpen={vi.fn()}>
        <div>Modal Content</div>
      </Modal>
    )

    expect(container.textContent).toBe('')
  })

  it('should render when open is true', () => {
    render(
      <Modal open={true} toggleOpen={vi.fn()}>
        <div>Modal Content</div>
      </Modal>
    )
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('should call toggleOpen when overlay is clicked', () => {
    const toggleOpen = vi.fn()

    render(
      <Modal open={true} toggleOpen={toggleOpen}>
        <div>Modal Content</div>
      </Modal>
    )

    const overlay = screen.getByTestId('overlay')

    fireEvent.click(overlay)

    expect(toggleOpen).toHaveBeenCalledTimes(1)
  })

  it('should call toggleOpen when Escape key is pressed on overlay', () => {
    const toggleOpen = vi.fn()

    render(
      <Modal open={true} toggleOpen={toggleOpen}>
        <div>Modal Content</div>
      </Modal>
    )

    const overlay = screen.getByTestId('overlay')

    fireEvent.keyDown(overlay, { key: 'Escape' })

    expect(toggleOpen).toHaveBeenCalledTimes(1)
  })

  it('should call toggleOpen when Enter key is pressed on overlay', () => {
    const toggleOpen = vi.fn()

    render(
      <Modal open={true} toggleOpen={toggleOpen}>
        <div>Modal Content</div>
      </Modal>
    )

    const overlay = screen.getByTestId('overlay')

    fireEvent.keyDown(overlay, { key: 'Enter' })

    expect(toggleOpen).toHaveBeenCalledTimes(1)
  })

  it('should have proper accessibility attributes', () => {
    render(
      <Modal open={true} toggleOpen={vi.fn()}>
        <div>Modal Content</div>
      </Modal>
    )

    const overlay = screen.getByTestId('overlay')

    expect(overlay).toHaveAttribute('role', 'button')
    expect(overlay).toHaveAttribute('tabIndex', '0')
    expect(overlay).toHaveAttribute('aria-label', 'Close modal')
  })

  it('should render portal to document.body', () => {
    render(
      <Modal open={true} toggleOpen={vi.fn()}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    )

    const modalDiv = document.querySelector('.rdp__modal')

    expect(modalDiv?.parentElement).toBe(document.body)
  })

  it('should render children correctly', () => {
    render(
      <Modal open={true} toggleOpen={vi.fn()}>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </Modal>
    )

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
  })
})
