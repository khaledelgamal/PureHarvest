import { useTranslation } from 'react-i18next';

const instaImages = [
  '/images/instagram/insta-1.webp',
  '/images/instagram/insta-2.webp',
  '/images/instagram/insta-3.webp',
  '/images/instagram/insta-4.webp',
  '/images/instagram/insta-5.webp',
  '/images/instagram/insta-6.webp',
];

const FooterInstagram = () => {
  const { t } = useTranslation('layouts/AppLayout');

  return (
    <div>
      <h3 className="text-white text-lg font-semibold mb-4">{t('instagram', 'Instagram')}</h3>
      <div className="grid grid-cols-3 gap-2">
        {instaImages.map((img, i) => (
          <a href="#" key={i} className="overflow-hidden rounded">
            <img
              src={img}
              alt={`Instagram ${i + 1}`}
              className="w-full h-16 object-cover hover:scale-110 transition-transform"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterInstagram;
