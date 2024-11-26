import type { Meta, StoryObj } from '@storybook/vue3'

import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'outline', 'disabled'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: `<Button v-bind="args">${args.default}</Button>`,
  }),
  args: {
    default: 'MonBoutonVivant',
  },
}

export const Outline: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: `<Button v-bind="args">${args.default}</Button>`,
  }),
  args: {
    default: 'MonBoutonVide',
    variant: 'outline',
  },
}

export const PrimaryDisabled: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: `<Button v-bind="args">${args.default}</Button>`,
  }),
  args: {
    default: 'MonBoutonMortVivant',
    variant: 'primary',
    disabled: true,
  },
}
