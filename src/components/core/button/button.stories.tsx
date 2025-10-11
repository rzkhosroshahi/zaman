import { Button } from './button'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  title: 'Components/Core/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['icon', 'text'],
      description: 'The variant of the button'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler'
    }
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const Icon: Story = {
  args: {
    variant: 'icon',
    children: '→'
  }
}

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Click me'
  }
}

export const Disabled: Story = {
  args: {
    variant: 'icon',
    children: '→',
    disabled: true
  }
}

export const WithCustomClassName: Story = {
  args: {
    variant: 'icon',
    children: '✓',
    className: 'bg-green-500 text-white'
  }
}

export const WithAriaLabel: Story = {
  args: {
    variant: 'icon',
    children: '×',
    'aria-label': 'Close dialog'
  }
}
