import { CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/Buttons/Button/Button';
import TextFieldInput from '@/components/Inputs/TextFieldInput/TextFieldInput';
import { useContactForm } from './hooks/useContactForm';

export const ContactForm = () => {
  const { register, errors, onSubmit, isPending, isSuccess, isError } = useContactForm();

  return (
    <div className="flex-1 border border-gray-100 rounded-lg p-8 md:p-10 flex flex-col bg-white">
      {/* ── Header ── */}
      <div className="mb-8">
        <h2 className="text-[32px] font-semibold text-gray-900 mb-3">Get in Touch</h2>
        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
          Have a question about our organic products, your recent order, or just want to share your
          thoughts? Our team at PureHarvest is always here to help you. Drop us a message below!
        </p>
      </div>

      {/* ── Success Message ── */}
      {isSuccess && (
        <div
          className="flex items-center gap-3 bg-primary/10 text-primary-hard
                        rounded-lg px-4 py-3 mb-6 text-sm font-medium"
        >
          <CheckCircle className="w-5 h-5 shrink-0" />
          Your message has been sent! We'll get back to you soon.
        </div>
      )}

      {/* ── Error Message ── */}
      {isError && (
        <div
          className="flex items-center gap-3 bg-danger/10 text-danger
                        rounded-lg px-4 py-3 mb-6 text-sm font-medium"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          Something went wrong. Please try again.
        </div>
      )}

      {/* ── Form ── */}
      <form onSubmit={onSubmit} className="space-y-6 flex-1 flex flex-col">
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextFieldInput
            {...register('name')}
            type="text"
            placeholder="Your Name"
            error={errors.name}
          />
          <TextFieldInput
            {...register('email')}
            type="email"
            placeholder="Email Address"
            error={errors.email}
          />
        </div>

        {/* Subject */}
        <TextFieldInput
          {...register('subject')}
          type="text"
          placeholder="Subject"
          error={errors.subject}
        />

        {/* Message */}
        <div className="flex-1 flex flex-col gap-[6px]">
          <textarea
            {...register('message')}
            rows={6}
            placeholder="Message"
            className={`
              w-full h-full border placeholder-gray-400 rounded-md px-4 py-3.5
              text-gray-900 focus:border-primary focus:outline-none resize-none
              transition-colors duration-300
              ${errors.message ? 'border-danger focus:border-danger' : 'border-gray-100'}
            `}
          />
          {errors.message && (
            <p className="font-medium text-sm text-danger">{errors.message.message}</p>
          )}
        </div>

        {/* Submit */}
        <div>
          <Button type="submit" size="md" variant="fill" disabled={isPending}>
            {isPending ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </div>
  );
};
