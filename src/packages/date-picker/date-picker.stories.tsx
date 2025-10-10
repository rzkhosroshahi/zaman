import { DatePicker } from './date-picker'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Packages/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    locale: {
      control: 'select',
      options: ['fa', 'en']
    },
    direction: {
      control: 'radio',
      options: ['rtl', 'ltr']
    },
    round: {
      control: 'select',
      options: ['thin', 'x1', 'x2', 'x3', 'x4']
    },
    accentColor: {
      control: 'color'
    },
    position: {
      control: 'radio',
      options: ['right', 'left', 'center']
    }
  }
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    locale: 'fa'
  }
}

export const English: Story = {
  args: {
    locale: 'en',
    direction: 'ltr'
  }
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: new Date('2024-01-15'),
    locale: 'en'
  }
}

export const CustomAccentColor: Story = {
  args: {
    accentColor: '#FF6B6B',
    locale: 'en'
  }
}

export const RoundedCorners: Story = {
  args: {
    round: 'x3',
    locale: 'en'
  }
}

export const CustomDateFormat: Story = {
  args: {
    customShowDateFormat: 'DD/MM/YYYY',
    locale: 'en'
  }
}

export const WithWeekends: Story = {
  args: {
    weekends: [5, 6],
    locale: 'en'
  }
}

export const RangePicker: Story = {
  args: {
    range: true,
    from: new Date('2024-01-15'),
    to: new Date('2024-01-20'),
    locale: 'en'
  }
}

export const RightPosition: Story = {
  args: {
    position: 'right',
    locale: 'en'
  }
}

export const LeftPosition: Story = {
  args: {
    position: 'left',
    locale: 'en'
  }
}

export const CenterPosition: Story = {
  args: {
    position: 'center',
    locale: 'en'
  }
}

export const WithCustomClass: Story = {
  args: {
    inputClass: 'px-4 py-2 border rounded-lg',
    locale: 'en'
  }
}
