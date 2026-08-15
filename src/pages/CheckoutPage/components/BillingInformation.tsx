import React from 'react';
import TextFieldInput from '@/components/Inputs/TextFieldInput/TextFieldInput';
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import CheckboxInput from '@/components/Inputs/CheckboxInput/CheckboxInput';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { CheckoutFormValues } from '../hooks/useCheckoutForm';

interface BillingInformationProps {
  register: UseFormRegister<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
}

const BillingInformation: React.FC<BillingInformationProps> = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-2xl font-medium text-gray-900">Billing Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">First name</label>
          <TextFieldInput {...register('firstName')} error={errors.firstName} placeholder="Your first name" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">Last name</label>
          <TextFieldInput {...register('lastName')} error={errors.lastName} placeholder="Your last name" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">Company Name (optional)</label>
          <TextFieldInput {...register('companyName')} error={errors.companyName} placeholder="Company name" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-900">Street Address</label>
        <TextFieldInput {...register('address')} error={errors.address} placeholder="Street Address" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">Country / Region</label>
          <SelectInput
            {...register('country')}
            error={errors.country}
            options={[
              { label: 'United States', value: 'us' },
              { label: 'Canada', value: 'ca' },
              { label: 'United Kingdom', value: 'uk' },
            ]}
            placeholder="Select"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">States</label>
          <SelectInput
            {...register('state')}
            error={errors.state}
            options={[
              { label: 'California', value: 'ca' },
              { label: 'New York', value: 'ny' },
              { label: 'Texas', value: 'tx' },
            ]}
            placeholder="Selects"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">Zip Code</label>
          <TextFieldInput {...register('zipCode')} error={errors.zipCode} placeholder="Zip Code" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">Email</label>
          <TextFieldInput type="email" {...register('email')} error={errors.email} placeholder="Email Address" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">Phone</label>
          <TextFieldInput type="tel" {...register('phone')} error={errors.phone} placeholder="Phone number" />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <CheckboxInput id="shipDifferent" {...register('shipDifferentAddress')} />
        <label htmlFor="shipDifferent" className="text-sm text-gray-700 cursor-pointer select-none">
          Ship to a different address
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <h2 className="text-2xl font-medium text-gray-900">Additional Info</h2>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">Order Notes (Optional)</label>
          <textarea
            {...register('orderNotes')}
            rows={4}
            placeholder="Notes about your order, e.g. special notes for delivery"
            className={`w-full border placeholder-gray-400 rounded-md px-4 py-[14px] text-gray-900 focus:border-primary focus:outline-none resize-y ${errors.orderNotes ? 'border-danger focus:border-danger' : 'border-gray-100'}`}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default BillingInformation;
