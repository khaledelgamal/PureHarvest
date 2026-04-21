import type { ButtonSize, ButtonVariant } from '../../components.type';

export const baseStyles = 'rounded-[43px] font-semibold py-1.25 px-3 cursor-pointer';

export const variantStyles: Record<ButtonVariant, string> = {
  fill: 'bg-primary hover:bg-primary-hard text-white',
  border:
    'bg-white text-primary hover:text-primary-hard border-primary hover:border-primary-hard border-2',
  ghost: ' bg-[#56AC59]/10 hover:bg-[#2C742F]/20 text-primary hover:text-primary-hard ',
  text: 'text-primary hover:text-primary-hard px-0 py-0 rounded-none',
};

export const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-6 py-2.5 text-xs',
  md: 'px-8 py-3.5 text-sm',
  lg: 'px-10 py-4 text-base',
};
