import AppLogoIcon from '@/icons/AppLogoIcon';
import { classNames } from '@/utils';
import type { AppLogoSize } from '../components.type';
import { baseContainerStyles, logoTextBaseStyles, sizeStyles } from './styles';

export interface AppLogoProps {
  size?: AppLogoSize;
  className?: string;
}

const AppLogo = ({ size = 'lg', className }: AppLogoProps) => {
  const currentSize = sizeStyles[size];

  return (
    <div className={classNames(baseContainerStyles, className)}>
      <AppLogoIcon className={classNames('text-primary shrink-0', currentSize.icon)} />
      <span className={classNames(logoTextBaseStyles, currentSize.text)}>PureHarvest</span>
    </div>
  );
};

export default AppLogo;
