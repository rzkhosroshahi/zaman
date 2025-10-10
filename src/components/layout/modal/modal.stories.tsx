import { useState } from 'react'

import { Modal } from './modal'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Modal> = {
  title: 'Components/Layout/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Modal>

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-4">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Modal
      </button>
      <Modal open={open} toggleOpen={() => setOpen(!open)}>
        {children}
      </Modal>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <ModalWrapper>
      <div
        className="bg-white p-6 rounded-lg shadow-xl"
        style={{ width: '400px' }}
      >
        <h2 className="text-xl font-bold mb-4">Modal Content</h2>
        <p className="text-gray-600">
          This is a modal dialog. Click outside or press Escape to close.
        </p>
      </div>
    </ModalWrapper>
  )
}

export const WithCalendar: Story = {
  render: () => (
    <ModalWrapper>
      <div
        className="bg-white p-4 rounded-lg shadow-xl"
        style={{ width: '320px' }}
      >
        <h3 className="text-lg font-semibold mb-3">Select a Date</h3>
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
    </ModalWrapper>
  )
}

export const LargeContent: Story = {
  render: () => (
    <ModalWrapper>
      <div
        className="bg-white p-6 rounded-lg shadow-xl overflow-auto"
        style={{ width: '600px', maxHeight: '80vh' }}
      >
        <h2 className="text-2xl font-bold mb-4">Large Modal</h2>
        <div className="space-y-4">
          {Array.from({ length: 10 }, (_, i) => (
            <p key={i} className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </div>
    </ModalWrapper>
  )
}
