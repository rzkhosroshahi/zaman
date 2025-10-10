import { useState } from 'react'

import { fn } from '@storybook/test'

import { MonthPicker } from './month-picker'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MonthPicker> = {
  title: 'Components/Pickers/MonthPicker',
  component: MonthPicker,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    onMonthSelect: fn()
  }
}

export default meta
type Story = StoryObj<typeof MonthPicker>

export const Default: Story = {
  args: {
    value: new Date(2025, 0, 15)
  }
}

export const DifferentMonth: Story = {
  args: {
    value: new Date(2025, 5, 15) // June
  }
}

export const Interactive: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState(new Date(2025, 0, 15))

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Selected: {selectedDate.toLocaleString('en', { month: 'long' })}
          </p>
        </div>
        <MonthPicker
          value={selectedDate}
          onMonthSelect={(month) => {
            setSelectedDate(new Date(2025, month - 1, 15))
          }}
        />
      </div>
    )
  }
}
