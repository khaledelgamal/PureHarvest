import type { ElementType } from 'react';
import FacebookIcon from '@/icons/FacebookIcon';
import InstagramIcon from '@/icons/InstagramIcon';
import LinkIcon from '@/icons/LinkIcon';
import PinterestIcon from '@/icons/PinterestIcon';
import TwitterIcon from '@/icons/TwitterIcon';
import { classNames } from '@/utils';
import { baseStyles, iconStyles } from './styles';

type SocialButtonProps = {
  Icon: ElementType;
  onClick?: () => void;
  title?: string;
  className?: string;
};

export const SocialButton = ({ Icon, onClick, title, className }: SocialButtonProps) => {
  return (
    <button className={classNames(baseStyles, className)} onClick={onClick} title={title}>
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
