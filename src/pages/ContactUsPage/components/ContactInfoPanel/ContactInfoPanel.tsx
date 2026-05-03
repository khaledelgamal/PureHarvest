import { MapPin, Mail, Phone } from 'lucide-react';
import type { ElementType } from 'react';

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
  return (
    <div
      className="flex flex-col divide-y divide-gray-100 border border-gray-100
                    rounded-lg p-6 md:p-8 bg-white"
    >
      <ContactInfoItem icon={MapPin}>
        <span>
          Lincoln- 344, Illinois, <br />
          Chicago, USA
        </span>
      </ContactInfoItem>

      <ContactInfoItem icon={Mail}>
        <span>Proxy@gmail.com</span>
        <span>Help.proxy@gmail.com</span>
      </ContactInfoItem>

      <ContactInfoItem icon={Phone}>
        <span>(219) 555-0114</span>
        <span>(164) 333-0044</span>
      </ContactInfoItem>
    </div>
  );
};
