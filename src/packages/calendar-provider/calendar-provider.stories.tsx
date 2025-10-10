import { CalendarProvider } from './calendar-provider'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Packages/CalendarProvider',
  component: CalendarProvider,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    accentColor: {
      control: 'color'
    },
    round: {
      control: 'select',
      options: ['thin', 'x1', 'x2', 'x3', 'x4']
    },
    locale: {
      control: 'select',
      options: ['fa', 'en']
    },
    direction: {
      control: 'radio',
      options: ['rtl', 'ltr']
    }
  }
} satisfies Meta<typeof CalendarProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">CalendarProvider Example</h3>
        <p className="text-gray-600">
          This provider wraps theme and locale configuration for calendar
          components.
        </p>
      </div>
    )
  }
}

export const CustomAccent: Story = {
  args: {
    accentColor: '#FF6B6B',
    children: (
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#FF6B6B' }}>
          Custom Red Accent
        </h3>
        <p className="text-gray-600">
          CalendarProvider with custom accent color.
        </p>
      </div>
    )
  }
}

export const PersianLocale: Story = {
  args: {
    locale: 'fa',
    direction: 'rtl',
    children: (
      <div className="p-8 bg-white rounded-lg shadow-lg" dir="rtl">
        <h3 className="text-lg font-semibold mb-4">تقویم فارسی</h3>
        <p className="text-gray-600">ارائه‌دهنده تقویم با زبان فارسی</p>
      </div>
    )
  }
}

export const EnglishLocale: Story = {
  args: {
    locale: 'en',
    direction: 'ltr',
    children: (
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">English Calendar</h3>
        <p className="text-gray-600">CalendarProvider with English locale.</p>
      </div>
    )
  }
}

export const RoundedCorners: Story = {
  args: {
    round: 'x3',
    children: (
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Rounded Style</h3>
        <p className="text-gray-600">
          CalendarProvider with rounded corners (x3).
        </p>
      </div>
    )
  }
}
