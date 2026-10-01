import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#hero" className="logo">
          ITZFIZZ
        </a>

        {/* Desktop Links */}
        <nav className="nav-links">
          <a href="#hero">Work</a>
          <a href="#impact">About</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          <span className={`bar ${mobileMenuOpen ? 'open' : ''}`} />
          <span className={`bar ${mobileMenuOpen ? 'open' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#hero" onClick={() => setMobileMenuOpen(false)}>Work</a>
          <a href="#impact" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
      )}
    </header>
  );
}
