import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routePaths } from '@/router/routePaths';
import { Button } from '@/components/Buttons/Button/Button';

export const BlogDetailsAdBanner = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden mt-8 mb-4 min-h-[200px] md:min-h-[240px] flex items-center shadow-xl group">
      {/* Background Pattern / Graphic Mock */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-0" />

        {/* Abstract pattern decoration */}
        <div className="absolute -right-10 -top-10 w-64 h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

        {/* Background image */}
        <div
          className="absolute inset-0 bg-[url('https://yzjlwfddhworpprdmapz.supabase.co/storage/v1/object/public/blog/25ex006u_blog_header_image_1376x640.jpg__650x360_q85_crop_subsampling-2_upscale.webp?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 md:opacity-50 scale-105 transition-transform duration-700 group-hover:scale-110"
          role="img"
          aria-label="Fresh fruits background"
        />
      </div>

      <div className="relative z-10 px-6 sm:px-8 md:px-12 py-8 w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-wider text-primary-soft uppercase mb-2 px-3 py-1 bg-primary/10 rounded-full backdrop-blur-sm">
            {t('blog.adBanner.subtitle', 'Summer Sales')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            {t('blog.adBanner.title', 'Fresh Fruit')}
            <span className="block text-primary-400 text-xl sm:text-2xl md:text-3xl mt-1">
              {t('blog.adBanner.subtitle2', 'Up to 56% OFF')}
            </span>
          </h2>
          <Link to={routePaths.SHOP.ROOT} className="inline-block mt-4 md:mt-6">
            <Button className="rounded-full px-5 sm:px-6 py-2 sm:py-2.5 flex items-center gap-2">
              <span>{t('blog.adBanner.shopBtn', 'Shop Now')}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Discount Badge */}
        <div className="flex-shrink-0">
          <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-full w-28 h-28 sm:w-32 sm:h-32 border-2 border-primary/30 backdrop-blur-md shadow-2xl animate-pulse-gentle">
            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping-slow" />
            <div className="absolute inset-2 rounded-full border border-primary/10" />

            <span className="text-xs sm:text-sm text-gray-300 font-medium">Up to</span>
            <span className="text-2xl sm:text-3xl font-bold text-primary">56%</span>
            <span className="text-xs sm:text-sm text-gray-400">Off</span>
          </div>
        </div>
      </div>

      {/* Optional: Decorative element on mobile */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-400 to-transparent opacity-50" />
    </div>
  );
};
