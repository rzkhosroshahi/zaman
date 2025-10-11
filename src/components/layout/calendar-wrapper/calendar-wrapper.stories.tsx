import { CalendarWrapper } from './calendar-wrapper'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CalendarWrapper> = {
  title: 'Components/Layout/CalendarWrapper',
  component: CalendarWrapper,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof CalendarWrapper>

export const Default: Story = {
  args: {
    children: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Calendar Content</h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }, (_, i) => (
            <div
              key={i}
              className="w-10 h-10 flex items-center justify-center border rounded"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export const WithHeader: Story = {
  args: {
    children: (
      <div>
        <div className="flex justify-between items-center p-2 border-b">
          <button>←</button>
          <span>January 2025</span>
          <button>→</button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => (
              <div
                key={i}
                className="w-10 h-10 flex items-center justify-center border rounded"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export const CustomStyled: Story = {
  args: {
    className: 'border-4 border-blue-500 rounded-lg shadow-2xl',
    children: (
      <div className="p-6">
        <div className="text-center font-bold text-xl mb-4">
          Custom Styled Calendar
        </div>
        <div className="grid grid-cols-7 gap-3">
          {Array.from({ length: 35 }, (_, i) => (
            <div
              key={i}
              className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
