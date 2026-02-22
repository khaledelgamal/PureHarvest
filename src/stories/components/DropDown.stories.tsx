// components/DropDown/DropDown.stories.tsx
import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropDown } from '@/components/DropDown/DropDown';

type StoryProps = ComponentProps<typeof DropDown>;

const categories = [
  { label: 'All Categories', value: 'all' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Books', value: 'books' },
  { label: 'Sports', value: 'sports' },
];

const meta: Meta<StoryProps> = {
  component: DropDown,
  argTypes: {
    gap: { control: 'text' },
    placeholder: { control: 'text' },
    colors: { control: 'object' },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    options: categories,
    placeholder: 'All Categories',
    gap: '1rem',
  },
};

export const CustomColors: Story = {
  args: {
    options: categories,
    placeholder: 'All Categories',
    value: 'clothing',
    gap: '1rem',
    colors: {
      trigger: 'text-gray-900',
      option: 'text-gray-500',
      active: 'text-primary',
      bg: 'bg-white',
    },
  },
};

export const DarkTheme: Story = {
  args: {
    options: categories,
    placeholder: 'All Categories',
    value: 'electronics',
    gap: '1rem',
    colors: {
      trigger: 'text-white',
      option: 'text-zinc-400',
      active: 'text-green-500',
      bg: 'bg-zinc-900',
    },
  },
  decorators: [
    Story => (
      <div className="bg-zinc-950 p-8">
        <Story />
      </div>
    ),
  ],
};

export const Brand: Story = {
  args: {
    options: categories,
    placeholder: 'All Categories',
    value: 'books',
    gap: '2rem',
    colors: {
      trigger: 'text-primary',
      option: 'text-primary-soft',
      active: 'text-primary-hard',
      bg: 'bg-green-50',
    },
  },
};
