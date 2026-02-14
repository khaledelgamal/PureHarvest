import DeleteIcon from '@/icons/DeleteIcon';
import { classNames } from '@/utils';
import { baseStyles, iconStyles } from './styles';

type DeleteButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const DeleteButton = ({ className, ...props }: DeleteButtonProps) => {
  return (
    <button {...props} className={classNames(baseStyles, className)} title="delete">
      <DeleteIcon className={iconStyles} />
    </button>
  );
};

export default DeleteButton;
