import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';

type StoryProps = ComponentProps<typeof SelectInput>;

const meta: Meta<StoryProps> = {
  component: SelectInput,
  argTypes: {
    onChange: { action: 'changed' },
    error: { control: 'object' },
  },
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
    placeholder: 'Select an option',
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {},
};

export const WithValue: Story = {
  args: {
    value: '2',
  },
};

export const WithPlaceholderOnly: Story = {
  args: {
    options: [],
    placeholder: 'Nothing to select',
  },
};

export const WithError: Story = {
  args: {
    error: {
      type: 'required',
      message: 'This field is required',
    },
  },
};
