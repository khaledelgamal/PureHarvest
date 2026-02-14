import EyeIcon from '@/icons/EyeIcon';
import { classNames } from '@/utils';
import { baseStyles, buttonStyles, iconStyles } from './styles';

type QuickViewButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const QuickViewButton = ({ className, ...props }: QuickViewButtonProps) => {
  return (
    <button
      {...props}
      className={classNames(baseStyles, buttonStyles, className)}
      title="Quick view"
    >
      <EyeIcon className={classNames('w-5 h-5', iconStyles)} />
    </button>
  );
};
