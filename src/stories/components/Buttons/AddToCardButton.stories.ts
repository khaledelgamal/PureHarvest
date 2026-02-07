import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AddToCardButtonVariant } from '@/components/components.type';
import { AddToCardButton } from '@/components/Buttons/AddToCardButton/AddToCardButton';

type StoryProps = ComponentProps<typeof AddToCardButton>;

const addToCardButtonVariants: AddToCardButtonVariant[] = ['default', 'secondary'];

const meta: Meta<StoryProps> = {
  component: AddToCardButton,
  argTypes: {
    variant: { control: 'select', options: addToCardButtonVariants },
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
