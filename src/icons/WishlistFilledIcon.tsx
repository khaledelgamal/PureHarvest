import type { IconProps } from './icons.types';

const WishlistFilledIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.99961 17.5451C-6.66672 8.33332 4.99993 -1.66668 9.99961 4.6567C14.9999 -1.66668 26.6666 8.33332 9.99961 17.5451Z"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="1.5"
      />
    </svg>
  );
};

export default WishlistFilledIcon;
