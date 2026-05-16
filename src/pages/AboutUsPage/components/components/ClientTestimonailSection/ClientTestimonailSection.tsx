import { Button } from '@/components/Buttons/Button/Button';
import { sectionContainer } from '@/constants/global.styles';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { type EmblaCarouselType } from 'embla-carousel';

import TestimonailItem from './components/TestimonailItem/TestimonailItem';
import { testimonials } from './contants/testimonials';
const ClientTestimonailSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    duration: 50,
    dragFree: false,
    skipSnaps: false,
    containScroll: 'trimSnaps',
    watchResize: false, // Disable if not needed
    watchDrag: true,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
    return () => {
      emblaApi.off('reInit', onSelect).off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const testimonialItems = useMemo(
    () =>
      testimonials.map(testimonial => (
        <TestimonailItem
          key={testimonial.id}
          comment={testimonial.comment}
          user={testimonial.user}
          rate={testimonial.rate}
        />
      )),
    [], // Empty deps since testimonials is static
  );
  return (
    <div className="py-25 bg-gray-50">
      <div className={`${sectionContainer} embla`}>
        <div className=" flex flex-col gap-12.5">
          <div className="flex justify-between items-center gap-10">
            <h3 className="text-5xl font-semibold text-gray-900">Client Testimonail</h3>
            <div className="flex gap-2 embla__controls">
              <Button
                variant="fill"
                size="md"
                className={`embla__prev p-2`}
                disabled={prevBtnDisabled}
                onClick={scrollPrev}
              >
                <ArrowLeft />
              </Button>

              <Button
                variant="fill"
                size="md"
                className="embla__next p-2"
                disabled={nextBtnDisabled}
                onClick={scrollNext}
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">{testimonialItems}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientTestimonailSection;
