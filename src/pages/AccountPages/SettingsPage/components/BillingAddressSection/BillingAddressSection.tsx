import { Button } from '@/components/Buttons/Button/Button';
import TextFieldInput from '@/components/Inputs/TextFieldInput/TextFieldInput';
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import type { Profile } from '@/services/supabase/profiles/types';
import { useBillingAddress } from './hooks/useBillingAddress';
import FormField from '../FormFIeld/FormField';
import { SettingsSectionLayout } from '../../layouts/SettingsSectionLayout/SettingsSectionLayout';
import { useTranslation } from 'react-i18next';

type Props = { profile: Profile | undefined };

export const BillingAddressSection = ({ profile }: Props) => {
  const { t } = useTranslation('pages/AccountPages/SettingsPage');
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    stateOptions,
    selectedCountryIso,
    countryOptions,
    updateBilling,
    isPending,
  } = useBillingAddress(profile);

  return (
    <SettingsSectionLayout title={t('billingAddress', 'Billing Address')}>
      <form onSubmit={handleSubmit(values => updateBilling(values))} className="space-y-4">
        {/* Row 1: First + Last + Company */}
        <div className="grid grid-cols-3 gap-4">
          <FormField label={t('firstName', 'First name')}>
            <TextFieldInput
              {...register('firstName')}
              placeholder={t('firstName', 'First name')}
              error={errors.firstName}
            />
          </FormField>
          <FormField label={t('lastName', 'Last Name')}>
            <TextFieldInput
              {...register('lastName')}
              placeholder={t('lastName', 'Last Name')}
              error={errors.lastName}
            />
          </FormField>
          <FormField label={t('companyName', 'Company Name')} optional>
            <TextFieldInput
              {...register('companyName')}
              placeholder={t('companyNamePlaceholder', 'Company name')}
            />
          </FormField>
        </div>

        {/* Row 2: Street Address */}
        <FormField label={t('streetAddress', 'Street Address')}>
          <TextFieldInput
            {...register('streetAddress')}
            placeholder={t('streetAddressPlaceholder', 'Street address')}
            error={errors.streetAddress}
          />
        </FormField>

        {/* Row 3: Country + State + Zip */}
        <div className="grid grid-cols-3 gap-4">
          <FormField label={t('countryRegion', 'Country / Region')}>
            <SelectInput
              {...register('country')}
              options={countryOptions}
              placeholder={t('selectCountry', 'Select country...')}
              error={errors.country}
            />
          </FormField>

          <FormField label={t('state', 'State')}>
            <SelectInput
              {...register('state')}
              options={stateOptions}
              placeholder={
                !selectedCountryIso
                  ? t('selectCountryFirst', 'Select country first')
                  : stateOptions.length === 0
                    ? t('noStatesAvailable', 'No states available')
                    : t('selectState', 'Select state...')
              }
              disabled={!selectedCountryIso || stateOptions.length === 0}
              error={errors.state}
            />
          </FormField>

          <FormField label={t('zipCode', 'Zip Code')}>
            <TextFieldInput
              {...register('zipCode')}
              placeholder={t('zipCodePlaceholder', 'Zip code')}
              error={errors.zipCode}
            />
          </FormField>
        </div>

        {/* Row 4: Email + Phone */}
        <div className="grid grid-cols-2 gap-4">
          <FormField label={t('email', 'Email')}>
            <TextFieldInput
              {...register('email')}
              placeholder={t('emailPlaceholder', 'email@example.com')}
              type="email"
              error={errors.email}
            />
          </FormField>
          <FormField label={t('phone', 'Phone')}>
            <TextFieldInput
              {...register('phone')}
              placeholder={t('phonePlaceholder', '(xxx) xxx-xxxx')}
              type="tel"
            />
          </FormField>
        </div>

        <Button type="submit" variant="fill" size="md" disabled={isPending || !isDirty}>
          {isPending ? t('saving', 'Saving...') : t('saveChanges', 'Save Changes')}
        </Button>
      </form>
    </SettingsSectionLayout>
  );
};
