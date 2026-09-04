import { sectionPaddingX } from '@/constants/global.styles';
import type { ReactNode } from 'react';

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <div
      className={`w-[520px] rounded-lg bg-white ${sectionPaddingX} shadow-md pb-2 stroke-gray-50`}
    >
      <h2 className="mb-5 text-center text-[32px] font-semibold text-gray-900">{title}</h2>
      {children}
    </div>
  );
};

export default AuthLayout;
