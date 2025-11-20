import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import './VideoModal.css';

export default function VideoModal({ isOpen, onClose, videoSrc, englishVideoSrc, videoTitle = 'Video' }) {
  const [activeSrc, setActiveSrc] = useState(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // If only one source exists, set it immediately
      if (!englishVideoSrc) {
        setActiveSrc(videoSrc);
      } else {
        // If multiple sources, reset to null to show selection screen
        setActiveSrc(null);
      }
    } else {
      setActiveSrc(null);
    }
  }, [isOpen, videoSrc, englishVideoSrc]);

  // Hide navbar when modal is open
  useEffect(() => {
    const nav = document.querySelector('nav.nav-white');
    if (nav) {
      if (isOpen) {
        nav.style.display = 'none';
      } else {
        nav.style.display = '';
      }
    }
    return () => {
      if (nav) {
        nav.style.display = '';
      }
    };
  }, [isOpen]);

  const handleLanguageSelect = (src) => {
    setActiveSrc(src);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="video-modal-dialog">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="video-modal-backdrop" aria-hidden="true" />
        </Transition.Child>

        <div className="video-modal-container">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className={`video-modal-panel ${!activeSrc && englishVideoSrc ? 'selection-mode' : ''}`}>
              <button
                onClick={onClose}
                className="video-modal-close"
                aria-label="Close video"
                type="button"
              >
                <svg
                  className="video-modal-close-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {!activeSrc && englishVideoSrc ? (
                <div className="language-selection-container">
                  <div className="language-selection-content">
                    <h3 className="language-selection-title">
                      Select Language
                    </h3>
                    <p className="language-selection-text">
                      Choose your preferred language to watch the tutorial
                    </p>
                    
                    <div className="language-buttons">
                      <button
                        onClick={() => handleLanguageSelect(videoSrc)}
                        className="language-btn"
                      >
                        <span className="language-btn-indicator"></span>
                        Kannada (Original)
                      </button>
                      
                      <button
                        onClick={() => handleLanguageSelect(englishVideoSrc)}
                        className="language-btn"
                      >
                        <span className="language-btn-indicator"></span>
                        English
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="video-modal-video-container">
                  {activeSrc && (
                    <video
                      className="video-modal-video"
                      controls
                      autoPlay
                      playsInline
                      src={activeSrc}
                      onEnded={onClose}
                      onError={(e) => {
                        console.error('Video error:', e);
                        console.error('Video src:', activeSrc);
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
