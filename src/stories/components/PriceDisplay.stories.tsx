import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import { priceDisplaySizes } from '@/components/components.type';

type StoryProps = ComponentProps<typeof PriceDisplay>;

const meta: Meta<StoryProps> = {
  component: PriceDisplay,
  argTypes: {
    size: { control: 'select', options: priceDisplaySizes },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    price: 14.99,
    size: 'md',
  },
};

export const WithDiscount: Story = {
  args: {
    price: 14.99,
    oldPrice: 20.99,
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    price: 9.99,
    oldPrice: 14.99,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    price: 29.99,
    oldPrice: 39.99,
    size: 'lg',
  },
};
