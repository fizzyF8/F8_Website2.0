import { useState } from 'react';

// Import Transigo images
import tvm1000_1 from "../assets/kiosks/TVM 1000/tvm_1000_1.jpeg";
import tvm1000_2 from "../assets/kiosks/TVM 1000/tvm_1000_2.png";
import tvm2000_1 from "../assets/kiosks/TVM 2000/tvm_2000_1.jpg";
import tvm2000_2 from "../assets/kiosks/TVM 2000/tvm_2000_2.jpg";
import tvm2000_3 from "../assets/kiosks/TVM 2000/tvm_2000_3.png";
import tvm4000_1 from "../assets/kiosks/TVM 4000/tvm_4000_1.jpg";
import tvm4000_2 from "../assets/kiosks/TVM 4000/tvm_4000_2.jpg";
import tvm4000_3 from "../assets/kiosks/TVM 4000/tvm_4000_3.jpg";

const transigoData = [
  {
    id: 'transigo1000',
    number: '1000',
    title: 'Transigo 1000',
    badge: 'Compact',
    badgeColor: '#4ade80',
    mainImage: tvm1000_1.src,
    allImages: [tvm1000_1.src, tvm1000_2.src],
    description: 'Perfect for low to medium traffic stations with essential ticketing needs.',
    highlights: ['15" Touch Display', 'UPI & Cards', 'QR Scanning'],
    features: [
      { icon: '🖥️', text: '15" Touch Display' },
      { icon: '💳', text: 'UPI & Card Payments' },
      { icon: '📱', text: 'QR Code Scanning' },
      { icon: '📦', text: 'Compact Footprint' },
      { icon: '🛡️', text: 'IP54 Protection' },
      { icon: '⏰', text: '24/7 Operation' }
    ],
    idealFor: [
      { icon: '🚇', text: 'Metro Stations' },
      { icon: '🚌', text: 'Bus Terminals' },
      { icon: '🅿️', text: 'Parking Facilities' },
      { icon: '🏢', text: 'Small Transit Hubs' }
    ],
    specs: [
      { label: 'Display', value: '15" Touch' },
      { label: 'Payments', value: 'UPI, Cards' },
      { label: 'Protection', value: 'IP54' },
      { label: 'Temperature', value: '-10°C to 55°C' }
    ]
  },
  {
    id: 'transigo2000',
    number: '2000',
    title: 'Transigo 2000',
    badge: 'Advanced',
    badgeColor: '#3b82f6',
    mainImage: tvm2000_3.src,
    allImages: [tvm2000_1.src, tvm2000_2.src, tvm2000_3.src],
    description: 'High-traffic station solution with multi-payment and printing capabilities.',
    highlights: ['21" HD Display', 'All Payments', 'Ticket Printing'],
    features: [
      { icon: '🖥️', text: '21" HD Touch Display' },
      { icon: '💰', text: 'Cash & Digital Payments' },
      { icon: '🖨️', text: 'Paper Ticket Printing' },
      { icon: '💳', text: 'NCMC Card Support' },
      { icon: '🛡️', text: 'IP65 Protection' },
      { icon: '👆', text: 'Biometric Authentication' }
    ],
    idealFor: [
      { icon: '🚇', text: 'Major Metro Stations' },
      { icon: '✈️', text: 'Airport Terminals' },
      { icon: '🛍️', text: 'Shopping Centers' },
      { icon: '🏢', text: 'Corporate Parks' }
    ],
    specs: [
      { label: 'Display', value: '21" HD Touch' },
      { label: 'Payments', value: 'All Methods' },
      { label: 'Protection', value: 'IP65' },
      { label: 'Printing', value: 'Thermal' }
    ]
  },
  {
    id: 'transigo4000',
    number: '4000',
    title: 'Transigo 4000',
    badge: 'Flagship',
    badgeColor: '#8b5cf6',
    mainImage: tvm4000_2.src,
    allImages: [tvm4000_1.src, tvm4000_2.src, tvm4000_3.src],
    description: 'Premium enterprise solution with advanced features and card issuance capabilities.',
    highlights: ['32" HD Display', 'All Payments', 'Card Issuance'],
    features: [
      { icon: '🖥️', text: '32" Premium Touch Display' },
      { icon: '💳', text: 'All Payment Methods' },
      { icon: '🎫', text: 'Smart Card Issuance' },
      { icon: '🖨️', text: 'Multi-format Printing' },
      { icon: '🛡️', text: 'IP67 Protection' },
      { icon: '🔒', text: 'Advanced Security' }
    ],
    idealFor: [
      { icon: '🏛️', text: 'Major Transit Hubs' },
      { icon: '✈️', text: 'International Airports' },
      { icon: '🏢', text: 'Enterprise Facilities' },
      { icon: '🎯', text: 'High-Volume Locations' }
    ],
    specs: [
      { label: 'Display', value: '32" HD Touch' },
      { label: 'Payments', value: 'Universal' },
      { label: 'Protection', value: 'IP67' },
      { label: 'Card Issuance', value: 'Yes' }
    ]
  }
];

export default function InteractiveTransigoCards() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState({});

  const handleCardClick = (cardId) => {
    if (expandedCard === cardId) {
      setExpandedCard(null);
    } else {
      setExpandedCard(cardId);
      // Initialize selected image index for this card
      if (!selectedImageIndex[cardId]) {
        setSelectedImageIndex(prev => ({ ...prev, [cardId]: 0 }));
      }
    }
  };

  const handleImageClick = (e, cardId) => {
    e.stopPropagation();
    if (expandedCard === cardId) {
      const card = transigoData.find(c => c.id === cardId);
      const currentIndex = selectedImageIndex[cardId] || 0;
      setFullscreenImage({
        src: card.allImages[currentIndex],
        title: card.title,
        cardId: cardId
      });
    }
  };

  const selectImage = (cardId, imageIndex) => {
    setSelectedImageIndex(prev => ({ ...prev, [cardId]: imageIndex }));
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <>
      <div className="transigo-interactive-grid">
        {transigoData.map((transigo) => {
          const isExpanded = expandedCard === transigo.id;
          const currentImageIndex = selectedImageIndex[transigo.id] || 0;

          return (
            <div
              key={transigo.id}
              className={`transigo-interactive-card ${isExpanded ? 'expanded' : ''}`}
              onClick={() => handleCardClick(transigo.id)}
            >
              {/* Compact View - Just Image */}
              <div className="transigo-compact-view">
                <div className="transigo-image-container">
                  <img
                    src={transigo.mainImage}
                    alt={transigo.title}
                    className="transigo-main-image"
                  />
                  <div className="transigo-overlay">
                    <div className="transigo-number-badge">{transigo.number}</div>
                    <div className="transigo-title">{transigo.title}</div>
                    <div
                      className="transigo-badge-compact"
                      style={{ backgroundColor: transigo.badgeColor }}
                    >
                      {transigo.badge}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded View - Detailed Information */}
              <div className={`transigo-expanded-view ${isExpanded ? 'active' : ''}`}>
                <div className="transigo-expanded-content">
                  {/* Header */}
                  <div className="transigo-expanded-header">
                    <div className="transigo-header-left">
                      <div className="transigo-number-large">{transigo.number}</div>
                      <div>
                        <h3 className="transigo-title-large">{transigo.title}</h3>
                        <p className="transigo-subtitle">{transigo.description}</p>
                      </div>
                    </div>
                    <div
                      className="transigo-badge-large"
                      style={{ backgroundColor: transigo.badgeColor }}
                    >
                      {transigo.badge}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="transigo-main-content">
                    {/* Image Gallery */}
                    <div className="transigo-gallery-section">
                      <div
                        className="transigo-main-gallery-image"
                        onClick={(e) => handleImageClick(e, transigo.id)}
                      >
                        <img
                          src={transigo.allImages[currentImageIndex]}
                          alt={`${transigo.title} - View ${currentImageIndex + 1}`}
                        />
                        <div className="transigo-fullscreen-hint">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                          </svg>
                        </div>
                      </div>

                      {transigo.allImages.length > 1 && (
                        <div className="transigo-thumbnail-gallery">
                          {transigo.allImages.map((image, index) => (
                            <div
                              key={index}
                              className={`transigo-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                selectImage(transigo.id, index);
                              }}
                            >
                              <img src={image} alt={`${transigo.title} thumbnail ${index + 1}`} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Information Sections */}
                    <div className="transigo-info-sections">
                      {/* Features */}
                      <div className="transigo-info-section">
                        <h4>Key Features</h4>
                        <div className="transigo-features-grid">
                          {transigo.features.map((feature, index) => (
                            <div key={index} className="transigo-feature-item">
                              <span className="transigo-feature-icon">{feature.icon}</span>
                              <span className="transigo-feature-text">{feature.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Ideal For */}
                      <div className="transigo-info-section">
                        <h4>Ideal For</h4>
                        <div className="transigo-ideal-grid">
                          {transigo.idealFor.map((use, index) => (
                            <div key={index} className="transigo-ideal-item">
                              <span className="transigo-ideal-icon">{use.icon}</span>
                              <span className="transigo-ideal-text">{use.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Specifications */}
                      <div className="transigo-info-section">
                        <h4>Specifications</h4>
                        <div className="transigo-specs-grid">
                          {transigo.specs.map((spec, index) => (
                            <div key={index} className="transigo-spec-item">
                              <span className="transigo-spec-label">{spec.label}</span>
                              <span className="transigo-spec-value">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div className="transigo-fullscreen-modal" onClick={closeFullscreen}>
          <div className="transigo-fullscreen-content">
            <button className="transigo-close-button" onClick={closeFullscreen}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <img
              src={fullscreenImage.src}
              alt={fullscreenImage.title}
              className="transigo-fullscreen-image"
            />
            <div className="transigo-fullscreen-title">{fullscreenImage.title}</div>
          </div>
        </div>
      )}

      <style jsx>{`
        .transigo-interactive-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2.5rem;
          margin: 2rem 0;
        }

        .transigo-interactive-card {
          position: relative;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 20px;
          overflow: hidden;
          background: rgba(26, 26, 26, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(167, 210, 33, 0.2);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
        }

        .transigo-interactive-card:not(.expanded):hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(167, 210, 33, 0.25);
          border-color: rgba(167, 210, 33, 0.4);
        }

        .transigo-interactive-card.expanded {
          grid-column: 1 / -1;
          max-width: none;
        }

        /* Compact View Styles */
        .transigo-compact-view {
          position: relative;
          height: 265px;
          overflow: hidden;
        }

        .transigo-image-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .transigo-main-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          background: rgba(0, 0, 0, 0.3);
          transition: transform 0.6s ease;
        }

        .transigo-interactive-card:not(.expanded):hover .transigo-main-image {
          transform: scale(1.1);
        }

        .transigo-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          padding: 2rem;
          color: white;
        }

        .transigo-number-badge {
          background: linear-gradient(135deg, #a7d221, #b8e32e);
          color: #0a0a0a;
          font-size: 1.2rem;
          font-weight: 800;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          display: inline-block;
          margin-bottom: 0.5rem;
        }

        .transigo-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .transigo-badge-compact {
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          display: inline-block;
        }

        /* Expanded View Styles */
        .transigo-expanded-view {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(18, 18, 18, 0.95);
          color: #f5f5f5;
        }

        .transigo-expanded-view.active {
          max-height: 2000px;
        }

        .transigo-expanded-content {
          padding: 2rem;
          animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .transigo-expanded-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid rgba(167, 210, 33, 0.2);
        }

        .transigo-header-left {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
        }

        .transigo-number-large {
          background: linear-gradient(135deg, #a7d221, #b8e32e);
          color: #0a0a0a;
          font-size: 2rem;
          font-weight: 800;
          padding: 1rem 1.5rem;
          border-radius: 16px;
          min-width: 100px;
          text-align: center;
        }

        .transigo-title-large {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: #f5f5f5;
        }

        .transigo-subtitle {
          font-size: 1.1rem;
          color: #a0a0a0;
          margin: 0;
          line-height: 1.6;
        }

        .transigo-badge-large {
          color: white;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.5rem 1.5rem;
          border-radius: 25px;
        }

        .transigo-main-content {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
        }

        /* Gallery Styles */
        .transigo-gallery-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .transigo-main-gallery-image {
          position: relative;
          height: 380px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .transigo-main-gallery-image:hover {
          transform: scale(1.02);
        }

        .transigo-main-gallery-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          background: rgba(0, 0, 0, 0.3);
        }

        .transigo-fullscreen-hint {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem;
          border-radius: 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .transigo-main-gallery-image:hover .transigo-fullscreen-hint {
          opacity: 1;
        }

        .transigo-thumbnail-gallery {
          display: flex;
          gap: 0.5rem;
        }

        .transigo-thumbnail {
          width: 120px;
          height: 90px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .transigo-thumbnail.active {
          border-color: #a7d221;
        }

        .transigo-thumbnail:hover {
          border-color: #b8e32e;
        }

        .transigo-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Info Sections */
        .transigo-info-sections {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .transigo-info-section h4 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #f5f5f5;
          border-bottom: 2px solid #a7d221;
          padding-bottom: 0.5rem;
        }

        .transigo-features-grid,
        .transigo-ideal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.8rem;
        }

        .transigo-feature-item,
        .transigo-ideal-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem;
          background: rgba(167, 210, 33, 0.08);
          border-radius: 12px;
          border: 1px solid rgba(167, 210, 33, 0.2);
          transition: all 0.3s ease;
        }

        .transigo-feature-item:hover,
        .transigo-ideal-item:hover {
          background: rgba(167, 210, 33, 0.15);
          transform: translateY(-2px);
          border-color: rgba(167, 210, 33, 0.3);
        }

        .transigo-feature-icon,
        .transigo-ideal-icon {
          font-size: 1.2rem;
        }

        .transigo-feature-text,
        .transigo-ideal-text {
          font-weight: 500;
          color: #e0e0e0;
        }

        .transigo-specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .transigo-spec-item {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          background: rgba(167, 210, 33, 0.08);
          border-radius: 12px;
          border: 1px solid rgba(167, 210, 33, 0.2);
          text-align: center;
        }

        .transigo-spec-label {
          font-size: 0.9rem;
          color: #a0a0a0;
          margin-bottom: 0.5rem;
        }

        .transigo-spec-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: #f5f5f5;
        }

        /* Fullscreen Modal */
        .transigo-fullscreen-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeIn 0.3s ease;
        }

        .transigo-fullscreen-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .transigo-close-button {
          position: absolute;
          top: -50px;
          right: 0;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          padding: 0.8rem;
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .transigo-close-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .transigo-fullscreen-image {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 12px;
        }

        .transigo-fullscreen-title {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 1rem;
          text-align: center;
        }

        /* Animations */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .transigo-interactive-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
            margin: 1rem 0;
          }

          .transigo-interactive-card {
            border-radius: 16px;
          }

          .transigo-compact-view {
            height: 220px;
          }

          .transigo-overlay {
            padding: 1rem;
          }

          .transigo-number-badge {
            font-size: 1rem;
            padding: 0.4rem 0.8rem;
          }

          .transigo-title {
            font-size: 1.2rem;
          }

          .transigo-badge-compact {
            font-size: 0.7rem;
            padding: 0.2rem 0.6rem;
          }

          .transigo-expanded-content {
            padding: 1rem;
          }

          .transigo-main-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .transigo-expanded-header {
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .transigo-header-left {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .transigo-number-large {
            font-size: 1.5rem;
            padding: 0.8rem 1rem;
            align-self: center;
            min-width: 80px;
          }

          .transigo-title-large {
            font-size: 1.5rem;
          }

          .transigo-subtitle {
            font-size: 1rem;
          }

          .transigo-badge-large {
            font-size: 0.9rem;
            padding: 0.4rem 1rem;
            align-self: center;
          }

          .transigo-main-gallery-image {
            height: 280px;
          }

          .transigo-thumbnail {
            width: 80px;
            height: 60px;
          }

          .transigo-info-section h4 {
            font-size: 1.1rem;
          }

          .transigo-features-grid,
          .transigo-ideal-grid {
            grid-template-columns: 1fr;
            gap: 0.6rem;
          }

          .transigo-feature-item,
          .transigo-ideal-item {
            padding: 0.6rem;
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .transigo-feature-icon,
          .transigo-ideal-icon {
            font-size: 1.5rem;
          }

          .transigo-specs-grid {
            grid-template-columns: 1fr;
            gap: 0.8rem;
          }

          .transigo-spec-item {
            padding: 0.8rem;
          }

          .transigo-fullscreen-content {
            max-width: 95vw;
            max-height: 95vh;
          }

          .transigo-close-button {
            top: -40px;
            right: 10px;
            padding: 0.6rem;
          }

          .transigo-fullscreen-title {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 768px) {
          .transigo-interactive-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .transigo-main-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .transigo-expanded-header {
            flex-direction: column;
            gap: 1rem;
          }

          .transigo-header-left {
            flex-direction: column;
            gap: 1rem;
          }

          .transigo-number-large {
            align-self: flex-start;
          }

          .transigo-features-grid,
          .transigo-ideal-grid {
            grid-template-columns: 1fr;
          }

          .transigo-specs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}