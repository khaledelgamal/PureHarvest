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

export const SocialButton = ({ Icon, className, ...rest }: SocialButtonProps) => {
  return (
    <button className={classNames(baseStyles, className)} {...rest}>
      <Icon className={iconStyles} />
    </button>
  );
};

export const FacebookButton = (props: Omit<SocialButtonProps, 'Icon'>) => (
  <SocialButton Icon={FacebookIcon} title="Facebook" {...props} />
);

export const InstagramButton = (props: Omit<SocialButtonProps, 'Icon'>) => (
  <SocialButton Icon={InstagramIcon} title="Instagram" {...props} />
);

export const PinterestButton = (props: Omit<SocialButtonProps, 'Icon'>) => (
  <SocialButton Icon={PinterestIcon} title="Pinterest" {...props} />
);

export const TwitterButton = (props: Omit<SocialButtonProps, 'Icon'>) => (
  <SocialButton Icon={TwitterIcon} title="Twitter" {...props} />
);

export const LinkButton = (props: Omit<SocialButtonProps, 'Icon'>) => (
  <SocialButton Icon={LinkIcon} title="Link" {...props} />
);
