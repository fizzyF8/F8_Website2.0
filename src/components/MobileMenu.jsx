import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import logo from '../assets/logo.png';

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => (document.body.style.overflow = '');
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // The overlay menu as a separate component for clarity
  const overlayMenu = (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.98) 0%, rgba(18, 18, 18, 0.98) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        animation: 'fadeIn 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Close Button */}
      <button
        onClick={toggleMenu}
        aria-label="Close menu"
        className="absolute top-6 right-6 rounded-full p-2 bg-[rgba(167,210,33,0.2)] hover:bg-[rgba(167,210,33,0.3)] shadow-lg transition"
        style={{ fontSize: 24, lineHeight: 1, color: '#a7d221', border: '1px solid rgba(167, 210, 33, 0.3)', zIndex: 100 }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>

      {/* Logo */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 40, paddingBottom: 10 }}>
        <a href="/" className="block">
          <img src={logo.src} alt="Frog8 Logo" style={{ height: 44, width: 'auto' }} />
        </a>
      </div>

      {/* Menu Links */}
      <nav style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
        {[
          { href: '/', label: 'Home' },
          { href: '/platforms', label: 'Platforms' },
          { href: '/kiosks', label: 'Devices' },
          { href: '/veriphy', label: 'Veriphy' },
          { href: '/deployments', label: 'Deployments' },
          { href: '/about', label: 'About' },
        ].map(link => (
          <a
            key={link.href}
            href={link.href}
            style={{
              color: '#f5f5f5',
              fontWeight: 700,
              fontSize: '1.35rem',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              borderRadius: '12px',
              padding: '14px 48px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'block',
              border: '1px solid transparent',
            }}
            className="hover:bg-[rgba(167,210,33,0.15)] hover:text-[#b8e32e] hover:border-[rgba(167,210,33,0.3)]"
            onClick={toggleMenu}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Get Started Button */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: 36 }}>
        <a
          href="/contact"
          style={{
            background: 'linear-gradient(135deg, #a7d221 0%, #b8e32e 100%)',
            color: '#0a0a0a',
            borderRadius: '16px',
            padding: '18px 48px',
            fontWeight: 800,
            fontSize: '1.18rem',
            boxShadow: '0 4px 20px rgba(167,210,33,0.3)',
            textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'inline-block',
            letterSpacing: '-0.01em',
          }}
          className="hover:shadow-[0_8px_32px_rgba(167,210,33,0.5)]"
          onClick={toggleMenu}
        >
          Get Started
        </a>
      </div>

      {/* Fade-in Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );

  return (
    <div className="md:hidden">
      {/* Hamburger Icon */}
      <button
  onClick={toggleMenu}
  aria-label="Toggle mobile menu"
  style={{
    position: 'relative',
    zIndex: 60,
    background: 'rgba(167, 210, 33, 0.1)',
    border: '1px solid rgba(167, 210, 33, 0.2)',
    padding: 10,
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
  onMouseDown={e => e.preventDefault()}
  className="hover:bg-[rgba(167,210,33,0.15)] hover:border-[rgba(167,210,33,0.3)]"
>
  {!isMenuOpen ? (
    // Modern Hamburger
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect y="8" width="32" height="3" rx="1.5" fill="#a7d221"/>
      <rect y="15" width="32" height="3" rx="1.5" fill="#a7d221"/>
      <rect y="22" width="32" height="3" rx="1.5" fill="#a7d221"/>
    </svg>
  ) : (
    // Modern Close (X) Icon
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="24" y="6" width="25" height="3" rx="1.5" transform="rotate(45 24 6)" fill="#a7d221"/>
      <rect x="6" y="8" width="25" height="3" rx="1.5" transform="rotate(-45 6 8)" fill="#a7d221"/>
    </svg>
  )}
</button>

      {/* Render overlay at end of <body> for full coverage */}
      {isMenuOpen && createPortal(overlayMenu, document.body)}
    </div>
  );
}
