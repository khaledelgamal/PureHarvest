import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useIsDemoUser } from '@/hooks/useIsDemoUser';

export const DemoUserHint = () => {
  const isDemoUser = useIsDemoUser();
  const { t } = useTranslation('components/DemoUserHint');

  if (!isDemoUser) return null;

  return (
    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl">
      <AlertCircle className="w-5 h-5 mt-0.5 shrink-0 text-amber-600" />
      <p className="text-sm leading-relaxed">
        {t(
          'demoUserHint',
          "Hint: This is a demo account. You can't change its data. Please login with your own account to have full control.",
        )}
      </p>
    </div>
  );
};
