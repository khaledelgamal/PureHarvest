import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import CheckboxInput from '@/components/Inputs/CheckboxInput/CheckboxInput';

type StoryProps = ComponentProps<typeof CheckboxInput>;

const meta: Meta<StoryProps> = {
  component: CheckboxInput,
  argTypes: {
    onChange: { action: 'changed' },
    indeterminate: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {},
};
export const Checked: Story = {
  args: {
    checked: true,
  },
};
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};
