import { ContactInfoPanel } from './components/ContactInfoPanel/ContactInfoPanel';
import { ContactForm } from './components/ContactForm/ContactForm';

const ContactUsPage = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="flex gap-8">
        <ContactInfoPanel />
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactUsPage;
