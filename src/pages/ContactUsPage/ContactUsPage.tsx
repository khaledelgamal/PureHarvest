import { ContactInfoPanel } from './components/ContactInfoPanel/ContactInfoPanel';
import { ContactForm } from './components/ContactForm/ContactForm';
import { sectionContainer, sectionPaddingX } from '@/constants/global.styles';

const ContactUsPage = () => {
  return (
    <div className={`${sectionContainer} ${sectionPaddingX} py-12 md:py-16`}>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="w-full lg:w-1/3 shrink-0">
          <ContactInfoPanel />
        </div>
        <div className="w-full lg:flex-1">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
