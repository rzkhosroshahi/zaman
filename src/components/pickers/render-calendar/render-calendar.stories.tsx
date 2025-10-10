import { useState, useRef } from 'react'

import RenderCalendar from './render-calendar'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof RenderCalendar> = {
  title: 'Components/Pickers/RenderCalendar',
  component: RenderCalendar,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof RenderCalendar>

export const WithFloatingElement: Story = {
  render: () => {
    const [show, setShow] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <button
          ref={buttonRef}
          onClick={() => setShow(!show)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Toggle Calendar
        </button>
        <RenderCalendar
          showCalendar={show}
          toggleOpen={() => setShow(!show)}
          destinationRef={buttonRef}
          position="center"
        >
          <div className="bg-white p-4 rounded-lg shadow-xl w-80">
            <h3 className="font-semibold mb-3">Calendar</h3>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 flex items-center justify-center border rounded hover:bg-blue-100"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </RenderCalendar>
      </div>
    )
  }
}

export const WithModal: Story = {
  render: () => {
    const [show, setShow] = useState(false)

    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <button
          onClick={() => setShow(!show)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Open Modal Calendar
        </button>
        <RenderCalendar
          showCalendar={show}
          toggleOpen={() => setShow(!show)}
          destinationRef={{ current: null }}
        >
          <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
            <h2 className="text-xl font-bold mb-4">Select a Date</h2>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 flex items-center justify-center border rounded hover:bg-blue-100 cursor-pointer"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </RenderCalendar>
      </div>
    )
  }
}
