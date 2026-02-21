import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import TextFieldInput from '@/components/Inputs/TextFieldInput/TextFieldInput';

type StoryProps = ComponentProps<typeof TextFieldInput>;

const meta: Meta<StoryProps> = {
  component: TextFieldInput,
  argTypes: {
    onChange: { action: 'changed' },
    error: { control: false },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    placeholder: 'Email',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Email',
    value: 'Hello Khaled',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Email',
    error: {
      type: 'required',
      message: 'This field is required',
    },
  },
};

export const WithWarning: Story = {
  args: {
    placeholder: 'Email',
    warn: 'This is just a warning',
  },
};
