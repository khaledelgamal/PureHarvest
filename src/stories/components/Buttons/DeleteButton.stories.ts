import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';

type StoryProps = ComponentProps<typeof DeleteButton>;

const meta: Meta<StoryProps> = {
  component: DeleteButton,
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
    onClick: () => console.log('Delete button clicked'),
  },
};
