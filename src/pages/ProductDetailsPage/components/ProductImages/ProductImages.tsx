import React, { useState, useEffect, useReducer } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { classNames } from '@/utils';
import type { Product } from '@/services/supabase/products/types';

const Magnifier = ({ src }: { src: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      className="relative w-full aspect-square rounded-lg overflow-hidden cursor-zoom-in flex items-center justify-center"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt="Product Main"
        className={classNames(
          'w-full h-full object-contain transition-opacity duration-200',
          showMagnifier ? 'opacity-0' : 'opacity-100',
        )}
      />
      {showMagnifier && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: '120%',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  );
};

export const ProductImages = ({ product }: { product: Product }) => {
  const images = (product.images && product.images.length > 0)
    ? [...product.images].sort((a, b) => a.sortOrder - b.sortOrder).map(i => i.imageUrl)
    : ['https://placehold.co/800x800/eee/ccc?text=No+Image'];

  const [activeImage, setActiveImage] = useState(0);
  const [, forceRender] = useReducer(x => x + 1, 0);

  // Vertical carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'y',
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('reInit', forceRender).on('select', forceRender);
    return () => {
      emblaApi.off('reInit', forceRender).off('select', forceRender);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const prevBtnDisabled = !emblaApi?.canScrollPrev();
  const nextBtnDisabled = !emblaApi?.canScrollNext();
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-1/2">
      {/* Thumbnails Carousel */}
      <div className="flex md:flex-col items-center gap-2 h-auto md:h-[500px]">
        <button
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          className={classNames(
            'hidden md:flex p-1 rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed',
          )}
        >
          <ChevronUp size={20} />
        </button>

        <div className="overflow-hidden h-full w-full md:w-24 flex-1" ref={emblaRef}>
          <div className="flex md:flex-col gap-3 h-full">
            {images.map((src, index) => (
              <div
                key={index}
                className={classNames(
                  'flex-[0_0_80px] w-20 h-20 md:w-full md:h-24 rounded-lg overflow-hidden border-2 cursor-pointer transition flex-shrink-0 flex items-center justify-center bg-gray-50',
                  activeImage === index
                    ? 'border-primary'
                    : 'border-transparent hover:border-gray-300',
                )}
                onClick={() => {
                  setActiveImage(index);
                  emblaApi?.scrollTo(index);
                }}
              >
                <img src={src} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          className={classNames(
            'hidden md:flex p-1 rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed',
          )}
        >
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <Magnifier src={images[activeImage]} />
      </div>
    </div>
  );
};

export default ProductImages;
