import { useState } from 'react'

import { fn } from '@storybook/test'

import TimePicker from './time-picker'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TimePicker> = {
  title: 'Packages/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    onChange: fn()
  }
}

export default meta
type Story = StoryObj<typeof TimePicker>

export const Default: Story = {
  args: {
    defaultValue: new Date(2025, 0, 15, 10, 30, 0)
  }
}

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(new Date(2025, 0, 15, 10, 30, 0))

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Selected: {value.toLocaleTimeString()}
          </p>
        </div>
        <TimePicker
          defaultValue={value}
          onChange={(payload) => {
            const newDate = new Date(value)

            newDate.setHours(payload.hour)
            newDate.setMinutes(payload.minute)
            setValue(newDate)
          }}
        />
      </div>
    )
  }
}
