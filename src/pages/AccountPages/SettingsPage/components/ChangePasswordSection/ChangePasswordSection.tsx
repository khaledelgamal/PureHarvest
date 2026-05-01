import { Button } from '@/components/Buttons/Button/Button';
import PasswordFieldInput from '@/components/Inputs/PasswordFieldInput/PasswordFieldInput';
import { useChangePassword } from './useChangePassword/useChangePassword';
import FormField from '../FormFIeld/FormField';

export const ChangePasswordSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    changePassword,
    isPending,
  } = useChangePassword();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-semibold text-gray-900 text-lg mb-6">Change Password</h3>

      <form
        onSubmit={handleSubmit(values => changePassword(values))}
        className="space-y-4 max-w-lg"
      >
        <FormField label="Current Password">
          <PasswordFieldInput
            {...register('currentPassword')}
            placeholder="Current password"
            error={errors.currentPassword}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="New Password">
            <PasswordFieldInput
              {...register('newPassword')}
              placeholder="New password"
              error={errors.newPassword}
            />
          </FormField>
          <FormField label="Confirm Password">
            <PasswordFieldInput
              {...register('confirmPassword')}
              placeholder="Confirm password"
              error={errors.confirmPassword}
            />
          </FormField>
        </div>

        <Button type="submit" variant="fill" size="md" disabled={isPending}>
          {isPending ? 'Changing...' : 'Change Password'}
        </Button>
      </form>
    </div>
  );
};
