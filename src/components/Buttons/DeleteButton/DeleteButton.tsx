import DeleteIcon from '@/icons/DeleteIcon';
import { classNames } from '@/utils';
import { baseStyles, iconStyles } from './styles';

type DeleteButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const DeleteButton = ({ className, ...rest }: DeleteButtonProps) => {
  return (
    <button className={classNames(baseStyles, className)} title="delete" {...rest}>
      <DeleteIcon className={iconStyles} />
    </button>
  );
};

export default DeleteButton;
