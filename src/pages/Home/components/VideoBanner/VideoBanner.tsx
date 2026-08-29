import { useState } from 'react';
import { sectionContainer } from '@/constants/global.styles';
import { useTranslation } from 'react-i18next';
import PlayTriangleIcon from '@/icons/PlayTriangleIcon';

// Temp video from YouTube (Big Buck Bunny - free to use)
const TEMP_VIDEO_URL = 'https://www.youtube.com/embed/hqAKFSnFYow?si=zY8O9U0JibgWjUlU&autoplay=1';
const TEMP_THUMBNAIL = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80';

const VideoBanner = () => {
  const { t } = useTranslation('pages/Home');
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-linear-to-b from-green-gray-50 from-50% to-white to-50% py-8 md:py-[50px]">
      <div className={sectionContainer}>
        <div className="relative w-full rounded-xl md:rounded-2xl overflow-hidden shadow-xl aspect-[4/3] sm:aspect-video min-h-[320px]">
          {isPlaying ? (
            <iframe
              src={TEMP_VIDEO_URL}
              title="Organic Farm Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <>
              <img
                src={TEMP_THUMBNAIL}
                alt="Farm video thumbnail"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-primary/60" />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 md:gap-4 text-white px-4">
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase opacity-90">
                  {t('videoLabel', 'Video')}
                </span>

                <h2 className="text-2xl md:text-4xl font-bold text-center leading-snug max-w-xs md:max-w-md">
                  {t('videoTitle', "We're the Best Organic Farm in the World")}
                </h2>

                <button
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play video"
                  className="mt-2 w-16 h-16 rounded-full border-2 border-white
                    flex items-center justify-center pl-1.75
                     hover:text-black hover:border-black hover:cursor-pointer
                    transition-all duration-300 group"
                >
                  <PlayTriangleIcon className=" w-5 h-6" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoBanner;
