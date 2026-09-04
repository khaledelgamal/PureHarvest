import { Button } from '@/components/Buttons/Button/Button';
import PasswordFieldInput from '@/components/Inputs/PasswordFieldInput/PasswordFieldInput';
import { useChangePassword } from './useChangePassword/useChangePassword';
import FormField from '../FormFIeld/FormField';
import { SettingsSectionLayout } from '../../layouts/SettingsSectionLayout/SettingsSectionLayout';
import { useTranslation } from 'react-i18next';

export const ChangePasswordSection = () => {
  const { t } = useTranslation('pages/AccountPages/SettingsPage');
  const {
    register,
    handleSubmit,
    formState: { errors },
    changePassword,
    isPending,
  } = useChangePassword();

  return (
    <SettingsSectionLayout title={t('changePassword', 'Change Password')}>
      <form
        onSubmit={handleSubmit(values => changePassword(values))}
        className="space-y-4 max-w-lg"
      >
        <FormField label={t('currentPassword', 'Current Password')}>
          <PasswordFieldInput
            {...register('currentPassword')}
            placeholder={t('currentPasswordPlaceholder', 'Current password')}
            error={errors.currentPassword}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={t('newPassword', 'New Password')}>
            <PasswordFieldInput
              {...register('newPassword')}
              placeholder={t('newPasswordPlaceholder', 'New password')}
              error={errors.newPassword}
            />
          </FormField>
          <FormField label={t('confirmPassword', 'Confirm Password')}>
            <PasswordFieldInput
              {...register('confirmPassword')}
              placeholder={t('confirmPasswordPlaceholder', 'Confirm password')}
              error={errors.confirmPassword}
            />
          </FormField>
        </div>

        <Button type="submit" variant="fill" size="md" disabled={isPending}>
          {isPending ? t('changing', 'Changing...') : t('changePassword', 'Change Password')}
        </Button>
      </form>
    </SettingsSectionLayout>
  );
};
