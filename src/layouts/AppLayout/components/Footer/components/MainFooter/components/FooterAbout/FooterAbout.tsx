import { useTranslation } from 'react-i18next';

const FooterAbout = () => {
  const { t } = useTranslation('layouts/AppLayout');

  return (
    <div className="max-w-[336px]">
      <h3 className="text-white text-lg font-semibold mb-4">
        {t('aboutPureHarvest', 'About PureHarvest')}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-5">
        {t(
          'aboutDescription',
          'Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magna congue nec.',
        )}
      </p>
      <div className="flex items-center gap-2 text-sm flex-wrap">
        <a href="tel:2195550114" className="text-white underline underline-offset-4">
          (219) 555-0114
        </a>
        <span className="text-gray-400">{t('or', 'or')}</span>
        <a href="mailto:Proxy@gmail.com" className="text-white underline underline-offset-4">
          Proxy@gmail.com
        </a>
      </div>
    </div>
  );
};

export default FooterAbout;
