import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/Buttons/Button/Button';
import { buttonSizes, buttonVariants } from '@/components/components.type';

type StoryProps = ComponentProps<typeof Button>;

const meta: Meta<StoryProps> = {
  component: Button,
  argTypes: {
    variant: { control: 'select', options: buttonVariants },
    size: { control: 'select', options: buttonSizes },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Fill: Story = {
  args: { variant: 'fill', size: 'sm', children: 'Click me' },
};

export const BigFill: Story = {
  args: { variant: 'fill', size: 'lg', children: 'Click me' },
};

export const Border: Story = {
  args: { variant: 'border', size: 'sm', children: 'Click me' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'sm', children: 'Click me' },
};
