import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const headlineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 80, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="cta-section">
      <div className="cta-ambient-glow" />
      
      <div ref={cardRef} className="cta-hero-card">
        <div className="cta-grid-pattern" />
        
        <div className="cta-card-content">
          <div className="cta-pill-tag">
            <span className="cta-pulse" />
            LET'S COLLABORATE
          </div>

          <h2 ref={headlineRef} className="cta-master-heading">
            READY TO<br />
            <span className="cta-highlight-word">MOVE FORWARD?</span>
          </h2>

          <p className="cta-card-description">
            Whether launching a flagship product or crafting an iconic digital world, let's build something unforgettable.
          </p>

          <div className="cta-interactive-bar">
            <a href="mailto:contact@itzfizz.com" className="cta-primary-btn">
              <span>START A PROJECT</span>
              <svg className="cta-btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <a href="#hero" className="cta-secondary-link">
              Explore Showreel
            </a>
          </div>
        </div>

        <div className="cta-stats-strip">
          <div className="cta-stat-unit">
            <strong>GLOBAL</strong>
            <span>Active Clients</span>
          </div>
          <div className="cta-stat-divider" />
          <div className="cta-stat-unit">
            <strong>48H</strong>
            <span>Initial Concept</span>
          </div>
          <div className="cta-stat-divider" />
          <div className="cta-stat-unit">
            <strong>100%</strong>
            <span>Code Craftsmanship</span>
          </div>
        </div>
      </div>

      <footer className="footer-master-bar">
        <div className="footer-master-inner">
          <div className="footer-brand">
            <span className="footer-logo">ITZFIZZ</span>
            <p className="footer-tagline">Scroll-Driven Digital Experiences & Motion Engineering.</p>
          </div>

          <div className="footer-links-group">
            <a href="#hero" className="footer-nav-item">Home</a>
            <a href="#impact" className="footer-nav-item">Impact</a>
            <a href="#contact" className="footer-nav-item">Contact</a>
            <a href="#hero" className="footer-top-btn">
              Back to Top ↑
            </a>
          </div>
        </div>

        <div className="footer-sub-bottom">
          <span>© {new Date().getFullYear()} ITZFIZZ Inc. All rights reserved.</span>
          <span>Designed with high-precision motion kinematics.</span>
        </div>
      </footer>
    </section>
  );
}
