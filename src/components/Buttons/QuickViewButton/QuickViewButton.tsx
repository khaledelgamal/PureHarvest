import EyeIcon from '@/icons/EyeIcon';
import { classNames } from '@/utils';
import { baseStyles, buttonStyles, iconStyles } from './styles';

type QuickViewButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const QuickViewButton = ({ className, ...rest }: QuickViewButtonProps) => {
  return (
    <button
      className={classNames(baseStyles, buttonStyles, className)}
      title="Quick view"
      {...rest}
    >
      <EyeIcon className={classNames('w-5 h-5', iconStyles)} />
    </button>
  );
};
