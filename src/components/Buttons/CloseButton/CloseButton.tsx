import CloseIcon from '@/icons/CloseIcon';
import { classNames } from '@/utils';
import { baseStyles, iconStyles } from './styles';

type CloseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const CloseButton = ({ className, ...rest }: CloseButtonProps) => {
  return (
    <button className={classNames(baseStyles, className)} title="close" {...rest}>
      <CloseIcon className={iconStyles} />
    </button>
  );
};

export default CloseButton;
