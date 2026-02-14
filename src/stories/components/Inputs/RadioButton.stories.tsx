import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RadioInput from '@/components/Inputs/RadioButtonInput/RadioButtonInput';

type StoryProps = ComponentProps<typeof RadioInput>;

const meta: Meta<StoryProps> = {
  component: RadioInput,
  argTypes: {
    onChange: { action: 'changed' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    name: 'radio-default',
  },
};

export const Checked: Story = {
  args: {
    name: 'radio-checked',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'radio-disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    name: 'radio-disabled-checked',
    disabled: true,
    checked: true,
  },
};
