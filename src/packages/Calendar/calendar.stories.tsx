import { useState } from 'react'

import { fn } from '@storybook/test'

import Calendar from './Calendar'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Calendar> = {
  title: 'Packages/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    onChange: fn()
  }
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  args: {
    defaultValue: new Date(2025, 0, 15)
  }
}

export const WithWeekends: Story = {
  args: {
    defaultValue: new Date(2025, 0, 15),
    weekends: [0, 6] // Sunday and Saturday
  }
}

export const RangeMode: Story = {
  args: {
    defaultValue: new Date(2025, 0, 15),
    range: true,
    from: new Date(2025, 0, 10),
    to: new Date(2025, 0, 20)
  }
}

export const Interactive: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState(new Date(2025, 0, 15))

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Selected: {selectedDate.toLocaleDateString()}
          </p>
        </div>
        <Calendar
          defaultValue={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
      </div>
    )
  }
}

export const RangeInteractive: Story = {
  render: () => {
    const [range, setRange] = useState<{
      from: Date | undefined
      to: Date | undefined
    }>({
      from: new Date(2025, 0, 10),
      to: new Date(2025, 0, 20)
    })

    return (
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            From: {range.from?.toLocaleDateString() ?? 'Not selected'}
          </p>
          <p className="text-sm text-gray-600">
            To: {range.to?.toLocaleDateString() ?? 'Not selected'}
          </p>
        </div>
        <Calendar
          defaultValue={new Date(2025, 0, 15)}
          range={true}
          from={range.from}
          to={range.to}
          onChange={(date) => {
            if (!range.from || range.to) {
              setRange({ from: date, to: undefined })
            } else {
              setRange({ ...range, to: date })
            }
          }}
        />
      </div>
    )
  }
}
