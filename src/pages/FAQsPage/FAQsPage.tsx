import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '@/components/Buttons/Button/Button';
import { sectionContainer } from '@/constants/global.styles';

const faqsData = [
  {
    question: 'How long does it take for my fresh food to be delivered?',
    answer:
      'Orders placed before 2 PM are typically delivered the same day. For orders placed after 2 PM, we guarantee delivery by the next morning to ensure maximum freshness.',
  },
  {
    question: 'How do you ensure the freshness of produce?',
    answer:
      'Our fruits and vegetables are sourced directly from local farms. We use temperature-controlled vehicles to maintain the cold chain from the farm directly to your doorstep.',
  },
  {
    question: 'What is your return and refund policy for perishable items?',
    answer:
      'If you are unsatisfied with the quality of any perishable item, please contact our support team within 24 hours of delivery with a photo. We will gladly issue a refund or a replacement.',
  },
  {
    question: 'Are your products certified organic?',
    answer:
      'We partner with farmers who follow sustainable and organic farming practices. While not all items carry an official organic certification, they are grown without synthetic pesticides or harmful chemicals.',
  },
  {
    question: 'Can I schedule a specific delivery time?',
    answer:
      'Yes! During checkout, you can select a delivery window that works best for you. Our delivery partners will do their best to arrive within that designated timeframe.',
  },
];

const FAQsPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={sectionContainer}>
      <div className="flex flex-col lg:flex-row gap-12 items-start justify-between mt-6">
        {/* Left Side: FAQs */}
        <div className="flex-1 w-full max-w-2xl mb-4">
          <h1 className="text-4xl font-semibold text-gray-900 mb-8 leading-tight">
            Welcome, Let’s Talk About Our PureHarvest
          </h1>
          <div className="flex flex-col gap-4">
            {faqsData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="flex flex-col">
                  <Button
                    variant="text"
                    onClick={() => toggleFaq(index)}
                    className={clsx(
                      'flex group items-center justify-between p-4 w-full text-left transition-colors duration-200 border border-gray-200 rounded-t-md',
                      isOpen ? 'border-primary bg-white' : 'bg-gray-50 ',
                    )}
                  >
                    <span
                      className={`text-base font-medium group-hover:text-primary-hard ${!isOpen ? 'text-gray-900' : 'text-primary-hard'}`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={clsx(
                        'flex items-center justify-center w-8 h-8 rounded-full transition-colors shrink-0 ml-4 group-hover:bg-primary group-hover:text-white',
                        isOpen ? 'bg-primary text-white' : 'bg-white text-gray-900',
                      )}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </Button>
                  <div
                    className={clsx(
                      'grid transition-all duration-300 ease-in-out',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="p-4 pt-2 text-sm text-gray-600 leading-relaxed border border-t-0 border-primary rounded-b-lg -mt-1 bg-white">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hidden lg:block lg:w-1/2 w-full relative h-[600px] rounded-2xl overflow-hidden shrink-0">
          <img
            alt="Fresh grocery delivery"
            className="absolute inset-0 w-full h-full object-contain"
            src="/images/faqs.png"
          />
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;
