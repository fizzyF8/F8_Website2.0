import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function BMRCLChampsGallery({ images }) {
  const [showFull, setShowFull] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const previewCount = 3;
  const previewImages = images.slice(0, previewCount);
  const remainingCount = images.length - previewCount;

  const openFullscreen = (index) => {
    setCurrentIndex(index);
    setFullscreenImage({
      src: images[index].src,
      alt: images[index].alt
    });
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  const navigateImage = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }
    setCurrentIndex(newIndex);
    setFullscreenImage({
      src: images[newIndex].src,
      alt: images[newIndex].alt
    });
  };

  const handleKeyDown = (e) => {
    if (!fullscreenImage) return;
    if (e.key === 'Escape') {
      closeFullscreen();
    } else if (e.key === 'ArrowRight') {
      navigateImage('next');
    } else if (e.key === 'ArrowLeft') {
      navigateImage('prev');
    }
  };

  useEffect(() => {
    if (fullscreenImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Prevent scrolling on mobile
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      };
    }
  }, [fullscreenImage, currentIndex]);

  return (
    <>
      <div className="champs-gallery glass">
        <div className={`champs-gallery-grid ${showFull ? 'expanded' : ''}`}>
          {(showFull ? images : previewImages).map((image, index) => (
            <div
              key={index}
              className="champs-gallery-item"
              onClick={() => openFullscreen(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="champs-gallery-img"
                loading="lazy"
              />
              <div className="champs-gallery-overlay">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {!showFull && remainingCount > 0 && (
          <div className="champs-gallery-footer">
            <button
              className="btn btn-secondary champs-view-full-btn"
              onClick={() => setShowFull(true)}
            >
              View Full Gallery ({remainingCount} more)
            </button>
          </div>
        )}

        {showFull && (
          <div className="champs-gallery-footer">
            <button
              className="btn btn-secondary champs-view-full-btn"
              onClick={() => setShowFull(false)}
            >
              Show Less
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Modal - Rendered via Portal */}
      {fullscreenImage && typeof document !== 'undefined' && createPortal(
        <div
          className="champs-fullscreen-modal"
          onClick={closeFullscreen}
        >
          <button
            className="champs-close-button"
            onClick={closeFullscreen}
            aria-label="Close fullscreen"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <button
            className="champs-nav-button champs-nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            className="champs-nav-button champs-nav-next"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div className="champs-fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={fullscreenImage.src}
              alt={fullscreenImage.alt}
              className="champs-fullscreen-image"
            />
            <div className="champs-fullscreen-info">
              <div className="champs-fullscreen-title">{fullscreenImage.alt}</div>
              <div className="champs-fullscreen-counter">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style jsx global>{`
        .champs-gallery {
          margin: 2.5rem 0;
          padding: 2rem;
          border-radius: 24px;
          background: rgba(26, 26, 26, 0.9);
        }

        .champs-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .champs-gallery-grid.expanded {
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .champs-gallery-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        }

        .champs-gallery-item:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 8px 24px rgba(167, 210, 33, 0.2);
        }

        .champs-gallery-img {
          width: 100%;
          height: 200px;
          display: block;
          object-fit: cover;
        }

        .champs-gallery-grid.expanded .champs-gallery-img {
          height: auto;
          min-height: 200px;
        }

        .champs-gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .champs-gallery-overlay svg {
          color: white;
          width: 48px;
          height: 48px;
        }

        .champs-gallery-item:hover .champs-gallery-overlay {
          opacity: 1;
        }

        .champs-gallery-footer {
          margin-top: 2rem;
          text-align: center;
        }

        .champs-view-full-btn {
          padding: 12px 32px;
          font-weight: 600;
        }

        /* Fullscreen Modal */
        .champs-fullscreen-modal {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          min-width: 100vw !important;
          min-height: 100vh !important;
          max-width: 100vw !important;
          max-height: 100vh !important;
          margin: 0 !important;
          padding: 0 !important;
          background: rgba(0, 0, 0, 0.98) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          z-index: 999999 !important;
          animation: fadeIn 0.3s ease;
          overflow: hidden !important;
          box-sizing: border-box !important;
        }

        .champs-fullscreen-content {
          position: relative;
          max-width: 95vw;
          max-height: 95vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin: 0;
          padding: 2rem;
          box-sizing: border-box;
        }

        .champs-fullscreen-image {
          max-width: 95vw;
          max-height: 95vh;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        }

        .champs-fullscreen-info {
          text-align: center;
          color: white;
        }

        .champs-fullscreen-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #f5f5f5;
        }

        .champs-fullscreen-counter {
          font-size: 0.9rem;
          color: #a0a0a0;
        }

        .champs-close-button {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          padding: 1rem;
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.3s ease;
          z-index: 10001;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .champs-close-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .champs-nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          padding: 1rem;
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.3s ease;
          z-index: 10001;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .champs-nav-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .champs-nav-prev {
          left: 2rem;
        }

        .champs-nav-next {
          right: 2rem;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 1024px) {
          .champs-gallery {
            padding: 1.5rem;
          }

          .champs-gallery-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }

          .champs-gallery-grid.expanded {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          }

          .champs-nav-button {
            padding: 0.8rem;
          }

          .champs-nav-prev {
            left: 1rem;
          }

          .champs-nav-next {
            right: 1rem;
          }

          .champs-close-button {
            top: 1rem;
            right: 1rem;
            padding: 0.8rem;
          }
        }

        @media (max-width: 640px) {
          .champs-gallery-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 0.75rem;
          }

          .champs-gallery-grid.expanded {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          }

          .champs-fullscreen-image {
            max-width: 95vw;
            max-height: 85vh;
          }

          .champs-fullscreen-title {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}

