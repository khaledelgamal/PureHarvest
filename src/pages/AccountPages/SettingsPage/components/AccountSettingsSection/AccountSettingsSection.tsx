import { Camera } from 'lucide-react';
import { Button } from '@/components/Buttons/Button/Button';
import TextFieldInput from '@/components/Inputs/TextFieldInput/TextFieldInput';
import type { Profile } from '@/services/supabase/profiles/types';
import { useAccountSettings } from './hooks/useAccountSettings';
import FormField from '../FormFIeld/FormField';
import ImageCropModal from '@/components/ImageCropModal/ImageCropModal';
import { SettingsSectionLayout } from '../../layouts/SettingsSectionLayout/SettingsSectionLayout';

type Props = {
  profile: Profile | undefined;
  isLoadingProfile: boolean;
};

export const AccountSettingsSection = ({ profile, isLoadingProfile }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    user,
    isCropModalOpen,
    openCropModal,
    closeCropModal,
    handleCropComplete,
    fullName,
    initials,
    updateProfile,
    isUpdatingProfile,
    isUploadingAvatar,
  } = useAccountSettings(profile);

  return (
    <SettingsSectionLayout title="Account Settings">
      <form onSubmit={handleSubmit(values => updateProfile(values))} className="flex-1 space-y-4">
        <FormField label="First name">
          <TextFieldInput
            {...register('firstName')}
            placeholder="First name"
            error={errors.firstName}
          />
        </FormField>
        <FormField label="Last Name">
          <TextFieldInput
            {...register('lastName')}
            placeholder="Last name"
            error={errors.lastName}
          />
        </FormField>

        <FormField label="Email">
          <TextFieldInput
            value={user?.email ?? ''}
            disabled
            readOnly
            className="bg-gray-50 cursor-not-allowed text-gray-400"
          />
        </FormField>

        <FormField label="Phone Number">
          <TextFieldInput
            {...register('phone')}
            placeholder="(xxx) xxx-xxxx"
            type="tel"
            error={errors.phone}
          />
        </FormField>

        <Button type="submit" variant="fill" size="md" disabled={isUpdatingProfile || !isDirty}>
          {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>

      <div className="flex flex-col items-center gap-4 shrink-0 flex-1 mt-10">
        <div className="w-56 h-56 rounded-full overflow-hidden ring-4 ring-green-gray-100">
          {isLoadingProfile ? (
            <div className="w-full h-full bg-gray-100 animate-pulse" />
          ) : profile?.avatarUrl ? (
            <img src={profile.avatarUrl} alt={fullName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-primary flex-center text-white text-2xl font-bold">
              {initials}
            </div>
          )}
        </div>

        <Button
          type="button"
          variant="border"
          size="sm"
          onClick={openCropModal}
          disabled={isUploadingAvatar}
          className="flex items-center gap-2"
        >
          <Camera className="w-4 h-4" />
          {isUploadingAvatar ? 'Uploading...' : 'Choose Image'}
        </Button>
      </div>

      {isCropModalOpen && (
        <ImageCropModal
          outputWidth={300}
          outputHeight={300}
          maxFileSizeMB={5}
          onCropComplete={handleCropComplete}
          onClose={closeCropModal}
        />
      )}
    </SettingsSectionLayout>
  );
};
