import type { PropsWithChildren } from 'react';
import type { ButtonSize, ButtonVariant } from '../components.type';
import { baseStyles, sizeStyles, variantStyles } from './button.styles';
import { classNames } from '@/utils';

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
}>;
export const Button = ({ children, variant = 'fill', onClick, size = 'sm' }: ButtonProps) => {
  return (
    <button
      className={classNames(baseStyles, variantStyles[variant], sizeStyles[size])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
