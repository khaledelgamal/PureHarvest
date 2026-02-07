import type { IconProps } from './icons.types';

const FacebookIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clip-path="url(#clip0_53_965)">
        <path
          d="M11.9976 2.98873H13.6409V0.126735C13.3574 0.0877347 12.3824 -1.52588e-05 11.2469 -1.52588e-05C8.87764 -1.52588e-05 7.25464 1.49023 7.25464 4.22923V6.74998H4.64014V9.94948H7.25464V18H10.4601V9.95024H12.9689L13.3671 6.75074H10.4594V4.54648C10.4601 3.62173 10.7091 2.98873 11.9976 2.98873Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_53_965">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FacebookIcon;
