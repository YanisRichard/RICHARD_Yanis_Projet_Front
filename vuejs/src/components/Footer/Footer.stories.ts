import Footer from './Footer.vue';

export default {
  title: 'Components/Footer',
  component: Footer,
};

const Template = (args, { argTypes }) => ({
  components: { Footer },
  setup() {
    return { args };
  },
  template: '<Footer v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
