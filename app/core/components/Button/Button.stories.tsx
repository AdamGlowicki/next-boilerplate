import {
  Meta,
  Story,
} from '@storybook/react';

import { hideControls } from '@/utils/storybook';

import {
  Button,
  ButtonProps,
} from './Button';

export default {
  argTypes: {
    ...hideControls<ButtonProps>(['ref']),
  },
  component: Button,
  title: 'Components/Button',
} as Meta;

const Template: Story<ButtonProps> = args => (
  <Button {...args}>
    Click me
  </Button>
);

export const Primary = Template.bind({});
Primary.args = {
  type: 'button',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'button',
  variant: 'secondary',
};
