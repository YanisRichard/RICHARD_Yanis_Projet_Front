import type { Meta, StoryFn } from '@storybook/vue3';

import Header from '../Header/Header.vue';

export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {
    title: { control: 'text' },
    navigation: { control: 'object' },
  },
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args) => ({
  components: { Header },
  setup() {
    return { args };
  },
  template: '<Header v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'My Website',
  navigation: [
    { label: 'Home', link: '#' },
    { label: 'About', link: '#about' },
    { label: 'Contact', link: '#contact' },
  ],
};
