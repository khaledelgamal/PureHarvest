import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import CloseButton from '@/components/Buttons/CloseButton/CloseButton';

type StoryProps = ComponentProps<typeof CloseButton>;

const meta: Meta<StoryProps> = {
  component: CloseButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {},
};

export const WithClickHandler: Story = {
  args: {
    onClick: () => console.log('Close button clicked'),
  },
};
