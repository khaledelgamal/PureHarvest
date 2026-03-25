import { useState } from 'react';
import { sectionContainer } from '@/constants/global.styles';
import { useTranslation } from 'react-i18next';
import PlayTriangleIcon from '@/icons/PlayTriangleIcon';

const tRoute = 'pages.Home.components.VideoBanner';

// Temp video from YouTube (Big Buck Bunny - free to use)
const TEMP_VIDEO_URL = 'https://www.youtube.com/embed/hqAKFSnFYow?si=zY8O9U0JibgWjUlU&autoplay=1';
const TEMP_THUMBNAIL = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80';

const VideoBanner = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-linear-to-b from-green-gray-50 from-50% to-white to-50% py-[50px]">
      <div className={sectionContainer}>
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl aspect-video">
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

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
                <span className="text-xs font-semibold tracking-[0.25em] uppercase opacity-90">
                  {t(`${tRoute}.label`, 'Video')}
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-center leading-snug max-w-md">
                  {t(`${tRoute}.title`, "We're the Best Organic Farm in the World")}
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
