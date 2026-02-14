import CloseIcon from '@/icons/CloseIcon';
import { classNames } from '@/utils';
import { baseStyles, iconStyles } from './styles';

type CloseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const CloseButton = ({ className, ...props }: CloseButtonProps) => {
  return (
    <button {...props} className={classNames(baseStyles, className)} title="close">
      <CloseIcon className={iconStyles} />
    </button>
  );
};

export default CloseButton;
