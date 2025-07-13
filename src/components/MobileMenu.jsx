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
        background: 'linear-gradient(120deg, #fff 65%, #cde19b 100%)',
        // Optionally: backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
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
        className="absolute top-6 right-6 rounded-full p-2 bg-white/80 hover:bg-white/90 shadow transition"
        style={{ fontSize: 24, lineHeight: 1, color: '#222', border: 'none', zIndex: 100 }}
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
          { href: '/kiosks', label: 'Kiosks' },
          { href: '/veriphy', label: 'Veriphy' },
          { href: '/deployments', label: 'Deployments' },
          { href: '/about', label: 'About' },
        ].map(link => (
          <a
            key={link.href}
            href={link.href}
            style={{
              color: '#181818',
              fontWeight: 700,
              fontSize: '1.35rem',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              borderRadius: '12px',
              padding: '12px 40px',
              transition: 'background 0.2s, color 0.2s',
              display: 'block',
            }}
            className="hover:bg-[#f3f3f3] hover:text-[#a7d221]"
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
            color: '#fff',
            borderRadius: '16px',
            padding: '18px 48px',
            fontWeight: 800,
            fontSize: '1.18rem',
            boxShadow: '0 2px 12px rgba(167,210,33,0.13)',
            textDecoration: 'none',
            transition: 'background 0.2s, color 0.2s',
            display: 'inline-block',
            letterSpacing: '-0.01em',
          }}
          className="hover:bg-[#a7d221] hover:text-white"
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
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 60,
    background: 'none',
    border: 'none',
    padding: 8,
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'background 0.2s',
    outline: 'none',
  }}
  onMouseDown={e => e.preventDefault()}
>
  {!isMenuOpen ? (
    // Modern Hamburger
    <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
      <rect y="7" width="32" height="4" rx="2" fill="#a7d221"/>
      <rect y="14" width="32" height="4" rx="2" fill="#a7d221"/>
      <rect y="21" width="32" height="4" rx="2" fill="#a7d221"/>
    </svg>
  ) : (
    // Modern Close (X) Icon, same color
    <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
      <rect x="8" y="8" width="22" height="4" rx="2" transform="rotate(45 8 8)" fill="#a7d221"/>
      <rect x="8" y="24" width="22" height="4" rx="2" transform="rotate(-45 8 24)" fill="#a7d221"/>
    </svg>
  )}
</button>

      {/* Render overlay at end of <body> for full coverage */}
      {isMenuOpen && createPortal(overlayMenu, document.body)}
    </div>
  );
}
