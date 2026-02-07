import type { IconProps } from './icons.types';

const WishlistIcon = ({ className }: IconProps) => {
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
        d="M9.9996 17.5451C-6.66672 8.33331 4.99993 -1.66668 9.9996 4.6567C14.9999 -1.66669 26.6666 8.33331 9.9996 17.5451Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
    </svg>
  );
};

export default WishlistIcon;
