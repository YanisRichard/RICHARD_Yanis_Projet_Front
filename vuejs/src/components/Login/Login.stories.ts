import type { Meta, StoryFn } from '@storybook/vue3';
import Login from './Login.vue';

export default {
  title: 'Components/Login',
  component: Login,
  argTypes: {
    onLogin: { action: 'loginAttempted' },
  },
} as Meta<typeof Login>;

const Template: StoryFn<typeof Login> = (args) => ({
  components: { Login },
  setup() {
    return { args };
  },
  template: '<Login v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  onLogin: async (email: string, password: string) => {
    if (email === 'test@example.com' && password === 'password123') {
      alert('Connexion réussie !');
    } else {
      throw new Error('Identifiants invalides.');
    }
  },
};
