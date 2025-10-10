import { useState } from 'react'

import { fn } from '@storybook/test'

import { YearPicker } from './year-picker'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof YearPicker> = {
  title: 'Components/Pickers/YearPicker',
  component: YearPicker,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    onYearSelect: fn()
  }
}

export default meta
type Story = StoryObj<typeof YearPicker>

export const Default: Story = {
  args: {
    value: new Date(2025, 0, 15)
  }
}

export const DifferentYear: Story = {
  args: {
    value: new Date(2030, 0, 15)
  }
}

export const Interactive: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState(new Date(2025, 0, 15))

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Selected: {selectedDate.getFullYear()}
          </p>
        </div>
        <div style={{ maxHeight: '400px', overflow: 'auto' }}>
          <YearPicker
            value={selectedDate}
            onYearSelect={(year) => {
              setSelectedDate(new Date(year, 0, 15))
            }}
          />
        </div>
      </div>
    )
  }
}

export const Scrollable: Story = {
  render: () => (
    <div
      style={{
        height: '300px',
        overflow: 'auto',
        border: '1px solid #ccc',
        borderRadius: '8px'
      }}
    >
      <YearPicker value={new Date(2025, 0, 15)} onYearSelect={fn()} />
    </div>
  )
}
