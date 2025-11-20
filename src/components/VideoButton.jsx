import { useState } from 'react';
import VideoModal from './VideoModal';

export default function VideoButton({ videoSrc, englishVideoSrc, children = 'Watch Video', className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  // Handle both string paths and Astro ImageMetadata objects
  const resolveSrc = (src) => {
    if (!src) return '';
    if (typeof src === 'string') return src;
    // If it's an Astro ImageMetadata object, use the src property
    return src.src || src;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={className}
        type="button"
      >
        {children}
      </button>
      <VideoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        videoSrc={resolveSrc(videoSrc)}
        englishVideoSrc={resolveSrc(englishVideoSrc)}
        videoTitle="Transigo Kiosk Video"
      />
    </>
  );
}
