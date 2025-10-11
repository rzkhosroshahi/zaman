import { CalendarItem, CalendarText } from './calendar-item'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/CalendarItem',
  component: CalendarItem,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'number', min: 20, max: 100, step: 5 }
    },
    height: {
      control: { type: 'number', min: 20, max: 100, step: 5 }
    }
  }
} satisfies Meta<typeof CalendarItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <CalendarText>15</CalendarText>
  }
}

export const Selected: Story = {
  args: {
    children: <CalendarText>15</CalendarText>,
    'data-selected': 'true'
  }
}

export const Disabled: Story = {
  args: {
    children: <CalendarText>15</CalendarText>,
    'data-disabled': 'true'
  }
}

export const Weekend: Story = {
  args: {
    children: <CalendarText>15</CalendarText>,
    'data-weekend': 'true'
  }
}

export const InRange: Story = {
  args: {
    children: <CalendarText>15</CalendarText>,
    'data-in-range': 'true'
  }
}

export const RangeStart: Story = {
  args: {
    children: <CalendarText>15</CalendarText>,
    'data-start-range': 'true'
  }
}

export const RangeEnd: Story = {
  args: {
    children: <CalendarText>15</CalendarText>,
    'data-end-range': 'true'
  }
}

export const CustomSize: Story = {
  args: {
    width: 60,
    height: 60,
    children: <CalendarText>15</CalendarText>
  }
}

export const AllStates: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap p-4">
      <CalendarItem>
        <CalendarText>15</CalendarText>
      </CalendarItem>
      <CalendarItem data-selected="true">
        <CalendarText>16</CalendarText>
      </CalendarItem>
      <CalendarItem data-disabled="true">
        <CalendarText>17</CalendarText>
      </CalendarItem>
      <CalendarItem data-weekend="true">
        <CalendarText>18</CalendarText>
      </CalendarItem>
      <CalendarItem data-in-range="true">
        <CalendarText>19</CalendarText>
      </CalendarItem>
      <CalendarItem data-start-range="true">
        <CalendarText>20</CalendarText>
      </CalendarItem>
      <CalendarItem data-end-range="true">
        <CalendarText>21</CalendarText>
      </CalendarItem>
    </div>
  )
}
