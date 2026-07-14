import { type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import QuantityInput from '@/components/Inputs/QuantityInput/QuantityInput';
import { useArgs } from '@storybook/client-api';

type StoryProps = ComponentProps<typeof QuantityInput>;

const meta: Meta<StoryProps> = {
  component: QuantityInput,
  argTypes: {
    onIncrease: { action: 'increased' },
    onDecrease: { action: 'decreased' },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: args => {
    const [{ value }, updateArgs] = useArgs();

    return (
      <QuantityInput
        {...args}
        value={value || 1}
        onIncrease={() => {
          updateArgs({ value: (value || 1) + 1 });
          args.onIncrease();
        }}
        onDecrease={() => {
          updateArgs({ value: Math.max(1, (value || 1) - 1) });
          args.onDecrease();
        }}
      />
    );
  },
  args: {
    value: 1,
  },
};
