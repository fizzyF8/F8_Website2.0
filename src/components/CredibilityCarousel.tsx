import { useCallback, useEffect, useMemo, useState } from 'react';
import { Transition } from '@headlessui/react';
import './CredibilityCarousel.css';

type CarouselImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  label?: string;
};

type CredibilityCarouselProps = {
  images: CarouselImage[];
  autoAdvanceInterval?: number;
};

const DEFAULT_INTERVAL = 6000;

export default function CredibilityCarousel({
  images,
  autoAdvanceInterval = DEFAULT_INTERVAL,
}: CredibilityCarouselProps) {
  const slides = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = slides.length;

  const goTo = useCallback(
    (nextIndex: number) => {
      if (totalSlides === 0) return;
      const wrappedIndex = (nextIndex + totalSlides) % totalSlides;
      setActiveIndex(wrappedIndex);
    },
    [totalSlides],
  );

  const handleNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const handlePrevious = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (totalSlides <= 1 || isPaused) {
      return;
    }

    const timer = window.setInterval(handleNext, autoAdvanceInterval);
    return () => window.clearInterval(timer);
  }, [autoAdvanceInterval, handleNext, isPaused, totalSlides]);

  if (totalSlides === 0) {
    return null;
  }

  return (
    <div
      className="credibility-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="carousel-viewport" role="region" aria-live="polite">
        {slides.map((image, index) => (
          <Transition
            key={image.src}
            show={index === activeIndex}
            enter="carousel-enter"
            enterFrom="carousel-enter-from"
            enterTo="carousel-enter-to"
            leave="carousel-leave"
            leaveFrom="carousel-leave-from"
            leaveTo="carousel-leave-to"
          >
            <figure className="carousel-slide">
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
              />
              {image.label ? (
                <figcaption className="carousel-caption">{image.label}</figcaption>
              ) : null}
            </figure>
          </Transition>
        ))}

        {totalSlides > 1 ? (
          <div className="carousel-controls" aria-hidden="true">
            <button
              type="button"
              className="carousel-button carousel-button-previous"
              onClick={handlePrevious}
              aria-label="Previous slide"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15.75 5.25 9 12l6.75 6.75" />
              </svg>
            </button>
            <button
              type="button"
              className="carousel-button carousel-button-next"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m8.25 5.25 6.75 6.75-6.75 6.75" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>

      {totalSlides > 1 ? (
        <div className="carousel-indicators" role="tablist">
          {slides.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`${image.src}-${index}`}
                type="button"
                className={`carousel-indicator${isActive ? ' is-active' : ''}`}
                onClick={() => goTo(index)}
                role="tab"
                aria-selected={isActive}
                aria-label={`Show slide ${index + 1}`}
              >
                <span className="sr-only">{image.alt}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
