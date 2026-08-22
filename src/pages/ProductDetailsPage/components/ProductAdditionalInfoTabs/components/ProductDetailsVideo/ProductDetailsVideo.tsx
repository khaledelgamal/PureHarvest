import { useState } from 'react';
import { Play, Tag, Leaf } from 'lucide-react';

const DUMMY_PROMO_IMAGE =
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800';

const TEMP_VIDEO_URL = 'https://www.youtube.com/embed/hqAKFSnFYow?si=zY8O9U0JibgWjUlU&autoplay=1';

export const ProductDetailsVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-1 flex-col gap-6 w-full lg:w-[450px] flex-shrink-0">
      {/* Promo Image with Play Button */}
      <div className="relative w-full h-[250px] rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
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
              src={DUMMY_PROMO_IMAGE}
              alt="Promo"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              onClick={() => setIsPlaying(true)}
              aria-label="Play video"
              className="relative z-10 w-12 h-12 cursor-pointer rounded-full bg-primary flex items-center justify-center hover:bg-primary-hard transition group shadow-lg"
            >
              <Play size={20} className="text-white fill-white" />
            </button>
          </>
        )}
      </div>

      {/* Info Badges */}
      <div className="flex border border-gray-100 rounded-lg px-5 py-6 flex-col sm:flex-row gap-5.5">
        <div className="flex-1 flex items-start gap-4">
          <Tag size={24} className="text-primary mt-1" />
          <div className="flex flex-col">
            <span className="text-gray-900 font-medium text-sm">64% Discount</span>
            <span className="text-gray-500 text-xs mt-1 leading-relaxed">
              Save your 64% money with us
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-start gap-4">
          <Leaf size={24} className="text-primary mt-1" />
          <div className="flex flex-col">
            <span className="text-gray-900 font-medium text-sm">100% Organic</span>
            <span className="text-gray-500 text-xs mt-1 leading-relaxed">
              100% Organic Vegetables
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
