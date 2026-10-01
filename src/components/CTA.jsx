import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="cta-section">
      <div ref={contentRef} className="cta-container">
        <p className="cta-eyebrow">LET'S CREATE</p>

        <h2 className="cta-heading">
          READY TO<br />MOVE FORWARD?
        </h2>

        <p className="cta-subtitle">
          Let's build something meaningful.
        </p>

        <div className="cta-actions">
          <a href="mailto:contact@itzfizz.com" className="cta-button">
            Get Started
          </a>
        </div>
      </div>

      <footer className="footer-bar">
        <div className="footer-inner">
          <span>ITZFIZZ © {new Date().getFullYear()}</span>
          <div className="footer-links">
            <a href="#hero">Privacy</a>
            <a href="#hero">Terms</a>
            <a href="#hero">Back to Top ↑</a>
          </div>
        </div>
      </footer>
    </section>
  );
}
