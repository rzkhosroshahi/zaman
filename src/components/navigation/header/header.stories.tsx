import { fn } from '@storybook/test'

import { Header } from './header'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Header> = {
  title: 'Components/Navigation/Header',
  component: Header,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  args: {
    onPrevClick: fn(),
    onNextClick: fn(),
    onClickOnTitle: fn()
  },
  argTypes: {
    monthName: {
      control: 'text',
      description: 'The name of the current month and year'
    },
    onPrevClick: {
      action: 'onPrevClick',
      description: 'Callback when previous button is clicked'
    },
    onNextClick: {
      action: 'onNextClick',
      description: 'Callback when next button is clicked'
    },
    onClickOnTitle: {
      action: 'onClickOnTitle',
      description: 'Callback when title is clicked'
    }
  }
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {
    monthName: 'January 2025'
  }
}

export const Persian: Story = {
  args: {
    monthName: 'فروردین ۱۴۰۴'
  }
}

export const LongMonthName: Story = {
  args: {
    monthName: 'September 2025'
  }
}

export const Interactive: Story = {
  args: {
    monthName: 'March 2025'
  }
}
