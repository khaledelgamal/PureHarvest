import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  FacebookButton,
  InstagramButton,
  LinkButton,
  PinterestButton,
  SocialButton,
  TwitterButton,
} from '@/components/Buttons/SocialButton/SocialButton';

const meta: Meta<typeof SocialButton> = {
  component: SocialButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof SocialButton>;

export const Facebook: Story = {
  render: args => <FacebookButton {...args} />,
};

export const Instagram: Story = {
  render: args => <InstagramButton {...args} />,
};

export const Pinterest: Story = {
  render: args => <PinterestButton {...args} />,
};

export const Twitter: Story = {
  render: args => <TwitterButton {...args} />,
};

export const Link: Story = {
  render: args => <LinkButton {...args} />,
};
