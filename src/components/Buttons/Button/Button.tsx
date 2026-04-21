import type { PropsWithChildren } from 'react';
import type { ButtonSize, ButtonVariant } from '../../components.type';
import { baseStyles, sizeStyles, variantStyles } from './styles';
import { classNames } from '@/utils';

type ButtonProps = PropsWithChildren<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }
>;

export const Button = ({
  children,
  variant = 'fill',
  size = 'sm',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={classNames(baseStyles, sizeStyles[size], variantStyles[variant], className)}
    >
      {children}
    </button>
  );
};
