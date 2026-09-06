import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import AppLogo from '@/components/AppLogo/AppLogo';
import { appLogoSizes } from '@/components/components.type';

type StoryProps = ComponentProps<typeof AppLogo>;

const meta: Meta<StoryProps> = {
  component: AppLogo,
  argTypes: {
    size: { control: 'select', options: appLogoSizes },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};
