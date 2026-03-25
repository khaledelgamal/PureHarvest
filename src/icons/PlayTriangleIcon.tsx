import type { IconProps } from './icons.types';

const PlayTriangleIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M0 0V24L20 12L0 0Z" fill="currentColor" />
    </svg>
  );
};
export default PlayTriangleIcon;
