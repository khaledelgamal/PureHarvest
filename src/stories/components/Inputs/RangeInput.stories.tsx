import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RangeInput from '@/components/Inputs/RangeInput/RangeInput';

type StoryProps = ComponentProps<typeof RangeInput>;

const meta: Meta<StoryProps> = {
  component: RangeInput,
  argTypes: {
    onChange: { action: 'changed' },
    disabled: { control: 'boolean' },
    step: { control: 'number' },
  },
  args: {
    min: 0,
    max: 1000,
    step: 1,
  },
  decorators: [
    Story => (
      <div className="w-[280px] p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    value: [0, 1000],
  },
};

export const WithRange: Story = {
  args: {
    value: [200, 750],
  },
};

export const Disabled: Story = {
  args: {
    value: [100, 600],
    disabled: true,
  },
};
