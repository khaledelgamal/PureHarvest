import { MapPin, Mail, Phone } from 'lucide-react';
import type { ElementType } from 'react';
import { companyInfo, contactSupport } from '@/constants/companyInfo';
import { useTranslation } from 'react-i18next';

type ContactInfoItemProps = {
  icon: ElementType;
  children: React.ReactNode;
};

const ContactInfoItem = ({ icon: Icon, children }: ContactInfoItemProps) => (
  <div className="py-8 flex flex-col items-center text-center space-y-4">
    <div className="text-primary-hard p-4 rounded-full">
      <Icon className="w-12 h-12" />
    </div>
    <div className="text-gray-800 flex flex-col">{children}</div>
  </div>
);

export const ContactInfoPanel = () => {
  const { i18n } = useTranslation();

  const currentLang = i18n.language as keyof typeof companyInfo.location;
  const address = companyInfo.location[currentLang] || companyInfo.location.en;

  return (
    <div
      className="flex flex-col divide-y divide-gray-100 border border-gray-100
                    rounded-lg p-6 md:p-8 bg-white"
    >
      <ContactInfoItem icon={MapPin}>
        <span>{address}</span>
      </ContactInfoItem>

      <ContactInfoItem icon={Mail}>
        <span>{contactSupport.email}</span>
      </ContactInfoItem>

      <ContactInfoItem icon={Phone}>
        <span>{companyInfo.phone}</span>
      </ContactInfoItem>
    </div>
  );
};
