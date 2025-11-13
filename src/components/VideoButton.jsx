import { useState } from 'react';
import VideoModal from './VideoModal';

export default function VideoButton({ videoSrc, children = 'Watch Video', className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  // Handle both string paths and Astro ImageMetadata objects
  const getVideoUrl = () => {
    if (typeof videoSrc === 'string') {
      return videoSrc;
    }
    // If it's an Astro ImageMetadata object, use the src property
    return videoSrc?.src || videoSrc;
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
        videoSrc={getVideoUrl()}
        videoTitle="Transigo Kiosk Video"
      />
    </>
  );
}

