import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

type StoryProps = ComponentProps<typeof LoadingSpinner>;

const meta: Meta<StoryProps> = {
  component: LoadingSpinner,
  argTypes: {
    color: { control: 'color' },
    radiusInPx: { control: { type: 'range', min: 8, max: 100, step: 1 } },
    loadingSpeed: { control: { type: 'range', min: 0.1, max: 5, step: 0.1 } },
    borderWidth: { control: { type: 'range', min: 1, max: 10, step: 1 } },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    color: '#00B207',
    radiusInPx: 16,
    loadingSpeed: 1,
    borderWidth: 3,
  },
};

export const Large: Story = {
  args: {
    color: '#FF8A00',
    radiusInPx: 48,
    loadingSpeed: 1.5,
    borderWidth: 6,
  },
};

export const FastThin: Story = {
  args: {
    color: '#EA4B48',
    radiusInPx: 24,
    loadingSpeed: 0.5,
    borderWidth: 2,
  },
};
