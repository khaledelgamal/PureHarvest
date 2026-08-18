import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Play, Tag, Leaf } from 'lucide-react';

const DUMMY_MARKDOWN = `
Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at posuere ac, viverra at
mauris. Maecenas tincidunt ligula a sem vestibulum pharetra. Maecenas auctor tortor lacus,
nec laoreet nisi porttitor vel. Etiam tincidunt metus vel dui interdum sollicitudin. Mauris sem
ante, vestibulum nec orci vitae, aliquam mollis lacus. Sed et condimentum arcu, id molestie
tellus. Nulla facilisi. Nam scelerisque vitae justo a convallis. Morbi urna ipsum, placerat quis
commodo quis, egestas elementum leo. Donec convallis mollis enim. Aliquam id mi quam.
Phasellus nec fringilla elit.

Nulla mauris tellus, feugiat quis pharetra sed, gravida ac dui. Sed iaculis, metus faucibus
elementum tincidunt, turpis mi viverra velit, pellentesque tristique neque mi eget nulla. Proin
luctus elementum neque et pharetra.

- 100 g of fresh leaves provides.
- Aliquam ac est at augue volutpat elementum.
- Quisque nec enim eget sapien molestie.
- Proin convallis odio volutpat finibus posuere.

Cras et diam maximus, accumsan sapien et, sollicitudin velit. Nulla blandit eros non turpis
lobortis iaculis at ut massa.
`;

const DUMMY_PROMO_IMAGE =
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800';

const TEMP_VIDEO_URL = 'https://www.youtube.com/embed/hqAKFSnFYow?si=zY8O9U0JibgWjUlU&autoplay=1';

export const DescriptionTab = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full pt-8">
      {/* Left side: Markdown */}
      <div className="flex-1 text-gray-500 text-sm leading-relaxed prose prose-sm prose-p:text-gray-500 prose-li:text-gray-500 prose-ul:list-image-[url(/check-circle.svg)]">
        <ReactMarkdown>{DUMMY_MARKDOWN}</ReactMarkdown>
      </div>

      {/* Right side: Promo Image & Badges */}
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
                className="relative z-10 w-12 h-12  cursor-pointer rounded-full bg-primary flex items-center justify-center hover:bg-primary-hard transition group shadow-lg"
              >
                <Play size={20} className="text-white fill-white" />
              </button>
            </>
          )}
        </div>

        {/* Info Badges */}
        <div className="flex border border-gray-100 rounded-lg px-5 py-6 flex-col sm:flex-row gap-5.5">
          <div className="flex-1 flex items-start gap-4 ">
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
    </div>
  );
};
