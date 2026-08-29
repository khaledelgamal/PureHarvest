import type { AnchorHTMLAttributes, DetailedHTMLProps, ElementType } from 'react';
import FacebookIcon from '@/icons/FacebookIcon';
import InstagramIcon from '@/icons/InstagramIcon';
import LinkIcon from '@/icons/LinkIcon';
import PinterestIcon from '@/icons/PinterestIcon';
import TwitterIcon from '@/icons/TwitterIcon';
import { classNames } from '@/utils';
import { baseStyles, iconStyles } from './styles';

type SocialButtonProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  Icon: ElementType;
};

export const SocialButton = ({ Icon, className, ...props }: SocialButtonProps) => {
  return (
    <a
      {...props}
      className={classNames(baseStyles, className)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className={iconStyles} />
    </a>
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
