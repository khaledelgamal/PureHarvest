import DeleteIcon from '@/icons/DeleteIcon';
import { classNames } from '@/utils';
import { baseStyles, iconStyles } from './styles';
type DeleteButtonProps = {
  onClick?: () => void;
  className?: string;
};
const DeleteButton = ({ onClick, className }: DeleteButtonProps) => {
  return (
    <button className={classNames(baseStyles, className)} onClick={onClick} title="delete">
      <DeleteIcon className={iconStyles} />
    </button>
  );
};
export default DeleteButton;
