import React from 'react';
import { Country, State } from 'country-state-city';
import TextFieldInput from '@/components/Inputs/TextFieldInput/TextFieldInput';
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import CheckboxInput from '@/components/Inputs/CheckboxInput/CheckboxInput';
import type { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import type { CheckoutFormValues } from '../hooks/useCheckoutForm';
import { useTranslation } from 'react-i18next';

interface BillingInformationProps {
  register: UseFormRegister<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
  watch: UseFormWatch<CheckoutFormValues>;
}

const allCountries = Country.getAllCountries();
const countryOptions = allCountries.map(c => ({
  label: c.name,
  value: c.isoCode,
}));

const BillingInformation: React.FC<BillingInformationProps> = ({
  register,
  errors,
  watch,
}) => {
  const { t } = useTranslation('pages/CheckoutPage');
  const selectedCountryIso = watch('country');

  const stateOptions = selectedCountryIso
    ? State.getStatesOfCountry(selectedCountryIso).map(s => ({
        label: s.name,
        value: s.name,
      }))
    : [];
  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-2xl font-medium text-gray-900">
        {t('billingInformation', 'Billing Information')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">{t('firstName', 'First name')}</label>
          <TextFieldInput
            {...register('firstName')}
            error={errors.firstName}
            placeholder={t('firstNamePlaceholder', 'Your first name')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">{t('lastName', 'Last name')}</label>
          <TextFieldInput
            {...register('lastName')}
            error={errors.lastName}
            placeholder={t('lastNamePlaceholder', 'Your last name')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">
            {t('companyNameOptional', 'Company Name (optional)')}
          </label>
          <TextFieldInput
            {...register('companyName')}
            error={errors.companyName}
            placeholder={t('companyNamePlaceholder', 'Company name')}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-900">{t('streetAddress', 'Street Address')}</label>
        <TextFieldInput
          {...register('address')}
          error={errors.address}
          placeholder={t('streetAddress', 'Street Address')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">{t('countryRegion', 'Country / Region')}</label>
          <SelectInput
            {...register('country')}
            error={errors.country}
            options={countryOptions}
            placeholder={t('selectCountry', 'Select country...')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">{t('states', 'States')}</label>
          <SelectInput
            {...register('state')}
            error={errors.state}
            options={stateOptions}
            placeholder={
              !selectedCountryIso
                ? t('selectCountryFirst', 'Select country first')
                : stateOptions.length === 0
                  ? t('noStatesAvailable', 'No states available')
                  : t('selectState', 'Select state...')
            }
            disabled={!selectedCountryIso || stateOptions.length === 0}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">{t('zipCode', 'Zip Code')}</label>
          <TextFieldInput
            {...register('zipCode')}
            error={errors.zipCode}
            placeholder={t('zipCode', 'Zip Code')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">{t('email', 'Email')}</label>
          <TextFieldInput
            type="email"
            {...register('email')}
            error={errors.email}
            placeholder={t('emailPlaceholder', 'Email Address')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">{t('phone', 'Phone')}</label>
          <TextFieldInput
            type="tel"
            {...register('phone')}
            error={errors.phone}
            placeholder={t('phonePlaceholder', 'Phone number')}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <CheckboxInput id="shipDifferent" {...register('shipDifferentAddress')} />
        <label htmlFor="shipDifferent" className="text-sm text-gray-700 cursor-pointer select-none">
          {t('shipDifferentAddress', 'Ship to a different address')}
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <h2 className="text-2xl font-medium text-gray-900">
          {t('additionalInfo', 'Additional Info')}
        </h2>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-900">
            {t('orderNotesOptional', 'Order Notes (Optional)')}
          </label>
          <textarea
            {...register('orderNotes')}
            rows={4}
            placeholder={t(
              'orderNotesPlaceholder',
              'Notes about your order, e.g. special notes for delivery',
            )}
            className={`w-full border placeholder-gray-400 rounded-md px-4 py-[14px] text-gray-900 focus:border-primary focus:outline-none resize-y ${errors.orderNotes ? 'border-danger focus:border-danger' : 'border-gray-100'}`}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default BillingInformation;
