import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const countersRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Card staggered entrance with 3D tilt reveal
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 70, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Dynamic numeric count-up animation
      countersRef.current.forEach((el) => {
        if (!el) return;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + '%';
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="impact" className="impact-section">
      <div className="impact-container">
        {/* Glow ambient background lights */}
        <div className="ambient-glow ambient-glow-1" />
        <div className="ambient-glow ambient-glow-2" />

        <div className="impact-header">
          <div className="impact-pill">
            <span className="pill-dot" />
            OUR IMPACT & BENCHMARKS
          </div>
          
          <h2 className="impact-heading">
            Engineered for<br />
            <span className="gradient-text">quantifiable results.</span>
          </h2>
          <p className="impact-lead">
            Kinetic storytelling combined with sub-second GPU acceleration to craft interfaces that hold visitors and drive performance.
          </p>
        </div>

        <div className="impact-grid">
          {/* Card 1 */}
          <div ref={(el) => (cardsRef.current[0] = el)} className="impact-card">
            <div className="card-top-accent" />
            <div className="impact-card-inner">
              <strong 
                ref={(el) => (countersRef.current[0] = el)} 
                data-target="32" 
                className="impact-number"
              >
                0%
              </strong>
              <span className="impact-title">Faster Experiences</span>
              <p className="impact-desc">Sub-second front-end rendering through streamable asset architectures and GPU hardware acceleration.</p>
              <div className="card-metric-badge">
                <span>BENCHMARK // SPEED</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div ref={(el) => (cardsRef.current[1] = el)} className="impact-card highlighted-card">
            <div className="card-top-accent" />
            <div className="impact-card-inner">
              <strong 
                ref={(el) => (countersRef.current[1] = el)} 
                data-target="68" 
                className="impact-number"
              >
                0%
              </strong>
              <span className="impact-title">Higher Engagement</span>
              <p className="impact-desc">Kinetic storytelling and scroll-driven kinematics that captivate visitors and multiply average dwell time.</p>
              <div className="card-metric-badge">
                <span>BENCHMARK // IMMERSION</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div ref={(el) => (cardsRef.current[2] = el)} className="impact-card">
            <div className="card-top-accent" />
            <div className="impact-card-inner">
              <strong 
                ref={(el) => (countersRef.current[2] = el)} 
                data-target="94" 
                className="impact-number"
              >
                0%
              </strong>
              <span className="impact-title">Client Satisfaction</span>
              <p className="impact-desc">Pixel-perfect engineering, seamless cross-device fidelity, and award-winning interactive production.</p>
              <div className="card-metric-badge">
                <span>BENCHMARK // QUALITY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
