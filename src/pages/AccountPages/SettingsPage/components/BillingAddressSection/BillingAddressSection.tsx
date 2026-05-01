import { Button } from '@/components/Buttons/Button/Button';
import TextFieldInput from '@/components/Inputs/TextFieldInput/TextFieldInput';
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import type { Profile } from '@/services/supabase/profiles/types';
import { useBillingAddress } from './hooks/useBillingAddress';
import FormField from '../FormFIeld/FormField';
import { SettingsSectionLayout } from '../../layouts/SettingsSectionLayout/SettingsSectionLayout';

type Props = { profile: Profile | undefined };

export const BillingAddressSection = ({ profile }: Props) => {
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
    <SettingsSectionLayout title="Billing Address">
      <form onSubmit={handleSubmit(values => updateBilling(values))} className="space-y-4">
        {/* Row 1: First + Last + Company */}
        <div className="grid grid-cols-3 gap-4">
          <FormField label="First name">
            <TextFieldInput
              {...register('firstName')}
              placeholder="First name"
              error={errors.firstName}
            />
          </FormField>
          <FormField label="Last name">
            <TextFieldInput
              {...register('lastName')}
              placeholder="Last name"
              error={errors.lastName}
            />
          </FormField>
          <FormField label="Company Name" optional>
            <TextFieldInput {...register('companyName')} placeholder="Company name" />
          </FormField>
        </div>

        {/* Row 2: Street Address */}
        <FormField label="Street Address">
          <TextFieldInput
            {...register('streetAddress')}
            placeholder="Street address"
            error={errors.streetAddress}
          />
        </FormField>

        {/* Row 3: Country + State + Zip */}
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Country / Region">
            <SelectInput
              {...register('country')}
              options={countryOptions}
              placeholder="Select country..."
              error={errors.country}
            />
          </FormField>

          <FormField label="State">
            <SelectInput
              {...register('state')}
              options={stateOptions}
              placeholder={
                !selectedCountryIso
                  ? 'Select country first'
                  : stateOptions.length === 0
                    ? 'No states available'
                    : 'Select state...'
              }
              disabled={!selectedCountryIso || stateOptions.length === 0}
              error={errors.state}
            />
          </FormField>

          <FormField label="Zip Code">
            <TextFieldInput
              {...register('zipCode')}
              placeholder="Zip code"
              error={errors.zipCode}
            />
          </FormField>
        </div>

        {/* Row 4: Email + Phone */}
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Email">
            <TextFieldInput
              {...register('email')}
              placeholder="email@example.com"
              type="email"
              error={errors.email}
            />
          </FormField>
          <FormField label="Phone">
            <TextFieldInput {...register('phone')} placeholder="(xxx) xxx-xxxx" type="tel" />
          </FormField>
        </div>

        <Button type="submit" variant="fill" size="md" disabled={isPending || !isDirty}>
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </SettingsSectionLayout>
  );
};
