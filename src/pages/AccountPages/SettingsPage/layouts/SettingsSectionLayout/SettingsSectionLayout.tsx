import { type ReactNode } from 'react';

type SettingsSectionProps = {
  title: string;
  children: ReactNode;
};

export const SettingsSectionLayout = ({ title, children }: SettingsSectionProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100">
      <h3 className="font-medium text-gray-900 text-base sm:text-lg px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100">
        {title}
      </h3>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 px-4 sm:px-6 py-4 pb-6">
        {children}
      </div>
    </div>
  );
};
