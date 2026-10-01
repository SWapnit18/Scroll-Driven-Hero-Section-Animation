import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3.5 glass-panel bg-[#F5F2EC]/80 shadow-sm border-b border-black/5' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="group flex items-center gap-2 text-xl md:text-2xl font-black tracking-tighter text-[#111111]"
          aria-label="ITZFIZZ Home"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A36] transition-transform duration-300 group-hover:scale-150 inline-block" />
          <span className="font-heading">ITZFIZZ</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-[#666666]">
          <a 
            href="#hero" 
            className="hover:text-[#111111] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#FF5A36] hover:after:w-full after:transition-all after:duration-300"
          >
            Overview
          </a>
          <a 
            href="#impact" 
            className="hover:text-[#111111] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#FF5A36] hover:after:w-full after:transition-all after:duration-300"
          >
            Work
          </a>
          <a 
            href="#impact" 
            className="hover:text-[#111111] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#FF5A36] hover:after:w-full after:transition-all after:duration-300"
          >
            About
          </a>
          <a 
            href="#contact" 
            className="hover:text-[#111111] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#FF5A36] hover:after:w-full after:transition-all after:duration-300"
          >
            Contact
          </a>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest font-semibold bg-[#111111] text-white rounded-full hover:bg-[#FF5A36] transition-all duration-300 shadow-sm"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#111111] hover:text-[#FF5A36] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF5A36] rounded-md"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel bg-[#F5F2EC]/95 border-b border-black/10 px-6 py-6 animate-fadeIn">
          <nav className="flex flex-col gap-4 text-base font-medium text-[#111111]">
            <a 
              href="#hero" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-black/5 hover:text-[#FF5A36] transition-colors"
            >
              Overview
            </a>
            <a 
              href="#impact" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-black/5 hover:text-[#FF5A36] transition-colors"
            >
              Work & Impact
            </a>
            <a 
              href="#impact" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-black/5 hover:text-[#FF5A36] transition-colors"
            >
              About
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-black/5 hover:text-[#FF5A36] transition-colors"
            >
              Contact
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-3 bg-[#111111] text-white rounded-xl font-semibold hover:bg-[#FF5A36] transition-colors"
            >
              Get Started
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
