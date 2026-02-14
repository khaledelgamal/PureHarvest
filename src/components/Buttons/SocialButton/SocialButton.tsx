import type { ElementType } from 'react';
import FacebookIcon from '@/icons/FacebookIcon';
import InstagramIcon from '@/icons/InstagramIcon';
import LinkIcon from '@/icons/LinkIcon';
import PinterestIcon from '@/icons/PinterestIcon';
import TwitterIcon from '@/icons/TwitterIcon';
import { classNames } from '@/utils';
import { baseStyles, iconStyles } from './styles';

type SocialButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  Icon: ElementType;
};

export const SocialButton = ({ Icon, className, ...props }: SocialButtonProps) => {
  return (
    <button {...props} className={classNames(baseStyles, className)}>
      <Icon className={iconStyles} />
    </button>
  );
};

export const FacebookButton = (props: Omit<SocialButtonProps, 'Icon'>) => (
  <SocialButton {...props} Icon={FacebookIcon} title="Facebook" />
);

export const InstagramButton = (props: Omit<SocialButtonProps, 'Icon'>) => (
  <SocialButton {...props} Icon={InstagramIcon} title="Instagram" />
);

export const PinterestButton = (props: Omit<SocialButtonProps, 'Icon'>) => (
  <SocialButton {...props} Icon={PinterestIcon} title="Pinterest" />
);

export const TwitterButton = (props: Omit<SocialButtonProps, 'Icon'>) => (
  <SocialButton {...props} Icon={TwitterIcon} title="Twitter" />
);

export const LinkButton = (props: Omit<SocialButtonProps, 'Icon'>) => (
  <SocialButton {...props} Icon={LinkIcon} title="Link" />
);
