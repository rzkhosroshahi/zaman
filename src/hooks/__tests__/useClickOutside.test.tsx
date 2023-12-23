import React, { useRef } from 'react'
import useClickOutside from '../useClickOutside'
import { fireEvent, render, screen } from '@testing-library/react'

interface MockComponentProps {
  handler: () => void
}
const MockComponent = (props: MockComponentProps) => {
  const insideRef = useRef(null)
  useClickOutside(insideRef, props.handler)
  return (
    <div>
      <div>click outside</div>
      <div ref={insideRef}>Click inside</div>
    </div>
  )
}
test('test click on inside', () => {
  const mockCallback = jest.fn(() => {})
  render(<MockComponent handler={mockCallback} />)
  fireEvent.mouseDown(screen.getByText(/click inside/i))

  expect(mockCallback.mock.calls.length).toBe(0)
})

test('test click on outside', () => {
  const mockCallback = jest.fn(() => {})
  render(<MockComponent handler={mockCallback} />)
  fireEvent.mouseDown(screen.getByText(/click outside/i))

  expect(mockCallback.mock.calls.length).toBe(1)
})
