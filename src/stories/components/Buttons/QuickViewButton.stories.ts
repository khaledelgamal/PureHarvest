import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QuickViewButton } from '@/components/Buttons/QuickViewButton/QuickViewButton';

type StoryProps = ComponentProps<typeof QuickViewButton>;

const meta: Meta<StoryProps> = {
  component: QuickViewButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {},
};
