import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.2,
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
    <section ref={sectionRef} id="impact" className="impact-section">
      <div className="impact-container">
        <p className="impact-eyebrow">OUR IMPACT</p>
        
        <h2 className="impact-heading">
          Engineered for quantifiable results.
        </h2>

        <div className="impact-grid">
          <div ref={(el) => (cardsRef.current[0] = el)} className="impact-card">
            <strong className="impact-number">32%</strong>
            <span className="impact-title">Faster Experiences</span>
            <p className="impact-desc">Sub-second front-end performance through streamable asset architectures and GPU acceleration.</p>
          </div>

          <div ref={(el) => (cardsRef.current[1] = el)} className="impact-card">
            <strong className="impact-number">68%</strong>
            <span className="impact-title">Higher Engagement</span>
            <p className="impact-desc">Kinetic storytelling and scroll-driven interactions that hold visitor immersion longer.</p>
          </div>

          <div ref={(el) => (cardsRef.current[2] = el)} className="impact-card">
            <strong className="impact-number">94%</strong>
            <span className="impact-title">Client Satisfaction</span>
            <p className="impact-desc">Precision engineering, complete responsiveness, and cross-platform fidelity.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
