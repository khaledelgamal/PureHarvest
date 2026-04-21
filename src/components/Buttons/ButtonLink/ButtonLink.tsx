import { Link, type LinkProps } from 'react-router-dom';
import type { ButtonSize, ButtonVariant } from '../../components.type';
import { baseStyles, sizeStyles, variantStyles } from '../Button/styles';
import { classNames } from '@/utils';

type ButtonLinkProps = LinkProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const ButtonLink = ({
  children,
  variant = 'fill',
  size = 'sm',
  className,
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      {...props}
      className={classNames(baseStyles, sizeStyles[size], variantStyles[variant], className)}
    >
      {children}
    </Link>
  );
};
