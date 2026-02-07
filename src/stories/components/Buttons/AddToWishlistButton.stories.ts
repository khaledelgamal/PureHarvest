import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AddToWishlistButtonVariant } from '@/components/components.type';
import { AddToWishlistButton } from '@/components/Buttons/AddToWishlistButton/AddToWishlistButton';

type StoryProps = ComponentProps<typeof AddToWishlistButton>;

const addToWishlistButtonVariants: AddToWishlistButtonVariant[] = ['default', 'active'];

const meta: Meta<StoryProps> = {
  component: AddToWishlistButton,
  argTypes: {
    variant: { control: 'select', options: addToWishlistButtonVariants },
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

export const Active: Story = {
  args: {
    variant: 'active',
  },
};
