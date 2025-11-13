import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import './VideoModal.css';

export default function VideoModal({ isOpen, onClose, videoSrc, videoTitle = 'Video' }) {
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
    // Cleanup on unmount
    return () => {
      if (nav) {
        nav.style.display = '';
      }
    };
  }, [isOpen]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="video-modal-dialog">
        {/* Backdrop */}
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

        {/* Modal container */}
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
            <Dialog.Panel className="video-modal-panel">
              {/* Close button */}
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

              {/* Video container */}
              <div className="video-modal-video-container">
                <video
                  className="video-modal-video"
                  controls
                  autoPlay
                  playsInline
                  onEnded={onClose}
                  onError={(e) => {
                    console.error('Video error:', e);
                    console.error('Video src:', videoSrc);
                  }}
                >
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

