import CloseIcon from '@/icons/CloseIcon';
import { classNames } from '@/utils';
import { baseStyles, iconStyles } from './styles';
type CloseButtonProps = {
  onClick?: () => void;
  className?: string;
};

const CloseButton = ({ onClick, className }: CloseButtonProps) => {
  return (
    <button className={classNames(baseStyles, className)} onClick={onClick} title="close">
      <CloseIcon className={iconStyles} />
    </button>
  );
};

export default CloseButton;
