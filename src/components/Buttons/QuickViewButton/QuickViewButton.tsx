import EyeIcon from '@/icons/EyeIcon';
import { classNames } from '@/utils';
import { baseStyles, buttonStyles, iconStyles } from './styles';

type QuickViewButtonProps = {
  onClick?: () => void;
};

export const QuickViewButton = ({ onClick }: QuickViewButtonProps) => {
  return (
    <button className={classNames(baseStyles, buttonStyles)} onClick={onClick} title="Quick view">
      <EyeIcon className={classNames('w-5 h-5', iconStyles)} />
    </button>
  );
};
