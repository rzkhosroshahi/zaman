import { useRef } from 'react'

import FloatingElement from './floating-element'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof FloatingElement> = {
  title: 'Components/Layout/FloatingElement',
  component: FloatingElement,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof FloatingElement>

const FloatingWrapper = ({
  position
}: {
  position: 'left' | 'center' | 'right'
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <button
        ref={buttonRef}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Trigger Element
      </button>
      <FloatingElement destinationRef={buttonRef} position={position}>
        <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
          <h3 className="font-semibold mb-2">Floating Content</h3>
          <p className="text-sm text-gray-600">
            This content floats relative to the trigger element.
          </p>
        </div>
      </FloatingElement>
    </div>
  )
}

export const CenterPosition: Story = {
  render: () => <FloatingWrapper position="center" />
}

export const LeftPosition: Story = {
  render: () => <FloatingWrapper position="left" />
}

export const RightPosition: Story = {
  render: () => <FloatingWrapper position="right" />
}

export const WithCalendar: Story = {
  render: () => {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <input
          ref={inputRef}
          type="text"
          placeholder="Select date..."
          className="px-4 py-2 border border-gray-300 rounded"
        />
        <FloatingElement destinationRef={inputRef} position="center">
          <div
            className="bg-white p-4 rounded-lg shadow-xl"
            style={{ width: '320px' }}
          >
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => (
                <button
                  key={i}
                  className="w-10 h-10 flex items-center justify-center rounded hover:bg-blue-100"
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </FloatingElement>
      </div>
    )
  }
}
