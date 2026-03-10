import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AddToCartButtonVariant } from '@/components/components.type';
import { AddToCartButton } from '@/components/Buttons/AddToCartButton/AddToCartButton';

type StoryProps = ComponentProps<typeof AddToCartButton>;

const addToCartButtonVariants: AddToCartButtonVariant[] = ['default', 'secondary'];

const meta: Meta<StoryProps> = {
  component: AddToCartButton,
  argTypes: {
    variant: { control: 'select', options: addToCartButtonVariants },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};
