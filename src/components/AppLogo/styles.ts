import type { AppLogoSize } from '../components.type';

export const baseContainerStyles = 'flex gap-2 items-center justify-center shrink-0';

export const logoTextBaseStyles = 'text-green-gray-900 font-medium tracking-[-3%]';

export const sizeStyles: Record<AppLogoSize, { icon: string; text: string }> = {
  sm: {
    icon: 'w-6 h-6',
    text: 'text-xl leading-7',
  },
  md: {
    icon: 'w-7 h-7',
    text: 'text-2xl leading-8',
  },
  lg: {
    icon: 'w-8 h-8',
    text: 'text-[32px] leading-[38px]',
  },
};
